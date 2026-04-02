import { Link } from "react-router-dom";

export const Logo = ({ className, redColor = "#e60023", pinkColor = "#f27983" }: { className?: string, redColor?: string, pinkColor?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="15" width="70" height="70" rx="20" fill={redColor} />
    <g transform="rotate(45 50 50)">
      <rect x="15" y="15" width="70" height="70" rx="20" fill={redColor} />
      <rect x="22" y="22" width="56" height="56" rx="14" fill={pinkColor} />
    </g>
  </svg>
);

export const Pattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="aztec" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 20h20v20H0V20zm20-20h20v20H20V0z" fill="currentColor" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#aztec)" />
  </svg>
);

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 mix-blend-difference text-brand-bg pointer-events-none">
      <Link to="/" className="flex items-center gap-3 pointer-events-auto">
        <Logo className="w-10 h-10" />
        <span className="font-display font-bold text-xl tracking-tight hidden sm:inline-block">ABACUS MATES</span>
      </Link>
      <div className="flex items-center gap-4 pointer-events-auto">
        <Link to="/portfolio" className="font-display font-bold uppercase tracking-wider text-sm hover:text-brand-red transition-colors">
          Works
        </Link>
        <button className="font-display font-bold uppercase tracking-wider text-sm border-2 border-brand-bg px-6 py-2 rounded-full hover:bg-brand-bg hover:text-brand-dark transition-colors">
          Contact
        </button>
      </div>
    </nav>
  );
}
