import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Pattern } from "../components/Navbar";
import { Trash2 } from "lucide-react";

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

  if (loading || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 pb-32 relative">
      <Pattern />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display text-5xl font-bold uppercase">Admin Panel</h1>
          <button onClick={handleLogout} className="text-brand-red font-bold uppercase hover:underline">Logout</button>
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
