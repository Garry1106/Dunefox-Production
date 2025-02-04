import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_VERSION = process.env.WHATSAPP_API_VERSION;
    const WABA_ID = process.env.WHATSAPP_WABA_ID;
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!API_VERSION || !WABA_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Missing WhatsApp API configuration" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${WABA_ID}/message_templates`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "WhatsApp API error", details: data },
        { status: response.status }
      );
    }

    if (!data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: "Invalid response format from WhatsApp API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data.data });
  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const API_VERSION = process.env.WHATSAPP_API_VERSION;
    const WABA_ID = process.env.WHATSAPP_WABA_ID;
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!API_VERSION || !WABA_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Missing WhatsApp API configuration" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const templateName = searchParams.get("name");

    if (!templateName) {
      return NextResponse.json(
        { error: "Template name is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${WABA_ID}/message_templates?name=${encodeURIComponent(
        templateName
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "WhatsApp API error", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Template delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const API_VERSION = process.env.WHATSAPP_API_VERSION;
    const WABA_ID = process.env.WHATSAPP_WABA_ID;
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

    // Check if required environment variables are set
    if (!API_VERSION || !WABA_ID || !ACCESS_TOKEN) {
      console.error("Missing WhatsApp API configuration");
      return NextResponse.json(
        { error: "Missing WhatsApp API configuration" },
        { status: 500 }
      );
    }

    // Parse the incoming request payload
    const payload = await request.json();

    // Log the payload being sent to the WhatsApp API
    console.log(
      "Incoming Payload from Frontend:",
      JSON.stringify(payload, null, 2)
    );

    // Make the request to the WhatsApp API
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${WABA_ID}/message_templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    // Parse the response from the WhatsApp API
    const data = await response.json();

    // Log the full response from the WhatsApp API
    console.log("WhatsApp API Response:", JSON.stringify(data, null, 2));

    // Handle non-OK responses
    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      return NextResponse.json(
        {
          error: "WhatsApp API error",
          details: data.error || data,
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Template submission error:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        error: "Failed to submit template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
