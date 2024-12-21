import { createClient } from '@libsql/client';

// Create a client with an in-memory database
const db = createClient({
  url: 'file:dashboard?mode=memory&cache=shared',
});

// Initialize schema and data
async function initializeDatabase() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS dashboard_variables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value TEXT,
        calculation TEXT,
        sql_expression TEXT,
        chart_group TEXT
      )
    `);

    // Check if data exists
    const existing = await db.execute('SELECT COUNT(*) as count FROM dashboard_variables');
    if (existing.rows[0].count === 0) {
      // Insert initial data
      await db.execute(`
        INSERT INTO dashboard_variables (name, value, calculation, sql_expression, chart_group)
        VALUES 
          ('total_orders', '12847', 'total_orders', 'SELECT COUNT(*) FROM orders', 'Metrics'),
          ('open_orders', '1563', 'open_orders', 'SELECT COUNT(*) FROM orders WHERE status = "open"', 'Metrics'),
          ('in_process', '892', 'in_process', 'SELECT COUNT(*) FROM orders WHERE status = "processing"', 'Metrics'),
          ('weekly_revenue', '1924500', 'weekly_revenue', 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-7 days")', 'Metrics'),
          ('open_invoices', '3842650', 'open_invoices', 'SELECT SUM(amount) FROM invoices WHERE status = "open"', 'Metrics'),
          ('orders_backlogged', '743', 'orders_backlogged', 'SELECT COUNT(*) FROM orders WHERE status = "backlogged"', 'Metrics'),
          ('total_sales_monthly', '8325000', 'total_sales_monthly', 'SELECT SUM(amount) FROM orders WHERE date >= date("now", "-30 days")', 'Metrics')
      `);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

// Initialize the database
initializeDatabase();

export { db };