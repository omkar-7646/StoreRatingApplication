import React, { useState, useEffect } from "react";
import API from "../api/api";
import StoreCard from "../components/StoreCard";

export default function StoreList({ user }) {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const fetchStores = async () => {
    const res = await API.get("/stores", { params: { name: q, sortBy } });
    setStores(res.data.rows || res.data);
  };

  useEffect(() => {
    fetchStores();
  }, [q, sortBy]);

  const handleRate = async (storeId, rating) => {
    await API.post("/ratings", { storeId, rating, comment: "" });
    fetchStores();
  };

  return (
    <div>
      {/* Header section */}
      <div className="d-flex justify-content-start mb-3">

        {/* Search input */}
        <input
          className="form-control"
          style={{ maxWidth: 480 }}
          placeholder="Search store name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

      </div>

      {/* Store List */}
      <div>
        {stores.map((s) => (
          <StoreCard key={s.id} store={s} onRate={handleRate} />
        ))}
      </div>
    </div>
  );
}
