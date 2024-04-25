import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './client';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();  // Used to navigate after deletion
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');


  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [postId]); 

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
    }
  };

  const upvotePost = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq('id', postId);

    if (error) {
      console.error('Error upvoting post:', error);
    } else {
      // Update the local state to reflect the new upvote count
      setPost({ ...post, upvotes: (post.upvotes || 0) + 1 });
    }
  };

  const deletePost = async () => {
    const { error } = await supabase
      .from('Posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/'); // Navigate back to the homepage after deletion
    }
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comments')
      .select('*')
      .eq('post_id', postId);
    
    if (!error) {
      setComments(data);
    } else {
      console.error(error);
    }
  };

  const handleNewComment = async () => {
    const { error } = await supabase
      .from('Comments')
      .insert([
        { post_id: postId, content: newComment }
      ]);

    if (!error) {
      fetchComments(); // Re-fetch comments
      setNewComment(''); // Clear the input after submission
    } else {
      console.error(error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      {post.image_url && <img src={post.image_url} alt={post.title} className="post-image"/>}
      
      <div className="upvote-section">
        <button onClick={upvotePost} className="upvote-button">👍</button>
        <span>{post.upvotes || 0} upvotes</span>
      </div>
      
      <div className="delete-section">
      <button onClick={() => navigate(`/update/${post.id}`)} className="edit-button">📝</button>
        <button onClick={deletePost} className="delete-button">🗑️</button>
      </div>
      <div className="comment-section">
  {comments.map(comment => (
    <div key={comment.id} className="comment">
      <p>{comment.content}</p>
      {/* Additional comment details */}
    </div>
  ))}
  
  <div className="new-comment-form">
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Write a comment..."
    />
    <button onClick={handleNewComment}>Comment</button>
  </div>
</div>
    </div>
  );
  
};

export default PostPage;
