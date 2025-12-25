import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    # Crear el agente para verificar el dominio en Resend
    agent = Agent(
        task=(
            "1. Ve a https://resend.com/login\n"
            "2. Haz clic en el botón 'Continue with Google'\n"
            "3. Espera a que aparezca la lista de cuentas de Google guardadas\n"
            "4. Haz clic en la cuenta 'frangipani.octavio@gmail.com' o en cualquier cuenta disponible\n"
            "5. NO escribas contraseña - solo haz clic en la cuenta para autocompletar el login\n"
            "6. Espera a que se complete el login automáticamente\n"
            "7. Una vez logueado, ve a https://resend.com/domains\n"
            "8. Busca el dominio 'mail.miralab.ar' en la lista de dominios\n"
            "9. Haz clic en el botón 'Verify' o 'Verify DNS' junto al dominio mail.miralab.ar\n"
            "10. Espera a que aparezca la confirmación de verificación exitosa\n"
            "11. Si dice que los DNS aún no se propagaron, espera 30 segundos y vuelve a intentar\n"
            "12. Confirma que el dominio ahora tiene un estado 'Verified' o similar"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Verificación completada:", result)

if __name__ == "__main__":
    asyncio.run(main())
