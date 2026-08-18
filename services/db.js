import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool();

db.connect(async (err, client, release) => {
  if (err) {
    console.error('Connection error:', err.stack);
    return;
  }

  try {
    console.log('Connected to PostgreSQL database');

    const initQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        status VARCHAR(50) NOT NULL DEFAULT 'To Read',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(initQuery);
    console.log('Table initialized successfully');
  } catch (err) {
    console.error('Initialization error:', err.message);
  } finally {
    release();
  }
});

export default db;