import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For development without database, use in-memory storage
// In production, ensure DATABASE_URL is provided
let db: any = null;
let pool: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
} else {
  // Mock database for development
  console.log("Warning: Running without database. Using in-memory storage for development.");
  db = {
    query: {
      users: {
        findFirst: () => Promise.resolve(null),
        findMany: () => Promise.resolve([]),
      }
    },
    insert: () => ({
      values: () => ({
        returning: () => Promise.resolve([])
      })
    }),
    select: () => ({
      from: () => Promise.resolve([])
    })
  };
}

export { pool, db };
