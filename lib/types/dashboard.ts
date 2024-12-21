export interface DashboardVariable {
  id: number;
  name: string;
  value: string;
  calculation: string;
  sqlExpression: string;
  chartGroup: string;
}

export interface Metric {
  name: string;
  displayName: string;
  value: number;
}

export interface HistoricalDataPoint {
  date: string;
  p21: number;
  por: number;
}

export interface DailyShipment {
  date: string;
  shipments: number;
}

export interface SiteDistribution {
  name: string;
  value: number;
}

export interface Product {
  name: string;
  value: number;
}

export interface Products {
  online: Product[];
  inside: Product[];
  outside: Product[];
}

export interface DashboardData {
  metrics: Metric[];
  historicalData: HistoricalDataPoint[];
  dailyShipments: DailyShipment[];
  siteDistribution: SiteDistribution[];
  products: Products;
}