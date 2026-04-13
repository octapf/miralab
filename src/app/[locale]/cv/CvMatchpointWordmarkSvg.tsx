/**
 * Wordmark inline — mismos colores que MatchpointWordmark.
 * Opcional: subtítulo MOBILE / WEB para distinguir app y sitio.
 */
const VB_W = 1200;
/** Ratio base 1024:500 + franja para badge (mismo alto que marco CSS 1024/610) */
function vbHeight(variant?: 'mobile' | 'web'): number {
  const base = (VB_W * 500) / 1024;
  return variant ? base * 1.26 : base;
}

export default function CvMatchpointWordmarkSvg({
  className,
  variant,
}: {
  className?: string;
  variant?: 'mobile' | 'web';
}) {
  const VB_H = vbHeight(variant);
  const cx = VB_W / 2;
  const mainY = variant ? VB_H * 0.36 : VB_H / 2;
  const badgeY = variant ? VB_H * 0.8 : VB_H / 2;
  const badge =
    variant === 'mobile' ? 'MOBILE' : variant === 'web' ? 'WEB' : null;

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
        y={mainY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: variant ? 198 : 200,
          fontWeight: 900,
          fontStyle: 'italic',
          letterSpacing: '-0.055em',
        }}
      >
        <tspan fill="#fbbf24">MATCH</tspan>
        <tspan fill="#8b5cf6">POINT</tspan>
      </text>
      {badge ? (
        <text
          x={cx}
          y={badgeY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            fontSize: 98,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.04em',
          }}
        >
          {badge}
        </text>
      ) : null}
    </svg>
  );
}
