import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Book } from './pages/Book';
import { Contact } from './pages/Contact';
import { Partners } from './pages/Partners';
import { LinkTree } from './pages/LinkTree';
import './index.css';

function AppContent() {
  const location = useLocation();
  const isLinkTreePage = location.pathname === '/links';

  return (
    <>
      {!isLinkTreePage && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/links" element={<LinkTree />} />
      </Routes>
      {!isLinkTreePage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
