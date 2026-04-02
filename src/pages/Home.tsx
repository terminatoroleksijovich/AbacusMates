import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { ArrowRight, Zap, Clock, ShieldAlert, Heart, CheckCircle2 } from "lucide-react";
import { Logo, Pattern } from "../components/Navbar";

const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-brand-dark text-brand-bg py-4 border-y-4 border-brand-red">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      className="flex whitespace-nowrap font-display font-bold text-2xl uppercase tracking-widest"
    >
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center">
          <span className="mx-4">Web Design</span>
          <span className="mx-4 text-brand-red">✦</span>
          <span className="mx-4">Landing Pages</span>
          <span className="mx-4 text-brand-red">✦</span>
          <span className="mx-4">Fast Delivery</span>
          <span className="mx-4 text-brand-red">✦</span>
          <span className="mx-4">Under $1000</span>
          <span className="mx-4 text-brand-red">✦</span>
        </div>
      ))}
    </motion.div>
  </div>
);

const CuteEyes = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  return (
    <div className="flex gap-3 mb-6">
      <Eye mouseX={mouseX} mouseY={mouseY} />
      <Eye mouseX={mouseX} mouseY={mouseY} />
    </div>
  );
};

const Eye = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);

  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX.get() - centerX;
    const dy = mouseY.get() - centerY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.05, 10);

    pupilX.set(Math.cos(angle) * dist);
    pupilY.set(Math.sin(angle) * dist);
  });

  return (
    <div ref={ref} className="w-14 h-14 bg-white rounded-full border-4 border-brand-dark flex items-center justify-center relative overflow-hidden shadow-[4px_4px_0px_0px_#1a1a1a]">
      <motion.div style={{ x: pupilX, y: pupilY }} className="w-6 h-6 bg-brand-dark rounded-full" />
    </div>
  );
};

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24">
        <Pattern />
        
        {/* Background animated elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden flex items-center justify-end md:justify-center opacity-30 md:opacity-20 pointer-events-none">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] max-w-[800px] max-h-[800px] translate-x-1/4 md:translate-x-0"
           >
             <Logo className="w-full h-full" />
           </motion.div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[4.5rem] leading-[0.9] sm:text-8xl md:text-9xl lg:text-[10rem] font-bold uppercase tracking-tighter text-brand-dark"
          >
            Websites <br/>
            <span className="text-brand-red">that</span> <br/>
            work.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 text-xl md:text-3xl max-w-2xl font-medium text-brand-dark/80"
          >
            Purposeful design. Fast. Zero headache for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <button className="bg-brand-red text-white font-display font-bold uppercase tracking-wider text-lg md:text-xl px-8 py-5 rounded-2xl shadow-[6px_6px_0px_0px_#1a1a1a] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#1a1a1a] transition-all flex items-center gap-3">
              I need a website <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      <Marquee />

      {/* Problem Section */}
      <section className="bg-brand-dark text-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <Pattern />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldAlert className="w-16 h-16 text-brand-red shrink-0" />
            </motion.div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              A bad website <br className="hidden md:block" />kills trust
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 mt-12">
            <div className="text-2xl md:text-3xl leading-snug font-medium">
              You might be the best expert in your niche. You might have the perfect product. But if your website looks like a greeting from 2007 — <span className="text-brand-red">they won't trust you.</span>
            </div>
            <div className="text-lg md:text-xl leading-relaxed text-brand-bg/70">
              Bad design destroys your competence. It screams to clients: "We are amateurs". Don't lose money and reputation over visual garbage. Your business deserves packaging that sells itself and commands respect from the first second.
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 -bottom-32 w-[30rem] h-[30rem] opacity-5 text-brand-red pointer-events-none"
        >
          <Logo className="w-full h-full" />
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-6">
            Minimum <br/>effort from you.
          </h2>
          <p className="text-xl md:text-3xl font-medium text-brand-dark/70 mb-16 max-w-3xl">
            We value your time. No endless calls or complicated briefs.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Idea",
                desc: "We discuss your task, goals, and vision. Fast and to the point.",
                icon: <Zap className="w-10 h-10" />
              },
              {
                num: "02",
                title: "Prototype",
                desc: "I show you an interactive prototype. You see how it works before any code is written.",
                icon: <CheckCircle2 className="w-10 h-10" />
              },
              {
                num: "03",
                title: "Release",
                desc: "You approve, and within a week you get a fully finished and deployed website.",
                icon: <Clock className="w-10 h-10" />
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] relative overflow-hidden group hover:-translate-y-2 transition-transform"
              >
                <CuteEyes mouseX={mouseX} mouseY={mouseY} />
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-brand-pink mb-8 absolute top-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity"
                >
                  {step.icon}
                </motion.div>
                <div className="font-display text-7xl font-bold text-brand-bg mb-6 group-hover:text-brand-red transition-colors">{step.num}</div>
                <h3 className="font-display text-4xl font-bold uppercase mb-4 text-brand-dark">{step.title}</h3>
                <p className="text-lg md:text-xl font-medium text-brand-dark/70 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-brand-red text-white py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 z-10">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-8">
              Pricing that doesn't bite.
            </h2>
            <p className="text-xl md:text-3xl font-medium text-white/90 mb-10 leading-relaxed">
              We just launched, so we're offering an exclusive discount for clients coming through Instagram.
            </p>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-block bg-brand-dark text-brand-bg font-display font-bold text-5xl md:text-7xl px-10 py-6 rounded-[2.5rem] -rotate-3 shadow-[12px_12px_0px_0px_#f27983] transition-transform cursor-default"
            >
              under $1000
            </motion.div>
            <br/>
            <p className="mt-8 text-xl font-bold text-brand-dark uppercase tracking-widest bg-brand-bg inline-block px-4 py-2 rounded-lg">
              For a turnkey project
            </p>
          </div>
          <div className="flex-1 w-full relative">
            <motion.div 
              animate={{ rotate: [6, 8, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-dark rounded-[3rem] transform translate-x-4 translate-y-4"
            ></motion.div>
            <div className="bg-brand-pink rounded-[3rem] p-8 md:p-12 border-4 border-brand-dark relative z-10">
              <ul className="space-y-6 md:space-y-8">
                {[
                  "Unique design",
                  "Responsive layout",
                  "Basic SEO optimization",
                  "Analytics setup",
                  "Domain connection"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 text-2xl md:text-3xl font-bold text-brand-dark font-display uppercase tracking-tight">
                    <CheckCircle2 className="w-10 h-10 text-brand-dark shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative">
        <Pattern />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-20 h-20 text-brand-red mx-auto mb-10 fill-brand-red" />
          </motion.div>
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-brand-dark mb-10">
            Looking for soulful projects
          </h2>
          <p className="text-2xl md:text-4xl font-medium text-brand-dark/80 leading-relaxed mb-12">
            If your idea and the spirit of your work resonate with me — I (Victor) will personally make a <span className="text-brand-red font-bold">free prototype</span> for you and give an extra discount.
          </p>
          <div className="inline-block bg-brand-dark text-brand-bg px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm md:text-base shadow-[6px_6px_0px_0px_#f27983]">
            * The work goes into my portfolio
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-brand-dark text-brand-bg py-24 md:py-32 px-6 md:px-12 text-center rounded-t-[3rem] md:rounded-t-[5rem] border-t-8 border-brand-red relative overflow-hidden">
        <Pattern />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tight mb-12">
            Ready to <br className="md:hidden" />start?
          </h2>
          <motion.button 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="bg-brand-bg text-brand-dark font-display font-bold uppercase tracking-wider text-xl md:text-3xl px-12 py-6 md:px-16 md:py-8 rounded-full shadow-[8px_8px_0px_0px_#e60023] hover:translate-y-2 hover:shadow-[0px_0px_0px_0px_#e60023] transition-all"
          >
            Message on Telegram
          </motion.button>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] opacity-5 pointer-events-none"
        >
          <Logo className="w-full h-full" />
        </motion.div>
      </footer>
    </div>
  );
}
