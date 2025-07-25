export default function Table({ data, columns, title }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        backgroundColor: "white",
        border: "1px solid #e4e4e7",
        borderRadius: "8px",
        padding: "48px 24px",
        textAlign: "center",
        marginBottom: "24px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#f4f4f5",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          margin: "0 auto 16px auto"
        }}>📊</div>
        <h3 style={{
          color: "#71717a",
          fontSize: "16px",
          fontWeight: "500",
          margin: "0"
        }}>
          No {title?.toLowerCase() || 'data'} available
        </h3>
      </div>
    );
  }

  return (
    <div style={{ 
      marginBottom: "24px",
      backgroundColor: "white",
      border: "1px solid #e4e4e7",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    }}>
      {/* Table Header */}
      <div style={{
        backgroundColor: "#fafafa",
        borderBottom: "1px solid #e4e4e7",
        padding: "16px 20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#f4f4f5",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px"
            }}>
              {title === "Suppliers" ? "🏢" : "📦"}
            </div>
            <h3 style={{ 
              color: "#09090b",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0"
            }}>
              {title}
            </h3>
          </div>
          <div style={{
            backgroundColor: "#f4f4f5",
            color: "#71717a",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500"
          }}>
            {data.length} {data.length === 1 ? 'item' : 'items'}
          </div>
        </div>
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
          fontSize: "14px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        }}>
          <thead style={{ position: "sticky", top: "0", zIndex: "10" }}>
            <tr>
              {columns.map((col, index) => (
                <th key={col} style={{ 
                  backgroundColor: "#f8f9fa",
                  borderBottom: "1px solid #e4e4e7",
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "500",
                  fontSize: "12px",
                  color: "#71717a",
                  textTransform: "uppercase",
                  letterSpacing: "0.025em",
                  borderRight: index < columns.length - 1 ? "1px solid #f4f4f5" : "none"
                }}>
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr 
                key={i} 
                style={{ 
                  backgroundColor: "white",
                  borderBottom: i === data.length - 1 ? "none" : "1px solid #f4f4f5",
                  transition: "all 0.15s ease-in-out",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
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
                        padding: "12px 16px",
                        borderRight: colIndex < columns.length - 1 ? "1px solid #f4f4f5" : "none",
                        verticalAlign: "middle"
                      }}
                    >
                      <span style={{
                        fontWeight: isId ? "500" : isNumeric ? "500" : "400",
                        color: isId ? "#71717a" : 
                               isNumeric ? "#09090b" : 
                               isEmail ? "#6366f1" :
                               isStatus ? "#f59e0b" :
                               isDate ? "#71717a" : "#09090b",
                        backgroundColor: isStatus ? "#fef3c7" : "transparent",
                        padding: isStatus ? "2px 6px" : "0",
                        borderRadius: isStatus ? "4px" : "0",
                        fontSize: "14px",
                        fontFamily: isId || isNumeric ? "'JetBrains Mono', 'Courier New', monospace" : "inherit"
                      }}>
                        {isDate && cellValue ? new Date(cellValue).toLocaleDateString() : cellValue}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
