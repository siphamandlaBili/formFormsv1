import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./src/configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0yZE6HjBIcTh@ep-ancient-sound-ah54u9nl-pooler.c-3.us-east-1.aws.neon.tech/form-forms?sslmode=require&channel_binding=require'
  }
});
