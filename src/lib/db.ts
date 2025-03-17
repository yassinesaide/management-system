import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute a query
export async function executeQuery<T>({ query, values = [] }: { query: string; values?: any[] }): Promise<T> {
  try {
    const [results] = await pool.execute(query, values);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

// Export the pool for direct use when needed
export { pool }; 