import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function StoreDetail(){
  const { id } = useParams();
  const [store,setStore] = useState(null);
  const [score,setScore] = useState(5);
  const [comment,setComment] = useState("");

  async function load(){
    const res = await API.get(`/stores/${id}`);
    setStore(res.data);
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if(user && res.data.Ratings) {
      const my = res.data.Ratings.find(r => r.userId === user.id);
      if (my) {setScore(my.rating);setComment(my.comment || "");}
    }
  }

  useEffect(()=>{ load(); }, [id]);

  async function submit(e){ e.preventDefault();
    try {
      await API.post(`/ratings/stores/${id}`, {rating: score,comment});
      alert("Saved");
      load();
    } catch(err){ alert(err.response?.data?.message || "Error"); }
  }

  if(!store) return <div>Loading...</div>;
  return (
    <div>
      <h3>{store.name}</h3>
      <div className="mb-2 text-muted">{store.address}</div>
      <h5>Ratings</h5>
      <div>
        {store.Ratings?.map(r => (
          <div key={r.id} className="border p-2 mb-2">
            <div><strong>{r.User?.name}</strong> — {r.score} stars</div>
            <div>{r.comment}</div>
          </div>
        ))}
      </div>

      <h5 className="mt-3">Submit / Update your rating</h5>
      <form onSubmit={submit}>
        <div className="mb-2">
          <select className="form-select w-auto" value={score} onChange={e=>setScore(Number(e.target.value))}>
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="mb-2">
          <textarea className="form-control" rows="3" placeholder="Comment" value={comment} onChange={e=>setComment(e.target.value)} />
        </div>
        <button className="btn btn-primary">Save Rating</button>
      </form>
    </div>
  );
}
