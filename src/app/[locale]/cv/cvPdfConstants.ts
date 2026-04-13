/**
 * Fuentes estándar PDF (embebidas, sin archivos externos).
 * Roboto vía .woff2 rompía fontkit en el navegador (RangeError DataView).
 *
 * Hipervínculos: `<Link src>` crea anotaciones URI del estándar PDF; no hay
 * `target="_blank"`. Cada visor elige si abre el enlace en la misma ventana,
 * en el navegador predeterminado, etc.
 */
export const CV_PDF_REGULAR = 'Helvetica';
export const CV_PDF_BOLD = 'Helvetica-Bold';
export const CV_PDF_BOLD_ITALIC = 'Helvetica-BoldOblique';
