import { Pattern, Logo } from "../Navbar";

export function renderStandardTemplate(props: any) {
  const { template, slideType, content, aspectRatio, bgStyle, renderText } = props;
  const isTall = aspectRatio === "9:16";
  const padding = isTall ? "p-24" : "p-16";
  const titleSize = isTall ? "text-[9rem]" : "text-[8rem]";
  const contentTitleSize = isTall ? "text-7xl" : "text-6xl";
  const bodySize = isTall ? "text-5xl" : "text-4xl";

  if (template === "red") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-red ${padding} flex flex-col justify-center relative`} style={bgStyle}>
          <Pattern />
          <div className="absolute inset-0 bg-brand-red/80 mix-blend-multiply"></div>
          <img src="/brand-assets/shape-solid-pink.svg" className="absolute top-20 right-20 w-48 h-48 opacity-80" alt="" />
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && <div className="inline-block px-6 py-3 border-4 border-brand-dark rounded-full font-bold uppercase tracking-widest text-2xl mb-8 text-brand-dark bg-white">{content.subtitle}</div>}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-white`}>{renderText(content.title)}</h1>
          </div>
          <div className="absolute bottom-16 right-16 flex items-center gap-4"><Logo className="w-12 h-12 text-white" /><span className="font-bold uppercase tracking-widest text-xl text-white">Abacus Mates</span></div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col relative`} style={bgStyle}>
          <div className="absolute inset-0 bg-white/90"></div>
          <div className="absolute inset-8 border-8 border-brand-red rounded-[3rem] pointer-events-none"></div>
          <div className="relative z-10 flex-1 flex flex-col pt-12 px-8">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-12 text-brand-dark`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80`}>{content.body}</div>
          </div>
          <div className="relative z-10 pb-4 px-8 flex justify-between items-center"><span className="font-bold uppercase tracking-widest text-xl text-brand-dark/50">Swipe</span><Logo className="w-10 h-10 text-brand-red" /></div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`} style={bgStyle}>
          <div className="absolute inset-0 bg-brand-dark/90"></div>
          <div className="relative z-10 flex flex-col items-center">
            <Logo className="w-40 h-40 mb-12 text-brand-bg" />
            <h2 className={`font-display text-7xl font-bold uppercase tracking-tight mb-12 text-brand-bg`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-10 py-5 border-4 border-brand-bg text-brand-bg rounded-full font-bold uppercase tracking-widest text-3xl">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "collage") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-brand-bg ${padding} flex flex-col justify-center relative overflow-hidden`}>
          <div className="absolute top-[-10%] right-[-10%] w-[80%] aspect-square rounded-full border-8 border-brand-dark" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px]">
            <h1 className={`font-display ${titleSize} leading-[0.85] font-black uppercase tracking-tighter text-brand-dark mix-blend-difference text-white`}>{renderText(content.title)}</h1>
            {content.subtitle && <div className="inline-block mt-8 px-8 py-4 bg-brand-red border-4 border-brand-dark font-bold uppercase tracking-widest text-3xl text-white transform -rotate-2">{content.subtitle}</div>}
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-brand-bg ${padding} flex flex-col relative`}>
          <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-30" style={bgStyle}></div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-brand-dark bg-white inline-block self-start px-6 py-2 border-4 border-brand-dark`}>{content.title}</h2>
            <div className={`${bodySize} leading-snug font-bold whitespace-pre-wrap text-brand-dark bg-white/80 p-8 border-4 border-brand-dark backdrop-blur-sm`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-red ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="absolute inset-0 opacity-50 mix-blend-multiply" style={bgStyle}></div>
          <div className="relative z-10 flex flex-col items-center bg-white p-16 border-8 border-brand-dark shadow-[24px_24px_0px_0px_#1a1a1a] transform rotate-2">
            <h2 className={`font-display text-7xl font-black uppercase tracking-tight mb-12 text-brand-dark`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-10 py-5 bg-brand-dark text-white font-black uppercase tracking-widest text-4xl">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "neo") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-[#d4f2a3] ${padding} flex flex-col justify-center relative border-[24px] border-brand-dark`}>
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-brand-dark bg-brand-pink rounded-full" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && <div className="inline-block px-6 py-2 bg-brand-dark font-bold uppercase tracking-widest text-2xl mb-6 text-white">{content.subtitle}</div>}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-black uppercase tracking-tighter text-brand-dark drop-shadow-[8px_8px_0px_#e60023]`}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col relative border-[24px] border-brand-dark`}>
          <div className="absolute inset-0 opacity-10" style={bgStyle}></div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-brand-red drop-shadow-[4px_4px_0px_#1a1a1a]`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-bold whitespace-pre-wrap text-brand-dark`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col items-center justify-center relative text-center border-[24px] border-brand-dark`}>
          <div className="absolute inset-0 opacity-20" style={bgStyle}></div>
          <div className="relative z-10 flex flex-col items-center">
            <Logo className="w-48 h-48 mb-12 text-brand-dark drop-shadow-[8px_8px_0px_#e60023]" />
            <h2 className={`font-display text-8xl font-black uppercase tracking-tight mb-12 text-brand-dark`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-12 py-6 bg-brand-red border-8 border-brand-dark text-white font-black uppercase tracking-widest text-4xl shadow-[12px_12px_0px_0px_#1a1a1a] transform -rotate-3">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "cyberpunk") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-black ${padding} flex flex-col justify-center relative border-[12px] border-[#39ff14]`}>
          <div className="absolute inset-0 opacity-30 mix-blend-screen" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && <div className="inline-block px-4 py-1 bg-[#39ff14] text-black font-mono font-bold uppercase tracking-widest text-xl mb-6">{content.subtitle}</div>}
            <h1 className={`font-mono ${titleSize} leading-[1] font-black uppercase tracking-tighter text-[#39ff14]`} style={{ textShadow: '4px 4px 0px #ff00ff' }}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-black ${padding} flex flex-col relative border-[12px] border-[#39ff14]`}>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-mono ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-[#ff00ff]`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-mono whitespace-pre-wrap text-[#39ff14]`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-black ${padding} flex flex-col items-center justify-center relative text-center border-[12px] border-[#39ff14]`}>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className={`font-mono text-7xl font-black uppercase tracking-tight mb-12 text-[#39ff14]`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-10 py-4 bg-[#ff00ff] text-black font-mono font-black uppercase tracking-widest text-3xl">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "editorial") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-[#f4f4f0] ${padding} flex flex-col justify-center relative`}>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-40" style={bgStyle}></div>
          <div className="relative z-10 max-w-[800px]">
            {content.subtitle && <div className="font-serif italic text-2xl mb-8 text-brand-dark/60">{content.subtitle}</div>}
            <h1 className={`font-serif ${titleSize} leading-[0.9] font-normal tracking-tight text-brand-dark`}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-[#f4f4f0] ${padding} flex flex-col relative`}>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-serif ${contentTitleSize} font-normal tracking-tight mb-12 text-brand-dark border-b border-brand-dark/20 pb-8`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-serif whitespace-pre-wrap text-brand-dark/80`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className={`font-serif text-7xl font-normal tracking-tight mb-16 text-[#f4f4f0]`}>{renderText(content.cta)}</h2>
            <div className="font-serif italic text-3xl text-[#f4f4f0]/60 border-b border-[#f4f4f0]/30 pb-2">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "y2k") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-fuchsia-500 ${padding} flex flex-col justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px] bg-white/20 backdrop-blur-md p-12 rounded-[3rem] border-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.5)]">
            {content.subtitle && <div className="inline-block px-6 py-2 bg-white text-fuchsia-500 font-bold uppercase tracking-widest text-xl mb-6 rounded-full">{content.subtitle}</div>}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-black uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_#000]`}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col relative border-[16px] border-fuchsia-500 rounded-[4rem]`}>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-fuchsia-500`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-bold whitespace-pre-wrap text-brand-dark`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-fuchsia-500 ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className={`font-display text-8xl font-black uppercase tracking-tight mb-12 text-white drop-shadow-[4px_4px_0px_#000]`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-12 py-6 bg-white text-fuchsia-500 font-black uppercase tracking-widest text-4xl rounded-full shadow-[8px_8px_0px_0px_#000]">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "monochrome") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col justify-center relative border-[20px] border-black`}>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 grayscale" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px]">
            {content.subtitle && <div className="inline-block px-4 py-2 bg-black text-white font-bold uppercase tracking-widest text-xl mb-8">{content.subtitle}</div>}
            <h1 className={`font-display ${titleSize} leading-[0.85] font-black uppercase tracking-tighter text-black`}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-white ${padding} flex flex-col relative border-[20px] border-black`}>
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-black border-b-8 border-black pb-8`}>{content.title}</h2>
            <div className={`${bodySize} leading-snug font-bold whitespace-pre-wrap text-black`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-black ${padding} flex flex-col items-center justify-center relative text-center border-[20px] border-white`}>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className={`font-display text-8xl font-black uppercase tracking-tight mb-16 text-white`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-4xl">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  if (template === "gradient-mesh") {
    if (slideType === "cover") {
      return (
        <div className={`w-full h-full bg-gradient-to-br from-brand-pink via-brand-red to-brand-dark ${padding} flex flex-col justify-center relative`}>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={bgStyle}></div>
          <div className="relative z-10 max-w-[900px] bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20">
            {content.subtitle && <div className="inline-block px-6 py-2 bg-white/20 text-white font-bold uppercase tracking-widest text-xl mb-6 rounded-full">{content.subtitle}</div>}
            <h1 className={`font-display ${titleSize} leading-[0.9] font-bold uppercase tracking-tighter text-white`}>{renderText(content.title)}</h1>
          </div>
        </div>
      );
    }
    if (slideType === "content") {
      return (
        <div className={`w-full h-full bg-gradient-to-br from-brand-pink via-brand-red to-brand-dark ${padding} flex flex-col relative`}>
          <div className="relative z-10 flex-1 flex flex-col bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl">
            <h2 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight mb-12 text-brand-dark`}>{content.title}</h2>
            <div className={`${bodySize} leading-relaxed font-medium whitespace-pre-wrap text-brand-dark/80`}>{content.body}</div>
          </div>
        </div>
      );
    }
    if (slideType === "cta") {
      return (
        <div className={`w-full h-full bg-gradient-to-br from-brand-pink via-brand-red to-brand-dark ${padding} flex flex-col items-center justify-center relative text-center`}>
          <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-xl p-16 rounded-3xl border border-white/20">
            <h2 className={`font-display text-7xl font-bold uppercase tracking-tight mb-12 text-white`}>{renderText(content.cta)}</h2>
            <div className="inline-block px-12 py-6 bg-white text-brand-dark font-bold uppercase tracking-widest text-3xl rounded-full">@meyre.visuals</div>
          </div>
        </div>
      );
    }
  }

  // Fallback for lime, dark, brutalist, minimal, split, grid
  return (
    <div className={`w-full h-full bg-white border-[16px] border-brand-dark ${padding} flex flex-col justify-between relative`}>
      <div className="absolute inset-0 opacity-10" style={bgStyle}></div>
      <div className="relative z-10 w-full">
        {slideType === "cover" && <h1 className={`font-display ${titleSize} leading-[0.85] font-black uppercase tracking-tighter text-brand-dark`}>{renderText(content.title)}</h1>}
        {slideType === "content" && <><h2 className={`font-display ${contentTitleSize} font-black uppercase tracking-tight mb-12 text-brand-dark border-b-8 border-brand-red pb-8`}>{content.title}</h2><div className={`${bodySize} leading-snug font-bold whitespace-pre-wrap text-brand-dark`}>{content.body}</div></>}
        {slideType === "cta" && <div className="text-center"><h2 className={`font-display text-8xl font-black uppercase tracking-tight mb-16 text-brand-dark leading-none`}>{renderText(content.cta)}</h2><div className="w-full bg-brand-dark text-white py-8 font-black uppercase tracking-widest text-5xl">@meyre.visuals</div></div>}
      </div>
    </div>
  );
}
