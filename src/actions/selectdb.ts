"use server";
import { sql } from "@vercel/postgres";
export async function Select() {
  const { rows } = await sql`SELECT 
    u.username AS username,
    u.notify AS notify,
    STRING_AGG(s.sidebar, ', ' ORDER BY s.sidebar ASC) AS sidebar
FROM 
    users u
JOIN 
    sidebar s ON u.username = s.username
GROUP BY 
    u.username, u.notify;`;
  return rows;
}
