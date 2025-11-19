import React, { useEffect, useState } from "react";
import API from "../api";
import StarRating from "../components/StarRating";
import { Link } from "react-router-dom";

export default function Home(){
  const [stores,setStores] = useState([]);
  const [q,setQ] = useState("");

  async function load(){
    const res = await API.get("/stores", { params: { q } });
    // API might return array or object depending on backend; handle both
    setStores(Array.isArray(res.data) ? res.data : (res.data.rows || res.data));
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div className="d-flex mb-3">
        <input className="form-control me-2" placeholder="Search name or address" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-primary" onClick={load}>Search</button>
      </div>
      <div>
        {stores.map(s => (
          <div className="store-card d-flex justify-content-between align-items-center p-3 mb-2 bg-white" key={s.id}>
            <div>
              <h5><Link to={`/store/${s.id}`}>{s.name}</Link></h5>
              <div className="text-muted">{s.address}</div>
            </div>
            <div className="text-end">
              <StarRating score={s.avgRating || 0} />
              <div className="text-muted">{s.ratingCount || 0} reviews</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
