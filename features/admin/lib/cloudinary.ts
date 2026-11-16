type SignResponse = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

/** Sube un archivo directo del navegador a Cloudinary con firma del servidor. */
export async function uploadToCloudinary(file: File): Promise<string> {
  const signRes = await fetch("/api/admin/cloudinary/sign", { method: "POST" });
  if (!signRes.ok) {
    const { error } = await signRes.json().catch(() => ({ error: null }));
    throw new Error(error ?? "No se pudo firmar la subida");
  }
  const sign: SignResponse = await signRes.json();

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", sign.apiKey);
  body.append("timestamp", String(sign.timestamp));
  body.append("folder", sign.folder);
  body.append("signature", sign.signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
    { method: "POST", body },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message ?? "Error al subir la imagen");
  }
  return data.secure_url as string;
}

