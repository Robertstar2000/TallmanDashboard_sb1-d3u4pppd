'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetricsSection } from '@/components/dashboard/MetricsSection';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { SideSection } from '@/components/dashboard/SideSection';
import { AllVariablesSection } from '@/components/dashboard/AllVariablesSection';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
  const { data, isLoading, refreshData, updateData } = useDashboardData();

  return (
    <div className="p-2 h-screen bg-gray-50 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[20px] text-red-600 font-bold">
          Tallman Leadership Dashboard
        </h1>
        <Button
          onClick={refreshData}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="flex-1">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard View</TabsTrigger>
          <TabsTrigger value="all">All Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="h-[calc(100%-2rem)]">
          <div className="grid grid-cols-12 gap-1 h-full">
            <div className="col-span-2">
              <MetricsSection 
                metrics={data.metrics || []}
                onMetricsUpdate={(metric) => updateData('metrics', metric)}
              />
            </div>
            <div className="col-span-8">
              <ChartsSection 
                historicalData={data.historicalData || []}
                dailyShipments={data.dailyShipments || []}
                onHistoricalUpdate={(newData) => updateData('historicalData', newData)}
                onShipmentsUpdate={(newData) => updateData('dailyShipments', newData)}
                onInventoryUpdate={(newData) => updateData('historicalData', newData)}
                onPayablesUpdate={(newData) => updateData('dailyShipments', newData)}
                onGrowthUpdate={(newData) => updateData('historicalData', newData)}
              />
            </div>
            <div className="col-span-2">
              <SideSection 
                siteDistribution={data.siteDistribution || []}
                products={data.products || { online: [], inside: [], outside: [] }}
                onSiteDistributionUpdate={(newData) => updateData('siteDistribution', newData)}
                onProductsUpdate={(newData) => updateData('products', newData)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="all" className="h-[calc(100%-2rem)]">
          <AllVariablesSection data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}