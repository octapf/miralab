"""
Script para corregir la generación del favicon.ico
"""
from PIL import Image
import os

# Ruta de la imagen original
original_image = "logo-original.png"
output_dir = "public"

def create_favicon_ico(input_path, output_dir):
    """Genera favicon.ico correctamente"""
    
    img = Image.open(input_path)
    
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Crear los diferentes tamaños
    sizes = [(16, 16), (32, 32), (48, 48)]
    icons = []
    
    for size in sizes:
        resized = img.resize(size, Image.Resampling.LANCZOS)
        icons.append(resized)
    
    # Guardar como ICO con múltiples tamaños
    output_path = os.path.join(output_dir, "favicon.ico")
    icons[0].save(
        output_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=icons[1:]
    )
    
    print(f"✅ favicon.ico creado: {os.path.getsize(output_path)} bytes")

if __name__ == "__main__":
    try:
        create_favicon_ico(original_image, output_dir)
    except Exception as e:
        print(f"❌ Error: {e}")
