import React, { useEffect, useState } from "react";
import { getDogs } from "./api";
import "./app.css";

const DogsCarousal = () => {
  const [dogs, setDogs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [length, setLength] = useState(10);
  const [error, setError] = useState(false);

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
    });
  }, [length]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % dogs.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  // 👇 Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dogs]);

  if (loading) return <p>Loading puppers...</p>;
  if (error) return <p>Something went wrong while fetching dog images. 🐶💥</p>;

  return (
    <div className="slideshow">
      <h1>{dogs[current].title}</h1>
      <img src={dogs[current].url} alt={dogs[current].title} />
      <div className="controls">
        <button onClick={handlePrev} disabled={dogs.length === 0}>Previous</button>
        <button onClick={handleNext} disabled={dogs.length === 0}>Next</button>
      </div>
      <div className="settings">
        <label>
          Show top&nbsp;
          <input
            type="number"
            min="1"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          &nbsp;dogs
        </label>
      </div>
    </div>
  );
}

export default DogsCarousal;
