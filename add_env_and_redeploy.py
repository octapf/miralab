import asyncio
import os
from dotenv import load_dotenv

load_dotenv('.env.local')
EMAIL_PASS_VALUE = os.getenv('EMAIL_PASS', '')

async def main():
    if not EMAIL_PASS_VALUE:
        raise RuntimeError("EMAIL_PASS no está configurado en .env.local")

    from browser_use import Agent
    
    agent = Agent(
        task=(
            "1. Ve a https://vercel.com/octapf/it-portfolio/settings/environment-variables\n"
            "2. Si hay que loguearse:\n"
            "   - Haz clic en 'Continue with Google'\n"
            "   - Selecciona frangipani.octavio@gmail.com\n"
            "3. Busca si existe la variable EMAIL_PASS\n"
            "4. Si EMAIL_PASS NO existe, agrégala:\n"
            "   - Haz clic en 'Add' o botón similar para agregar nueva variable\n"
            "   - Key: EMAIL_PASS\n"
            f"   - Value: {EMAIL_PASS_VALUE}\n"
            "   - Marca Production, Preview y Development (todos los checkboxes)\n"
            "   - Haz clic en Save\n"
            "5. Si EMAIL_PASS ya existe, haz clic en 'Edit' y verifica que:\n"
            f"   - El valor sea {EMAIL_PASS_VALUE}\n"
            "   - Esté marcado para Production\n"
            "6. Una vez confirmado que EMAIL_PASS existe con el valor correcto y está en Production, ve a https://vercel.com/octapf/it-portfolio\n"
            "7. Busca el deployment más reciente (el primero en la lista)\n"
            "8. Haz clic en los tres puntos (...) del deployment\n"
            "9. Haz clic en 'Redeploy'\n"
            "10. Si aparece un modal, confirma haciendo clic en 'Redeploy'\n"
            "11. Confirma que el nuevo deployment se inició correctamente"
        ),
        use_vision=True
    )
    
    result = await agent.run()
    print("Configuración y redeploy completados:", result)

if __name__ == "__main__":
    asyncio.run(main())
