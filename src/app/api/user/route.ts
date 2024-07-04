"use server";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { put } from "@vercel/blob";

export async function GET(request: Request) {
  const { rows } = await sql`SELECT 
    u.username AS username,
    u.notify AS notify,
    u.profile_url as ProfilePict,
    STRING_AGG(s.sidebar, ', ' ORDER BY s.sidebar ASC) AS sidebar
    
FROM 
    users u
JOIN 
    sidebar s ON u.username = s.username
GROUP BY 
    u.username, u.notify,u.profile_url;`;
  const test = [
    {
      a: 0,
      b: 1,
    },
  ];
  return NextResponse.json(rows, {
    status: 200,
  });
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const updatedUser = formData.get("updatedUser");
  const type = formData.get("type");
  const items = formData.get("items");
  if (
    typeof updatedUser !== "string" ||
    typeof type !== "string" ||
    typeof items !== "string"
  ) {
    throw new Error("Invalid");
  }

  const { rows } =
    await sql`SELECT * FROM users where username = ${updatedUser}`;
  if (rows.length === 0) {
    return Response.json({ message: "Username not found" }, { status: 404 });
  }
  await sql`UPDATE users SET notify = ${type} WHERE username = ${updatedUser}`;
  await sql`DELETE FROM sidebar WHERE username = ${updatedUser}`;
  for (const item of items.split(",")) {
    await sql`INSERT INTO sidebar (username, sidebar) VALUES (${updatedUser}, ${item})`;
  }
  return Response.json(
    { message: "User updated successfully!" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username");
  const type = formData.get("type");
  const items = formData.get("items");
  const file = formData.get("file") as File;
  const allowedTypes = ["image/png", "image/jpeg"];
  if (
    typeof username !== "string" ||
    typeof type !== "string" ||
    typeof items !== "string"
  ) {
    throw new Error("Invalid");
  }

  if (!allowedTypes.includes(file.type)) {
    return Response.json(
      { error: "Unsupported file type. Supported file type: jpeg and png" },
      { status: 400 }
    );
  }
  if (file.size > 1024 * 1024) {
    return Response.json(
      { error: "File size is too large. Max file size is 1MB" },
      { status: 400 }
    );
  }
  const blob = await put(file.name, file, { access: "public" });
  const url = blob.url;
  await sql`INSERT INTO users (username,notify,profile_url) VALUES (${username},${type},${url})`;
  for (const item of items.split(",")) {
    await sql`INSERT INTO sidebar (username,sidebar) VALUES (${username},${item})`;
  }
  return Response.json(
    { message: "User created successfully!" },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username");
  if (typeof username !== "string") {
    throw new Error("Invalid username");
  }
  await sql`DELETE FROM users WHERE username = ${username}`;
  await sql`DELETE FROM sidebar WHERE username = ${username}`;
  return Response.json(
    { message: "User updated successfully!" },
    { status: 200 }
  );
}
