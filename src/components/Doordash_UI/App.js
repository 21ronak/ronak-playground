import React from "react";
import "./App.css";
import ItemCard from "./ItemCard";

export const items = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    image: "https://source.unsplash.com/featured/?burger",
    price: 10.99,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    image: "https://source.unsplash.com/featured/?pizza",
    price: 13.49,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Spicy Ramen Bowl",
    image: "https://source.unsplash.com/featured/?ramen",
    price: 11.25,
    rating: 4.6,
  },
];

const DoordashUI = () => {
  return (
    <div className="app">
      <h1>🔥 Featured Dishes</h1>
      <div className="grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default DoordashUI;
