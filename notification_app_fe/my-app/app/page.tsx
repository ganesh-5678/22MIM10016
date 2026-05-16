'use client';
import { useEffect, useState } from "react";
import { Log } from "../utils/logger";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Campus Notifications</h1>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/notifications">
          <button style={{ padding: "1rem 2rem", fontSize: "1rem", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            All Notifications
          </button>
        </Link>
        <Link href="/priority">
          <button style={{ padding: "1rem 2rem", fontSize: "1rem", backgroundColor: "#388e3c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Priority Inbox
          </button>
        </Link>
      </div>
    </main>
  );
}