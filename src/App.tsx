import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Add other routes here as you migrate more pages */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/book" element={<Book />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/partners" element={<Partners />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
