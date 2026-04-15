import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Pattern } from "../components/Navbar";
import { Trash2, Sparkles, Wand2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [works, setWorks] = useState<any[]>([]);

  // Magic Generator State
  const [magicUrl, setMagicUrl] = useState("");
  const [magicContext, setMagicContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth_admin") === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWorks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("auth_admin");
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError("Title and Image URL are required");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "works"), {
        title,
        description: description || null,
        imageUrl,
        link: link || null,
        createdAt: new Date().toISOString()
      });
      setTitle("");
      setDescription("");
      setImageUrl("");
      setLink("");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this work?")) return;
    try {
      await deleteDoc(doc(db, "works", id));
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleMagicGenerate = async () => {
    if (!magicUrl) {
      setError("Please enter a website URL for the magic generator.");
      return;
    }
    setIsGenerating(true);
    setError("");

    try {
      // 1. Generate Screenshot URL
      const formattedUrl = magicUrl.startsWith('http') ? magicUrl : `https://${magicUrl}`;
      const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${formattedUrl}`;
      
      // 2. Call Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
You are an expert copywriter for a bold, no-BS, brutalist web design studio called "Abacus Mates".
We just finished a project.
Website URL: ${magicUrl}
Context/Results: ${magicContext}

Write a short, punchy, and aggressive case study description (max 3-4 sentences). Focus on the pain points solved and the results. Do not use corporate jargon. Be direct and confident.
Also provide a catchy, short Title for the project.

Return the result EXACTLY in this JSON format:
{
  "title": "Project Title",
  "description": "The punchy case study text..."
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const resultText = response.text || "{}";
      const result = JSON.parse(resultText.trim());

      // 3. Auto-fill the form
      setTitle(result.title || "Generated Project");
      setDescription(result.description || "");
      setImageUrl(screenshotUrl);
      setLink(magicUrl);
      
      // Scroll to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err: any) {
      console.error(err);
      setError("Magic generation failed: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 pb-32 relative">
      <Pattern />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display text-5xl font-bold uppercase">Admin Panel</h1>
          <button onClick={handleLogout} className="text-brand-red font-bold uppercase hover:underline">Logout</button>
        </div>

        {/* Magic Generator Section */}
        <div className="bg-brand-dark text-white p-8 md:p-12 rounded-[2rem] shadow-[8px_8px_0px_0px_#e60023] mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <Wand2 className="w-8 h-8 text-brand-red" />
              <h2 className="font-display text-3xl font-bold uppercase">Magic Portfolio Generator</h2>
            </div>
            <p className="text-white/70 mb-8 max-w-2xl">
              Paste a client's website URL and some brief context (price, results, time). Our AI will automatically grab a high-res screenshot, write a punchy case study in the Abacus Mates brand voice, and prep it for your portfolio.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block font-bold uppercase text-sm mb-2 text-brand-red">Client Website URL *</label>
                <input 
                  type="url" 
                  value={magicUrl}
                  onChange={e => setMagicUrl(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="https://client-website.com"
                />
              </div>
              
              <div>
                <label className="block font-bold uppercase text-sm mb-2 text-brand-red">Context & Results (Optional)</label>
                <textarea 
                  value={magicContext}
                  onChange={e => setMagicContext(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red transition-colors h-24 resize-none"
                  placeholder="e.g., $1000, took 5 days, doubled their conversion rate, old site was from 2007."
                />
              </div>

              <button 
                onClick={handleMagicGenerate}
                disabled={isGenerating}
                className="flex items-center justify-center gap-2 bg-brand-red text-white font-bold uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-white hover:text-brand-dark transition-colors disabled:opacity-50 w-full md:w-auto"
              >
                {isGenerating ? (
                  <>Generating Magic...</>
                ) : (
                  <><Sparkles className="w-5 h-5" /> Generate Case Study</>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2rem] border-4 border-brand-dark shadow-[8px_8px_0px_0px_#1a1a1a] mb-16">
          <h2 className="font-display text-3xl font-bold uppercase mb-8">Add New Work</h2>
          {error && <div className="bg-brand-red/10 text-brand-red p-4 rounded-xl mb-6 font-medium">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold uppercase text-sm mb-2">Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red"
                placeholder="Project Name"
              />
            </div>
            
            <div>
              <label className="block font-bold uppercase text-sm mb-2">Image URL *</label>
              <input 
                type="url" 
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red"
                placeholder="https://..."
              />
              {imageUrl && (
                <div className="mt-4 border-2 border-brand-dark rounded-xl overflow-hidden bg-brand-bg">
                  <img src={imageUrl} alt="Preview" className="w-full h-auto object-cover max-h-64" />
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold uppercase text-sm mb-2">External Link</label>
              <input 
                type="url" 
                value={link}
                onChange={e => setLink(e.target.value)}
                className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-sm mb-2">Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border-2 border-brand-dark rounded-xl p-4 focus:outline-none focus:border-brand-red h-32 resize-none"
                placeholder="Short description..."
              />
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="bg-brand-red text-white font-bold uppercase tracking-wider py-4 px-8 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Work"}
            </button>
          </form>
        </div>

        <h2 className="font-display text-3xl font-bold uppercase mb-8">Existing Works</h2>
        <div className="space-y-4">
          {works.map(work => (
            <div key={work.id} className="bg-white p-6 rounded-2xl border-2 border-brand-dark flex items-center justify-between">
              <div className="flex items-center gap-6">
                <img src={work.imageUrl} alt={work.title} className="w-20 h-20 object-cover rounded-lg border border-brand-dark/20" />
                <div>
                  <h3 className="font-bold text-xl">{work.title}</h3>
                  <p className="text-sm text-brand-dark/60">{new Date(work.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(work.id)}
                className="p-3 text-brand-red hover:bg-brand-red/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
          {works.length === 0 && <p className="text-brand-dark/50 font-medium">No works found.</p>}
        </div>
      </div>
    </div>
  );
}
