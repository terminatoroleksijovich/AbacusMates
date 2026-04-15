import { motion } from "motion/react";
import { Pattern } from "../components/Navbar";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Work {
  id: string;
  title: string;
  description: string;
  before: string;
  after: string;
  stats: string[];
  imageUrl: string;
  link: string;
}

const HARDCODED_WORKS: Work[] = [
  {
    id: "pacific-rose",
    title: "Pacific Rose",
    description: "We hooked Pacific Rose up with a brutalist digital storefront that actually matches their heavy-hitting style. Dropped about a grand, and now their booking pipeline is literally working while they sleep.",
    before: "Their old site was a generic template. Booking was a headache, and they were bleeding local traffic to shops down the street.",
    after: "A custom, slick setup that screams their vibe. Booking is seamless, and they're dominating local Google searches.",
    stats: ["+15% Bookings", "Local SEO Domination", "~$1k Budget"],
    imageUrl: "https://image.thum.io/get/width/1200/crop/800/wait/4/https://pacificrosetattoo.vercel.app/",
    link: "https://pacificrosetattoo.vercel.app/"
  },
  {
    id: "aminn-tattoo",
    title: "Aminn Tattoo",
    description: "Aminn's ink is sharp, but their old site was putting people to sleep. We stepped in, stripped the boring stuff, and built a platform that grabs attention and gets people in the chair.",
    before: "Basically a ghost town on Google. The site looked like a stock theme and didn't show off their actual talent.",
    after: "Bold, unapologetic design. They rank high locally, and clients actually feel the brand's edge before they even walk in.",
    stats: ["+10% Client Flow", "Brand Glow-Up", "Search Optimized"],
    imageUrl: "https://image.thum.io/get/width/1200/crop/800/wait/4/https://aminntattoo.vercel.app/",
    link: "https://aminntattoo.vercel.app/"
  },
  {
    id: "liquid-amber",
    title: "Liquid Amber",
    description: "No fluff, just a high-converting machine. We fixed their clunky booking flow and cranked their SEO. The investment paid for itself almost immediately.",
    before: "Users were bouncing because the booking form was a total mess. Slow load times were killing their vibe.",
    after: "Lightning-fast, smooth booking experience. Now they just wake up to organic leads sitting in their inbox.",
    stats: ["+12% Conversions", "Instant ROI", "Organic Leads"],
    imageUrl: "https://image.thum.io/get/width/1200/crop/800/wait/4/https://liquidambertattooo.vercel.app/",
    link: "https://liquidambertattooo.vercel.app/"
  },
  {
    id: "silhouelle",
    title: "Silhouelle",
    description: "They needed something elegant but with enough attitude to stand out in the beauty space. We built them a slick, high-end site that turns casual scrollers into loyal clients.",
    before: "Getting lost in the noise. The old setup was confusing, and they weren't converting their Instagram traffic into real bookings.",
    after: "A flawless, aesthetic booking machine. Traffic flows perfectly from socials to the site, and their schedule stays packed.",
    stats: ["Packed Schedule", "Smooth UX", "Social Traffic Conversion"],
    imageUrl: "https://image.thum.io/get/width/1200/crop/800/wait/4/https://silhouelle.vercel.app/",
    link: "https://silhouelle.vercel.app/"
  }
];

export default function Portfolio() {
  const works = HARDCODED_WORKS;

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white pt-32 px-6 md:px-12 relative overflow-hidden">
      <Pattern />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-24"
        >
          Selected <br/>
          <span className="text-brand-red">Works</span>
        </motion.h1>

        <div className="flex flex-col gap-32 pb-32">
          {works.map((work, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-3/5 relative group">
                  {/* Decorative Background Block */}
                  <div className={`absolute inset-0 bg-brand-red rounded-[2rem] transition-transform duration-500 ${isEven ? 'translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6' : '-translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6'}`}></div>
                  
                  <a 
                    href={work.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative block border-4 border-brand-dark rounded-[2rem] overflow-hidden bg-white z-10 shadow-[8px_8px_0px_0px_#1a1a1a] group-hover:shadow-[12px_12px_0px_0px_#1a1a1a] transition-all duration-300"
                  >
                    <img 
                      src={work.imageUrl} 
                      alt={work.title} 
                      className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-700 origin-top"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 right-6 bg-brand-red text-white font-bold px-6 py-3 uppercase border-4 border-brand-dark shadow-[4px_4px_0px_0px_#1a1a1a] rotate-3 group-hover:rotate-6 transition-transform flex items-center gap-2">
                      View Live <ExternalLink className="w-5 h-5" />
                    </div>
                  </a>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-2/5 flex flex-col gap-8 z-20">
                  <div>
                    <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-brand-dark leading-none mb-4">
                      {work.title}
                    </h2>
                    <p className="text-xl font-medium text-brand-dark/80 leading-relaxed">
                      {work.description}
                    </p>
                  </div>

                  {/* Before / After Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border-4 border-brand-dark p-5 rounded-2xl shadow-[4px_4px_0px_0px_#1a1a1a]">
                      <div className="flex items-center gap-2 text-brand-dark/50 font-bold uppercase text-sm mb-3 tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-brand-dark/30"></div>
                        Before
                      </div>
                      <div className="font-medium text-brand-dark/80 leading-snug">
                        {work.before}
                      </div>
                    </div>
                    
                    <div className="bg-brand-dark text-white border-4 border-brand-dark p-5 rounded-2xl shadow-[4px_4px_0px_0px_#e60023] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-red/20 rounded-bl-full"></div>
                      <div className="flex items-center gap-2 text-brand-red font-bold uppercase text-sm mb-3 tracking-wider relative z-10">
                        <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
                        After
                      </div>
                      <div className="font-medium leading-snug relative z-10">
                        {work.after}
                      </div>
                    </div>
                  </div>

                  {/* Stats Pills */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {work.stats.map(stat => (
                      <span 
                        key={stat} 
                        className="bg-brand-red/10 text-brand-red border-2 border-brand-red px-4 py-2 rounded-xl font-bold uppercase text-sm tracking-wide"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Bold CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-brand-red text-white p-10 md:p-16 rounded-[3rem] border-4 border-brand-dark shadow-[16px_16px_0px_0px_#1a1a1a] text-center relative overflow-hidden group"
          >
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-8 leading-tight max-w-4xl">
                We can easily do this for you.
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-10 text-white/90">
                And honestly? If you're down, we'll completely <span className="underline decoration-4 underline-offset-4">outdo</span> this portfolio. We love building stuff that looks sick and actually prints money. Let's get your schedule booked out.
              </p>
              <a 
                href="mailto:hello@abacusmates.com" 
                className="inline-flex items-center gap-3 bg-brand-dark text-white font-bold uppercase tracking-widest py-5 px-10 rounded-2xl hover:bg-white hover:text-brand-dark transition-colors border-4 border-brand-dark shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_#1a1a1a] text-lg"
              >
                Start Your Project <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
