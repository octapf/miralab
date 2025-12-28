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


def remove_near_white_background(img: Image.Image, cutoff: int = 245, feather: int = 12) -> Image.Image:
    """Convierte el fondo (blanco/casi blanco) en transparente.

    - cutoff: a partir de este valor (0-255) se considera "casi blanco".
    - feather: rango para suavizar bordes (anti-alias) hacia transparencia.
    """

    rgba = img.convert('RGBA')
    pixels = list(rgba.getdata())
    new_pixels = []

    start = max(0, cutoff - feather)
    span = max(1, cutoff - start)

    for r, g, b, a in pixels:
        # si ya es transparente, conservar
        if a == 0:
            new_pixels.append((r, g, b, 0))
            continue

        # "cercanía al blanco" usando el mínimo canal (más conservador)
        m = min(r, g, b)
        if m >= cutoff:
            # blanco/casi blanco -> transparente
            new_pixels.append((r, g, b, 0))
        elif m >= start:
            # zona de transición: se vuelve parcialmente transparente
            # m == start => alpha original; m == cutoff => alpha 0
            t = (cutoff - m) / span
            new_a = int(a * t)
            new_pixels.append((r, g, b, new_a))
        else:
            new_pixels.append((r, g, b, a))

    rgba.putdata(new_pixels)
    return rgba


def crop_to_visible(img: Image.Image, alpha_threshold: int = 8) -> Image.Image:
    """Recorta el bounding-box del contenido visible (según alpha)."""

    rgba = img.convert('RGBA')
    alpha = rgba.split()[3]
    # binarizar: todo pixel con alpha > threshold se considera contenido
    mask = alpha.point(lambda p: 255 if p > alpha_threshold else 0)
    bbox = mask.getbbox()
    if not bbox:
        return rgba
    return rgba.crop(bbox)


def fit_to_square(img: Image.Image, size: int, padding_ratio: float = 0.04) -> Image.Image:
    """Encaja la imagen en un canvas cuadrado de 'size' maximizando el área visible.

    padding_ratio: fracción del lado reservada como padding total (0..0.2 aprox).
    """

    rgba = img.convert('RGBA')
    # recortar márgenes transparentes para maximizar el contenido
    cropped = crop_to_visible(rgba)

    # crear canvas cuadrado del lado mayor del recorte
    w, h = cropped.size
    side = max(w, h)
    square = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    square.paste(cropped, ((side - w) // 2, (side - h) // 2), cropped)

    # aplicar padding (dejando un margen mínimo para que no se “coma” el borde)
    pad = int(round(size * padding_ratio))
    target = max(1, size - 2 * pad)
    square_resized = square.resize((target, target), Image.Resampling.LANCZOS)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(square_resized, (pad, pad), square_resized)
    return out

def create_favicon(input_path, output_dir):
    """Genera todos los tamaños de favicon necesarios"""
    
    # Abrir la imagen original
    img = Image.open(input_path)
    
    # Convertir a RGBA y limpiar fondo blanco a transparente
    img = remove_near_white_background(img)
    
    # Generar favicon-16x16.png (maximiza área visible)
    favicon_16 = fit_to_square(img, 16)
    favicon_16.save(os.path.join(output_dir, "favicon-16x16.png"), "PNG")
    print("✓ favicon-16x16.png creado")
    
    # Generar favicon-32x32.png
    favicon_32 = fit_to_square(img, 32)
    favicon_32.save(os.path.join(output_dir, "favicon-32x32.png"), "PNG")
    print("✓ favicon-32x32.png creado")
    
    # Generar apple-touch-icon.png (180x180)
    apple_icon = fit_to_square(img, 180, padding_ratio=0.06)
    apple_icon.save(os.path.join(output_dir, "apple-touch-icon.png"), "PNG")
    print("✓ apple-touch-icon.png creado")
    
    # Generar favicon.ico (con múltiples tamaños: 16, 32, 48)
    favicon_ico_path = os.path.join(output_dir, "favicon.ico")
    ico_base = fit_to_square(img, 48)
    ico_base.save(
        favicon_ico_path,
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
