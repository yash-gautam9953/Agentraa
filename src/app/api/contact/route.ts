import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact-validation";
import {
  buildRateLimitHeaders,
  createContactRateLimiter,
  getClientIp,
} from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/bot-protection";

const MAX_CONTENT_LENGTH_BYTES = 16_384; // 16 KB

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported content type. Expected application/json." },
        { status: 415 }
      );
    }

    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number(contentLengthHeader);
      if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH_BYTES) {
        return NextResponse.json(
          { error: "Request payload too large." },
          { status: 413 }
        );
      }
    }

    let rawBody: unknown;
    try {
      const rawText = await request.text();
      if (Buffer.byteLength(rawText, "utf8") > MAX_CONTENT_LENGTH_BYTES) {
        return NextResponse.json(
          { error: "Request payload too large." },
          { status: 413 }
        );
      }
      rawBody = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Malformed JSON payload." },
        { status: 400 }
      );
    }

    const validation = validateContactPayload(rawBody);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const data = validation.data;

    // Honeypot check: bots often fill hidden fields like "website"
    if (data.website.length > 0) {
      return NextResponse.json(
        { error: "Submission rejected." },
        { status: 400 }
      );
    }

    const clientIp = getClientIp(request);
    const rateLimiter = createContactRateLimiter();
    let rateLimitHeaders: Record<string, string> = {};

    try {
      const rateLimit = await rateLimiter.check(clientIp);
      rateLimitHeaders = buildRateLimitHeaders(rateLimit);

      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429, headers: rateLimitHeaders }
        );
      }
    } catch {
      console.error("Contact rate-limiter check failed.");
      rateLimitHeaders = { "X-RateLimit-Status": "error-bypassed" };
    }

    const turnstile = await verifyTurnstileToken(data.turnstileToken, clientIp);
    if (!turnstile.ok) {
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const notionApiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!notionApiKey || !databaseId) {
      return NextResponse.json(
        { error: "Contact service is not configured on the server." },
        { status: 500, headers: rateLimitHeaders }
      );
    }

    const notion = new Client({ auth: notionApiKey });

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Phone: {
          phone_number: data.phone || null,
        },
        "Business Name": {
          rich_text: [
            {
              text: {
                content: data.businessName,
              },
            },
          ],
        },
        Industry: {
          rich_text: [
            {
              text: {
                content: data.businessType,
              },
            },
          ],
        },
        Challenge: {
          rich_text: [
            {
              text: {
                content: data.challenge,
              },
            },
          ],
        },
        "Team Size": {
          select: data.teamSize ? { name: data.teamSize } : null,
        },
        "Project Type": {
          select: data.automation ? { name: data.automation } : null,
        },
        Budget: {
          select: data.budget ? { name: data.budget } : null,
        },
      },
    });

    return NextResponse.json(
      { success: true, id: response.id },
      { status: 200, headers: rateLimitHeaders }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error submitting contact form to Notion:", message);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}
