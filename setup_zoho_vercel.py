import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    # Crear el agente para configurar Zoho y Vercel
    agent = Agent(
        task=(
            "PARTE 1 - GENERAR CONTRASEÑA DE APLICACIÓN EN ZOHO:\n"
            "1. Ve a https://accounts.zoho.com/signin\n"
            "2. Haz clic en 'Continue with Google'\n"
            "3. Selecciona la cuenta frangipani.octavio@gmail.com\n"
            "4. Una vez logueado, ve a https://accounts.zoho.com/home#security/app-passwords\n"
            "5. Haz clic en el botón 'Generate New Password' o similar\n"
            "6. En el nombre, escribe: 'Vercel Portfolio'\n"
            "7. Haz clic en 'Generate' o 'Create'\n"
            "8. IMPORTANTE: Copia la contraseña de 16 caracteres que aparece (guárdala en un lugar seguro)\n"
            "9. Anota o recuerda esta contraseña para el siguiente paso\n\n"
            "PARTE 2 - AGREGAR VARIABLES DE ENTORNO EN VERCEL:\n"
            "10. Ve a https://vercel.com/login\n"
            "11. Haz clic en 'Continue with Google'\n"
            "12. Selecciona la misma cuenta de Google\n"
            "13. Ve a https://vercel.com/octapf/it-portfolio/settings/environment-variables\n"
            "14. Agrega la primera variable:\n"
            "    - Key: EMAIL_USER\n"
            "    - Value: hola@miralab.ar\n"
            "    - Marca todos los entornos (Production, Preview, Development)\n"
            "    - Haz clic en 'Save'\n"
            "15. Agrega la segunda variable:\n"
            "    - Key: EMAIL_PASS\n"
            "    - Value: (pega la contraseña de 16 caracteres que copiaste de Zoho en el paso 8)\n"
            "    - Marca todos los entornos (Production, Preview, Development)\n"
            "    - Haz clic en 'Save'\n"
            "16. Confirma que ambas variables se hayan guardado correctamente"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Configuración completada:", result)

if __name__ == "__main__":
    asyncio.run(main())
