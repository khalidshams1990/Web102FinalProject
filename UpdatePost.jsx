import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './client';

const UpdatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('title, content, image_url')
      .eq('id', postId)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.image_url);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Indicate the start of a submission

    const { error } = await supabase
      .from('Posts')
      .update({ title, content, image_url: imageUrl })
      .eq('id', postId);

    setSubmitting(false); // Submission has ended

    if (error) {
      console.error('Error updating post:', error);
    } else {
      navigate(`/post/${postId}`); // Navigate to the updated post's page
    }
  };

  return (
    <div className="submitting">
      {submitting && <p>Updating post...</p>}
      <div className="create-post-container">
        <form onSubmit={handleUpdatePost} className="create-post-form">
          <h1>Edit Post</h1>
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
          <button type="submit" disabled={submitting}>Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
