import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validar datos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'MIRALAB Website <onboarding@resend.dev>', // Cambiarás esto cuando verifiques tu dominio
      to: ['hola@miralab.ar'],
      replyTo: email,
      subject: `Nuevo contacto de ${name} - MIRALAB`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #8B5CF6; margin-bottom: 20px;">Nuevo mensaje desde MIRALAB</h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0;"><strong>Mensaje:</strong></p>
              <p style="margin: 0; line-height: 1.6; color: #374151;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
              Este mensaje fue enviado desde el formulario de contacto de <strong>MIRALAB</strong>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email enviado correctamente', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error general:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
