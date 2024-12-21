'use client';

export const initialData = [
  // Metrics
  {
    id: 1,
    name: 'total_orders',
    value: '12847',
    calculation: 'COUNT(orders)',
    sqlExpression: 'SELECT COUNT(*) FROM orders',
    chartGroup: 'Metrics'
  },
  {
    id: 2,
    name: 'open_orders',
    value: '1563',
    calculation: 'COUNT(orders) WHERE status = "open"',
    sqlExpression: 'SELECT COUNT(*) FROM orders WHERE status = "open"',
    chartGroup: 'Metrics'
  },
  {
    id: 3,
    name: 'in_process',
    value: '892',
    calculation: 'COUNT(orders) WHERE status = "processing"',
    sqlExpression: 'SELECT COUNT(*) FROM orders WHERE status = "processing"',
    chartGroup: 'Metrics'
  },
  {
    id: 4,
    name: 'weekly_revenue',
    value: '1924500',
    calculation: 'SUM(orders.amount) LAST 7 DAYS',
    sqlExpression: 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-7 days")',
    chartGroup: 'Metrics'
  },
  {
    id: 5,
    name: 'open_invoices',
    value: '3842650',
    calculation: 'SUM(invoices.amount) WHERE status = "open"',
    sqlExpression: 'SELECT SUM(amount) FROM invoices WHERE status = "open"',
    chartGroup: 'Metrics'
  },
  {
    id: 6,
    name: 'orders_backlogged',
    value: '743',
    calculation: 'COUNT(orders) WHERE status = "backlogged"',
    sqlExpression: 'SELECT COUNT(*) FROM orders WHERE status = "backlogged"',
    chartGroup: 'Metrics'
  },
  {
    id: 7,
    name: 'total_sales_monthly',
    value: '8325000',
    calculation: 'SUM(orders.amount) LAST 30 DAYS',
    sqlExpression: 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-30 days")',
    chartGroup: 'Metrics'
  },

  // Historical Trends
  {
    id: 8,
    name: '2023_q1_p21',
    value: '24500000',
    calculation: 'Q1 2023 P21 Value',
    sqlExpression: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2023-Q1"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 9,
    name: '2023_q2_p21',
    value: '26300000',
    calculation: 'Q2 2023 P21 Value',
    sqlExpression: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2023-Q2"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 10,
    name: '2023_q3_p21',
    value: '25100000',
    calculation: 'Q3 2023 P21 Value',
    sqlExpression: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2023-Q3"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 11,
    name: '2023_q4_p21',
    value: '27800000',
    calculation: 'Q4 2023 P21 Value',
    sqlExpression: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2023-Q4"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 12,
    name: '2024_q1_p21',
    value: '28500000',
    calculation: 'Q1 2024 P21 Value',
    sqlExpression: 'SELECT SUM(p21_value) FROM trends WHERE quarter = "2024-Q1"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 13,
    name: '2023_q1_por',
    value: '21800000',
    calculation: 'Q1 2023 POR Value',
    sqlExpression: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2023-Q1"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 14,
    name: '2023_q2_por',
    value: '23500000',
    calculation: 'Q2 2023 POR Value',
    sqlExpression: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2023-Q2"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 15,
    name: '2023_q3_por',
    value: '22900000',
    calculation: 'Q3 2023 POR Value',
    sqlExpression: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2023-Q3"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 16,
    name: '2023_q4_por',
    value: '25300000',
    calculation: 'Q4 2023 POR Value',
    sqlExpression: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2023-Q4"',
    chartGroup: 'Historical Trends'
  },
  {
    id: 17,
    name: '2024_q1_por',
    value: '26100000',
    calculation: 'Q1 2024 POR Value',
    sqlExpression: 'SELECT SUM(por_value) FROM trends WHERE quarter = "2024-Q1"',
    chartGroup: 'Historical Trends'
  },

  // Daily Shipments
  {
    id: 18,
    name: 'shipments_2024_04_01',
    value: '425',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-01"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 19,
    name: 'shipments_2024_04_02',
    value: '463',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-02"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 20,
    name: 'shipments_2024_04_03',
    value: '418',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-03"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 21,
    name: 'shipments_2024_04_04',
    value: '445',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-04"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 22,
    name: 'shipments_2024_04_05',
    value: '482',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-05"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 23,
    name: 'shipments_2024_04_06',
    value: '392',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-06"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 24,
    name: 'shipments_2024_04_07',
    value: '436',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-07"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 25,
    name: 'shipments_2024_04_08',
    value: '458',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-08"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 26,
    name: 'shipments_2024_04_09',
    value: '475',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-09"',
    chartGroup: 'Daily Shipments'
  },
  {
    id: 27,
    name: 'shipments_2024_04_10',
    value: '467',
    calculation: 'Daily Shipment Count',
    sqlExpression: 'SELECT COUNT(*) FROM shipments WHERE date = "2024-04-10"',
    chartGroup: 'Daily Shipments'
  },

  // Site Distribution
  {
    id: 28,
    name: 'site_tallman',
    value: '4850000',
    calculation: 'Tallman Site Value',
    sqlExpression: 'SELECT SUM(value) FROM inventory WHERE site = "Tallman"',
    chartGroup: 'Site Distribution'
  },
  {
    id: 29,
    name: 'site_addison',
    value: '2100000',
    calculation: 'Addison Site Value',
    sqlExpression: 'SELECT SUM(value) FROM inventory WHERE site = "Addison"',
    chartGroup: 'Site Distribution'
  },
  {
    id: 30,
    name: 'site_lake_city',
    value: '1375000',
    calculation: 'Lake City Site Value',
    sqlExpression: 'SELECT SUM(value) FROM inventory WHERE site = "Lake City"',
    chartGroup: 'Site Distribution'
  },

  // Top Products Online
  {
    id: 31,
    name: 'online_product_a',
    value: '1250000',
    calculation: 'Online Product A Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "online" AND product = "A"',
    chartGroup: 'Top Products Online'
  },
  {
    id: 32,
    name: 'online_product_b',
    value: '980000',
    calculation: 'Online Product B Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "online" AND product = "B"',
    chartGroup: 'Top Products Online'
  },
  {
    id: 33,
    name: 'online_product_c',
    value: '845000',
    calculation: 'Online Product C Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "online" AND product = "C"',
    chartGroup: 'Top Products Online'
  },
  {
    id: 34,
    name: 'online_product_d',
    value: '720000',
    calculation: 'Online Product D Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "online" AND product = "D"',
    chartGroup: 'Top Products Online'
  },
  {
    id: 35,
    name: 'online_product_e',
    value: '655000',
    calculation: 'Online Product E Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "online" AND product = "E"',
    chartGroup: 'Top Products Online'
  },

  // Top Products Inside
  {
    id: 36,
    name: 'inside_product_x',
    value: '1150000',
    calculation: 'Inside Product X Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "inside" AND product = "X"',
    chartGroup: 'Top Products Inside'
  },
  {
    id: 37,
    name: 'inside_product_y',
    value: '925000',
    calculation: 'Inside Product Y Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "inside" AND product = "Y"',
    chartGroup: 'Top Products Inside'
  },
  {
    id: 38,
    name: 'inside_product_z',
    value: '780000',
    calculation: 'Inside Product Z Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "inside" AND product = "Z"',
    chartGroup: 'Top Products Inside'
  },
  {
    id: 39,
    name: 'inside_product_w',
    value: '695000',
    calculation: 'Inside Product W Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "inside" AND product = "W"',
    chartGroup: 'Top Products Inside'
  },
  {
    id: 40,
    name: 'inside_product_v',
    value: '600000',
    calculation: 'Inside Product V Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "inside" AND product = "V"',
    chartGroup: 'Top Products Inside'
  },

  // Top Products Outside
  {
    id: 41,
    name: 'outside_product_1',
    value: '1450000',
    calculation: 'Outside Product 1 Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "outside" AND product = "1"',
    chartGroup: 'Top Products Outside'
  },
  {
    id: 42,
    name: 'outside_product_2',
    value: '1180000',
    calculation: 'Outside Product 2 Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "outside" AND product = "2"',
    chartGroup: 'Top Products Outside'
  },
  {
    id: 43,
    name: 'outside_product_3',
    value: '950000',
    calculation: 'Outside Product 3 Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "outside" AND product = "3"',
    chartGroup: 'Top Products Outside'
  },
  {
    id: 44,
    name: 'outside_product_4',
    value: '825000',
    calculation: 'Outside Product 4 Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "outside" AND product = "4"',
    chartGroup: 'Top Products Outside'
  },
  {
    id: 45,
    name: 'outside_product_5',
    value: '745000',
    calculation: 'Outside Product 5 Sales',
    sqlExpression: 'SELECT SUM(sales) FROM products WHERE channel = "outside" AND product = "5"',
    chartGroup: 'Top Products Outside'
  }
];