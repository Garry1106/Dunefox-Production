import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
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

    const exactName = await decodeURIComponent( params.name);
    const apiUrl = new URL(
      `https://graph.facebook.com/${API_VERSION}/${WABA_ID}/message_templates`
    );

    // Search by name without status filter
    apiUrl.searchParams.append('name', exactName);
    apiUrl.searchParams.append('limit', '10');

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { 
          error: "WhatsApp API error",
          details: errorData.error || errorData.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data)) {
      return NextResponse.json(
        { error: "Invalid response format from WhatsApp API" },
        { status: 500 }
      );
    }

    // Find exact match with any status
    const exactMatch = result.data.find(
      (template: any) => template.name === exactName
    );

    if (!exactMatch) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      data: {
        ...exactMatch,
        // Explicitly show status in response
        status: exactMatch.status
      }
    });
  } catch (error) {
    console.error("Template details fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch template details" },
      { status: 500 }
    );
  }
}