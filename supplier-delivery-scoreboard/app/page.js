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
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "8px",
    border: "1px solid #e4e4e7",
    backgroundColor: "white",
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.25",
    color: "#09090b",
    cursor: "pointer",
    transition: "all 0.15s ease-in-out",
    fontFamily: "inherit",
    outline: "none",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    minHeight: "40px"
  };

  const getButtonVariant = (variant, isLoading) => {
    const variants = {
      primary: {
        backgroundColor: isLoading ? "#18181b" : "#09090b",
        color: "white",
        border: "1px solid transparent",
        ":hover": !isLoading && {
          backgroundColor: "#18181b"
        }
      },
      secondary: {
        backgroundColor: "white",
        color: "#09090b",
        border: "1px solid #e4e4e7",
        ":hover": !isLoading && {
          backgroundColor: "#f4f4f5",
          color: "#09090b"
        }
      },
      outline: {
        backgroundColor: "transparent",
        color: "#09090b",
        border: "1px solid #e4e4e7",
        ":hover": !isLoading && {
          backgroundColor: "#f4f4f5"
        }
      }
    };
    
    return {
      ...buttonBaseStyle,
      ...variants[variant],
      opacity: isLoading ? 0.6 : 1,
      cursor: isLoading ? "not-allowed" : "pointer"
    };
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#fafafa",
      padding: "32px 16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          paddingBottom: "24px",
          borderBottom: "1px solid #e4e4e7"
        }}>
          <h1 style={{ 
            fontSize: "32px", 
            fontWeight: "700",
            color: "#09090b",
            margin: "0 0 8px 0",
            letterSpacing: "-0.025em"
          }}>
            Supplier Delivery Scoreboard
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#71717a",
            margin: "0",
            fontWeight: "400"
          }}>
            Manage and track your supplier performance metrics
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={handleSeed}
            disabled={loadingSeed}
            style={getButtonVariant("primary", loadingSeed)}
            onMouseEnter={(e) => {
              if (!loadingSeed) {
                e.target.style.backgroundColor = "#18181b";
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingSeed) {
                e.target.style.backgroundColor = "#09090b";
              }
            }}
          >
            {loadingSeed ? (
              <>
                <div style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Seeding Database
              </>
            ) : (
              "Seed Database"
            )}
          </button>
          
          <button
            onClick={fetchSuppliers}
            disabled={fetchingSuppliers}
            style={getButtonVariant("secondary", fetchingSuppliers)}
            onMouseEnter={(e) => {
              if (!fetchingSuppliers) {
                e.target.style.backgroundColor = "#f4f4f5";
              }
            }}
            onMouseLeave={(e) => {
              if (!fetchingSuppliers) {
                e.target.style.backgroundColor = "white";
              }
            }}
          >
            {fetchingSuppliers ? (
              <>
                <div style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(9,9,11,0.3)",
                  borderTop: "2px solid #09090b",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Loading Suppliers
              </>
            ) : (
              "View Top Suppliers"
            )}
          </button>
          
          <button
            onClick={handleShowDb}
            disabled={loadingDb}
            style={getButtonVariant("outline", loadingDb)}
            onMouseEnter={(e) => {
              if (!loadingDb) {
                e.target.style.backgroundColor = "#f4f4f5";
              }
            }}
            onMouseLeave={(e) => {
              if (!loadingDb) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            {loadingDb ? (
              <>
                <div style={{
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(9,9,11,0.3)",
                  borderTop: "2px solid #09090b",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                Loading Database
              </>
            ) : (
              "Show Database"
            )}
          </button>
        </div>

        {/* Status messages */}
        {(seedStatus || fetchError) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {seedStatus === "success" && (
              <div style={{ 
                color: "#16a34a", 
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{ color: "#16a34a" }}>✓</span>
                Database seeded successfully
              </div>
            )}
            {seedStatus === "error" && (
              <div style={{ 
                color: "#dc2626", 
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{ color: "#dc2626" }}>✕</span>
                Failed to seed database
              </div>
            )}
            {fetchError && (
              <div style={{ 
                color: "#dc2626", 
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{ color: "#dc2626" }}>⚠</span>
                {fetchError}
              </div>
            )}
          </div>
        )}

        {/* Top Suppliers Section */}
        {suppliers.length > 0 && (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e4e4e7",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            maxWidth: "600px",
            margin: "0 auto",
            width: "100%"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#f4f4f5",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                🏆
              </div>
              <h2 style={{ 
                fontSize: "20px",
                fontWeight: "600",
                color: "#09090b",
                margin: "0"
              }}>
                Top Suppliers
              </h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {suppliers.map((supplier, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;
                const isThird = index === 2;
                
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      backgroundColor: isFirst ? "#fefce8" : "#fafafa",
                      border: `1px solid ${isFirst ? "#fde047" : "#e4e4e7"}`,
                      borderRadius: "8px",
                      transition: "all 0.15s ease-in-out",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      if (!isFirst) {
                        e.target.style.backgroundColor = "#f4f4f5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isFirst) {
                        e.target.style.backgroundColor = "#fafafa";
                      }
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isFirst ? "#eab308" : isSecond ? "#71717a" : "#a3a3a3",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}>
                      {index + 1}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#09090b"
                      }}>
                        {supplier.name}
                      </div>
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <span style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#16a34a"
                      }}>
                        {supplier.score}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 50,
                animation: "fadeIn 0.2s ease-out"
              }}
              onClick={() => setShowModal(false)}
            />
            <div style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e4e4e7",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "24px",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "900px",
              zIndex: 51,
              overflow: "auto",
              animation: "modalSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#f4f4f5",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    📊
                  </div>
                  <h2 style={{ 
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#09090b",
                    margin: "0"
                  }}>
                    Database Contents
                  </h2>
                </div>
                
                <button 
                  onClick={() => setShowModal(false)} 
                  style={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #e4e4e7",
                    backgroundColor: "white",
                    color: "#71717a",
                    cursor: "pointer",
                    fontSize: "18px",
                    transition: "all 0.15s ease-in-out"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f4f4f5";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                  }}
                >
                  ×
                </button>
              </div>
              
              {dbError && (
                <div style={{ 
                  color: "#dc2626",
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  fontSize: "14px"
                }}>
                  {dbError}
                </div>
              )}
              
              {dbData ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                </div>
              ) : loadingDb ? (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px",
                  gap: "12px",
                  color: "#71717a"
                }}>
                  <div style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #e4e4e7",
                    borderTop: "2px solid #09090b",
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
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes modalSlideIn {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
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