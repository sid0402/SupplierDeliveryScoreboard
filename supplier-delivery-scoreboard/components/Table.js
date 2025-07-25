export default function Table({ data, columns, title }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        borderRadius: "16px",
        padding: "32px",
        textAlign: "center",
        marginBottom: "24px",
        border: "1px solid rgba(226, 232, 240, 0.5)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{
          fontSize: "48px",
          marginBottom: "16px",
          opacity: "0.5"
        }}>📊</div>
        <h3 style={{
          color: "#64748b",
          fontSize: "18px",
          fontWeight: "600",
          margin: "0"
        }}>
          No {title?.toLowerCase() || 'data'} available
        </h3>
      </div>
    );
  }

  return (
    <div style={{ 
      marginBottom: "32px",
      background: "white",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
      border: "1px solid rgba(226, 232, 240, 0.3)"
    }}>
      {/* Table Header */}
      <div style={{
        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <h3 style={{ 
          color: "white",
          fontSize: "20px",
          fontWeight: "700",
          margin: "0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          letterSpacing: "0.025em"
        }}>
          {title === "Suppliers" ? "🏢" : "📦"} {title}
          <span style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600"
          }}>
            {data.length}
          </span>
        </h3>
      </div>

      {/* Table Container */}
      <div style={{ 
        overflowX: "auto",
        maxHeight: "500px",
        overflowY: "auto"
      }}>
        <table style={{ 
          borderCollapse: "collapse", 
          width: "100%",
          fontSize: "15px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}>
          <thead style={{ position: "sticky", top: "0", zIndex: "10" }}>
            <tr>
              {columns.map((col, index) => (
                <th key={col} style={{ 
                  background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                  borderBottom: "2px solid #e2e8f0",
                  padding: "16px 20px",
                  textAlign: "left",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#374151",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  position: "relative",
                  borderRight: index < columns.length - 1 ? "1px solid #e5e7eb" : "none"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    {col.replace(/_/g, ' ')}
                    <div style={{
                      width: "4px",
                      height: "4px",
                      background: "#3b82f6",
                      borderRadius: "50%",
                      opacity: "0.6"
                    }} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr 
                key={i} 
                style={{ 
                  background: i % 2 === 0 ? "white" : "rgba(248, 250, 252, 0.5)",
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
                  e.currentTarget.style.transform = "scale(1.001)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = i % 2 === 0 ? "white" : "rgba(248, 250, 252, 0.5)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {columns.map((col, colIndex) => {
                  const cellValue = row[col];
                  const isNumeric = !isNaN(cellValue) && !isNaN(parseFloat(cellValue));
                  const isId = col.toLowerCase().includes('id');
                  const isDate = col.toLowerCase().includes('date') || col.toLowerCase().includes('time');
                  const isStatus = col.toLowerCase().includes('status');
                  const isEmail = typeof cellValue === 'string' && cellValue.includes('@');
                  
                  return (
                    <td 
                      key={col} 
                      style={{ 
                        padding: "16px 20px",
                        borderBottom: i === data.length - 1 ? "none" : "1px solid #f1f5f9",
                        borderRight: colIndex < columns.length - 1 ? "1px solid #f1f5f9" : "none",
                        verticalAlign: "middle",
                        position: "relative"
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        {isId && (
                          <div style={{
                            width: "8px",
                            height: "8px",
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            borderRadius: "50%",
                            flexShrink: 0
                          }} />
                        )}
                        <span style={{
                          fontWeight: isId ? "600" : isNumeric ? "600" : "500",
                          color: isId ? "#059669" : 
                                 isNumeric ? "#3b82f6" : 
                                 isEmail ? "#7c3aed" :
                                 isStatus ? "#f59e0b" :
                                 isDate ? "#6b7280" : "#374151",
                          background: isStatus ? "rgba(245, 158, 11, 0.1)" : "transparent",
                          padding: isStatus ? "4px 8px" : "0",
                          borderRadius: isStatus ? "6px" : "0",
                          fontSize: isId ? "13px" : "15px",
                          fontFamily: isId || isNumeric ? "Monaco, 'Courier New', monospace" : "inherit"
                        }}>
                          {isDate && cellValue ? new Date(cellValue).toLocaleDateString() : cellValue}
                        </span>
                        {isNumeric && !isId && (
                          <div style={{
                            width: "4px",
                            height: "4px",
                            background: "#3b82f6",
                            borderRadius: "50%",
                            opacity: "0.4"
                          }} />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div style={{
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        padding: "12px 24px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        color: "#6b7280"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <div style={{
            width: "6px",
            height: "6px",
            background: "#10b981",
            borderRadius: "50%"
          }} />
          <span style={{ fontWeight: "500" }}>
            {data.length} {data.length === 1 ? 'record' : 'records'}
          </span>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px"
        }}>
          <span style={{ opacity: "0.7" }}>
            {columns.length} columns
          </span>
        </div>
      </div>
    </div>
  );
}
