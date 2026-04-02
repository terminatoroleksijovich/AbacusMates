import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";
import { ArrowRight, Zap, Clock, ShieldAlert, Heart, CheckCircle2 } from "lucide-react";
import { Logo, Pattern } from "../components/Navbar";

// Animation Variants for smoother text and block reveals
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

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

const FloatingShape = ({ 
  className, 
  type = "solid-red", 
  delay = 0, 
  size = "w-12 h-12",
  duration = 8,
  onDoubleClick
}: { 
  className?: string, type?: string, delay?: number, size?: string, duration?: number, onDoubleClick?: () => void 
}) => {
  let styleClass = "";
  if (type === "solid-red") styleClass = "bg-brand-red";
  if (type === "solid-pink") styleClass = "bg-brand-pink";
  if (type === "outline-red") styleClass = "border-4 border-brand-red bg-transparent";
  if (type === "outline-dark") styleClass = "border-4 border-brand-dark bg-transparent";
  if (type === "outline-pink") styleClass = "border-4 border-brand-pink bg-transparent";

  return (
    <motion.div
      onDoubleClick={onDoubleClick}
      className={`absolute rounded-2xl md:rounded-3xl pointer-events-auto z-0 cursor-crosshair ${styleClass} ${size} ${className}`}
      initial={{ rotate: 45 }}
      animate={{ 
        y: [0, -40, 0], 
        x: [0, 20, 0],
        rotate: [45, 135, 45],
        scale: [1, 1.1, 1]
      }}
      whileHover={{ 
        scale: 1.3, 
        rotate: 180, 
        transition: { type: "spring", stiffness: 400, damping: 10 } 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
};

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const navigate = useNavigate();

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

        {/* Floating Decorative Shapes */}
        <FloatingShape type="outline-red" size="w-16 h-16 md:w-24 md:h-24" className="top-1/4 left-[-2rem] md:left-10 opacity-40" delay={0} duration={12} />
        <FloatingShape type="solid-pink" size="w-8 h-8 md:w-12 md:h-12" className="top-1/3 right-10 md:right-32 opacity-50" delay={2} duration={9} />
        <FloatingShape type="solid-red" size="w-12 h-12 md:w-16 md:h-16" className="bottom-1/4 left-1/3 opacity-30" delay={4} duration={15} />
        <FloatingShape type="outline-dark" size="w-20 h-20 md:w-32 md:h-32" className="bottom-20 right-1/4 opacity-10" delay={1} duration={18} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto w-full relative z-10"
        >
          <motion.h1 
            variants={fadeUp}
            className="font-display text-[4.5rem] leading-[0.9] sm:text-8xl md:text-9xl lg:text-[10rem] font-bold uppercase tracking-tighter text-brand-dark"
          >
            Websites <br/>
            <span className="text-brand-red">that</span> <br/>
            work.
          </motion.h1>
          
          <motion.p 
            variants={fadeUp}
            className="mt-8 text-xl md:text-3xl max-w-2xl font-medium text-brand-dark/80"
          >
            Purposeful design. Fast. Zero headache for you <br className="hidden md:block" />(we take the painkillers).
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-4"
          >
            <motion.a 
              animate={{ y: [-2, 2, -2] }}
              whileHover={{ scale: 1.05, rotate: -2, y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              href="https://www.instagram.com/meyre.visuals/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red text-white font-display font-bold uppercase tracking-wider text-lg md:text-xl px-8 py-5 rounded-2xl shadow-[6px_6px_0px_0px_#1a1a1a] hover:shadow-[10px_10px_0px_0px_#1a1a1a] transition-shadow flex items-center gap-3"
            >
              I need a website <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Marquee />

      {/* Problem Section */}
      <section className="bg-brand-dark text-brand-bg py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <Pattern />
        
        <FloatingShape type="outline-red" size="w-24 h-24 md:w-40 md:h-40" className="top-10 right-[-2rem] md:right-10 opacity-20" delay={0} duration={14} />
        <FloatingShape type="solid-pink" size="w-12 h-12 md:w-20 md:h-20" className="bottom-20 left-[-1rem] md:left-10 opacity-20" delay={3} duration={11} />
        <FloatingShape type="outline-pink" size="w-16 h-16 md:w-24 md:h-24" className="top-1/2 left-1/4 opacity-10" delay={5} duration={16} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              whileHover={{ scale: 1.2, rotate: 15, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="cursor-pointer"
            >
              <ShieldAlert className="w-16 h-16 text-brand-red shrink-0" />
            </motion.div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight">
              A bad website <br className="hidden md:block" />kills trust <br className="hidden md:block" /><span className="text-brand-red text-3xl md:text-5xl">(and makes us cry)</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 mt-12">
            <motion.div 
              variants={fadeUp}
              className="text-2xl md:text-3xl leading-snug font-medium"
            >
              You might be the best expert in your niche. You might have the perfect product. But if your website looks like a greeting from 2007 — <span className="text-brand-red">they won't trust you.</span> They'll just run away.
            </motion.div>
            <motion.div 
              variants={fadeUp}
              className="text-lg md:text-xl leading-relaxed text-brand-bg/70"
            >
              Bad design destroys your competence. It screams to clients: "We are amateurs". Don't lose money and reputation over visual garbage. Your business deserves packaging that sells itself and commands respect from the first second.
            </motion.div>
          </div>
        </motion.div>
        
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
      <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <FloatingShape type="solid-red" size="w-10 h-10 md:w-16 md:h-16" className="top-20 right-1/4 opacity-20" delay={1} duration={10} />
        <FloatingShape type="outline-dark" size="w-16 h-16 md:w-24 md:h-24" className="bottom-20 left-1/4 opacity-10" delay={4} duration={13} />
        <FloatingShape type="solid-pink" size="w-14 h-14 md:w-20 md:h-20" className="top-1/2 right-[-1rem] md:right-10 opacity-30" delay={2} duration={15} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-6">
            Minimum <br/>effort from you.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl md:text-3xl font-medium text-brand-dark/70 mb-16 max-w-3xl">
            We value your time. No endless calls or complicated briefs.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Idea",
                desc: "We discuss your task, goals, and vision. Fast and to the point. No 5-hour meetings.",
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
                desc: "You approve, and within a week you get a fully finished and deployed website. Magic.",
                icon: <Clock className="w-10 h-10" />
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ y: -15, scale: 1.02, rotate: 1, transition: { type: "spring", stiffness: 400, damping: 15 } }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] hover:shadow-[12px_12px_0px_0px_#e60023] relative overflow-hidden group transition-shadow cursor-pointer"
              >
                <CuteEyes mouseX={mouseX} mouseY={mouseY} />
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  whileHover={{ scale: 1.2, rotate: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
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
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="bg-brand-red text-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <FloatingShape type="outline-dark" size="w-32 h-32 md:w-48 md:h-48" className="top-[-2rem] left-[-2rem] md:top-10 md:left-10 opacity-20" delay={0} duration={20} />
        <FloatingShape onDoubleClick={() => navigate('/secret')} type="solid-pink" size="w-16 h-16 md:w-24 md:h-24" className="bottom-10 right-1/3 opacity-30" delay={3} duration={12} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10"
        >
          <motion.div variants={fadeUp} className="flex-1 z-10">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-8">
              Pricing that doesn't bite <span className="text-brand-dark">(much)</span>.
            </h2>
            <p className="text-xl md:text-3xl font-medium text-white/90 mb-10 leading-relaxed">
              We just launched, so we're offering an exclusive discount for clients coming through Instagram.
            </p>
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-3, -1, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="inline-block bg-brand-dark text-brand-bg font-display font-bold text-5xl md:text-7xl px-10 py-6 rounded-[2.5rem] -rotate-3 shadow-[12px_12px_0px_0px_#f27983] transition-transform cursor-default"
            >
              under $1000
            </motion.div>
            <br/>
            <p className="mt-8 text-xl font-bold text-brand-dark uppercase tracking-widest bg-brand-bg inline-block px-4 py-2 rounded-lg">
              For a turnkey project
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex-1 w-full relative">
            <motion.div 
              animate={{ rotate: [6, 8, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-dark rounded-[3rem] transform translate-x-4 translate-y-4"
            ></motion.div>
            <div className="bg-brand-pink rounded-[3rem] p-8 md:p-12 border-4 border-brand-dark relative z-10">
              <ul className="space-y-6 md:space-y-8">
                {[
                  "Unique design (no boring templates)",
                  "Responsive layout",
                  "Basic SEO optimization",
                  "Analytics setup",
                  "Domain connection"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    animate={{ x: [-2, 2, -2] }}
                    whileHover={{ x: 10, scale: 1.02, color: "#e60023", transition: { type: "spring", stiffness: 400, damping: 15 } }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="flex items-center gap-6 text-2xl md:text-3xl font-bold text-brand-dark font-display uppercase tracking-tight cursor-default"
                  >
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                      <CheckCircle2 className="w-10 h-10 text-brand-dark shrink-0" />
                    </motion.div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Special Offer */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
        <Pattern />
        
        <FloatingShape type="outline-red" size="w-20 h-20 md:w-32 md:h-32" className="top-20 left-[-1rem] md:left-20 opacity-20" delay={1} duration={14} />
        <FloatingShape type="solid-pink" size="w-12 h-12 md:w-20 md:h-20" className="bottom-20 right-[-1rem] md:right-20 opacity-30" delay={4} duration={11} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            variants={fadeUp}
            animate={{ scale: [1, 1.1, 1], y: [0, -15, 0] }}
            whileHover={{ scale: 1.3, rotate: 10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer inline-block"
          >
            <Heart className="w-20 h-20 text-brand-red mx-auto mb-10 fill-brand-red" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tight text-brand-dark mb-10">
            Looking for soulful projects
          </motion.h2>
          <motion.p variants={fadeUp} className="text-2xl md:text-4xl font-medium text-brand-dark/80 leading-relaxed mb-12">
            If your idea and the spirit of your work resonate with me — I (Victor) will personally make a <span className="text-brand-red font-bold">free prototype</span> for you and give an extra discount.
          </motion.p>
          <motion.div variants={fadeUp} className="inline-block bg-brand-dark text-brand-bg px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm md:text-base shadow-[6px_6px_0px_0px_#f27983]">
            * The work goes into my portfolio
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-brand-dark text-brand-bg py-24 md:py-32 px-6 md:px-12 text-center rounded-t-[3rem] md:rounded-t-[5rem] border-t-8 border-brand-red relative overflow-hidden">
        <Pattern />
        
        <FloatingShape type="outline-red" size="w-24 h-24 md:w-40 md:h-40" className="top-10 left-1/4 opacity-20" delay={0} duration={15} />
        <FloatingShape type="solid-pink" size="w-16 h-16 md:w-24 md:h-24" className="bottom-20 right-1/4 opacity-30" delay={3} duration={12} />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.h2 variants={fadeUp} className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tight mb-12">
            Ready to <br className="md:hidden" />start?
          </motion.h2>
          <motion.a 
            variants={fadeUp}
            href="https://www.instagram.com/meyre.visuals/"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -10, 0] }}
            whileHover={{ scale: 1.05, rotate: 2, y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block bg-brand-bg text-brand-dark font-display font-bold uppercase tracking-wider text-xl md:text-3xl px-12 py-6 md:px-16 md:py-8 rounded-full shadow-[8px_8px_0px_0px_#e60023] hover:shadow-[12px_12px_0px_0px_#e60023] transition-shadow"
          >
            Slide into Insta DMs
          </motion.a>
        </motion.div>
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
