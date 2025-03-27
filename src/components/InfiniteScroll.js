import React, { useState, useEffect, useCallback } from "react";

// Define the base URL
const baseURL = "https://dog.ceo/api/breeds/image/random";

// Simulating a data fetch function for dog images
const fetchImages = async (number) => {
  const response = await fetch(`${baseURL}/${number}`);
  const data = await response.json();
  return data.message; // Array of image URLs
};

const InfiniteScrollImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const batchSize = 10; // Number of images to load per fetch

  // Load initial and subsequent data
  const loadMoreImages = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    const newImages = await fetchImages(batchSize);
    if (newImages.length === 0 || newImages.length < batchSize) {
      setHasMore(false);
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
    setLoading(false);
  }, [hasMore]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    // if (
    //   window.innerHeight + document.documentElement.scrollTop !==
    //     document.documentElement.offsetHeight ||
    //   loading
    // ) {
    //   return;
    // }
    // loadMoreImages();

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 || !loading) {
      loadMoreImages();
    }
  }, [loading, loadMoreImages]);

  useEffect(() => {
    loadMoreImages(); // Load initial data
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        padding: "10px",
      }}
    >
      {images.map((src, index) => (
        <div
          key={index}
          style={{ width: "100%", height: "auto", overflow: "hidden" }}
        >
          <img
            src={src}
            alt={`Dog ${index}`}
            style={{ width: "100%", maxHeight: "300px" }}
          />
        </div>
      ))}
      {loading && <p>Loading more images...</p>}
      {!hasMore && <p>No more images to load.</p>}
    </div>
  );
};

export default InfiniteScrollImages;
