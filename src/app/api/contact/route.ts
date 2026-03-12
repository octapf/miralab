import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { CONTACT_EMAIL } from '@/lib/constants';
import { withTimeout } from '@/lib/network';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp, getRequestId } from '@/lib/request';
import { contactPayloadSchema, escapeHtml } from '@/lib/validation';

const CONTACT_RATE_LIMIT = {
  limit: 8,
  windowMs: 60_000,
};

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);

  const limit = checkRateLimit({
    key: `contact:${clientIp}`,
    ...CONTACT_RATE_LIMIT,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta nuevamente en unos segundos.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  try {
    const parsed = contactPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError =
        fieldErrors.name?.[0] || fieldErrors.email?.[0] || fieldErrors.message?.[0] || null;
      const normalizedError =
        fieldErrors.email?.length
          ? 'Email invalido'
          : fieldErrors.message?.length
            ? 'El mensaje debe tener al menos 3 caracteres'
            : fieldErrors.name?.length
              ? 'El nombre debe tener al menos 2 caracteres'
              : null;
      return NextResponse.json(
        { error: normalizedError || firstError || 'Datos del formulario invalidos' },
        { status: 400 }
      );
    }
    const { name, email, message } = parsed.data;

    const user = process.env.EMAIL_USER?.trim();
    const pass = process.env.EMAIL_PASS?.trim();
    if (!user || !pass) {
      console.error('[contact] missing email credentials', { requestId });
      return NextResponse.json(
        { error: 'Servicio de email no configurado en el servidor' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: `"MIRALAB Website" <${user}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto de ${name} - MIRALAB`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #8B5CF6; margin-bottom: 20px;">Nuevo mensaje desde MIRALAB</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${safeName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 0; line-height: 1.6; color: #374151;">${safeMessage}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
              Este mensaje fue enviado desde el formulario de contacto de <strong>MIRALAB</strong>
            </p>
          </div>
        </div>
      `,
    };

    await withTimeout(transporter.sendMail(mailOptions), 10_000, 'SMTP timeout after 10000ms');

    return NextResponse.json(
      { success: true, message: 'Email enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[contact] send failed', { requestId, clientIp, error });
    return NextResponse.json({ error: 'Error al enviar el email' }, { status: 500 });
  }
}
