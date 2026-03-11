import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  if (!cloudinary.config().cloud_name) {
    return NextResponse.json(
      { error: "Cloudinary no está configurado en el servidor." },
      { status: 500 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string | null) ?? "kali-blog";

  if (!file) {
    return NextResponse.json(
      { error: "Falta el archivo" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const res = await cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          throw error ?? new Error("Error subiendo imagen a Cloudinary");
        }
      }
    );
  } catch (err) {
    // Fallback a upload clásico si upload_stream no se usó correctamente
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      { folder, resource_type: "image" }
    );

    return NextResponse.json(
      { url: result.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Error subiendo imagen" },
      { status: 500 }
    );
  }
}

