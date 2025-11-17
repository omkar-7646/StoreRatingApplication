import React from "react";
import "../styles/components/RatingStars.css";

export default function RatingStars({ rating, onChange }) {
  return (
    <div className="rating-stars">
      {[1,2,3,4,5].map(i => (
        <button key={i} className="btn btn-link p-0" onClick={() => onChange && onChange(i)} aria-label={`rate-${i}`}>
          <span style={{fontSize:20, color: i <= (rating||0) ? "#f5b50a" : "#cfcfcf"}}>{i <= (rating||0) ? "★" : "☆"}</span>
        </button>
      ))}
    </div>
  );
}
