/**
 * Wordmark inline — mismos colores que MatchpointWordmark.
 * viewBox con ratio 1024:500 (igual que el marco); ancho extra en unidades SVG para tipografía grande sin recorte.
 */
const VB_W = 1200;
const VB_H = (VB_W * 500) / 1024;

export default function CvMatchpointWordmarkSvg({ className }: { className?: string }) {
  const cx = VB_W / 2;
  const cy = VB_H / 2;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: 200,
          fontWeight: 900,
          fontStyle: 'italic',
          letterSpacing: '-0.055em',
        }}
      >
        <tspan fill="#fbbf24">MATCH</tspan>
        <tspan fill="#8b5cf6">POINT</tspan>
      </text>
    </svg>
  );
}
