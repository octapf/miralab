# Configuración de Favicons

## Pasos para agregar el favicon:

### 1. Remover el fondo de la imagen
- Ve a https://www.remove.bg
- Sube tu imagen
- Descarga la versión con fondo transparente (formato PNG)

### 2. Generar los favicons
- Ve a https://realfavicongenerator.net/
- Sube la imagen con fondo transparente
- Configura los ajustes según prefieras
- Descarga el paquete generado

### 3. Copiar los archivos a esta carpeta
Coloca los siguientes archivos en la carpeta `public/`:
```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
└── apple-touch-icon.png
```

### 4. Verificar
Una vez copiados los archivos, el favicon aparecerá automáticamente en:
- Pestaña del navegador
- Marcadores
- Dispositivos Apple (cuando se guarde en inicio)

## Archivos necesarios:
- **favicon.ico** - Ícono estándar para navegadores (contiene múltiples tamaños: 16x16, 32x32, 48x48)
- **favicon-16x16.png** - Versión PNG pequeña
- **favicon-32x32.png** - Versión PNG mediana
- **apple-touch-icon.png** - Para dispositivos Apple (180x180px)

La configuración ya está lista en `src/app/[locale]/layout.tsx` ✅
