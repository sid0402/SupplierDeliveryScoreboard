export default function Table({ data, columns, title }) {
  if (!data || data.length === 0) return null;
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: "#2563eb", marginBottom: 8 }}>{title}</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", background: "#f9fafb" }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col} style={{ borderBottom: "2px solid #e5e7eb", padding: 8, textAlign: "left", background: "#f1f5f9", fontWeight: 600 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                {columns.map(col => (
                  <td key={col} style={{ padding: 8, fontSize: 15 }}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
