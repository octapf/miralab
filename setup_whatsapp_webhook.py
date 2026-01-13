import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno locales si existen
load_dotenv('.env.local')


async def main():
    from browser_use import Agent, Browser

    meta_login_email = os.getenv('META_LOGIN_EMAIL', 'frangipani.octavio@gmail.com').strip()

    browser = Browser(
        headless=False,
        window_size={
            'width': int(os.getenv('BROWSER_WIDTH', '1200')),
            'height': int(os.getenv('BROWSER_HEIGHT', '800')),
        },
    )

    await browser.start()
    try:
        await browser.new_page('https://developers.facebook.com/apps/')
        print('\n=== LOGIN MANUAL REQUERIDO (META) ===')
        print(f'Email sugerido: {meta_login_email}')
        print('1) Iniciá sesión en la ventana del navegador (password/2FA).')
        print('2) Si te aparece /account_status/error, el bloqueo es de cuenta y no se puede seguir automáticamente.')
        manual_wait_seconds = int(os.getenv('MANUAL_LOGIN_WAIT_SECONDS', '120'))
        print(f'3) Tenés {manual_wait_seconds}s para completar el login. (Configurable con MANUAL_LOGIN_WAIT_SECONDS)')
        await asyncio.sleep(manual_wait_seconds)

        task = (
            "OBJETIVO: Configurar WhatsApp Cloud API (Meta) + variables en Vercel para el webhook /api/whatsapp.\n\n"
            "REGLAS IMPORTANTES:\n"
            "- NO escribas archivos (no crear todo.md, etc.).\n"
            "- Si Meta muestra /account_status/error, informar que es un bloqueo de cuenta y detenerse ahí.\n\n"
            "META (WhatsApp Cloud API):\n"
            "1) Ir a https://developers.facebook.com/apps/\n"
            "2) Abrir la app que tenga WhatsApp Cloud API.\n"
            "3) Ir a WhatsApp -> Configuration -> Webhooks.\n"
            "4) Setear Callback URL: https://miralab.ar/api/whatsapp\n"
            "5) Setear Verify Token: (crear uno)\n"
            "6) Verificar webhook y subscribir 'messages'.\n"
            "7) Copiar Phone Number ID y Access Token (sin pegar en el chat).\n\n"
            "VERCEL:\n"
            "8) Ir a https://vercel.com/login (si pide login, completarlo manualmente).\n"
            "9) Ir a env vars del proyecto it-portfolio y crear:\n"
            "   WHATSAPP_VERIFY_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN (Production/Preview/Development).\n"
            "10) Check: abrir /api/whatsapp con hub.challenge y verificar respuesta.\n"
        )

        agent = Agent(task=task, browser=browser, use_vision=False)
        result = await asyncio.wait_for(agent.run(), timeout=900)
        print('Resultado:', result)
    finally:
        await browser.stop()


if __name__ == '__main__':
    asyncio.run(main())
