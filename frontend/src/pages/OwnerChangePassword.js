import React, { useState } from "react";
import API from "../api/api";

export default function OwnerChangePassword() {
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/update-password", { password: pass });
      setMsg("Password updated!");
    } catch {
      setMsg("Failed to update");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: 40 }}>
      <h2>Change Password</h2>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form className="card p-3" onSubmit={submit}>
        <input
          className="form-control mb-3"
          type="password"
          placeholder="New Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="btn btn-primary w-100">Update Password</button>
      </form>
    </div>
  );
}
