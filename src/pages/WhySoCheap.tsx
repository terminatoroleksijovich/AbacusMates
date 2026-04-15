import { motion } from "motion/react";
import { Pattern } from "../components/Navbar";

export default function WhySoCheap() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white pt-32 px-6 md:px-12 relative overflow-hidden">
      <Pattern />
      <div className="max-w-4xl mx-auto relative z-10 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-12 leading-none"
        >
          Why the hell <br />
          <span className="text-brand-red">is it so cheap?</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-xl md:text-2xl font-medium text-brand-dark/80 leading-relaxed"
        >
          <p className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight">
            Most agencies charge like $5k-$10k for this stuff. I charge around a grand. Sometimes less if we just vibe...
          </p>

          <div className="w-full h-1 bg-brand-dark/10 my-12"></div>

          <p>
            Honestly? right now I'm basically just wearing out my shorts sitting in Da Nang, Vietnam...
          </p>

          <p>
            since I was like 12 I was trying to hustle on the internet. dropshipping, cold outreach, freelance, whatever. by 16 I was grinding my ass off, working like a dog, and honestly for a long time it felt like it was all for absolutely nothing. just pure stress, zero results, thinking "what the hell am I even doing".
          </p>

          <p>
            launched a B2B thing at 19. ate a lot of dirt, failed a bunch. but eventually it worked out. now I'm 32, and those old projects kinda run themselves and pay the bills.
          </p>

          <p>
            but I have this burning itch for design. I've got 8 years of multimedia experience just sitting there. so this whole Abacus Mates thing? it's my therapy. it's an outlet. I build these sites manually from scratch, trying out new tech, just bringing whatever wild ideas I have to life.
          </p>

          <div className="bg-white border-4 border-brand-dark p-8 md:p-12 rounded-[2rem] shadow-[8px_8px_0px_0px_#1a1a1a] my-12 transform -rotate-1">
            <p className="text-2xl md:text-3xl font-bold text-brand-dark leading-snug">
              "I know exactly how much it sucks to put your heart into a business and feel like nobody gives a shit. I know how stupidly expensive it is to just get noticed online..."
            </p>
          </div>

          <p>
            so I do this in the evenings. for the soul. I'm back to doing what I did at 16—sending cold DMs, hustling—but this time I'm actualy enjoying it. it's fun.
          </p>

          <p>
            I'm not trying to scale this into some massive, soulless agency. maybe one day it'll just be my personal blog plus some services, we'll see.
          </p>

          <p className="font-bold text-brand-dark text-2xl pt-8">
            but for now? I just wanna make sick websites for cool people, without robbing them blind.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
