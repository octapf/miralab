"""
Script para generar favicons en diferentes tamaños
"""
from PIL import Image
import os

# Ruta de la imagen original (debes guardar la imagen como 'logo-original.png' en la carpeta del proyecto)
original_image = "logo-original.png"
output_dir = "public"

# Asegurarse de que el directorio de salida existe
os.makedirs(output_dir, exist_ok=True)

def create_favicon(input_path, output_dir):
    """Genera todos los tamaños de favicon necesarios"""
    
    # Abrir la imagen original
    img = Image.open(input_path)
    
    # Convertir a RGBA si no lo está (para manejar transparencia)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Generar favicon-16x16.png
    favicon_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    favicon_16.save(os.path.join(output_dir, "favicon-16x16.png"), "PNG")
    print("✓ favicon-16x16.png creado")
    
    # Generar favicon-32x32.png
    favicon_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    favicon_32.save(os.path.join(output_dir, "favicon-32x32.png"), "PNG")
    print("✓ favicon-32x32.png creado")
    
    # Generar apple-touch-icon.png (180x180)
    apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_icon.save(os.path.join(output_dir, "apple-touch-icon.png"), "PNG")
    print("✓ apple-touch-icon.png creado")
    
    # Generar favicon.ico (con múltiples tamaños: 16, 32, 48)
    favicon_16_ico = img.resize((16, 16), Image.Resampling.LANCZOS)
    favicon_32_ico = img.resize((32, 32), Image.Resampling.LANCZOS)
    favicon_48_ico = img.resize((48, 48), Image.Resampling.LANCZOS)
    
    favicon_16_ico.save(
        os.path.join(output_dir, "favicon.ico"),
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("✓ favicon.ico creado")
    
    print(f"\n✅ Todos los favicons generados en '{output_dir}/'")

if __name__ == "__main__":
    try:
        if not os.path.exists(original_image):
            print(f"❌ Error: No se encuentra '{original_image}'")
            print(f"   Guarda la imagen del logo como '{original_image}' en la raíz del proyecto")
        else:
            create_favicon(original_image, output_dir)
    except ImportError:
        print("❌ Error: Se requiere Pillow (PIL)")
        print("   Instala con: pip install Pillow")
    except Exception as e:
        print(f"❌ Error: {e}")
