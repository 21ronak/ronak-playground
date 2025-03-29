import React from "react";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <div className="info">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
        <p className="rating">⭐ {item.rating}</p>
      </div>
    </div>
  );
}
