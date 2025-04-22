import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { throttle } from "./throttle";
import { getDogs } from "./api";
import "./styles.css";

// Persistent unique ID generator using closure and useRef
function useIDGenerator() {
  const idRef = useRef(0);
  return useCallback(() => idRef.current++, []);
}

const CarousalTest = () => {
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({});

  const getNextID = useIDGenerator();

  const fetchDogs = async () => {
    try {
      const data = await getDogs();
      setDogs(data);
      setCurrentIndex(0);
      setComments({});
      setLoading(false);
    } catch (e) {
      console.error("Error fetching dogs:", e);
      setError(true);
    }
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + dogs.length) % dogs.length);
  }, [dogs.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % dogs.length);
  }, [dogs.length]);

  const handleAddComment = useCallback(() => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const comment = {
      text: trimmed,
      votes: 0,
      id: getNextID()
    };

    setComments(prev => {
      const currentComments = prev[currentIndex] || [];
      return {
        ...prev,
        [currentIndex]: [...currentComments, comment]
      };
    });
    setNewComment('');
  }, [newComment, currentIndex, getNextID]);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleUpvote = useCallback((id) => {
    setComments(prev => {
      const updated = (prev[currentIndex] || []).map(comment =>
        comment.id === id ? { ...comment, votes: comment.votes + 1 } : comment
      );
      return { ...prev, [currentIndex]: updated };
    });
  }, [currentIndex]);

  useEffect(() => {
    fetchDogs();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const dogComments = useMemo(() => comments[currentIndex] || [], [comments, currentIndex]);

  if (loading) return <p role="status">Loading puppers...</p>;
  if (error) return <p role="alert">Something went wrong while fetching dog images. 🐶💥</p>;

  return (
    <div className="carousal-wrapper" aria-label="Dog Image Carousel">
      <img
        src={dogs[currentIndex].url}
        alt={dogs[currentIndex].title}
        className="dog-image"
        loading="lazy"
      />
      <p aria-live="polite">{currentIndex + 1} of {dogs.length}</p>

      <div className="controls-wrapper">
        <button onClick={handlePrev} aria-label="Previous dog image">Prev</button>
        <h1>{dogs[currentIndex].title}</h1>
        <button onClick={handleNext} aria-label="Next dog image">Next</button>
      </div>

      <div className="comments-wrapper">
        <label htmlFor="comment-input">Add a comment:</label>
        <input
          id="comment-input"
          name="new-comment"
          type="text"
          placeholder="Enter a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleEnter}
          aria-label="New comment"
        />
        <button onClick={handleAddComment} aria-label="Submit comment">Add</button>
      </div>

      <div aria-live="polite">
        <h2>Comments</h2>
        {dogComments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          <ul>
            {dogComments.map((comment) => (
              <li key={comment.id}>
                {comment.text}{" "}
                <button
                  onClick={() => handleUpvote(comment.id)}
                  aria-label={`Upvote comment with ${comment.votes} votes`}
                >
                  👍 {comment.votes}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarousalTest;
