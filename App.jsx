import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CreatePost from './CreatePost';
import PostPage from './PostPage'; // Import the new component
import UpdatePost from './UpdatePost';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');  // State to hold the search term

  const handleSearchChange = (event) => {  // Update searchTerm when user types
    setSearchTerm(event.target.value);
  };

  return (
    <BrowserRouter>
      <div className="background-image"> </div>
      <header>
        <nav className="navbar">
          <div className="brand">AnimeHub</div>
          <div className="search">
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Create New Post</Link>
          </div>
          
        </nav>
      </header>
      
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
