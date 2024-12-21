'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EditableChart } from './EditableChart';

interface HistoricalTrendsChartProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

export function HistoricalTrendsChart({ data, onUpdate }: HistoricalTrendsChartProps) {
  return (
    <EditableChart
      title="Historical Trends"
      data={data}
      onUpdate={onUpdate}
    >
      <Card className="h-full">
        <CardHeader className="p-1">
          <CardTitle className="text-xs">Historical P21 & POR Trends</CardTitle>
        </CardHeader>
        <CardContent className="p-1 h-[calc(100%-2rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="p21" stroke="#0088FE" name="P21" />
              <Line type="monotone" dataKey="por" stroke="#00C49F" name="POR" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </EditableChart>
  );
}