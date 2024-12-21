'use client';

import { storage } from './storage';
import { initialData } from './initial-data';

// Initialize storage with data
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  
  // Convert initial data array to structured format
  const structuredData = {
    metrics: initialData.filter(item => item.chartGroup === 'Metrics').map(item => ({
      name: item.name,
      value: Number(item.value)
    })),
    
    historicalData: initialData
      .filter(item => item.chartGroup === 'Historical Trends')
      .reduce((acc, item) => {
        const [year, quarter, type] = item.name.split('_');
        const date = `${year}-${quarter.toUpperCase()}`;
        const existing = acc.find(x => x.date === date) || { date };
        return [
          ...acc.filter(x => x.date !== date),
          { ...existing, [type]: Number(item.value) }
        ];
      }, []),
    
    dailyShipments: initialData
      .filter(item => item.chartGroup === 'Daily Shipments')
      .map(item => ({
        date: item.name.split('_').slice(-3).join('-'),
        shipments: Number(item.value)
      })),
    
    siteDistribution: initialData
      .filter(item => item.chartGroup === 'Site Distribution')
      .map(item => ({
        name: item.name.split('_')[1].charAt(0).toUpperCase() + item.name.split('_')[1].slice(1),
        value: Number(item.value)
      })),
    
    products: {
      online: initialData
        .filter(item => item.chartGroup === 'Top Products Online')
        .map(item => ({
          name: `Product ${item.name.split('_')[2].toUpperCase()}`,
          value: Number(item.value)
        })),
      inside: initialData
        .filter(item => item.chartGroup === 'Top Products Inside')
        .map(item => ({
          name: `Product ${item.name.split('_')[2].toUpperCase()}`,
          value: Number(item.value)
        })),
      outside: initialData
        .filter(item => item.chartGroup === 'Top Products Outside')
        .map(item => ({
          name: `Product ${item.name.split('_')[2]}`,
          value: Number(item.value)
        }))
    }
  };

  // Initialize each data category
  Object.entries(structuredData).forEach(([key, value]) => {
    storage.initialize(key, value);
  });
};

// Initialize on import
initializeStorage();

export const getMetrics = () => {
  const metrics = storage.getItem('metrics');
  return metrics || [];
};

export const updateMetric = (name: string, value: number) => {
  const metrics = getMetrics();
  const updatedMetrics = metrics.map((m: any) =>
    m.name === name ? { ...m, value } : m
  );
  storage.setItem('metrics', updatedMetrics);
  return updatedMetrics;
};

export const getHistoricalData = () => {
  const data = storage.getItem('historicalData');
  return data || [];
};

export const updateHistoricalData = (data: any[]) => {
  storage.setItem('historicalData', data);
  return data;
};

export const getDailyShipments = () => {
  const data = storage.getItem('dailyShipments');
  return data || [];
};

export const updateDailyShipments = (data: any[]) => {
  storage.setItem('dailyShipments', data);
  return data;
};

export const getSiteDistribution = () => {
  const data = storage.getItem('siteDistribution');
  return data || [];
};

export const updateSiteDistribution = (data: any[]) => {
  storage.setItem('siteDistribution', data);
  return data;
};

export const getProducts = () => {
  const data = storage.getItem('products');
  return data || { online: [], inside: [], outside: [] };
};

export const updateProducts = (data: any) => {
  storage.setItem('products', data);
  return data;
};