import { motion } from "motion/react";
import { Pattern } from "../components/Navbar";
import { Star, MessageSquareQuote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  niche: string;
  text: string;
  rating: number;
  long?: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Marcus D.",
    niche: "Tattoo Studio Owner",
    rating: 5,
    long: true,
    text: "I honestly thought this guy was just another spammer in my DMs. Almost ignored his message completely. But man, I am so glad I gave it a shot. Victor built us a site that actually captures our heavy/dark vibe. We've seen a massive bump in bookings just from Google alone. Best $1000 I ever spent."
  },
  {
    id: 2,
    name: "Sarah J.",
    niche: "Nail Art Studio",
    rating: 5,
    text: "dude knows exactly what he is doing. website looks sick and is super fast. crazy value. btw Victor still waiting for you to come get that tattoo we talked about ahah"
  },
  {
    id: 3,
    name: "Leon",
    niche: "Barbershop",
    rating: 5,
    text: "Was paying some corporate agency $500 a month for absolute garbage. Victor did a one time setup and it looks 10x better. traffic is up, booking is flawless. absolute lifesaver."
  },
  {
    id: 4,
    name: "Jessie M.",
    niche: "Reptiles & Exotic Pets",
    rating: 5,
    long: true,
    text: "kind of a weird niche but he nailed the aesthetic perfectly. I was super skeptical about the price, thought it was gonna be a cheap template, but its totally custom and unique. my exotic snake sales actually went up lol."
  },
  {
    id: 5,
    name: "Dr. Elena",
    niche: "Aesthetic Clinic",
    rating: 5,
    text: "The conversion rate is crazy now. People actually read our services instead of getting lost. Thank you Victor! paid $900 and regret nothing."
  },
  {
    id: 6,
    name: "Danny",
    niche: "Piercing Parlor",
    rating: 5,
    text: "Sick website. Definitly recommend if you want something that doesn't look like every other basic site out there. 10/10. Money well spent."
  },
  {
    id: 7,
    name: "Chloe T.",
    niche: "Brow Expert",
    rating: 5,
    text: "He understood what I wanted without me even explaning it properly lol. I get so many compliments on my site now. It literally does the selling for me. best investment."
  },
  {
    id: 8,
    name: "Big Mike",
    niche: "Custom Choppers",
    rating: 5,
    long: true,
    text: "Im terrible with computers and internet stuff. I just want to build bikes and stay greasy. Victor took ALL the headache away for just under a grand. Now people find my shop on google without me having to dance on TikTok or post every day."
  },
  {
    id: 9,
    name: "Mia",
    niche: "Lash Extensions",
    rating: 5,
    text: "amazing work! so fast and the design is 🔥 my schedule is booked out for weeks."
  },
  {
    id: 10,
    name: "Luna",
    niche: "Tarot & Astrology",
    rating: 5,
    text: "The dark vibe is exactly what my brand needed. It feels magical but very professional. Worth every single penny."
  },
  {
    id: 11,
    name: "Jake 'Bones'",
    niche: "Tattoo Artist",
    rating: 5,
    long: true,
    text: "Didn't expect much to be honest... but holy shit. The site is an absolute beast. Client flow increased noticeably and people actually tell me my site looks badass."
  },
  {
    id: 12,
    name: "Amanda",
    niche: "Hair Stylist",
    rating: 5,
    text: "so clean and easy for my clients to book! Victor was super chill to work with. No stress at all."
  },
  {
    id: 13,
    name: "Rachel V.",
    niche: "Permanent Makeup",
    rating: 5,
    text: "I almost ghosted him when he first messaged me... so glad I didn't lol. The site paid for itself in literally two weeks with new clients hitting my booking link."
  }
];

export default function Reviews() {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white pt-32 px-6 md:px-12 relative overflow-hidden bg-brand-bg">
      <Pattern />
      
      <div className="max-w-7xl mx-auto relative z-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-6">
            Word on the <br/>
            <span className="text-brand-red">Street</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-brand-dark/70 max-w-2xl mx-auto">
            Look, I get a lot of hate in my DMs from my cold outreach. I'm not perfect, and neither is my approach...
          </p>
        </motion.div>

        {/* Self-Deprecating "Not that good" 1-star Section */}
        <div className="mb-24 text-center">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: 5, rotate: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="bg-brand-red rounded-[2rem] border-4 border-brand-dark p-8 shadow-[8px_8px_0px_0px_#1a1a1a] text-left relative transform -rotate-2 cursor-pointer"
            >
              <div className="flex gap-1 mb-6">
                <Star className="w-6 h-6 fill-white text-white" />
                <Star className="w-6 h-6 fill-none text-white/40" />
                <Star className="w-6 h-6 fill-none text-white/40" />
                <Star className="w-6 h-6 fill-none text-white/40" />
                <Star className="w-6 h-6 fill-none text-white/40" />
              </div>
              
              <p className="text-white font-bold text-2xl leading-snug mb-8 uppercase tracking-wide">
                "Fuck off dude stop spamming me"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-dark flex items-center justify-center font-display font-bold text-2xl uppercase text-brand-dark">
                  A
                </div>
                <div>
                  <h4 className="font-bold uppercase text-white tracking-wide">Angry Guy</h4>
                  <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Another DM Target</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h3 className="font-display text-2xl md:text-4xl font-bold uppercase text-brand-dark">
            But honestly? <span className="text-brand-red">Some</span> people actually like what I do.
          </h3>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="break-inside-avoid bg-white rounded-[2rem] border-4 border-brand-dark p-8 shadow-[8px_8px_0px_0px_#1a1a1a] hover:shadow-[12px_12px_0px_0px_#e60023] transition-all relative group"
            >
              <MessageSquareQuote className="absolute top-6 right-6 w-10 h-10 text-brand-dark/5 group-hover:text-brand-pink transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-red text-brand-red" />
                ))}
              </div>
              
              <p className={`text-brand-dark/80 font-medium mb-8 ${review.long ? 'text-lg leading-relaxed' : 'text-xl leading-snug'}`}>
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-dark/10 border-2 border-brand-dark flex items-center justify-center font-display font-bold text-xl uppercase text-brand-dark">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold uppercase text-brand-dark tracking-wide">{review.name}</h4>
                  <p className="text-sm font-medium text-brand-red uppercase tracking-wider">{review.niche}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
