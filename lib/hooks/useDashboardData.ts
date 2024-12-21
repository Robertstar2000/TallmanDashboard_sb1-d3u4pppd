'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '@/lib/types/dashboard';
import { getAllVariables } from '@/lib/db/indexedDB';
import { showSuccess, showError, showLoading } from '@/lib/utils/toast';
import { 
  formatMetricName, 
  formatProductName, 
  formatSiteName,
  parseHistoricalName,
  parseShipmentDate
} from '@/lib/utils/naming';

export function useDashboardData() {
  const [data, setData] = useState<Partial<DashboardData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformData = useCallback((variables: any[]) => {
    return {
      metrics: variables
        .filter(v => v.chartGroup === 'Metrics')
        .map(v => ({
          name: v.name,
          displayName: formatMetricName(v.name),
          value: Number(v.value)
        })),

      historicalData: variables
        .filter(v => v.chartGroup === 'Historical Trends')
        .reduce((acc: any[], v) => {
          const { date, type } = parseHistoricalName(v.name);
          const existing = acc.find(x => x.date === date) || { date };
          return [
            ...acc.filter(x => x.date !== date),
            { ...existing, [type]: Number(v.value) }
          ].sort((a, b) => a.date.localeCompare(b.date));
        }, []),

      dailyShipments: variables
        .filter(v => v.chartGroup === 'Daily Shipments')
        .map(v => ({
          date: parseShipmentDate(v.name),
          shipments: Number(v.value)
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),

      siteDistribution: variables
        .filter(v => v.chartGroup === 'Site Distribution')
        .map(v => ({
          name: formatSiteName(v.name),
          value: Number(v.value)
        })),

      products: {
        online: variables
          .filter(v => v.chartGroup === 'Top Products Online')
          .map(v => ({
            name: formatProductName(v.name),
            value: Number(v.value)
          }))
          .sort((a, b) => b.value - a.value),
        inside: variables
          .filter(v => v.chartGroup === 'Top Products Inside')
          .map(v => ({
            name: formatProductName(v.name),
            value: Number(v.value)
          }))
          .sort((a, b) => b.value - a.value),
        outside: variables
          .filter(v => v.chartGroup === 'Top Products Outside')
          .map(v => ({
            name: formatProductName(v.name),
            value: Number(v.value)
          }))
          .sort((a, b) => b.value - a.value)
      }
    };
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    showLoading("Loading Dashboard", "Fetching data...");

    try {
      const variables = await getAllVariables();
      const transformedData = transformData(variables);
      setData(transformedData);
      showSuccess("Dashboard Updated", "Data loaded successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load data';
      setError(message);
      showError("Error", message);
    } finally {
      setIsLoading(false);
    }
  }, [transformData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    data,
    isLoading,
    error,
    refreshData: loadData,
    updateData
  };
}