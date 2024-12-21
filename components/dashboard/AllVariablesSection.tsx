'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils/format';

interface AllVariablesSectionProps {
  data: any;
}

export function AllVariablesSection({ data }: AllVariablesSectionProps) {
  // Metrics (7 variables)
  const metrics = [
    { 
      name: 'total_orders', 
      value: 12847,
      sql: 'SELECT COUNT(*) FROM orders'
    },
    { 
      name: 'open_orders', 
      value: 1563,
      sql: 'SELECT COUNT(*) FROM orders WHERE status = "open"'
    },
    { 
      name: 'in_process', 
      value: 892,
      sql: 'SELECT COUNT(*) FROM orders WHERE status = "processing"'
    },
    { 
      name: 'weekly_revenue', 
      value: 1924500,
      sql: 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-7 days")'
    },
    { 
      name: 'open_invoices', 
      value: 3842650,
      sql: 'SELECT SUM(amount) FROM invoices WHERE status = "open"'
    },
    { 
      name: 'orders_backlogged', 
      value: 743,
      sql: 'SELECT COUNT(*) FROM orders WHERE status = "backlogged"'
    },
    { 
      name: 'total_sales_monthly', 
      value: 8325000,
      sql: 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-30 days")'
    }
  ];

  // Historical Trends (10 variables - 5 quarters × 2 metrics)
  const historicalTrends = [
    { 
      quarter: '2023-Q1', 
      p21: 24500000, 
      por: 21800000,
      p21_sql: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2023-Q1"',
      por_sql: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2023-Q1"'
    },
    // ... similar structure for other quarters
  ];

  return (
    <Card className="h-full">
      <CardHeader className="p-2">
        <CardTitle>All Variables (45 Total)</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Variable</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>SQL Expression</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Metrics Section */}
              <TableRow className="bg-gray-50">
                <TableCell colSpan={4} className="font-medium">Metrics (7 variables)</TableCell>
              </TableRow>
              {metrics.map((metric) => (
                <TableRow key={metric.name}>
                  <TableCell>Metrics</TableCell>
                  <TableCell>{metric.name}</TableCell>
                  <TableCell>
                    {metric.name.includes('revenue') || metric.name.includes('invoices') || metric.name.includes('sales')
                      ? formatCurrency(metric.value)
                      : metric.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {metric.sql}
                    </code>
                  </TableCell>
                </TableRow>
              ))}

              {/* Historical Trends Section */}
              <TableRow className="bg-gray-50">
                <TableCell colSpan={4} className="font-medium">Historical Trends (10 variables)</TableCell>
              </TableRow>
              {historicalTrends.map((trend) => (
                <React.Fragment key={trend.quarter}>
                  <TableRow>
                    <TableCell>Historical</TableCell>
                    <TableCell>{`P21 ${trend.quarter}`}</TableCell>
                    <TableCell>{formatCurrency(trend.p21)}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {trend.p21_sql}
                      </code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Historical</TableCell>
                    <TableCell>{`POR ${trend.quarter}`}</TableCell>
                    <TableCell>{formatCurrency(trend.por)}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {trend.por_sql}
                      </code>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}

              {/* Continue with similar updates for other sections... */}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}