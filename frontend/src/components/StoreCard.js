import React from "react";
import "./../styles/components/StoreCard.css";
import RatingStars from "./RatingStars";
export default function StoreCard({ store, onRate }) {
  return (
    <div className="store-card row align-items-center">
      <div className="col-auto">
        <img src="/favicon.svg" alt="store" style={{width:64}} />
      </div>
      <div className="col">
        <h5>{store.name}</h5>
        <p className="mb-1 text-muted small">{store.address}</p>
        <p className="mb-1"><strong>Avg:</strong> {store.averageRating ? store.averageRating.toFixed(2) : "No ratings"}</p>
        <p className="mb-1"><strong>Your:</strong> {store.userRating ?? "Not rated"}</p>
      </div>
      <div className="col-auto">
        <RatingStars rating={store.userRating} onChange={(r)=>onRate && onRate(store.id, r)} />
      </div>
    </div>
  );
}
