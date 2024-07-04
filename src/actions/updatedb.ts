"use server";
import { sql } from "@vercel/postgres";
export async function Update(values: any) {
  const { rows } =
    await sql`SELECT * FROM users where username = ${values.updatedUser}`;
  if (rows.length === 0) {
    return null;
  }
  await sql`UPDATE users SET notify = ${values.type} WHERE username = ${values.updatedUser}`;
  await sql`DELETE FROM sidebar WHERE username = ${values.updatedUser}`;
  for (const item of values.items) {
    await sql`INSERT INTO sidebar (username, sidebar) VALUES (${values.updatedUser}, ${item})`;
  }
}
