import { NextResponse } from 'next/server';

const GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';

type WhatsAppWebhook = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from?: string;
          id?: string;
          timestamp?: string;
          type?: string;
          text?: { body?: string };
          interactive?: {
            type?: 'button_reply' | 'list_reply';
            button_reply?: { id?: string; title?: string };
            list_reply?: { id?: string; title?: string; description?: string };
          };
        }>;
      };
    }>;
  }>;
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function getEnvOptional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value : undefined;
}

function extractInboundText(payload: WhatsAppWebhook): { from: string; text: string } | null {
  const message = payload.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  const from = message?.from?.trim();

  // Text message
  const text = message?.text?.body?.trim();
  if (from && text) return { from, text };

  // Interactive replies (button/list)
  const buttonId = message?.interactive?.button_reply?.id?.trim();
  const buttonTitle = message?.interactive?.button_reply?.title?.trim();
  if (from && (buttonId || buttonTitle)) return { from, text: buttonId || buttonTitle || '' };

  const listId = message?.interactive?.list_reply?.id?.trim();
  const listTitle = message?.interactive?.list_reply?.title?.trim();
  if (from && (listId || listTitle)) return { from, text: listId || listTitle || '' };

  return null;
}

async function sendWhatsAppMessage(params: {
  to: string;
  message:
    | { type: 'text'; text: { body: string } }
    | {
        type: 'interactive';
        interactive:
          | {
              type: 'button';
              body: { text: string };
              action: {
                buttons: Array<{
                  type: 'reply';
                  reply: { id: string; title: string };
                }>;
              };
            }
          | {
              type: 'list';
              body: { text: string };
              action: {
                button: string;
                sections: Array<{
                  title: string;
                  rows: Array<{ id: string; title: string; description?: string }>;
                }>;
              };
            };
      };
}) {
  const dryRun = (process.env.WHATSAPP_DRY_RUN || '').toLowerCase() === '1';
  const token = getEnvOptional('WHATSAPP_ACCESS_TOKEN');
  const phoneNumberId = getEnvOptional('WHATSAPP_PHONE_NUMBER_ID');

  if (dryRun || !token || !phoneNumberId) {
    console.warn(
      '[whatsapp] DRY_RUN / missing env vars; skipping send. ' +
        `Need WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID. To=${params.to}`
    );
    return;
  }

  const res = await fetch(`${GRAPH_API_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: params.to,
      ...params.message,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`WhatsApp send failed: ${res.status} ${res.statusText} ${body}`);
  }
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

export async function GET(req: Request) {
  // Meta verifica tu webhook con estos query params
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token && challenge) {
    if (token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return new NextResponse(challenge, { status: 200 });
    }
    return new NextResponse('Forbidden', { status: 403 });
  }

  return new NextResponse('OK', { status: 200 });
}

export async function POST(req: Request) {
  // Responder rápido (200) es ideal, pero también necesitamos enviar el reply.
  // Este handler está diseñado para contestar en <10s (Vercel serverless).
  let payload: WhatsAppWebhook;
  try {
    payload = (await req.json()) as WhatsAppWebhook;
  } catch {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const inbound = extractInboundText(payload);
  if (!inbound) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const text = normalize(inbound.text);

  try {
    if (text === 'hola' || text === 'buenas' || text === 'buenos dias' || text === 'buenas tardes' || text === 'buenas noches') {
      await sendWhatsAppMessage({
        to: inbound.from,
        message: {
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: '¡Hola! Soy el asistente de MIRALAB. ¿En qué te ayudo?' },
            action: {
              buttons: [
                { type: 'reply', reply: { id: 'services', title: 'Servicios' } },
                { type: 'reply', reply: { id: 'pricing', title: 'Presupuesto' } },
                { type: 'reply', reply: { id: 'human', title: 'Hablar con humano' } },
              ],
            },
          },
        },
      });

      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (text.includes('servicio') || text === 'services') {
      await sendWhatsAppMessage({
        to: inbound.from,
        message: {
          type: 'interactive',
          interactive: {
            type: 'list',
            body: { text: 'Estos son algunos servicios. Elegí una opción:' },
            action: {
              button: 'Ver opciones',
              sections: [
                {
                  title: 'MIRALAB',
                  rows: [
                    { id: 'web', title: 'Desarrollo Web', description: 'Sitios y apps en Next.js' },
                    { id: 'ecom', title: 'E-commerce', description: 'Tiendas y pasarelas de pago' },
                    { id: 'seo', title: 'SEO / Performance', description: 'Velocidad y posicionamiento' },
                  ],
                },
              ],
            },
          },
        },
      });
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // fallback
    await sendWhatsAppMessage({
      to: inbound.from,
      message: {
        type: 'text',
        text: {
          body:
            "Te leo 🙂\n\nEscribí 'hola' para ver un menú, o contame brevemente qué necesitás y te respondo.",
        },
      },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    // Siempre devolver 200 para que Meta no reintente en loop.
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
