import React, { useEffect, useState, useCallback } from "react";
import { throttle } from "./throttle";
import { getDogs } from "./api";
import "./app.css";

const DogsCarousalWithComments = () => {
  const [dogs, setDogs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(10);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(false);

    getDogs(length).then((dogs) => {
      if (dogs.length === 0) {
        setError(true);
      }
      setDogs(dogs);
      setCurrent(0);
      setLoading(false);
      setComments({}); // reset comments on new fetch
    });
  }, [length]);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % dogs.length);
  }, [dogs.length]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + dogs.length) % dogs.length);
  }, [dogs.length]);

  useEffect(() => {
    const handleKeyDown = throttle((e) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
    }, 300);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // handleKeyDown.cancel();
    };
  }, [handleNext, handlePrev]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const dogId = current;
    const newEntry = {
      id: Date.now(),
      text: newComment,
      votes: 0,
    };
    setComments(prev => {
      const dogComments = prev[dogId] ?? [];
      const updated = [...dogComments, newEntry];
      return { ...prev, [dogId]: updated };
    });
    setNewComment("");
  };

  const handleUpvote = (dogId, commentId) => {
    setComments((prev) => ({
      ...prev,
      [dogId]: prev[dogId].map((c) =>
        c.id === commentId ? { ...c, votes: c.votes + 1 } : c
      ),
    }));
  };

  if (loading) return <p>Loading puppers...</p>;
  if (error || dogs.length === 0)
    return <p>Something went wrong while fetching dog images. 🐶💥</p>;

  const dogComments = comments[current] || [];

  return (
    <div className="slideshow">
      <h1>{dogs[current].title}</h1>
      <img src={dogs[current].url} alt={dogs[current].title || "Cute dog"} />
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <p>{current + 1} of {dogs.length}</p>

      <div className="comment-section">
        <h2>Comments</h2>
        {dogComments.length === 0 ? (
          <p>No comments yet. Be the first!</p>
        ) : (
          <ul>
            {dogComments.map((comment) => (
              <li key={comment.id}>
                {comment.text}
                <button onClick={() => handleUpvote(current, comment.id)}>👍 {comment.votes}</button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>

      <div className="settings">
        <label>
          Show top&nbsp;
          <input
            type="number"
            min="1"
            max="50"
            value={length}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val > 0 && val <= 50) {
                setLength(val);
              }
            }}
          />
          &nbsp;dogs
        </label>
      </div>
    </div>
  );
};

export default DogsCarousalWithComments
;
