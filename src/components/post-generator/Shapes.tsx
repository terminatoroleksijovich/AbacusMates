export const Asterisk = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M45 0h10v40h35v10H55v40H45V50H10V40h35V0z" />
    <path d="M21.2 14.1l7.1-7.1 28.3 28.3 28.3-28.3 7.1 7.1-28.3 28.3 28.3 28.3-7.1 7.1-28.3-28.3-28.3 28.3-7.1-7.1 28.3-28.3-28.3-28.3z" />
  </svg>
);

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M0 40h70v-20l30 30-30 30v-20h-70z" />
  </svg>
);

export const ZigZag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="miter">
    <path d="M0 50l25-30 25 60 25-60 25 30" />
  </svg>
);

export const Starburst = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 0l10 35 35-10-20 30 25 25-35-5L50 100l-15-35-35 5 25-25-20-30 35 10z" />
  </svg>
);

export const CircleText = ({ className, text }: { className?: string, text: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="none" />
    <text fontSize="14" fontWeight="bold" letterSpacing="2" fill="currentColor">
      <textPath href="#curve" startOffset="50%" textAnchor="middle">{text}</textPath>
    </text>
  </svg>
);
