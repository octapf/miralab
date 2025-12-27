import asyncio
import os
from dotenv import load_dotenv

load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    agent = Agent(
        task=(
            "1. Ve a https://mail.zoho.com/zm/\n"
            "2. Haz clic en 'Sign in with Google' o 'Continue with Google'\n"
            "3. Selecciona frangipani.octavio@gmail.com\n"
            "4. Una vez logueado, ve a https://mail.zoho.com/zm/#settings/mailaccounts/\n"
            "5. En la sección 'Primary Account', busca el apartado de configuración SMTP\n"
            "6. Haz clic en 'SMTP' o 'Outgoing/SMTP' para ver los detalles del servidor\n"
            "7. Anota EXACTAMENTE:\n"
            "   - SMTP Server (ejemplo: smtp.zoho.com, smtppro.zoho.com, smtp.zoho.eu, etc.)\n"
            "   - Port (ejemplo: 465, 587, etc.)\n"
            "   - Security type (SSL, TLS, STARTTLS)\n"
            "8. También verifica si necesitas una Application-Specific Password\n"
            "9. Si aparece alguna advertencia o nota sobre usar contraseñas de aplicación, anótala\n"
            "10. Reporta TODOS los detalles encontrados"
        ),
        use_vision=True
    )
    
    result = await agent.run()
    print("Detalles del servidor SMTP de Zoho:", result)

if __name__ == "__main__":
    asyncio.run(main())
