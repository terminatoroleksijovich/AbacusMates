import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Pattern } from "../components/Navbar";
import { ExternalLink } from "lucide-react";

interface Work {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
  createdAt: string;
}

export default function Portfolio() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Work[];
      setWorks(worksData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching works: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-red selection:text-white pt-32 px-6 md:px-12 relative">
      <Pattern />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-brand-dark mb-16"
        >
          Selected <br/>
          <span className="text-brand-red">Works</span>
        </motion.h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full"
            />
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-20 text-2xl font-medium text-brand-dark/50">
            No works added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {works.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2rem] border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-brand-dark/5 relative">
                  <img 
                    src={work.imageUrl} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {work.link && (
                    <a 
                      href={work.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-brand-bg text-brand-dark p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red hover:text-white"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-bold uppercase text-brand-dark mb-3">{work.title}</h3>
                  {work.description && (
                    <p className="text-brand-dark/70 font-medium line-clamp-3">{work.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
