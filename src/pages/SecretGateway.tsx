import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pattern } from "../components/Navbar";
import { motion } from "motion/react";

export default function SecretGateway() {
  const [word, setWord] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = word.trim().toLowerCase();
    
    if (cleanWord === "works") {
      localStorage.setItem("auth_admin", "true");
      navigate("/admin");
    } else if (cleanWord === "flower") {
      localStorage.setItem("auth_brand", "true");
      navigate("/brand-kit");
    } else if (cleanWord === "post") {
      localStorage.setItem("auth_post", "true");
      navigate("/post-generator");
    } else if (cleanWord !== "") {
      setShowDiscount(true);
    }
  };

  if (showDiscount) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative bg-brand-bg">
        <Pattern />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-brand-pink p-8 md:p-16 rounded-[3rem] border-4 border-brand-dark shadow-[12px_12px_0px_0px_#e60023] max-w-2xl w-full text-center relative z-10"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-6 text-brand-dark">🎉 You found a secret! 🎉</h1>
          <p className="text-2xl md:text-3xl font-medium text-brand-dark mb-8 leading-relaxed">
            You didn't guess the password, but your curiosity pays off. <br/><br/>
            <span className="bg-brand-red text-white px-4 py-2 rounded-xl inline-block transform -rotate-2">You won a 30% discount</span> on your website!
          </p>
          <div className="bg-white p-6 rounded-2xl border-4 border-brand-dark mb-8">
            <p className="text-xl font-bold uppercase text-brand-red">
              Take a screenshot of this screen and send it to my Instagram DMs to claim your reward!
            </p>
          </div>
          <a 
            href="https://www.instagram.com/meyre.visuals/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-dark text-brand-bg font-bold uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-brand-red transition-colors"
          >
            Go to Instagram
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative bg-brand-bg">
      <Pattern />
      <div className="bg-white p-12 rounded-[2rem] border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] max-w-md w-full text-center relative z-10">
        <h1 className="font-display text-4xl font-bold uppercase mb-6">Secret Gateway</h1>
        <p className="mb-8 text-brand-dark/70 font-medium">Enter the magic word.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Type here..."
            className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red text-center text-xl tracking-widest uppercase"
            autoFocus
          />
          <button 
            type="submit"
            className="w-full bg-brand-dark text-brand-bg font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-brand-red transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
