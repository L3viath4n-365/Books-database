import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Render requires SSL for PostgreSQL connections in production
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initDB = async () => {
  let client;
  try {
    client = await db.connect();
    console.log('Connected to PostgreSQL database');

    const initQuery = `
      DROP TABLE items;
      
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";

      CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        status VARCHAR(50) NOT NULL DEFAULT 'To Read',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE books ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `;

    await client.query(initQuery);
    console.log('Table initialized successfully');
  } catch (err) {
    console.error('Initialization error:', err.message);
  } finally {
    if (client) client.release();
  }
};

initDB();

export default db;