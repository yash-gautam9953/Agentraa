import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function POST(request: Request) {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Notion API credentials are not configured properly on the server." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { 
      businessName, 
      businessType, 
      teamSize, 
      challenge, 
      automation, 
      budget, 
      name, 
      email, 
      phone 
    } = body;

    const response = await notion.pages.create({
      parent: { database_id: databaseId as string },
      properties: {
        "Name": {
          title: [
            {
              text: {
                content: name || "Unknown Lead",
              },
            },
          ],
        },
        "Email": {
          email: email || null,
        },
        "Phone": {
          phone_number: phone || null,
        },
        "Business Name": {
          rich_text: [
            {
              text: {
                content: businessName || "",
              },
            },
          ],
        },
        "Industry": {
          rich_text: [
            {
              text: {
                content: businessType || "",
              },
            },
          ],
        },
        "Challenge": {
          rich_text: [
            {
              text: {
                content: challenge || "",
              },
            },
          ],
        },
        "Team Size": {
          select: teamSize ? { name: teamSize } : null,
        },
        "Project Type": {
          select: automation ? { name: automation } : null,
        },
        "Budget": {
          select: budget ? { name: budget } : null,
        },
      },
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Error connecting to Notion:", error);
    return NextResponse.json(
      { error: "Failed to submit form to Notion." },
      { status: 500 }
    );
  }
}
