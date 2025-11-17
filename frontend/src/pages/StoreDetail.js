import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useParams } from "react-router-dom";
import RatingStars from "../components/RatingStars";

export default function StoreDetail({ user }) {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  useEffect(() => {
    const f = async () => {
      const res = await API.get(`/stores/${id}`);
      setStore(res.data);
    };
    f();
  }, [id]);

  const submit = async (r) => {
    await API.post("/ratings", { storeId: id, rating: r });
    const res = await API.get(`/stores/${id}`);
    setStore(res.data);
  };

  if (!store) return <div>Loading...</div>;
  return (
    <div className="store-detail">
      <h2>{store.name}</h2>
      <p className="text-muted">{store.address}</p>
      <p><strong>Avg Rating:</strong> {store.averageRating}</p>
      <h4>Ratings</h4>
      <div className="store-ratings">
        {store.ratings.map(rt => (
          <div className="store-rating-item" key={rt.id}>
            <strong>{rt.user?.name}</strong>: {rt.rating}
          </div>
        ))}
      </div>
      {user && <div className="mt-3"><RatingStars onChange={submit} /></div>}
    </div>
  );
}
