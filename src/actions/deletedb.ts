"use server";
import { sql } from "@vercel/postgres";
export async function Delete(username: string) {
  await sql`DELETE FROM users WHERE username = ${username}`;
  await sql`DELETE FROM sidebar WHERE username = ${username}`;
  return "User deleted successfully!";
}
