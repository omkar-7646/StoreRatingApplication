import React from "react";

export default function StarRating({ score = 0 }) {
  const rounded = Math.round(score);
  const stars = [];
  for(let i=1;i<=5;i++){
    stars.push(<i key={i} className={`bi bi-star-fill me-1 ${i<=rounded ? "text-warning" : "text-secondary"}`}></i>);
  }
  return (
    <div className="d-flex align-items-center">
      <div>{stars}</div>
      <div className="ms-2 fw-bold">{score ? Number(score).toFixed(1) : "0.0"}</div>
    </div>
  );
}
