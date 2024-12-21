'use client';

import { HistoricalTrendsChart } from '@/components/charts/HistoricalTrendsChart';
import { DailyShipmentsChart } from '@/components/charts/DailyShipmentsChart';
import { InventoryValueChart } from '@/components/charts/InventoryValueChart';
import { AccountsPayableChart } from '@/components/charts/AccountsPayableChart';
import { GrowthMetricsChart } from '@/components/charts/GrowthMetricsChart';

interface ChartsSectionProps {
  historicalData: any[];
  dailyShipments: any[];
  onHistoricalUpdate: (data: any[]) => void;
  onShipmentsUpdate: (data: any[]) => void;
  onInventoryUpdate: (data: any[]) => void;
  onPayablesUpdate: (data: any[]) => void;
  onGrowthUpdate: (data: any[]) => void;
}

export function ChartsSection({
  historicalData,
  dailyShipments,
  onHistoricalUpdate,
  onShipmentsUpdate,
  onInventoryUpdate,
  onPayablesUpdate,
  onGrowthUpdate
}: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-1 h-full">
      <div className="grid grid-rows-3 gap-1">
        <HistoricalTrendsChart 
          data={historicalData} 
          onUpdate={onHistoricalUpdate}
        />
        <DailyShipmentsChart 
          data={dailyShipments} 
          onUpdate={onShipmentsUpdate}
        />
        <InventoryValueChart 
          data={historicalData} 
          onUpdate={onInventoryUpdate}
        />
      </div>
      <div className="grid grid-rows-3 gap-1">
        <AccountsPayableChart 
          data={dailyShipments} 
          onUpdate={onPayablesUpdate}
        />
        <GrowthMetricsChart 
          data={historicalData} 
          onUpdate={onGrowthUpdate}
        />
      </div>
    </div>
  );
}