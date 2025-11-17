import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile({ user }) {
  const [me, setMe] = useState(null);
  useEffect(() => {
    API.get("/users/me").then(res => setMe(res.data));
  }, []);
  return me ? (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-field"><span>Name:</span> {me.name}</div>
      <div className="profile-field"><span>Email:</span> {me.email}</div>
      <div className="profile-field"><span>Address:</span> {me.address}</div>
      <div className="profile-field"><span>Role:</span> {me.role}</div>
    </div>
  ) : <div>Loading...</div>;
}
