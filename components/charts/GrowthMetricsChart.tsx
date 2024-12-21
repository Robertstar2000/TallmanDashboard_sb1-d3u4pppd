'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EditableChart } from './EditableChart';

interface GrowthMetricsChartProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

export function GrowthMetricsChart({ data, onUpdate }: GrowthMetricsChartProps) {
  return (
    <EditableChart
      title="Growth Metrics"
      data={data}
      onUpdate={onUpdate}
    >
      <Card className="h-full">
        <CardHeader className="p-1">
          <CardTitle className="text-xs">New Customers vs New Prospects</CardTitle>
        </CardHeader>
        <CardContent className="p-1 h-[calc(100%-2rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip />
              <Legend />
              <Bar dataKey="newCustomers" fill="#8884d8" name="New Customers" />
              <Bar dataKey="newProducts" fill="#82ca9d" name="New Prospects" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </EditableChart>
  );
}