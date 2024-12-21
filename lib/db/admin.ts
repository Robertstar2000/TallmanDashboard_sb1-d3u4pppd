import { getAllVariables, updateVariable, type DashboardVariable } from './indexedDB';

export async function getDashboardVariables(): Promise<DashboardVariable[]> {
  return getAllVariables();
}

export async function updateDashboardVariable(id: number, field: string, value: string): Promise<boolean> {
  const dbField = field === 'sqlExpression' ? 'sqlExpression' : 
                  field === 'chartGroup' ? 'chartGroup' : field;
                  
  return updateVariable(id, dbField, value);
}