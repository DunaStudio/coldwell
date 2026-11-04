import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const FOLDER = "coldwell/productos";

export async function POST() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary no está configurado" },
      { status: 500 },
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  // Los parámetros firmados van ordenados alfabéticamente.
  const toSign = `folder=${FOLDER}&timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder: FOLDER,
    signature,
  });
}
