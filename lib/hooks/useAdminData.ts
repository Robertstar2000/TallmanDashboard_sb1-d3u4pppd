'use client';

import { useState, useEffect } from 'react';
import { getDashboardVariables, updateDashboardVariable } from '@/lib/db/admin';
import { showSuccess, showError } from '@/lib/utils/toast';
import type { DashboardVariable } from '@/lib/db/indexedDB';

export function useAdminData() {
  const [data, setData] = useState<DashboardVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const variables = await getDashboardVariables();
      setData(variables);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load data';
      setError(message);
      showError('Error', message);
    } finally {
      setLoading(false);
    }
  };

  const updateVariable = async (id: number, field: string, value: string) => {
    try {
      await updateDashboardVariable(id, field, value);
      await loadData(); // Refresh data after update
      showSuccess('Updated', `Successfully updated ${field}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update variable';
      setError(message);
      showError('Error', message);
    }
  };

  return { data, loading, error, updateVariable };
}