import { useState } from "react";
import { Pattern } from "../components/Navbar";
import { Download, Image as ImageIcon, FileCode2 } from "lucide-react";

const ASSETS = [
  { name: "Logo", path: "/brand-assets/logo.svg" },
  { name: "Shape (Solid Red)", path: "/brand-assets/shape-solid-red.svg" },
  { name: "Shape (Solid Pink)", path: "/brand-assets/shape-solid-pink.svg" },
  { name: "Shape (Outline Dark)", path: "/brand-assets/shape-outline-dark.svg" },
  { name: "Shape (Outline Red)", path: "/brand-assets/shape-outline-red.svg" },
  { name: "Shape (Outline Pink)", path: "/brand-assets/shape-outline-pink.svg" },
  { name: "Background Pattern", path: "/brand-assets/pattern.svg" },
];

const COLORS = [
  { name: "Lime Green (Background)", hex: "#d4f2a3" },
  { name: "Vibrant Red (Accent)", hex: "#e60023" },
  { name: "Soft Pink (Secondary)", hex: "#f27983" },
  { name: "Dark (Text/Lines)", hex: "#1a1a1a" },
  { name: "White", hex: "#ffffff" },
];

export default function BrandKit() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "flower") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const downloadSVG = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadPNG = (url: string, filename: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Set a high resolution for the PNG export
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Draw image scaled to canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = filename.replace(".svg", ".png");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative bg-brand-bg">
        <Pattern />
        <div className="bg-white p-12 rounded-[2rem] border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] max-w-md w-full text-center relative z-10">
          <h1 className="font-display text-4xl font-bold uppercase mb-6">Brand Kit</h1>
          <p className="mb-6 text-brand-dark/70 font-medium">Secret access to branding assets.</p>
          {error && <p className="text-brand-red mb-4 font-medium">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red text-center text-xl tracking-widest"
            />
            <button 
              type="submit"
              className="w-full bg-brand-dark text-brand-bg font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-red hover:text-white transition-colors"
            >
              Access Assets
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 pb-32 relative bg-brand-bg">
      <Pattern />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">Brand Assets</h1>
          <p className="text-xl font-medium text-brand-dark/70 max-w-2xl mx-auto">
            Download high-quality SVG (vector) and PNG (image) files for your Instagram posts, stories, and other marketing materials.
          </p>
        </div>

        <h2 className="font-display text-4xl font-bold uppercase mb-8 border-b-4 border-brand-dark pb-4">Shapes & Logos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {ASSETS.map((asset, i) => (
            <div key={i} className="bg-white rounded-[2rem] border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] p-8 flex flex-col items-center text-center">
              <div className="w-40 h-40 mb-8 flex items-center justify-center bg-brand-bg/20 rounded-2xl border-2 border-dashed border-brand-dark/20 p-4">
                <img src={asset.path} alt={asset.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-6">{asset.name}</h3>
              <div className="flex flex-col w-full gap-3 mt-auto">
                <button 
                  onClick={() => downloadSVG(asset.path, asset.path.split('/').pop() || 'asset.svg')}
                  className="flex items-center justify-center gap-2 w-full bg-brand-dark text-brand-bg py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-red transition-colors"
                >
                  <FileCode2 className="w-5 h-5" /> Download SVG
                </button>
                <button 
                  onClick={() => downloadPNG(asset.path, asset.path.split('/').pop() || 'asset.png')}
                  className="flex items-center justify-center gap-2 w-full border-2 border-brand-dark text-brand-dark py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-bg transition-colors"
                >
                  <ImageIcon className="w-5 h-5" /> Download PNG
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-4xl font-bold uppercase mb-8 border-b-4 border-brand-dark pb-4">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {COLORS.map((color, i) => (
            <div key={i} className="bg-white rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_0px_#1a1a1a] overflow-hidden">
              <div className="h-32 w-full border-b-4 border-brand-dark" style={{ backgroundColor: color.hex }}></div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm mb-1">{color.name}</h3>
                <p className="font-mono text-brand-dark/60 text-sm">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
