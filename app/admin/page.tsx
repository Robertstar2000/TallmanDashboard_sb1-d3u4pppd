'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AdminSpreadsheet } from '@/components/admin/AdminSpreadsheet';
import { useAdminData } from '@/lib/hooks/useAdminData';

export default function AdminPage() {
  const { data, loading, error, updateVariable } = useAdminData();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Variables</h1>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Variables ({data.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSpreadsheet 
            data={data} 
            onUpdate={updateVariable}
          />
        </CardContent>
      </Card>
    </div>
  );
}