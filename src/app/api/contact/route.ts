import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  objectType: z.string(),
  city: z.string(),
  area: z.string(),
  service: z.string(),
  schedule: z.string(),
  task: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  comment: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: Connect Bitrix24 webhook through process.env.BITRIX24_WEBHOOK_URL.
  // Recommended payload: contact fields, service, city, area, schedule, task, page URL and UTM tags.
  if (process.env.BITRIX24_WEBHOOK_URL) {
    await fetch(process.env.BITRIX24_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
  }

  return NextResponse.json({ ok: true });
}
