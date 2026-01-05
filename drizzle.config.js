import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./src/configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
});
