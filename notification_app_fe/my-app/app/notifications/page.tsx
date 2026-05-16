'use client';
import { useEffect, useState } from "react";
import { Log } from "../../utils/logger";

const TOKEN_CONFIG = {
  email: "ganeshbojanapu2022@vitbhopal.ac.in",
  name: "BOJANAPU GANESH",
  rollNo: "22MIM10016",
  accessCode: "SfFuWg",
  clientID: "ceb1b491-9f6c-439c-9b97-b2c0f12ee1c2",
  clientSecret: "qHZDjcDEGQMBnseM"
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [viewed, setViewed] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await Log("frontend", "info", "page", "Notifications page loaded");
      const authRes = await fetch("http://4.224.186.213/evaluation-service/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(TOKEN_CONFIG)
      });
      const authData = await authRes.json();
      const token = authData.access_token;
      const res = await fetch("http://4.224.186.213/evaluation-service/notifications", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data.notifications);
      setLoading(false);
      await Log("frontend", "info", "api", `Loaded ${data.notifications.length} notifications`);
    }
    fetchData();
  }, []);

  const typeColor: any = { Placement: "#4caf50", Result: "#ff9800", Event: "#2196f3" };

  if (loading) return <div style={{padding:"2rem"}}>Loading...</div>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <a href="/" style={{ color: "#1976d2" }}>← Back</a>
      <h1>All Notifications</h1>
      <p style={{ color: "#666" }}>{notifications.length} total notifications. Click to mark as read.</p>
      {notifications.map((n: any) => (
        <div key={n.ID} onClick={() => setViewed(prev => new Set(prev).add(n.ID))}
          style={{
            padding: "1rem", marginBottom: "0.75rem", borderRadius: "8px",
            backgroundColor: viewed.has(n.ID) ? "#f5f5f5" : "#fff",
            borderLeft: `4px solid ${typeColor[n.Type]}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", cursor: "pointer",
            opacity: viewed.has(n.ID) ? 0.7 : 1
          }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: viewed.has(n.ID) ? "normal" : "bold" }}>{n.Message}</span>
            <span style={{ backgroundColor: typeColor[n.Type], color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "0.75rem" }}>{n.Type}</span>
          </div>
          <div style={{ color: "#999", fontSize: "0.8rem", marginTop: "0.25rem" }}>{n.Timestamp}</div>
          {!viewed.has(n.ID) && <div style={{ width: "8px", height: "8px", backgroundColor: "#1976d2", borderRadius: "50%", display: "inline-block", marginTop: "0.25rem" }}></div>}
        </div>
      ))}
    </div>
  );
}