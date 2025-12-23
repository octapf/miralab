'use client';

interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export default function Logo({ theme = 'dark', width = 130, height = 35 }: LogoProps) {
  const textColor = theme === 'dark' ? '#fff' : '#000';
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 155 45" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <text 
        x="0" 
        y="28" 
        fontFamily="Arial, sans-serif" 
        fontWeight="900" 
        fontSize="26" 
        letterSpacing="3" 
        fill="#8B5CF6"
      >
        MIRA
      </text>
      <text 
        x="85" 
        y="28" 
        fontFamily="Arial, sans-serif" 
        fontWeight="900" 
        fontSize="26" 
        letterSpacing="3" 
        fill={textColor}
      >
        LAB
      </text>
      <path 
        d="M 0 38 Q 38.75 35 77.5 38 T 155 38" 
        stroke="#8B5CF6" 
        strokeWidth="2.5" 
        fill="none"
      />
    </svg>
  );
}
