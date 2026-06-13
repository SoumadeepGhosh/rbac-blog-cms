import { NextRequest, NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File is required",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "rbac-blog/posts",
          },
          (error, result) => {
            if (error) reject(error);

            resolve(result);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,

      data: {
        publicId: uploadResult.public_id,

        url: uploadResult.secure_url,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image",
      },
      {
        status: 500,
      },
    );
  }
}
