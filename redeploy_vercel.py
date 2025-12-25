import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    # Crear el agente para hacer redeploy en Vercel
    agent = Agent(
        task=(
            "1. Ve a https://vercel.com/login\n"
            "2. Haz clic en el botón 'Continue with Google'\n"
            "3. Espera a que aparezca la lista de cuentas de Google guardadas\n"
            "4. Haz clic en la cuenta 'frangipani.octavio@gmail.com' o en cualquier cuenta disponible\n"
            "5. NO escribas contraseña - solo haz clic en la cuenta para autocompletar el login\n"
            "6. Espera a que se complete el login automáticamente\n"
            "7. Ve a https://vercel.com/octapf/it-portfolio\n"
            "8. Busca el deployment más reciente que tiene estado 'Error' o 'Failed' (con error rojo)\n"
            "9. Haz clic en los tres puntos (...) o en el menú de opciones de ese deployment\n"
            "10. Haz clic en la opción 'Redeploy' o 'Redeploy with existing Build Cache'\n"
            "11. Si aparece un modal de confirmación, haz clic en 'Redeploy' para confirmar\n"
            "12. Espera a que se inicie el nuevo deployment\n"
            "13. Confirma que el nuevo deployment está en estado 'Building' o 'Ready'"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Redeploy completado:", result)

if __name__ == "__main__":
    asyncio.run(main())
