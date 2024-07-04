"use server";
import { sql } from "@vercel/postgres";

export async function Insert(values: any) {
  await sql`INSERT INTO users (username,notify) VALUES (${values.username},${values.type})`;
  for (const item of values.items) {
    await sql`INSERT INTO sidebar (username,sidebar) VALUES (${values.username},${item})`;
  }
}
