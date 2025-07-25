"use client";

import { useState } from "react";
import Table from "../components/Table";

export default function Page() {
  // State for Show DB
  const [dbData, setDbData] = useState(null);
  const [loadingDb, setLoadingDb] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State for Top Suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null); // null | 'success' | 'error'
  const [fetchingSuppliers, setFetchingSuppliers] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Show DB logic
  const handleShowDb = async () => {
    setLoadingDb(true);
    setDbError(null);
    setShowModal(true);
    try {
      const res = await fetch("/api/show-db");
      if (!res.ok) throw new Error("Failed to fetch DB");
      const data = await res.json();
      setDbData(data);
    } catch (e) {
      setDbError("Could not fetch database contents.");
    } finally {
      setLoadingDb(false);
    }
  };

  // Dashboard logic
  const handleSeed = async () => {
    setLoadingSeed(true);
    setSeedStatus(null);
    try {
      const res = await fetch("/api/load-data", { method: "POST" });
      if (!res.ok) throw new Error("Failed to seed data");
      setSeedStatus("success");
      await fetchSuppliers();
    } catch (e) {
      setSeedStatus("error");
    } finally {
      setLoadingSeed(false);
    }
  };

  const fetchSuppliers = async () => {
    setFetchingSuppliers(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/top-suppliers");
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      const data = await res.json();
      setSuppliers(data);
    } catch (e) {
      setFetchError("Could not fetch top suppliers.");
    } finally {
      setFetchingSuppliers(false);
    }
  };

  const buttonBaseStyle = {
    padding: "14px 28px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    textTransform: "none",
    letterSpacing: "0.025em",
    minWidth: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  };

  const getButtonStyle = (color, isLoading) => ({
    ...buttonBaseStyle,
    background: isLoading 
      ? `linear-gradient(135deg, ${color}80, ${color}60)` 
      : `linear-gradient(135deg, ${color}, ${color}dd)`,
    color: "white",
    boxShadow: isLoading 
      ? "none" 
      : `0 4px 20px ${color}40, 0 2px 8px ${color}20`,
    transform: isLoading ? "translateY(1px)" : "translateY(0)",
    opacity: isLoading ? 0.8 : 1,
  });

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "48px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "32px 48px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <h1 style={{ 
            fontSize: "clamp(28px, 5vw, 42px)", 
            margin: "0",
            background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: "700",
            letterSpacing: "-0.02em",
            lineHeight: "1.2"
          }}>
            Supplier Delivery Scoreboard
          </h1>
          <p style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.8)",
            margin: "12px 0 0 0",
            fontWeight: "400"
          }}>
            Manage and track your supplier performance
          </p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          marginBottom: "40px", 
          flexWrap: "wrap", 
          justifyContent: "center" 
        }}>
          <button
            onClick={handleSeed}
            disabled={loadingSeed}
            style={getButtonStyle("#3b82f6", loadingSeed)}
            onMouseEnter={(e) => {
              if (!loadingSeed) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 32px #3b82f640, 0 4px 16px #3b82f630";
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingSeed) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 20px #3b82f640, 0 2px 8px #3b82f620";
              }
            }}
          >
            {loadingSeed ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Seeding...
              </>
            ) : (
              <>
                🌱 Seed Database
              </>
            )}
          </button>
          
          <button
            onClick={fetchSuppliers}
            disabled={fetchingSuppliers}
            style={getButtonStyle("#10b981", fetchingSuppliers)}
            onMouseEnter={(e) => {
              if (!fetchingSuppliers) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 32px #10b98140, 0 4px 16px #10b98130";
              }
            }}
            onMouseLeave={(e) => {
              if (!fetchingSuppliers) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 20px #10b98140, 0 2px 8px #10b98120";
              }
            }}
          >
            {fetchingSuppliers ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Loading...
              </>
            ) : (
              <>
                🏆 Top 3 Suppliers
              </>
            )}
          </button>
          
          <button
            onClick={handleShowDb}
            disabled={loadingDb}
            style={getButtonStyle("#f59e0b", loadingDb)}
            onMouseEnter={(e) => {
              if (!loadingDb) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 32px #f59e0b40, 0 4px 16px #f59e0b30";
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingDb) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 20px #f59e0b40, 0 2px 8px #f59e0b20";
              }
            }}
          >
            {loadingDb ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Loading...
              </>
            ) : (
              <>
                📊 Show Database
              </>
            )}
          </button>
        </div>

        {/* Status messages */}
        <div style={{ minHeight: "32px", textAlign: "center", marginBottom: "32px" }}>
          {seedStatus === "success" && (
            <div style={{ 
              color: "#10b981", 
              fontWeight: "600",
              background: "rgba(16, 185, 129, 0.1)",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}>
              ✅ Database seeded successfully!
            </div>
          )}
          {seedStatus === "error" && (
            <div style={{ 
              color: "#ef4444", 
              fontWeight: "600",
              background: "rgba(239, 68, 68, 0.1)",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}>
              ❌ Failed to seed database
            </div>
          )}
          {fetchError && (
            <div style={{ 
              color: "#ef4444", 
              fontWeight: "600",
              background: "rgba(239, 68, 68, 0.1)",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}>
              ⚠️ {fetchError}
            </div>
          )}
        </div>

        {/* Top Suppliers Section */}
        {suppliers.length > 0 && (
          <section style={{ 
            width: "100%", 
            maxWidth: "600px", 
            margin: "0 auto 40px auto", 
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px", 
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)", 
            padding: "32px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            animation: "slideUp 0.6s ease-out"
          }}>
            <h2 style={{ 
              textAlign: "center", 
              marginBottom: "28px", 
              color: "#1f2937",
              fontSize: "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px"
            }}>
              🏆 Top 3 Suppliers
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {suppliers.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: i === 0 
                      ? "linear-gradient(135deg, #ffd700, #ffed4e)" 
                      : i === 1 
                      ? "linear-gradient(135deg, #c0c0c0, #e5e5e5)"
                      : "linear-gradient(135deg, #cd7f32, #daa520)",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.9)",
                    color: i === 0 ? "#b45309" : i === 1 ? "#6b7280" : "#92400e",
                    fontWeight: "800",
                    fontSize: "20px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ 
                    flex: 1, 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "#1f2937"
                  }}>
                    {s.name}
                  </span>
                  <div style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontSize: "18px", 
                    fontWeight: "700", 
                    color: "#059669",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                  }}>
                    {s.score}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Show DB Modal */}
        {showModal && (
          <>
            <div 
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
                animation: "fadeIn 0.3s ease-out"
              }}
              onClick={() => setShowModal(false)}
            />
            <div style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              padding: "32px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "900px",
              zIndex: 1001,
              overflow: "auto",
              animation: "modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>
              <button 
                onClick={() => setShowModal(false)} 
                style={{ 
                  position: "absolute", 
                  top: "16px", 
                  right: "20px", 
                  background: "rgba(239, 68, 68, 0.1)", 
                  border: "none", 
                  fontSize: "20px", 
                  cursor: "pointer",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ef4444",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.1)";
                }}
              >
                ×
              </button>
              <h2 style={{ 
                color: "#1f2937", 
                marginBottom: "24px",
                fontSize: "24px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                📊 Database Contents
              </h2>
              {dbError && (
                <div style={{ 
                  color: "#ef4444",
                  background: "rgba(239, 68, 68, 0.1)",
                  padding: "16px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  border: "1px solid rgba(239, 68, 68, 0.2)"
                }}>
                  {dbError}
                </div>
              )}
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
              ) : loadingDb ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px",
                  gap: "12px",
                  color: "#6b7280"
                }}>
                  <div style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #e5e7eb",
                    borderTop: "2px solid #3b82f6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Loading database contents...
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes modalSlideIn {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </main>
  );
}