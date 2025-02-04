import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data"; // Properly using FormData

import path from "path";
import os from "os";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "File and fileName are required" },
        { status: 400 }
      );
    }

    // Use the system's default temporary directory
    const tmpDir = os.tmpdir();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = path.join(tmpDir, sanitizedFileName);

    // Write the file to the temporary directory
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Step 1: Fetch access token
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Facebook client ID or secret is missing.");
    }

    const tokenResponse = await axios.get(
      "https://graph.facebook.com/oauth/access_token",
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log("Access token:", accessToken);

    // Step 2: Create upload session
    const uploadRequestData = new FormData();
    uploadRequestData.append("file_name", sanitizedFileName);
    uploadRequestData.append("file_length", file.size.toString());
    uploadRequestData.append("file_type", file.type);

    const uploadSessionResponse = await axios.post(
      `https://graph.facebook.com/v22.0/${process.env.FACEBOOK_CLIENT_ID}/uploads?access_token=${process.env.WHATSAPP_ACCESS_TOKEN}`,
      uploadRequestData,
      {
        headers: {
          ...uploadRequestData.getHeaders(), // Dynamic headers from FormData
        },
      }
    );

    const uploadSessionId = uploadSessionResponse.data?.id;
    console.log("Upload session ID:", uploadSessionId);

    if (!uploadSessionId) {
      throw new Error("Upload session ID not found in response.");
    }

    // Step 3: Upload file data
    const headers = {
      Authorization: `OAuth ${accessToken}`,
      file_offset: "0", // Starting byte offset
      "Content-Type": file.type, // MIME type (e.g., "image/jpeg")
      "Content-Length": file.size, // Total file size in bytes
    };

    // Read the file as a stream (better for large files)
    const fileStream = fs.createReadStream(filePath);

    const uploadResponse = await axios.post(
      `https://graph.facebook.com/v22.0/${uploadSessionId}`,
      fileStream, // Send the file stream directly as binary data
      {
        headers: headers,
      }
    );

    console.log("Upload response:", uploadResponse.data.h);

    fs.unlinkSync(filePath);
    return NextResponse.json({ responseData: uploadResponse.data.h });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error uploading file:", error);
    }
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
