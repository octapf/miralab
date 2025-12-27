import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    # Crear el agente para verificar las variables de entorno en Vercel
    agent = Agent(
        task=(
            "1. Ve a https://vercel.com/login\n"
            "2. Haz clic en 'Continue with Google'\n"
            "3. Selecciona la cuenta frangipani.octavio@gmail.com\n"
            "4. Ve a https://vercel.com/octapf/it-portfolio/settings/environment-variables\n"
            "5. Verifica que existan estas dos variables:\n"
            "   - EMAIL_USER con valor hola@miralab.ar\n"
            "   - EMAIL_PASS con el valor de la contraseña\n"
            "6. Si alguna variable NO existe, agrégala nuevamente:\n"
            "   Para EMAIL_USER:\n"
            "   - Key: EMAIL_USER\n"
            "   - Value: hola@miralab.ar\n"
            "   - Marca Production, Preview y Development\n"
            "   - Save\n"
            "   Para EMAIL_PASS:\n"
            "   - Key: EMAIL_PASS\n"
            "   - Lee el archivo zoho_app_password.txt y usa ese valor\n"
            "   - Marca Production, Preview y Development\n"
            "   - Save\n"
            "7. Si las variables ya existen, verifica que estén marcadas para Production\n"
            "8. Confirma que ambas variables estén guardadas correctamente"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Verificación completada:", result)

if __name__ == "__main__":
    asyncio.run(main())
