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

const WEIGHT: any = { Placement: 3, Result: 2, Event: 1 };
const TYPE_COLOR: any = { Placement: "#4caf50", Result: "#ff9800", Event: "#2196f3" };

export default function PriorityPage() {
  const [notifications, setNotifications] = useState([]);
  const [topN, setTopN] = useState(10);
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await Log("frontend", "info", "page", "Priority inbox page loaded");
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
      await Log("frontend", "info", "api", "Priority notifications loaded");
    }
    fetchData();
  }, []);

  const filtered = notifications
    .filter((n: any) => filterType === "All" || n.Type === filterType)
    .sort((a: any, b: any) => {
      if (WEIGHT[b.Type] !== WEIGHT[a.Type]) return WEIGHT[b.Type] - WEIGHT[a.Type];
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, topN);

  if (loading) return <div style={{padding:"2rem"}}>Loading...</div>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <a href="/" style={{ color: "#1976d2" }}>← Back</a>
      <h1>Priority Inbox</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <select value={topN} onChange={e => setTopN(Number(e.target.value))}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}>
          <option value={10}>Top 10</option>
          <option value={15}>Top 15</option>
          <option value={20}>Top 20</option>
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}>
          <option value="All">All Types</option>
          <option value="Placement">Placement</option>
          <option value="Result">Result</option>
          <option value="Event">Event</option>
        </select>
      </div>
      {filtered.map((n: any, i: number) => (
        <div key={n.ID} style={{
          padding: "1rem", marginBottom: "0.75rem", borderRadius: "8px",
          backgroundColor: "#fff", borderLeft: `4px solid ${TYPE_COLOR[n.Type]}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>#{i + 1} {n.Message}</span>
            <span style={{ backgroundColor: TYPE_COLOR[n.Type], color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "0.75rem" }}>{n.Type}</span>
          </div>
          <div style={{ color: "#999", fontSize: "0.8rem", marginTop: "0.25rem" }}>{n.Timestamp}</div>
        </div>
      ))}
    </div>
  );
}