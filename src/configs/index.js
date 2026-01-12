import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// For build time, allow missing env vars
let db;

try {
  const databaseUrl = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;
  
  if (databaseUrl) {
    const sql = neon(databaseUrl);
    db = drizzle({ client: sql, schema });
  } else {
    console.warn('Database URL not found in environment variables');
    db = null;
  }
} catch (error) {
  console.warn('Database connection failed:', error.message);
  db = null;
}

export { db };