"use client";

import { useState } from "react";
import Link from "next/link";
import Table from "../components/Table";

export default function Page() {
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDb = async () => {
    setLoading(true);
    setError(null);
    setShowModal(true);
    try {
      const res = await fetch("/api/show-db");
      if (!res.ok) throw new Error("Failed to fetch DB");
      const data = await res.json();
      setDbData(data);
    } catch (e) {
      setError("Could not fetch database contents.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc",
      padding: 32
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 32, color: "#2563eb" }}>Supplier Delivery Scoreboard</h1>
      <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
        <Link href="/dashboard" style={{
          padding: "16px 32px",
          background: "#2563eb",
          color: "white",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
          transition: "all 0.2s"
        }}>
          Go to Dashboard
        </Link>
        <button
          onClick={handleShowDb}
          style={{
            padding: "16px 32px",
            background: "#059669",
            color: "white",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 18,
            border: "none",
            boxShadow: "0 2px 8px 0 rgba(5,150,105,0.10)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s"
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show DB"}
        </button>
      </div>
      {showModal && (
        <div style={{
          background: "white",
          borderRadius: 12,
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
          padding: 32,
          maxWidth: 900,
          width: "100%",
          marginTop: 16,
          position: "relative"
        }}>
          <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 12, right: 16, background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>&times;</button>
          <h2 style={{ color: "#2563eb", marginBottom: 16 }}>Database Contents</h2>
          {error && <p style={{ color: "#dc2626" }}>{error}</p>}
          {dbData ? (
            <>
              <Table
                data={dbData.suppliers || []}
                columns={dbData.suppliers && dbData.suppliers.length > 0 ? Object.keys(dbData.suppliers[0]) : []}
                title="Suppliers"
              />
              <Table
                data={dbData.orders || []}
                columns={dbData.orders && dbData.orders.length > 0 ? Object.keys(dbData.orders[0]) : []}
                title="Orders"
              />
            </>
          ) : loading ? (
            <p>Loading...</p>
          ) : null}
        </div>
      )}
    </main>
  );
}