// CreatePost.jsx
import React, { useState } from 'react';
import { supabase } from './client'; // make sure the path to your supabase client is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate(); // For navigation after post creation

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Indicate the start of a submission
    const { data, error } = await supabase
      .from('Posts')
      .insert([
        { title, content, image_url: imageUrl }
      ]);
    setSubmitting(false); // Submission has ended

    if (error) {
      console.error('Error creating post:', error);
      setSubmitting(false);
    } else {
      console.log('Post created successfully', data);
      // Reset form fields
      setTitle('');
      setContent('');
      setImageUrl('');
      navigate('/');
    }
  };

  return (
    <div className="submitting">
      {submitting && <p>Submitting post...</p>}

      <div className="create-post-container">
        <form onSubmit={handleCreatePost} className="create-post-form">
            <h1>Create New Post</h1>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content (Optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (Optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit" disabled={submitting}>Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
