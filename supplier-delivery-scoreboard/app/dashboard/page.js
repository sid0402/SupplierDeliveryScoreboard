"use client";

import { useState } from "react";

export default function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null); // null | 'success' | 'error'
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleSeed = async () => {
    setLoading(true);
    setSeedStatus(null);
    try {
      const res = await fetch("/api/load-data", { method: "POST" });
      if (!res.ok) throw new Error("Failed to seed data");
      setSeedStatus("success");
      await fetchSuppliers();
    } catch (e) {
      setSeedStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    setFetching(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/top-suppliers");
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      const data = await res.json();
      setSuppliers(data);
    } catch (e) {
      setFetchError("Could not fetch top suppliers.");
    } finally {
      setFetching(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 32,
        background: "#f8fafc",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
        minHeight: 400,
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Supplier Delivery Scoreboard</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
        <button
          onClick={handleSeed}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 16,
            boxShadow: loading ? "none" : "0 1px 4px 0 rgba(37,99,235,0.10)",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s"
          }}
        >
          {loading ? "Seeding..." : "Seed Database"}
        </button>
        <button
          onClick={fetchSuppliers}
          disabled={fetching}
          style={{
            padding: "10px 20px",
            background: "#059669",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: fetching ? "not-allowed" : "pointer",
            fontSize: 16,
            boxShadow: fetching ? "none" : "0 1px 4px 0 rgba(5,150,105,0.10)",
            opacity: fetching ? 0.7 : 1,
            transition: "all 0.2s"
          }}
        >
          {fetching ? "Loading..." : "Show Top 3 Suppliers"}
        </button>
      </div>
      <div style={{ minHeight: 32, textAlign: "center", marginBottom: 16 }}>
        {seedStatus === "success" && <span style={{ color: "#059669", fontWeight: 500 }}>Database seeded!</span>}
        {seedStatus === "error" && <span style={{ color: "#dc2626", fontWeight: 500 }}>Failed to seed database.</span>}
        {fetchError && <span style={{ color: "#dc2626", fontWeight: 500 }}>{fetchError}</span>}
      </div>
      {suppliers.length > 0 && (
        <section>
          <h2 style={{ textAlign: "center", marginBottom: 18, color: "#2563eb" }}>Top 3 Suppliers</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {suppliers.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 10,
                  padding: 20,
                  boxShadow: "0 1px 6px 0 rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#2563eb11",
                    color: "#2563eb",
                    fontWeight: 700,
                    fontSize: 20,
                    textAlign: "center",
                    lineHeight: "36px",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontSize: 18, fontWeight: 500 }}>{s.name}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#059669" }}>{s.score}%</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}