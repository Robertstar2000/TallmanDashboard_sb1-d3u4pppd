'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EditableChart } from './EditableChart';

interface AccountsPayableChartProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

export function AccountsPayableChart({ data, onUpdate }: AccountsPayableChartProps) {
  return (
    <EditableChart
      title="Accounts Payable"
      data={data}
      onUpdate={onUpdate}
    >
      <Card className="h-full">
        <CardHeader className="p-1">
          <CardTitle className="text-xs">Accounts Payable Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-1 h-[calc(100%-2rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{fontSize: 10}} />
              <YAxis tick={{fontSize: 10}} />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Total Payable" 
              />
              <Area 
                type="monotone" 
                dataKey="overdue" 
                stackId="2" 
                stroke="#ff7300" 
                fill="#ff7300" 
                name="Overdue Amount" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </EditableChart>
  );
}