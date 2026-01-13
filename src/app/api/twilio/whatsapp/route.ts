import { NextResponse } from 'next/server';
import twilio from 'twilio';

export const runtime = 'nodejs';

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

async function generateMiralabReplyViaOpenAI(userText: string): Promise<string> {
  const apiKey = (process.env.OPENAI_API_KEY || '').trim();
  if (!apiKey) {
    return (
      "Hola! Soy el asistente de MIRALAB.\n\n" +
      'Puedo ayudarte con servicios como Desarrollo Web, E-commerce y SEO/Performance.\n' +
      'Contame que necesitas y te digo como lo encaramos.'
    );
  }

  const model = (process.env.OPENAI_MODEL || 'gpt-4.1-mini').trim();

  const clippedUserText = (userText || '').toString().slice(0, 1200);

  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input:
        'Sos un asistente comercial de MIRALAB (servicios de IT). ' +
        'Responde en espanol rioplatense, breve y claro (max 6 lineas). ' +
        'Hace 1-2 preguntas concretas para avanzar. ' +
        'Si el cliente pide info, responde con bullets cortos. ' +
        'Servicios: Desarrollo Web (Next.js), E-commerce, SEO/Performance. ' +
        `\n\nMensaje del cliente: ${clippedUserText}`,
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} ${t}`);
  }

  const json = (await res.json()) as any;
  const text =
    json?.output_text ||
    json?.output?.[0]?.content?.find((c: any) => c?.type === 'output_text')?.text ||
    '';

  return (text || '').toString().trim() || 'Hola! Soy el asistente de MIRALAB. En que te ayudo?';
}

function formatDebugError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  return raw.replace(/\s+/g, ' ').slice(0, 240);
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(req: Request) {
  // Twilio sends application/x-www-form-urlencoded
  const raw = await req.text();
  const params = new URLSearchParams(raw);

  const incomingMsg = (params.get('Body') || '').toString();
  const from = (params.get('From') || '').toString();

  // Basic routing
  const n = normalize(incomingMsg);

  const hasOpenAI = ((process.env.OPENAI_API_KEY || '').trim().length > 0);

  let reply: string;
  try {
    if (hasOpenAI) {
      // Prefer OpenAI for all messages when configured
      reply = await generateMiralabReplyViaOpenAI(incomingMsg);
    } else if (n === 'hola' || n === 'buenas' || n === 'buenos dias' || n === 'buenas tardes' || n === 'buenas noches') {
      reply = await generateMiralabReplyViaOpenAI(incomingMsg);
    } else if (n.includes('servicio') || n.includes('servicios')) {
      reply =
        'Servicios MIRALAB:\n' +
        '- Desarrollo Web (Next.js)\n' +
        '- E-commerce\n' +
        '- SEO / Performance\n\n' +
        'Cual te interesa?';
    } else if (n.includes('precio') || n.includes('presupuesto')) {
      reply =
        'Genial. Para pasarte un presupuesto: \n' +
        '1) Que necesitas (web/ecom/seo)?\n' +
        '2) Tenes ejemplo/sitios referencia?\n' +
        '3) Fecha objetivo?';
    } else {
      reply =
        `Recibi tu mensaje: "${incomingMsg}"\n\n` +
        "Escribi 'Hola' para que te atienda el asistente, o decime que necesitas.";
    }
  } catch (err) {
    console.error('twilio webhook error:', err);
    const debug = (process.env.TWILIO_DEBUG_ERRORS || '').trim() === '1';
    reply =
      (debug ? `DEBUG OpenAI: ${formatDebugError(err)}\n\n` : '') +
      'Hola! Soy el asistente de MIRALAB.\n\n' +
      'Ahora tuve un problema tecnico, pero puedo ayudarte igual: que necesitas (web/ecom/seo)?';
  }

  // Respond with TwiML so Twilio delivers the WhatsApp message
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
