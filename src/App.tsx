import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";
import BrandKit from "./pages/BrandKit";
import SecretGateway from "./pages/SecretGateway";
import PostGenerator from "./pages/PostGenerator";
import WhySoCheap from "./pages/WhySoCheap";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/why-so-cheap" element={<WhySoCheap />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/brand-kit" element={<BrandKit />} />
        <Route path="/secret" element={<SecretGateway />} />
        <Route path="/post-generator" element={<PostGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}
