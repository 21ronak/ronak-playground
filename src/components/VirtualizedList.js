import React, { useState, useRef, useEffect } from "react";

// GENIUS FUCKING COMPONENT, Chef's Kiss!

// Generate default list items for demonstration
const defaultItems = new Array(1000)
  .fill(null)
  .map((_, index) => `Item ${index + 1}`);

const VirtualizedList = ({ items = defaultItems, itemHeight = 50 }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Updates the visible slice of items based on the scroll position.
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollTop = container.scrollTop;          // Current scroll position
      const containerHeight = container.clientHeight;   // Height of the viewport

      // Determine the index of the first item in view.
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      // Determine the last index in view (accounting for partially visible items).
      const endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight)
      );

      // Update state: starting index and slice of visible items.
      setStartIndex(newStartIndex);
      setVisibleItems(items.slice(newStartIndex, endIndex + 1));
    };

    // Attach scroll event listener and perform initial calculation.
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll); // Add THROTTLE for Perf
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [items, itemHeight]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      {/* This outer div sets the total height for the scroll bar */}
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {/* The inner div is offset to the correct vertical position */}
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualizedList;
