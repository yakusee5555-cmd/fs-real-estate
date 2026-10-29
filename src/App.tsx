import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header, MobileCallBar } from "./components/Sections";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:slug" element={<ListingDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      {/* sticky mobile bar — pad page bottom so it never covers content */}
      <div className="h-[60px] md:hidden" aria-hidden="true" />
      <MobileCallBar />
    </BrowserRouter>
  );
}
