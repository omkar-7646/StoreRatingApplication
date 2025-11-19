import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("user");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", { name, email, address, password, role });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if(data.user.role === "owner") nav("/owner"); else nav("/user");
      window.location.reload();
    } catch(err){
      alert(err.response?.data?.message || (err.response?.data?.errors && err.response.data.errors.map(x=>x.msg).join(", ")) || "Signup failed");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card p-4">
          <h4>Sign Up</h4>
          <form onSubmit={submit}>
            <input className="form-control mb-2" placeholder="Name (20-60 chars)" value={name} onChange={e=>setName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input className="form-control mb-2" placeholder="Address (optional)" value={address} onChange={e=>setAddress(e.target.value)} />
            <input className="form-control mb-2" placeholder="Password (8-16, 1 uppercase, 1 special)" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="mb-2">
              <label className="me-2">Account type:</label>
              <select className="form-select d-inline w-auto" value={role} onChange={e=>setRole(e.target.value)}>
                <option value="user">Normal User</option>
                <option value="owner">Store Owner</option>
              </select>
            </div>
            <button className="btn btn-success">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
