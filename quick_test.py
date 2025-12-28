import requests
import json

# Test directo a la API
url = "https://www.miralab.ar/api/contact"

data = {
    "name": "Test Portfolio",
    "email": "test@example.com",
    "message": "Este es un mensaje de prueba para verificar Zoho SMTP"
}

print(f"Enviando POST a {url}")
print(f"Datos: {json.dumps(data, indent=2)}")
print("\n" + "="*50 + "\n")

try:
    response = requests.post(url, json=data, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("\n✅ ÉXITO: El formulario se envió correctamente!")
    else:
        print(f"\n❌ ERROR: Status {response.status_code}")
        
except Exception as e:
    print(f"\n❌ EXCEPCIÓN: {str(e)}")
