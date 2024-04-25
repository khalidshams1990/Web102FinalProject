import React, { useState, useEffect } from 'react';
import { supabase } from './client';
import { toRelativeString } from './dateUtils';
import { Link } from 'react-router-dom';

const HomePage = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('newest'); // State to keep track of the sorting type

  useEffect(() => {
    fetchPosts();
  }, [searchTerm, sortType]);  // Refetch posts when searchTerm or sortType changes

  const fetchPosts = async () => {
    let query = supabase.from('Posts').select('*');

    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }
    
    // Sort based on the sortType state
    if (sortType === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (sortType === 'mostPopular') {
      query = query.order('upvotes', { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  // Handler for sort button clicks
  const handleSort = (type) => {
    setSortType(type);
  };

  return (
    <div>
      <div className="sort-buttons">
        <button onClick={() => handleSort('newest')} className={sortType === 'newest' ? 'active' : ''}>Newest</button>
        <button onClick={() => handleSort('mostPopular')} className={sortType === 'mostPopular' ? 'active' : ''}>Most Popular</button>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
            <div className="post-card">
              <div className="post-meta">
                <span>Posted {toRelativeString(new Date(post.created_at))} ago</span>
                <span>{post.upvotes} upvotes</span>
              </div>
              <h3 className="post-title">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
