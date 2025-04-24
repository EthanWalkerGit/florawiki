import express from 'express';
import { Pool } from 'pg';

const app = express();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected at: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send(`Database error: ${err.message}`);
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Docker + PostgreSQL Setup');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});