import { put } from "@vercel/blob";
export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;
  const allowedTypes = ["image/png", "image/jpeg"];
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
  const url = new URL(blob.url);
  return Response.json(blob);
}
