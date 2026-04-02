import { Pattern } from "../Navbar";

export function renderShowcaseTemplate(props: any) {
  const { showcaseTemplate, content, aspectRatio, images, bgStyle, renderText } = props;
  const isTall = aspectRatio === "9:16";
  const padding = isTall ? "p-24" : "p-16";
  const contentTitleSize = isTall ? "text-7xl" : "text-6xl";
  const bodySize = isTall ? "text-5xl" : "text-4xl";

  const img1 = images[0] || "https://picsum.photos/seed/site1/800/600";
  const img2 = images[1] || "https://picsum.photos/seed/site2/800/600";
  const img3 = images[2] || "https://picsum.photos/seed/site3/800/600";

  if (showcaseTemplate === "browser") {
    return (
      <div className={`w-full h-full bg-brand-red ${padding} flex flex-col relative`} style={bgStyle}>
        <div className="absolute inset-0 bg-brand-red/90 mix-blend-multiply"></div>
        <div className="relative z-10 mb-12 text-center">
          <h1 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-white`}>{content.title}</h1>
          {content.subtitle && <p className="text-3xl font-bold uppercase tracking-widest text-brand-dark mt-4">{content.subtitle}</p>}
        </div>
        <div className="relative z-10 flex-1 bg-white rounded-t-3xl border-4 border-brand-dark shadow-[16px_16px_0px_0px_#1a1a1a] overflow-hidden flex flex-col">
          <div className="h-16 border-b-4 border-brand-dark bg-brand-bg flex items-center px-6 gap-3">
            <div className="w-4 h-4 rounded-full bg-brand-red border-2 border-brand-dark"></div>
            <div className="w-4 h-4 rounded-full bg-[#d4f2a3] border-2 border-brand-dark"></div>
            <div className="w-4 h-4 rounded-full bg-brand-dark border-2 border-brand-dark"></div>
          </div>
          <div className="flex-1 bg-gray-200" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}></div>
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "cascade") {
    return (
      <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col relative overflow-hidden`}>
        <Pattern />
        <div className="relative z-10 mb-16">
          <h1 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-white`}>{content.title}</h1>
        </div>
        <div className="relative z-10 flex-1">
          <img src={img1} className="absolute top-0 left-0 w-2/3 aspect-video object-cover rounded-2xl border-4 border-brand-red shadow-2xl z-10 transform -rotate-2" alt="" />
          <img src={img2} className="absolute top-1/4 right-0 w-2/3 aspect-video object-cover rounded-2xl border-4 border-[#d4f2a3] shadow-2xl z-20 transform rotate-3" alt="" />
          <img src={img3} className="absolute bottom-10 left-10 w-2/3 aspect-video object-cover rounded-2xl border-4 border-white shadow-2xl z-30 transform -rotate-1" alt="" />
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "split-showcase") {
    return (
      <div className={`w-full h-full flex ${isTall ? 'flex-col' : 'flex-row'} bg-brand-bg`}>
        <div className={`${isTall ? 'h-1/3 w-full' : 'w-1/3 h-full'} p-12 flex flex-col justify-center border-r-4 border-brand-dark`}>
          <h1 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-brand-dark mb-8`}>{content.title}</h1>
          <p className={`${bodySize} font-medium text-brand-dark/80`}>{content.body}</p>
        </div>
        <div className={`${isTall ? 'h-2/3 w-full' : 'w-2/3 h-full'} bg-gray-200`} style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </div>
    );
  }
  if (showcaseTemplate === "floating") {
    return (
      <div className={`w-full h-full bg-[#d4f2a3] ${padding} flex flex-col items-center justify-center relative`}>
        <div className="absolute inset-0 opacity-20" style={bgStyle}></div>
        <div className="relative z-10 w-4/5 aspect-[3/4] bg-white border-8 border-brand-dark rounded-3xl shadow-[32px_32px_0px_0px_#e60023] transform -rotate-3 overflow-hidden mb-16">
           <div className="w-full h-full" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}></div>
        </div>
        <h1 className={`relative z-10 font-display ${contentTitleSize} font-bold uppercase tracking-tight text-brand-dark text-center bg-white px-8 py-4 border-4 border-brand-dark rounded-full transform rotate-2`}>{content.title}</h1>
      </div>
    );
  }
  if (showcaseTemplate === "polaroid") {
    return (
      <div className={`w-full h-full bg-brand-pink ${padding} flex flex-col items-center justify-center relative`}>
        <div className="bg-white p-8 pb-32 border-4 border-brand-dark shadow-[24px_24px_0px_0px_#1a1a1a] transform rotate-2 w-5/6 relative">
          <div className="w-full aspect-square border-4 border-brand-dark" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="absolute bottom-10 left-0 w-full text-center px-8">
             <h1 className={`font-display text-6xl font-bold uppercase tracking-tight text-brand-dark`}>{content.title}</h1>
             <p className="text-2xl font-bold uppercase tracking-widest text-brand-red mt-2">{content.subtitle}</p>
          </div>
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "bento") {
    return (
      <div className={`w-full h-full bg-brand-dark ${padding} flex flex-col relative`}>
        <div className="relative z-10 mb-12">
          <h1 className={`font-display ${contentTitleSize} font-bold uppercase tracking-tight text-white`}>{content.title}</h1>
        </div>
        <div className="relative z-10 flex-1 grid grid-cols-2 grid-rows-2 gap-6">
          <div className="row-span-2 border-4 border-brand-red rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="border-4 border-[#d4f2a3] rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="border-4 border-brand-pink rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "device-mockup") {
    return (
      <div className={`w-full h-full bg-brand-bg ${padding} flex flex-col items-center justify-center relative`}>
        <div className="absolute inset-0 opacity-10" style={bgStyle}></div>
        <div className="relative z-10 w-3/4 aspect-[9/19] bg-brand-dark rounded-[3rem] border-[16px] border-brand-dark shadow-[0_0_0_4px_#e60023,32px_32px_0px_0px_#1a1a1a] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-brand-dark rounded-b-3xl z-20"></div>
          <div className="w-full h-full" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}></div>
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "perspective") {
    return (
      <div className={`w-full h-full bg-brand-red ${padding} flex flex-col items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-30" style={bgStyle}></div>
        <div className="relative z-10 w-[120%] aspect-video border-8 border-brand-dark shadow-[32px_32px_0px_0px_#1a1a1a]" style={{ transform: 'perspective(1000px) rotateY(-20deg) rotateX(10deg) scale(0.9)', backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}></div>
        <h1 className={`absolute bottom-24 right-24 font-display ${contentTitleSize} font-bold uppercase tracking-tight text-white drop-shadow-[8px_8px_0px_#1a1a1a] text-right max-w-[600px]`}>{content.title}</h1>
      </div>
    );
  }
  if (showcaseTemplate === "film-strip") {
    return (
      <div className={`w-full h-full bg-brand-dark flex flex-col justify-center relative overflow-hidden`}>
        <div className="w-[150%] h-[60%] bg-white border-y-[32px] border-black flex items-center gap-8 px-12 transform -rotate-3 -translate-x-12 relative">
          <div className="absolute top-[-24px] left-0 w-full flex justify-around"><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div></div>
          <div className="absolute bottom-[-24px] left-0 w-full flex justify-around"><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div><div className="w-8 h-8 bg-brand-dark rounded-sm"></div></div>
          <div className="w-1/3 h-5/6 bg-gray-200" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="w-1/3 h-5/6 bg-gray-200" style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="w-1/3 h-5/6 bg-gray-200" style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </div>
    );
  }
  if (showcaseTemplate === "glitch") {
    return (
      <div className={`w-full h-full bg-black ${padding} flex flex-col items-center justify-center relative`}>
        <div className="relative z-10 w-full aspect-square relative">
          <div className="absolute inset-0 mix-blend-screen opacity-80" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'drop-shadow(10px 0 0 red)' }}></div>
          <div className="absolute inset-0 mix-blend-screen opacity-80" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'drop-shadow(-10px 0 0 cyan)' }}></div>
          <div className="absolute inset-0" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }}></div>
        </div>
        <h1 className={`relative z-20 font-display ${contentTitleSize} font-black uppercase tracking-tight text-white mt-12 mix-blend-difference`}>{content.title}</h1>
      </div>
    );
  }

  return null;
}
