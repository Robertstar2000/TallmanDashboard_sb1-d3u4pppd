'use client';

// Centralized naming utilities
export const formatMetricName = (name: string): string => {
  const nameMap: { [key: string]: string } = {
    'total_orders': 'Total Orders',
    'open_orders': 'Open Orders',
    'in_process': 'In Process',
    'weekly_revenue': 'Weekly Revenue',
    'open_invoices': 'Open Invoices',
    'orders_backlogged': 'Orders Backlogged',
    'total_sales_monthly': 'Total Monthly Sales'
  };
  return nameMap[name] || name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const formatProductName = (name: string): string => {
  const parts = name.split('_');
  const productId = parts[parts.length - 1].toUpperCase();
  return `Product ${productId}`;
};

export const formatSiteName = (name: string): string => {
  const site = name.split('_')[1];
  return site.charAt(0).toUpperCase() + 
         site.slice(1).replace('_', ' ');
};

export const parseHistoricalName = (name: string): { 
  date: string; 
  type: string; 
} => {
  const [year, quarter, type] = name.split('_');
  return {
    date: `${year}-${quarter.toUpperCase()}`,
    type: type.toLowerCase()
  };
};

export const parseShipmentDate = (name: string): string => {
  return name.split('_').slice(-3).join('-');
};