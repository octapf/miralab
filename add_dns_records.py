"""
Script para agregar registros DNS de Resend en Vercel usando Browser Use
"""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env.local
env_path = Path(__file__).parent / '.env.local'
load_dotenv(dotenv_path=env_path)

# Verificar que la API key esté cargada
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("ERROR: No se encontró OPENAI_API_KEY en .env.local")
    exit(1)

print(f"API Key cargada: {api_key[:10]}...")

# Configurar la variable de entorno para OpenAI
os.environ["OPENAI_API_KEY"] = api_key

# Cargar también la Browser Use API Key
browser_use_key = os.getenv("BROWSER_USE_API_KEY")
if browser_use_key:
    os.environ["BROWSER_USE_API_KEY"] = browser_use_key
    print(f"Browser Use API Key cargada: {browser_use_key[:10]}...")

# Registros DNS a agregar
DNS_RECORDS = [
    {
        "name": "resend._domainkey.mail",
        "type": "TXT",
        "value": "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDV/stJVTwrH2is0Kr1vYBkHIUQF3OT5MQTwny3Vsx3iystkp+eDZLhkarNhzIiXCSV+TaeksHyGnNswmTMhgXpjisICWX/iL7a9Mhcd8wzI7dSMBogDNUL4QvTqh01+ijLveT1x2vWvYOmCPDHCjS/FgFgpa9zgMQwRD8+ftLfjwIDAQAB",
        "ttl": "60",
        "comment": "Resend DKIM"
    },
    {
        "name": "send.mail",
        "type": "MX",
        "value": "feedback-smtp.sa-east-1.amazonses.com",
        "ttl": "60",
        "priority": "10",
        "comment": "Resend MX Send"
    },
    {
        "name": "send.mail",
        "type": "TXT",
        "value": "v=spf1 include:amazonses.com ~all",
        "ttl": "60",
        "comment": "Resend SPF"
    },
    {
        "name": "_dmarc.mail",
        "type": "TXT",
        "value": "v=DMARC1; p=none;",
        "ttl": "60",
        "comment": "Resend DMARC"
    },
    {
        "name": "mail",
        "type": "MX",
        "value": "inbound-smtp.sa-east-1.amazonaws.com",
        "ttl": "60",
        "priority": "10",
        "comment": "Resend MX Receive"
    }
]

async def main():
    from browser_use import Agent
    
    # Crear el agente con configuración mínima
    agent = Agent(
        task=(
            "PARTE 1 - AGREGAR REGISTROS DNS EN VERCEL:\n"
            "1. Ve a https://vercel.com/login\n"
            "2. Haz clic en el botón 'Continue with Google'\n"
            "3. Espera a que aparezca la lista de cuentas de Google guardadas\n"
            "4. Haz clic en la cuenta 'frangipani.octavio@gmail.com' o en cualquier cuenta disponible en la lista\n"
            "5. NO escribas contraseña - solo haz clic en la cuenta para autocompletar el login\n"
            "6. Espera a que se complete el login automáticamente\n"
            "7. Una vez logueado, ve a https://vercel.com/octapf/it-portfolio/settings/domains\n"
            "8. Busca la sección 'DNS Records' para miralab.ar\n"
            "9. Agrega estos 5 registros DNS uno por uno:\n\n"
            f"{format_dns_records()}\n\n"
            "Para cada registro:\n"
            "- Haz clic en el botón para agregar un nuevo registro DNS\n"
            "- Completa Name, Type, Value, TTL (60) y Priority si es MX\n"
            "- Haz clic en Add o Save\n"
            "- Continúa con el siguiente registro hasta completar los 5\n\n"
            "PARTE 2 - VERIFICAR DOMINIO EN RESEND:\n"
            "10. Ve a https://resend.com/login\n"
            "11. Haz clic en 'Continue with Google'\n"
            "12. Selecciona la misma cuenta de Google (frangipani.octavio@gmail.com)\n"
            "13. Una vez logueado, ve a https://resend.com/domains\n"
            "14. Busca el dominio 'mail.miralab.ar' en la lista\n"
            "15. Haz clic en el botón 'Verify' o 'Verify DNS' junto a ese dominio\n"
            "16. Espera a que aparezca la confirmación de verificación exitosa"
        ),
        use_vision=True
    )
    
    # Ejecutar el agente
    result = await agent.run()
    print("Tarea completada:", result)

def format_dns_records():
    """Formatea los registros DNS para mostrarlos al agente"""
    formatted = []
    for i, record in enumerate(DNS_RECORDS, 1):
        formatted.append(f"Registro {i}:")
        formatted.append(f"  Name: {record['name']}")
        formatted.append(f"  Type: {record['type']}")
        formatted.append(f"  Value: {record['value']}")
        formatted.append(f"  TTL: {record['ttl']}")
        if 'priority' in record:
            formatted.append(f"  Priority: {record['priority']}")
        formatted.append(f"  Comment: {record['comment']}")
        formatted.append("")
    return "\n".join(formatted)

if __name__ == "__main__":
    asyncio.run(main())
