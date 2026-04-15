import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import { Pattern, Logo } from "../components/Navbar";
import { Download, Instagram, LayoutTemplate, Type, Image as ImageIcon, Maximize, ChevronDown, ChevronUp, Copy, Bot, Sparkles, Upload, Maximize2, X } from "lucide-react";

type TemplateType = "red" | "lime" | "dark" | "brutalist" | "minimal" | "split" | "grid" | "port-1" | "port-2" | "port-3" | "port-4" | "port-5";
type SlideType = "cover" | "content" | "cta";
type AspectRatio = "1:1" | "4:5" | "9:16";

export default function PostGenerator() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [template, setTemplate] = useState<TemplateType>("red");
  const [slideType, setSlideType] = useState<SlideType>("cover");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("4:5");
  
  const [content, setContent] = useState({
    title: "HOW TO BUILD A WEBSITE THAT WORKS",
    subtitle: "A quick guide for experts",
    body: "Most websites look like they were built in 2007. This destroys trust instantly.\n\nHere is how to fix it and start getting clients.",
    cta: "Ready to upgrade your brand?\nSlide into DMs.",
    image: null as string | null
  });
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const aiPrompt = `Act as an expert copywriter for 'Abacus Mates', a bold, no-BS web design studio. Our style is direct, slightly aggressive but professional, anti-boring, and highly convincing. We build 'websites that work' for experts whose current sites look like they are from 2007 and are losing them clients.\n\nGenerate 4 Instagram carousel post ideas (Title, 3 content slides, 1 CTA slide). The topics must convince the reader to rethink their website and buy our $1000 turnkey website service. Use short sentences, punchy statements, and a confident tone.`;

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [screenshotScale, setScreenshotScale] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("auth_post") === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  const getDimensions = (ratio: AspectRatio) => {
    switch (ratio) {
      case "1:1": return { width: 1080, height: 1080 };
      case "4:5": return { width: 1080, height: 1350 };
      case "9:16": return { width: 1080, height: 1920 };
    }
  };

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const { width, height } = getDimensions(aspectRatio);
        
        const scaleX = (containerWidth - 40) / width;
        const scaleY = (containerHeight - 40) / height;
        setScale(Math.min(scaleX, scaleY));
      }
    };
    
    updateScale();
    window.addEventListener("resize", updateScale);
    // Also update scale when aspect ratio changes
    setTimeout(updateScale, 50);
    return () => window.removeEventListener("resize", updateScale);
  }, [aspectRatio]);

  useEffect(() => {
    if (isFullscreen) {
      const { width, height } = getDimensions(aspectRatio);
      const fit = Math.min((window.innerWidth - 80) / width, (window.innerHeight - 120) / height);
      setScreenshotScale(fit > 1 ? 1 : fit);
    }
  }, [isFullscreen, aspectRatio]);

  const handleExport = async () => {
    if (!previewRef.current) return;
    
    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality export (2x resolution)
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `abacus-post-${template}-${slideType}-${aspectRatio.replace(':', 'x')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export image. Please try again.");
    }
  };

  if (loading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center bg-brand-bg">Loading...</div>;

  const { width, height } = getDimensions(aspectRatio);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 md:px-12 bg-brand-bg font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Post Generator</h1>
            <p className="text-brand-dark/70 font-medium">Create Instagram carousels in your brand style.</p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem("auth_post");
              navigate("/");
            }}
            className="text-brand-red font-bold uppercase hover:underline self-start md:self-auto"
          >
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6 h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-10">
            
            {/* AI Prompt Section */}
            <div className="bg-brand-dark text-white p-6 rounded-2xl border-4 border-brand-red shadow-[6px_6px_0px_0px_#e60023]">
              <button 
                onClick={() => setIsPromptOpen(!isPromptOpen)}
                className="w-full flex items-center justify-between font-bold uppercase"
              >
                <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-red" /> AI Ideas Generator</span>
                {isPromptOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {isPromptOpen && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-white/70">Copy this prompt and paste it into your favorite AI to get post ideas in our brand voice.</p>
                  <div className="bg-white/10 p-4 rounded-xl text-sm font-mono whitespace-pre-wrap relative">
                    {aiPrompt}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(aiPrompt);
                        alert("Prompt copied!");
                      }}
                      className="absolute top-2 right-2 p-2 bg-brand-red rounded-lg hover:bg-white hover:text-brand-red transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-brand-red hover:text-white transition-colors"><Bot className="w-3 h-3" /> ChatGPT</a>
                    <a href="https://claude.ai" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-brand-red hover:text-white transition-colors"><Bot className="w-3 h-3" /> Claude</a>
                    <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-brand-red hover:text-white transition-colors"><Bot className="w-3 h-3" /> Gemini</a>
                    <a href="https://grok.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-white text-brand-dark px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-brand-red hover:text-white transition-colors"><Bot className="w-3 h-3" /> Grok</a>
                  </div>
                </div>
              )}
            </div>

            {/* Aspect Ratio */}
            <div className="bg-white p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_0px_#1a1a1a]">
              <h2 className="font-bold uppercase flex items-center gap-2 mb-4"><Maximize className="w-5 h-5" /> 1. Format</h2>
              <div className="grid grid-cols-3 gap-3">
                {(["1:1", "4:5", "9:16"] as AspectRatio[]).map(ratio => (
                  <button 
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-3 rounded-xl font-bold uppercase text-sm border-2 transition-colors ${aspectRatio === ratio ? "bg-brand-dark text-white border-brand-dark" : "bg-brand-bg text-brand-dark border-brand-dark hover:bg-brand-dark/10"}`}
                  >
                    {ratio}
                    <span className="block text-[10px] opacity-70 mt-1">
                      {ratio === "1:1" ? "Square" : ratio === "4:5" ? "Portrait" : "Story/Reel"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_0px_#1a1a1a]">
              <h2 className="font-bold uppercase flex items-center gap-2 mb-4"><LayoutTemplate className="w-5 h-5" /> 2. Template Style</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "red", name: "Loud Red", bg: "bg-brand-red text-white" },
                  { id: "lime", name: "Lime Fresh", bg: "bg-[#d4f2a3] text-brand-dark" },
                  { id: "dark", name: "Dark Mode", bg: "bg-brand-dark text-white" },
                  { id: "brutalist", name: "Brutalist", bg: "bg-white text-brand-dark" },
                  { id: "minimal", name: "Minimal Pink", bg: "bg-brand-pink text-brand-dark" },
                  { id: "split", name: "Split Screen", bg: "bg-gradient-to-r from-brand-dark to-brand-red text-white" },
                  { id: "grid", name: "Grid Layout", bg: "bg-brand-bg text-brand-dark border-brand-dark" },
                  { id: "port-1", name: "Portfolio: Bold", bg: "bg-brand-red text-white border-brand-dark" },
                  { id: "port-2", name: "Portfolio: Polaroid", bg: "bg-brand-dark text-white border-brand-red" },
                  { id: "port-3", name: "Portfolio: Split", bg: "bg-[#d4f2a3] text-brand-dark border-brand-dark" },
                  { id: "port-4", name: "Portfolio: Brutal", bg: "bg-white text-brand-dark border-brand-dark" },
                  { id: "port-5", name: "Portfolio: Clean", bg: "bg-brand-pink text-brand-dark border-brand-dark" },
                ].map(t => (
                  <button 
                    key={t.id}
                    onClick={() => setTemplate(t.id as TemplateType)}
                    className={`py-3 px-2 rounded-xl font-bold uppercase text-sm border-2 transition-all ${template === t.id ? `border-brand-dark shadow-[4px_4px_0px_0px_#1a1a1a] ${t.bg}` : "bg-brand-bg text-brand-dark border-brand-dark/30 hover:border-brand-dark"}`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Type */}
            <div className="bg-white p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_0px_#1a1a1a]">
              <h2 className="font-bold uppercase flex items-center gap-2 mb-4"><ImageIcon className="w-5 h-5" /> 3. Slide Type</h2>
              <div className="grid grid-cols-3 gap-3">
                {(["cover", "content", "cta"] as SlideType[]).map(type => (
                  <button 
                    key={type}
                    onClick={() => setSlideType(type)}
                    className={`py-3 rounded-xl font-bold uppercase text-sm border-2 transition-colors ${slideType === type ? "bg-brand-dark text-white border-brand-dark" : "bg-brand-bg text-brand-dark border-brand-dark hover:bg-brand-dark/10"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white p-6 rounded-2xl border-4 border-brand-dark shadow-[6px_6px_0px_0px_#1a1a1a]">
              <h2 className="font-bold uppercase flex items-center gap-2 mb-4"><Type className="w-5 h-5" /> 4. Edit Content</h2>
              <div className="space-y-4">
                {(slideType === "cover" || slideType === "content") && (
                  <div>
                    <label className="block font-bold uppercase text-xs mb-1 text-brand-dark/70">Title</label>
                    <textarea 
                      value={content.title}
                      onChange={(e) => setContent({...content, title: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-red font-display uppercase resize-none h-24"
                    />
                  </div>
                )}
                
                {slideType === "cover" && (
                  <div>
                    <label className="block font-bold uppercase text-xs mb-1 text-brand-dark/70">Subtitle (Optional)</label>
                    <input 
                      type="text"
                      value={content.subtitle}
                      onChange={(e) => setContent({...content, subtitle: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                )}

                {slideType === "content" && (
                  <div>
                    <label className="block font-bold uppercase text-xs mb-1 text-brand-dark/70">Body Text</label>
                    <textarea 
                      value={content.body}
                      onChange={(e) => setContent({...content, body: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-red resize-none h-40"
                    />
                  </div>
                )}

                {slideType === "cta" && (
                  <div>
                    <label className="block font-bold uppercase text-xs mb-1 text-brand-dark/70">Call to Action</label>
                    <textarea 
                      value={content.cta}
                      onChange={(e) => setContent({...content, cta: e.target.value})}
                      className="w-full border-2 border-brand-dark rounded-xl p-3 focus:outline-none focus:border-brand-red font-display uppercase resize-none h-24"
                    />
                  </div>
                )}

                {template.startsWith("port-") && (
                  <div>
                    <label className="block font-bold uppercase text-xs mb-1 text-brand-dark/70">Project Image</label>
                    <div className="relative">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setContent({...content, image: URL.createObjectURL(e.target.files[0])});
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full border-2 border-dashed border-brand-dark rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-brand-dark/70 hover:bg-brand-dark/5 transition-colors">
                        <Upload className="w-6 h-6" />
                        <span className="font-bold uppercase text-xs">Upload Image</span>
                      </div>
                    </div>
                    {content.image && (
                      <div className="mt-2 relative rounded-lg overflow-hidden border-2 border-brand-dark h-24">
                        <img src={content.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-[calc(100vh-200px)]">
            {/* Preview Container */}
            <div 
              ref={containerRef}
              className="flex-1 w-full bg-gray-200 rounded-3xl border-4 border-dashed border-brand-dark/20 overflow-hidden relative flex items-center justify-center"
            >
              <div 
                className="absolute top-1/2 left-1/2 origin-center shadow-2xl"
                style={{ 
                  width: `${width}px`, 
                  height: `${height}px`,
                  transform: `translate(-50%, -50%) scale(${scale})`
                }}
              >
                <div ref={previewRef} className="w-full h-full relative overflow-hidden bg-white">
                  <PostSlide template={template} slideType={slideType} content={content} aspectRatio={aspectRatio} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
              <button 
                onClick={handleExport}
                className="flex items-center justify-center gap-2 bg-brand-dark text-brand-bg font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-red transition-colors"
              >
                <Download className="w-5 h-5" /> Download
              </button>
              <button 
                onClick={() => setIsFullscreen(true)}
                className="flex items-center justify-center gap-2 bg-brand-red text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-dark transition-colors"
              >
                <Maximize2 className="w-5 h-5" /> Screenshot
              </button>
              <a 
                href="https://www.instagram.com/meyre.visuals/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-4 border-brand-dark text-brand-dark font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-bg transition-colors text-center"
              >
                <Instagram className="w-5 h-5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Mode */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-neutral-900 overflow-auto">
          <div className="min-h-full flex flex-col items-center justify-center py-12">
            <div className="fixed top-6 right-6 flex gap-4 z-[110]">
              <button 
                onClick={() => setScreenshotScale(s => s === 1 ? Math.min((window.innerWidth - 80) / width, (window.innerHeight - 120) / height) : 1)} 
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold uppercase text-sm transition-colors backdrop-blur-sm"
              >
                {screenshotScale === 1 ? "Fit to Screen" : "Actual Size (100%)"}
              </button>
              <button 
                onClick={() => setIsFullscreen(false)} 
                className="bg-brand-red hover:bg-red-600 text-white p-3 rounded-xl transition-colors shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-white/50 text-sm font-bold uppercase tracking-widest mb-8">
              Screenshot Mode (Use Cmd+Shift+4 or Win+Shift+S)
            </div>
            
            <div 
              className="relative flex items-center justify-center transition-all duration-300"
              style={{ 
                width: `${width * screenshotScale}px`, 
                height: `${height * screenshotScale}px`,
              }}
            >
              <div 
                className="absolute top-0 left-0 shadow-2xl origin-top-left transition-transform duration-300"
                style={{ 
                  width: `${width}px`, 
                  height: `${height}px`,
                  transform: `scale(${screenshotScale})`
                }}
              >
                <div className="w-full h-full relative overflow-hidden bg-white">
                  <PostSlide template={template} slideType={slideType} content={content} aspectRatio={aspectRatio} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Slide Rendering Component ---

function PostSlide({ template, slideType, content, aspectRatio }: { template: TemplateType, slideType: SlideType, content: any, aspectRatio: AspectRatio }) {
  const isTall = aspectRatio === "9:16";
  const padding = isTall ? "p-24" : "p-16";
  const titleSize = isTall ? "text-[9rem]" : "text-[8rem]";
  const contentTitleSize = isTall ? "text-7xl" : "text-6xl";
  const bodySize = isTall ? "text-5xl" : "text-4xl";

  const renderText = (text: string) => text.split('\n').map((line: string, i: number) => (
    <span key={i} className="block">{line}</span>
  ));

  // --- TEMPLATE: LOUD RED ---
  if (template === "red") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-red ${padding} flex flex-col justify-center relative`}>
          <Pattern />
          <img src="/brand-assets/shape-solid-pink.svg" className="absolute top-20 right-20 w-48 h-48 opacity-80" alt="" />
          <img src="/brand-assets/shape-outline-dark.svg" className="absolute bottom-20 left-20 w-64 h-64 opacity-40" alt="" />
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && (
              <div className="inline-block px-6 py-3 border-4 border-brand-dark rounded-full font-bold uppercase tracking-widest text-2xl mb-8 text-brand-dark bg-white">
                {content.subtitle}
              </div>
            )}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-brand-dark`}>
              {renderText(content.title)}
            </h1>
          </div>
          <div className="absolute bottom-16 right-16 flex items-center gap-4">
            <Logo className="w-12 h-12 text-brand-dark" />
            <span className="font-bold uppercase tracking-widest text-xl text-brand-dark">Abacus Mates</span>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col relative`}>
          <div className="absolute inset-8 border-8 border-brand-red rounded-[3rem] pointer-events-none"></div>
          <img src="/brand-assets/shape-outline-dark.svg" className="absolute top-16 right-16 w-32 h-32 opacity-50" alt="" />
          <div className="relative z-10 flex-1 flex flex-col pt-12 px-8">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-12 text-brand-dark`}>
              {content.title}
            </h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80`}>
              {content.body}
            </div>
          </div>
          <div className="relative z-10 pb-4 px-8 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xl text-brand-dark/50">Swipe</span>
            <Logo className="w-10 h-10 text-brand-red" />
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`}>
          <Pattern />
          <img src="/brand-assets/shape-solid-pink.svg" className="absolute top-1/4 left-16 w-40 h-40 opacity-60" alt="" />
          <img src="/brand-assets/shape-outline-red.svg" className="absolute bottom-1/4 right-16 w-48 h-48 opacity-60" alt="" />
          <div className="relative z-10 flex flex-col items-center">
            <Logo className="w-40 h-40 mb-12 text-brand-bg" />
            <h2 className={`font-display text-7xl font-bold uppercase tracking-tight mb-12 text-brand-bg`}>
              {renderText(content.cta)}
            </h2>
            <div className="inline-block px-10 py-5 border-4 border-brand-bg text-brand-bg rounded-full font-bold uppercase tracking-widest text-3xl">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: LIME FRESH ---
  if (template === "lime") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-[#d4f2a3] ${padding} flex flex-col justify-center relative`}>
          <img src="/brand-assets/shape-solid-red.svg" className="absolute top-32 right-10 w-56 h-56 opacity-90" alt="" />
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && (
              <div className="inline-block px-6 py-3 border-4 border-brand-dark rounded-full font-bold uppercase tracking-widest text-2xl mb-8 text-brand-dark bg-white shadow-[6px_6px_0px_0px_#1a1a1a]">
                {content.subtitle}
              </div>
            )}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-brand-dark drop-shadow-[8px_8px_0px_#e60023]`}>
              {renderText(content.title)}
            </h1>
          </div>
          <div className="absolute top-16 left-16 flex items-center gap-4">
            <Logo className="w-12 h-12 text-brand-dark" />
            <span className="font-bold uppercase tracking-widest text-xl text-brand-dark">Abacus Mates</span>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-[#d4f2a3] ${padding} flex flex-col relative`}>
          <div className="absolute inset-8 border-4 border-brand-dark rounded-[2rem] bg-white shadow-[12px_12px_0px_0px_#1a1a1a]"></div>
          <div className="relative z-10 flex-1 flex flex-col pt-16 px-12">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-12 text-brand-dark`}>
              {content.title}
            </h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/90`}>
              {content.body}
            </div>
          </div>
          <div className="relative z-10 pb-12 px-12 flex justify-between items-center">
            <span className="font-bold uppercase tracking-widest text-xl text-brand-dark/50">Swipe</span>
            <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center border-4 border-brand-dark">
              <Logo className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-red ${padding} flex flex-col items-center justify-center relative text-center`}>
          <img src="/brand-assets/shape-outline-dark.svg" className="absolute top-20 left-20 w-40 h-40 opacity-40" alt="" />
          <div className="relative z-10 flex flex-col items-center bg-white p-16 rounded-[3rem] border-4 border-brand-dark shadow-[16px_16px_0px_0px_#1a1a1a]">
            <Logo className="w-32 h-32 mb-8 text-brand-dark" />
            <h2 className={`font-display text-6xl font-bold uppercase tracking-tight mb-12 text-brand-dark`}>
              {renderText(content.cta)}
            </h2>
            <div className="inline-block px-10 py-5 bg-[#d4f2a3] border-4 border-brand-dark text-brand-dark rounded-full font-bold uppercase tracking-widest text-3xl shadow-[6px_6px_0px_0px_#1a1a1a]">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: DARK MODE ---
  if (template === "dark") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col justify-center relative`}>
          <Pattern />
          <img src="/brand-assets/shape-outline-red.svg" className="absolute top-1/3 right-10 w-64 h-64 opacity-50" alt="" />
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && (
              <div className="inline-block px-6 py-3 border-2 border-brand-red rounded-full font-bold uppercase tracking-widest text-2xl mb-8 text-brand-red">
                {content.subtitle}
              </div>
            )}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-brand-bg`}>
              {renderText(content.title)}
            </h1>
          </div>
          <div className="absolute bottom-16 left-16 flex items-center gap-4">
            <Logo className="w-12 h-12 text-brand-red" />
            <span className="font-bold uppercase tracking-widest text-xl text-brand-bg">Abacus Mates</span>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col relative`}>
          <Pattern />
          <div className="relative z-10 flex-1 flex flex-col pt-12 px-8">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-12 text-brand-red`}>
              {content.title}
            </h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-bg/90`}>
              {content.body}
            </div>
          </div>
          <div className="relative z-10 pb-4 px-8 flex justify-between items-center border-t-4 border-brand-red/30 pt-8">
            <span className="font-bold uppercase tracking-widest text-xl text-brand-bg/50">Swipe</span>
            <Logo className="w-10 h-10 text-brand-red" />
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`}>
          <Pattern />
          <div className="relative z-10 flex flex-col items-center">
            <Logo className="w-48 h-48 mb-12 text-brand-red" />
            <h2 className={`font-display text-7xl font-bold uppercase tracking-tight mb-12 text-brand-bg`}>
              {renderText(content.cta)}
            </h2>
            <div className="inline-block px-10 py-5 border-4 border-brand-red text-brand-red rounded-full font-bold uppercase tracking-widest text-3xl hover:bg-brand-red hover:text-brand-dark transition-colors">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: BRUTALIST ---
  if (template === "brutalist") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-white border-[16px] border-brand-dark ${padding} flex flex-col justify-between relative`}>
          <div className="flex justify-between items-start">
            <Logo className="w-16 h-16 text-brand-dark" />
            {content.subtitle && (
              <div className="bg-brand-red text-white px-6 py-2 font-bold uppercase tracking-widest text-2xl">
                {content.subtitle}
              </div>
            )}
          </div>
          <div className="relative z-10 w-full">
            <h1 className={`font-display ${titleSize} leading-[0.85] font-black uppercase tracking-tighter text-brand-dark`}>
              {renderText(content.title)}
            </h1>
          </div>
          <div className="w-full h-8 bg-brand-dark mt-8"></div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white border-[16px] border-brand-dark ${padding} flex flex-col relative`}>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-brand-dark border-b-8 border-brand-red pb-8`}>
              {content.title}
            </h2>
            <div className={`${bodySize} leading-snug font-bold whitespace-pre-wrap text-brand-dark`}>
              {content.body}
            </div>
          </div>
          <div className="relative z-10 flex justify-between items-end">
            <span className="font-black uppercase tracking-widest text-3xl text-brand-dark">-&gt;</span>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-red border-[16px] border-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="relative z-10 flex flex-col items-center w-full">
            <h2 className={`font-display text-8xl font-black uppercase tracking-tight mb-16 text-white leading-none`}>
              {renderText(content.cta)}
            </h2>
            <div className="w-full bg-brand-dark text-white py-8 font-black uppercase tracking-widest text-5xl">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: MINIMAL PINK ---
  if (template === "minimal") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col justify-center items-center text-center relative`}>
          <div className="relative z-10 max-w-[800px] flex flex-col items-center">
            {content.subtitle && (
              <div className="font-bold uppercase tracking-widest text-xl mb-12 text-brand-red">
                — {content.subtitle} —
              </div>
            )}
            <h1 className={`font-display ${titleSize} leading-[1] font-bold uppercase tracking-tight text-brand-dark`}>
              {renderText(content.title)}
            </h1>
          </div>
          <div className="absolute bottom-16 flex flex-col items-center gap-4">
            <Logo className="w-8 h-8 text-brand-dark" />
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col relative items-center text-center`}>
          <div className="relative z-10 flex-1 flex flex-col pt-12 max-w-[800px]">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-16 text-brand-dark`}>
              {content.title}
            </h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80`}>
              {content.body}
            </div>
          </div>
          <div className="relative z-10 pb-8">
            <div className="w-2 h-2 rounded-full bg-brand-red"></div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="relative z-10 flex flex-col items-center">
            <Logo className="w-24 h-24 mb-16 text-brand-red" />
            <h2 className={`font-display text-6xl font-bold uppercase tracking-tight mb-16 text-brand-dark`}>
              {renderText(content.cta)}
            </h2>
            <div className="font-bold uppercase tracking-widest text-2xl text-brand-red border-b-2 border-brand-red pb-2">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: SPLIT SCREEN ---
  if (template === "split") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full flex ${isTall ? 'flex-col' : 'flex-row'} relative`}>
          <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} bg-brand-dark ${padding} flex flex-col justify-center`}>
             <Pattern />
             <div className="relative z-10">
                {content.subtitle && (
                  <div className="font-bold uppercase tracking-widest text-xl mb-6 text-brand-red">
                    {content.subtitle}
                  </div>
                )}
                <h1 className={`font-display ${isTall ? 'text-7xl' : 'text-[6rem]'} leading-[0.9] font-bold uppercase tracking-tighter text-white`}>
                  {renderText(content.title)}
                </h1>
             </div>
          </div>
          <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} bg-brand-red flex items-center justify-center relative overflow-hidden`}>
            <img src="/brand-assets/shape-solid-pink.svg" className="w-3/4 h-3/4 object-contain" alt="" />
            <div className="absolute bottom-12 right-12">
              <Logo className="w-16 h-16 text-brand-dark" />
            </div>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full flex ${isTall ? 'flex-col' : 'flex-row'} relative`}>
          <div className={`${isTall ? 'h-1/3 w-full' : 'w-1/3 h-full'} bg-brand-red ${padding} flex flex-col justify-center`}>
             <h2 className={`font-display ${isTall ? 'text-6xl' : 'text-7xl'} font-bold uppercase tracking-tight text-brand-dark`}>
              {content.title}
            </h2>
          </div>
          <div className={`${isTall ? 'h-2/3 w-full' : 'w-2/3 h-full'} bg-white ${padding} flex flex-col justify-center`}>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark`}>
              {content.body}
            </div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full flex ${isTall ? 'flex-col' : 'flex-row'} relative`}>
          <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} bg-[#d4f2a3] flex items-center justify-center`}>
            <Logo className="w-48 h-48 text-brand-dark" />
          </div>
          <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} bg-brand-dark ${padding} flex flex-col justify-center items-center text-center`}>
            <Pattern />
            <h2 className={`font-display text-6xl font-bold uppercase tracking-tight mb-12 text-white relative z-10`}>
              {renderText(content.cta)}
            </h2>
            <div className="bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest text-2xl relative z-10">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- TEMPLATE: GRID LAYOUT ---
  if (template === "grid") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-bg flex flex-col relative`}>
          <div className="h-32 border-b-4 border-brand-dark flex items-center px-12 justify-between">
            <Logo className="w-12 h-12 text-brand-dark" />
            <span className="font-bold uppercase tracking-widest text-xl text-brand-dark">Abacus Mates</span>
          </div>
          <div className="flex-1 flex">
            <div className="w-24 border-r-4 border-brand-dark flex flex-col justify-end pb-12 items-center">
              <span className="font-bold uppercase tracking-widest text-lg text-brand-dark -rotate-90 whitespace-nowrap">
                {content.subtitle || "Vol. 01"}
              </span>
            </div>
            <div className="flex-1 p-16 flex flex-col justify-center">
              <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-brand-dark`}>
                {renderText(content.title)}
              </h1>
            </div>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-brand-bg flex flex-col relative`}>
          <div className="h-48 border-b-4 border-brand-dark flex items-center px-16 bg-brand-red">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-brand-dark`}>
              {content.title}
            </h2>
          </div>
          <div className="flex-1 flex">
            <div className="w-1/2 border-r-4 border-brand-dark p-16 flex flex-col justify-center">
              <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark`}>
                {content.body}
              </div>
            </div>
            <div className="w-1/2 p-16 flex items-center justify-center bg-white">
               <img src="/brand-assets/shape-outline-dark.svg" className="w-full h-full object-contain opacity-20" alt="" />
            </div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-bg flex flex-col relative`}>
          <div className="flex-1 border-b-4 border-brand-dark flex items-center justify-center p-16 text-center">
            <h2 className={`font-display text-8xl font-bold uppercase tracking-tight text-brand-dark`}>
              {renderText(content.cta)}
            </h2>
          </div>
          <div className="h-48 flex">
            <div className="w-1/2 border-r-4 border-brand-dark flex items-center justify-center bg-[#d4f2a3]">
              <Logo className="w-20 h-20 text-brand-dark" />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-brand-dark text-white font-bold uppercase tracking-widest text-3xl">
              @meyre.visuals
            </div>
          </div>
        </div>
      );
    }
  }

  // --- PORTFOLIO TEMPLATES ---
  const imgPlaceholder = <div className="w-full h-full bg-brand-dark/10 flex items-center justify-center border-4 border-dashed border-brand-dark/20"><ImageIcon className="w-16 h-16 text-brand-dark/20" /></div>;
  const renderImage = (className: string) => content.image ? <img src={content.image} className={className} alt="Project" /> : <div className={className}>{imgPlaceholder}</div>;

  if (template === "port-1") {
    return (
      <div className={`w-full h-full bg-brand-red ${padding} flex flex-col relative`}>
        <Pattern />
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex-1 w-full border-8 border-brand-dark rounded-[2rem] overflow-hidden shadow-[12px_12px_0px_0px_#1a1a1a] bg-white mb-8">
            {renderImage("w-full h-full object-cover")}
          </div>
          <div className="flex justify-between items-end">
            <div>
              {content.subtitle && <div className="font-bold uppercase tracking-widest text-xl text-brand-dark mb-2">{content.subtitle}</div>}
              <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-white`}>{content.title}</h2>
            </div>
            <Logo className="w-16 h-16 text-brand-dark" />
          </div>
        </div>
      </div>
    );
  }

  if (template === "port-2") {
    return (
      <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col items-center justify-center relative`}>
        <img src="/brand-assets/shape-solid-pink.svg" className="absolute top-10 right-10 w-40 h-40 opacity-50" alt="" />
        <div className="relative z-10 w-[90%] bg-white p-6 pb-20 border-4 border-brand-red shadow-[16px_16px_0px_0px_#e60023] transform -rotate-2">
          <div className="w-full aspect-square border-4 border-brand-dark overflow-hidden bg-brand-bg mb-8">
            {renderImage("w-full h-full object-cover")}
          </div>
          <h2 className={`font-display text-6xl font-bold uppercase tracking-tight text-brand-dark text-center`}>{content.title}</h2>
          {content.subtitle && <p className="text-center font-bold uppercase tracking-widest text-brand-red mt-4">{content.subtitle}</p>}
        </div>
      </div>
    );
  }

  if (template === "port-3") {
    return (
      <div className={`w-full h-full flex ${isTall ? 'flex-col' : 'flex-row'} relative bg-[#d4f2a3]`}>
        <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} p-8`}>
          <div className="w-full h-full border-4 border-brand-dark rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_#1a1a1a]">
            {renderImage("w-full h-full object-cover")}
          </div>
        </div>
        <div className={`${isTall ? 'h-1/2 w-full' : 'w-1/2 h-full'} ${padding} flex flex-col justify-center`}>
          <Logo className="w-12 h-12 text-brand-red mb-8" />
          <h2 className={`font-display ${isTall ? 'text-6xl' : 'text-7xl'} font-bold uppercase tracking-tight text-brand-dark mb-6`}>{content.title}</h2>
          <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80`}>{content.body}</div>
        </div>
      </div>
    );
  }

  if (template === "port-4") {
    return (
      <div className={`w-full h-full bg-white border-[16px] border-brand-dark flex flex-col relative`}>
        <div className="p-8 border-b-[16px] border-brand-dark flex justify-between items-center bg-brand-red">
          <h2 className={`font-display text-5xl font-black uppercase tracking-tight text-white truncate`}>{content.title}</h2>
          <span className="font-black uppercase text-2xl text-brand-dark bg-white px-4 py-2">NEW</span>
        </div>
        <div className="flex-1 relative overflow-hidden bg-brand-bg">
          {renderImage("w-full h-full object-cover")}
        </div>
        <div className="p-8 border-t-[16px] border-brand-dark bg-brand-dark text-white">
          <div className={`${bodySize} leading-snug font-bold whitespace-pre-wrap`}>{content.body}</div>
        </div>
      </div>
    );
  }

  if (template === "port-5") {
    return (
      <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col relative items-center text-center`}>
        <div className="w-full max-w-[800px] aspect-video rounded-full overflow-hidden border-8 border-brand-red mb-12 shadow-[0px_16px_0px_0px_#1a1a1a]">
          {renderImage("w-full h-full object-cover")}
        </div>
        <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-brand-dark mb-6`}>{content.title}</h2>
        {content.subtitle && <div className="font-bold uppercase tracking-widest text-xl text-brand-red mb-8">— {content.subtitle} —</div>}
        <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80 max-w-[800px]`}>{content.body}</div>
      </div>
    );
  }

  return null;
}
