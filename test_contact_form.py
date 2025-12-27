import asyncio
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.local')

async def main():
    from browser_use import Agent
    
    # Crear el agente para probar el formulario de contacto
    agent = Agent(
        task=(
            "1. Ve a https://www.miralab.ar\n"
            "2. Scrollea hacia abajo hasta encontrar la sección de contacto con el formulario\n"
            "3. Busca el formulario que dice 'Escribinos un mail a hola@miralab.ar'\n"
            "4. Llena el formulario con estos datos de prueba:\n"
            "   - Nombre: Test Portfolio\n"
            "   - Email: test@example.com\n"
            "   - Mensaje: Este es un mensaje de prueba para verificar que el formulario funciona correctamente con Zoho Mail.\n"
            "5. Haz clic en el botón de enviar (puede decir 'Enviar', 'Send' o similar)\n"
            "6. Espera a que aparezca la respuesta (mensaje de éxito o error)\n"
            "7. Verifica que aparezca el mensaje de éxito con el ícono verde de check\n"
            "8. Si aparece un error, anota el mensaje de error exacto\n"
            "9. Confirma si el envío fue exitoso o falló"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Test del formulario completado:", result)

if __name__ == "__main__":
    asyncio.run(main())
