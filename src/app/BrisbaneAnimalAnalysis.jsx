import { useState, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from "recharts";

// ─── Data ───────────────────────────────────────────────────────────────────

const brisbaneAreas = [
  { id: "1",  name: "Brisbane City",    x: 50, y: 45, population: 15000, complaints: 245 },
  { id: "2",  name: "South Brisbane",   x: 48, y: 52, population: 12000, complaints: 198 },
  { id: "3",  name: "Fortitude Valley", x: 55, y: 38, population: 18000, complaints: 312 },
  { id: "4",  name: "New Farm",         x: 60, y: 42, population: 14000, complaints: 167 },
  { id: "5",  name: "West End",         x: 40, y: 55, population: 11000, complaints: 156 },
  { id: "6",  name: "Kangaroo Point",   x: 58, y: 50, population:  9000, complaints: 134 },
  { id: "7",  name: "Paddington",       x: 35, y: 40, population: 10000, complaints: 145 },
  { id: "8",  name: "Toowong",          x: 30, y: 50, population: 13000, complaints: 189 },
  { id: "9",  name: "Woolloongabba",    x: 52, y: 60, population:  8000, complaints: 123 },
  { id: "10", name: "Spring Hill",      x: 48, y: 35, population:  7500, complaints:  98 },
];

const tableData = [
  { area: "Fortitude Valley", population: 18000, complaints: 312, density: 17.3 },
  { area: "South Brisbane",   population: 12000, complaints: 198, density: 16.5 },
  { area: "Brisbane City",    population: 15000, complaints: 245, density: 16.3 },
  { area: "Woolloongabba",    population:  8000, complaints: 123, density: 15.4 },
  { area: "Kangaroo Point",   population:  9000, complaints: 134, density: 14.9 },
  { area: "Toowong",          population: 13000, complaints: 189, density: 14.5 },
  { area: "Paddington",       population: 10000, complaints: 145, density: 14.5 },
  { area: "West End",         population: 11000, complaints: 156, density: 14.2 },
  { area: "Spring Hill",      population:  7500, complaints:  98, density: 13.1 },
  { area: "New Farm",         population: 14000, complaints: 167, density: 11.9 },
];

const mockRankings = [
  { rank: 1, animalName: "Dog",    complaints: 1245, change: +12, emoji: "🐕" },
  { rank: 2, animalName: "Cat",    complaints:  687, change:  -5, emoji: "🐈" },
  { rank: 3, animalName: "Possum", complaints:  423, change:  +8, emoji: "🦔" },
  { rank: 4, animalName: "Bird",   complaints:  356, change:  +3, emoji: "🦜" },
  { rank: 5, animalName: "Deer",   complaints:  234, change:  -2, emoji: "🦌" },
];

const solutionData = [
  { solution: "Enhanced Training",    votes: 245 },
  { solution: "Fence Management",     votes: 189 },
  { solution: "Community Education",  votes: 167 },
  { solution: "Law Enforcement",      votes: 134 },
  { solution: "Pet Registration",     votes:  98 },
];

const priorityData = [
  { name: "High Priority",   value: 412, color: "#ef4444" },
  { name: "Medium Priority", value: 289, color: "#f59e0b" },
  { name: "Low Priority",    value: 132, color: "#10b981" },
];

const timelineData = [
  { month: "Jan", complaints: 145 },
  { month: "Feb", complaints: 178 },
  { month: "Mar", complaints: 203 },
  { month: "Apr", complaints: 189 },
  { month: "May", complaints: 234 },
  { month: "Jun", complaints: 267 },
];

const correlationData = brisbaneAreas.map(a => ({
  area: a.name,
  population: a.population,
  complaints: a.complaints,
  density: +((a.complaints / a.population) * 1000).toFixed(1),
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function getComplaintColor(area) {
  const i = area.complaints / 312;
  if (i > 0.8) return "#dc2626";
  if (i > 0.6) return "#ea580c";
  if (i > 0.4) return "#f59e0b";
  return "#fbbf24";
}

function getDensityColor(area) {
  const d = (area.complaints / area.population) * 1000;
  if (d > 16) return "#1e40af";
  if (d > 14) return "#3b82f6";
  if (d > 12) return "#60a5fa";
  return "#93c5fd";
}

function getCircleRadius(area, view) {
  if (view === "complaints") {
    return Math.max(3.5, (area.complaints / 312) * 9);
  }
  const d = (area.complaints / area.population) * 1000;
  return Math.max(3.5, (d / 20) * 9);
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon, title, value, sub, subType }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      border: "1px solid #e5e7eb",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,.05)",
      transition: "box-shadow .2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)"}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>
        {icon}
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{title}</p>
      <p style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && (
        <p style={{ fontSize: 12, margin: 0, color: subType === "increase" ? "#ef4444" : "#6b7280" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Interactive Map ─────────────────────────────────────────────────────────

function InteractiveMap() {
  const [view, setView] = useState("complaints");
  const [hovered, setHovered] = useState(null);

  const btnStyle = (active, color) => ({
    padding: "8px 20px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    transition: "all .15s",
    background: active ? color : "#f3f4f6",
    color: active ? "white" : "#374151",
  });

  const hovArea = hovered ? brisbaneAreas.find(a => a.id === hovered) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={btnStyle(view === "complaints", "#ef4444")} onClick={() => setView("complaints")}>
          🔴 Complaint Count
        </button>
        <button style={btnStyle(view === "density", "#3b82f6")} onClick={() => setView("density")}>
          🔵 Complaint Density
        </button>
      </div>

      <div style={{
        flex: 1, borderRadius: 16, overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)",
        position: "relative",
        minHeight: 420,
      }}>
        {/* River decoration */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0 }}>
          {/* River */}
          <path d="M 62 20 Q 60 40 58 55 Q 55 70 50 85" stroke="#93c5fd" strokeWidth="3"
            fill="none" opacity="0.5" />
          {/* Area circles */}
          {brisbaneAreas.map(area => {
            const r = getCircleRadius(area, view);
            const color = view === "complaints" ? getComplaintColor(area) : getDensityColor(area);
            const density = ((area.complaints / area.population) * 1000).toFixed(1);
            const isHov = hovered === area.id;
            return (
              <g key={area.id}
                onMouseEnter={() => setHovered(area.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}>
                <circle cx={area.x} cy={area.y} r={r + 1.5}
                  fill={color} opacity={0.15} />
                <circle cx={area.x} cy={area.y} r={r}
                  fill={color} opacity={isHov ? 0.95 : 0.72}
                  stroke="white" strokeWidth={0.6} />
                {!isHov && (
                  <text x={area.x} y={area.y + r + 3}
                    textAnchor="middle" fontSize="2.2" fill="#374151" fontWeight="600">
                    {area.name.split(" ")[0]}
                  </text>
                )}
                {isHov && (
                  <g>
                    <rect x={area.x + r + 1} y={area.y - 7} width="28" height="16"
                      rx="1.5" fill="white" stroke="#d1d5db" strokeWidth="0.3"
                      style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,.15))" }} />
                    <text x={area.x + r + 2.5} y={area.y - 3} fontSize="2.5" fontWeight="700" fill="#111827">{area.name}</text>
                    <text x={area.x + r + 2.5} y={area.y + 0.5} fontSize="2" fill="#6b7280">Pop: {(area.population / 1000).toFixed(0)}k</text>
                    <text x={area.x + r + 2.5} y={area.y + 3.5} fontSize="2" fill="#6b7280">Complaints: {area.complaints}</text>
                    <text x={area.x + r + 2.5} y={area.y + 6.5} fontSize="2" fill="#6b7280">Density: {density}/1k</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Title badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "white", borderRadius: 10, padding: "6px 14px",
          fontSize: 13, fontWeight: 600, color: "#1e40af",
          border: "1px solid #bfdbfe",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          📍 Brisbane Area Heatmap
        </div>

        {/* Legend */}
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          background: "white", borderRadius: 12, padding: "10px 14px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          fontSize: 12,
        }}>
          <p style={{ fontWeight: 700, margin: "0 0 6px", color: "#374151" }}>Legend</p>
          {view === "complaints" ? (
            [["#dc2626", "250+ complaints"], ["#ea580c", "190–250"], ["#f59e0b", "130–190"], ["#fbbf24", "<130"]].map(([c, l]) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <span style={{ color: "#6b7280" }}>{l}</span>
              </div>
            ))
          ) : (
            [["#1e40af", ">16 /1k"], ["#3b82f6", "14–16"], ["#60a5fa", "12–14"], ["#93c5fd", "<12"]].map(([c, l]) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <span style={{ color: "#6b7280" }}>{l}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", margin: 0 }}>
        💡 Hover over circles to view detailed information
      </p>
    </div>
  );
}

// ─── Data Table ──────────────────────────────────────────────────────────────

function DataTable() {
  const [sortKey, setSortKey] = useState("density");
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = key => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sorted = [...tableData].sort((a, b) => {
    if (typeof a[sortKey] === "string") {
      return sortDir === "asc" ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey]);
    }
    return sortDir === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
  });

  const thStyle = key => ({
    padding: "12px 16px", textAlign: key === "area" ? "left" : "right",
    cursor: "pointer", userSelect: "none", fontSize: 13,
    color: sortKey === key ? "#3b82f6" : "#374151",
    fontWeight: 600, background: "#f9fafb",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Detailed Area Data Table</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Click column headers to sort</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[["area", "Area"], ["population", "Population"], ["complaints", "Complaints"], ["density", "Density /1k"]].map(([key, label]) => (
                <th key={key} style={thStyle(key)} onClick={() => handleSort(key)}>
                  {label} {sortKey === key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.area} style={{ borderTop: "1px solid #f3f4f6" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: "#dbeafe", color: "#1d4ed8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700,
                    }}>{i + 1}</span>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{row.area}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right", fontSize: 14, color: "#374151" }}>
                  {row.population.toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <span style={{
                    background: "#fee2e2", color: "#991b1b",
                    padding: "2px 10px", borderRadius: 999,
                    fontSize: 13, fontWeight: 600,
                  }}>{row.complaints}</span>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700,
                    color: row.density > 16 ? "#dc2626" : row.density > 14 ? "#ea580c" : "#16a34a",
                  }}>{row.density}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{
        padding: "12px 20px", background: "#f9fafb", borderTop: "1px solid #e5e7eb",
        display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280",
      }}>
        <span>Showing {sorted.length} areas</span>
        <span>Total Complaints: {sorted.reduce((s, r) => s + r.complaints, 0).toLocaleString()}</span>
      </div>
    </div>
  );
}

// ─── Animal Ranking Board ────────────────────────────────────────────────────

function AnimalRankingBoard() {
  const medalColors = ["#facc15", "#9ca3af", "#f97316", "#d1d5db", "#d1d5db"];

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 24 }}>📊</span>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Most Complained Animals</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {mockRankings.map((item, i) => {
          const maxComplaints = mockRankings[0].complaints;
          return (
            <div key={item.rank} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", borderRadius: 12,
              background: i === 0 ? "#fefce8" : "#f9fafb",
              border: i === 0 ? "1px solid #fde68a" : "1px solid #f3f4f6",
              transition: "box-shadow .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = ""}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: medalColors[i], display: "flex",
                alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 16, flexShrink: 0,
                color: i === 0 ? "#78350f" : i === 1 ? "#374151" : "#7c2d12",
              }}>
                {item.rank}
              </div>

              <span style={{ fontSize: 36 }}>{item.emoji}</span>

              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 15 }}>{item.animalName}</p>
                <div style={{
                  height: 6, borderRadius: 999,
                  background: "#e5e7eb", overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${(item.complaints / maxComplaints) * 100}%`,
                    background: i === 0 ? "#f59e0b" : "#60a5fa",
                    borderRadius: 999,
                  }} />
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 18 }}>
                  {item.complaints.toLocaleString()}
                </p>
                <p style={{
                  margin: 0, fontSize: 12, fontWeight: 600,
                  color: item.change > 0 ? "#dc2626" : "#16a34a",
                }}>
                  {item.change > 0 ? "▲" : "▼"} {Math.abs(item.change)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ margin: "20px 0 0", textAlign: "center", fontSize: 12, color: "#9ca3af" }}>
        Data Updated: March 23, 2026
      </p>
    </div>
  );
}

// ─── Complaint Upload Form ────────────────────────────────────────────────────

function ComplaintUploadForm({ onSubmit }) {
  const [formData, setFormData] = useState({ animalType: "", location: "", description: "", photo: null });
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handlePhotoChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData(f => ({ ...f, photo: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!formData.animalType || !formData.location) return;
    onSubmit(formData);
    setFormData({ animalType: "", location: "", description: "", photo: null });
    setPhotoPreview("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1px solid #d1d5db", fontSize: 14, outline: "none",
    boxSizing: "border-box",
    transition: "border-color .15s",
  };

  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" };

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
      <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700 }}>📋 Submit Animal Complaint</h2>

      {submitted && (
        <div style={{
          background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 10,
          padding: "12px 16px", marginBottom: 16, color: "#15803d", fontWeight: 600,
        }}>
          ✅ Complaint submitted successfully!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Animal Type *</label>
          <select value={formData.animalType}
            onChange={e => setFormData(f => ({ ...f, animalType: e.target.value }))}
            style={{ ...inputStyle, background: "white" }}>
            <option value="">Select Animal</option>
            <option value="dog">🐕 Dog</option>
            <option value="cat">🐈 Cat</option>
            <option value="bird">🦜 Bird</option>
            <option value="deer">🦌 Deer</option>
            <option value="possum">🦔 Possum</option>
            <option value="other">❓ Other</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>📍 Location *</label>
          <input type="text" value={formData.location}
            onChange={e => setFormData(f => ({ ...f, location: e.target.value }))}
            placeholder="e.g., Brisbane City, Fortitude Valley"
            style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea value={formData.description}
            onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
            placeholder="Describe the complaint in detail..."
            rows={3}
            style={{ ...inputStyle, resize: "none" }} />
        </div>

        <div>
          <label style={labelStyle}>📷 Upload Photo (Optional)</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: "2px dashed #d1d5db", borderRadius: 12, padding: "20px",
              textAlign: "center", cursor: "pointer", background: "#f9fafb",
              transition: "border-color .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#3b82f6"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#d1d5db"}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview"
                style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 8 }} />
            ) : (
              <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>Click to upload image</p>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*"
            onChange={handlePhotoChange} style={{ display: "none" }} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!formData.animalType || !formData.location}
          style={{
            width: "100%", padding: "12px", borderRadius: 10, border: "none",
            background: formData.animalType && formData.location ? "#3b82f6" : "#d1d5db",
            color: "white", fontSize: 15, fontWeight: 700, cursor: formData.animalType && formData.location ? "pointer" : "not-allowed",
            transition: "background .15s",
          }}>
          Submit Complaint
        </button>
      </div>
    </div>
  );
}

// ─── Solution Aggregation ────────────────────────────────────────────────────

function SolutionAggregation() {
  const maxVotes = solutionData[0].votes;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Scatter chart */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>📈</span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Population Density vs Complaints</h2>
        </div>
        <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 16px" }}>
          Areas with higher population density (Fortitude Valley, Brisbane City) tend to have more animal complaint cases.
        </p>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis type="number" dataKey="population" name="Population"
              label={{ value: "Population", position: "insideBottom", offset: -15, fontSize: 12 }}
              tick={{ fontSize: 12 }} />
            <YAxis type="number" dataKey="complaints" name="Complaints"
              label={{ value: "Complaints", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <ZAxis range={[80, 300]} />
            <Tooltip content={({ active, payload }) => {
              if (active && payload?.length) {
                const d = payload[0].payload;
                return (
                  <div style={{
                    background: "white", border: "1px solid #e5e7eb", borderRadius: 10,
                    padding: "10px 14px", boxShadow: "0 4px 12px rgba(0,0,0,.1)",
                  }}>
                    <p style={{ fontWeight: 700, margin: "0 0 4px" }}>{d.area}</p>
                    <p style={{ margin: "0", fontSize: 13, color: "#6b7280" }}>Pop: {d.population.toLocaleString()}</p>
                    <p style={{ margin: "0", fontSize: 13, color: "#6b7280" }}>Complaints: {d.complaints}</p>
                    <p style={{ margin: "0", fontSize: 13, color: "#6b7280" }}>Density: {d.density}/1k</p>
                  </div>
                );
              }
              return null;
            }} />
            <Scatter data={correlationData} fill="#8b5cf6" opacity={0.75} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — solutions */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 22 }}>✅</span>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Proposed Solutions by Public</h2>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={solutionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="solution" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill="#3b82f6" name="Votes" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie + Timeline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={priorityData} cx="50%" cy="50%" outerRadius={75}
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                dataKey="value">
                {priorityData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n, p) => [v, p.payload.name]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {priorityData.map(d => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                <span style={{ color: "#374151" }}>{d.name}</span>
                <span style={{ color: "#9ca3af", marginLeft: "auto" }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>Complaint Trends (6 months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="complaints" fill="#8b5cf6" name="Complaints" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Solution detail bars */}
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Solution Votes Detail</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {solutionData.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "10px 14px", background: "#f9fafb", borderRadius: 10,
            }}>
              <span style={{ minWidth: 160, fontSize: 14, fontWeight: 500 }}>{item.solution}</span>
              <div style={{ flex: 1, height: 8, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  background: "#3b82f6",
                  width: `${(item.votes / maxVotes) * 100}%`,
                  transition: "width .5s ease",
                }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1d4ed8", minWidth: 36, textAlign: "right" }}>
                {item.votes}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "map",      label: "Interactive Map",  icon: "🗺️" },
  { id: "upload",   label: "Submit Complaint", icon: "📤" },
  { id: "ranking",  label: "Animal Rankings",  icon: "🏆" },
  { id: "solutions",label: "Solutions",        icon: "💡" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("map");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleComplaintSubmit = data => {
    showToast(`✅ Complaint submitted! Animal: ${data.animalType} · Location: ${data.location}`);
  };

  const tabStyle = id => ({
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 20px", borderRadius: 10, border: "none",
    cursor: "pointer", fontWeight: 600, fontSize: 14,
    transition: "all .15s",
    background: activeTab === id ? "#3b82f6" : "white",
    color: activeTab === id ? "white" : "#374151",
    boxShadow: activeTab === id ? "0 2px 8px rgba(59,130,246,.3)" : "0 1px 3px rgba(0,0,0,.06)",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "0 0 40px",
    }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: "#1e293b", color: "white",
          padding: "12px 20px", borderRadius: 12,
          fontSize: 14, fontWeight: 500,
          boxShadow: "0 8px 24px rgba(0,0,0,.2)",
          maxWidth: 360,
          animation: "fadeIn .2s ease",
        }}>
          {toast}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <header style={{ padding: "36px 0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <span style={{ fontSize: 40 }}>🐾</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>
                Brisbane Animal Complaint Analysis System
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 16, color: "#6b7280" }}>
                Exploring the correlation between population density and animal complaints
              </p>
            </div>
          </div>
        </header>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          <StatCard icon="🚨" title="Total Complaints" value="1,845" sub="↑ +12% this month" subType="increase" />
          <StatCard icon="📍" title="Areas Covered" value="10" sub="Brisbane main areas" />
          <StatCard icon="👥" title="Total Population" value="117,500" />
          <StatCard icon="📊" title="Average Density" value="15.7" sub="per 1,000 people" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t.id} style={tabStyle(t.id)} onClick={() => setActiveTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "map" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{
              background: "white", borderRadius: 16, border: "1px solid #e5e7eb",
              padding: 24, height: 600,
            }}>
              <InteractiveMap />
            </div>
            <DataTable />
          </div>
        )}

        {activeTab === "upload" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <ComplaintUploadForm onSubmit={handleComplaintSubmit} />
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24 }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700 }}>Complaint Guidelines</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>How to submit an effective complaint?</h3>
                  {["Provide accurate location information", "Describe the issue in detail", "Upload relevant photos if possible", "Select the correct animal type"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 14, color: "#374151" }}>
                      <span style={{ color: "#3b82f6", flexShrink: 0 }}>•</span> {t}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>Common complaint types</h3>
                  {["Excessive barking", "Off-leash incidents", "Aggressive behavior", "Environmental hygiene issues"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 14, color: "#374151" }}>
                      <span style={{ color: "#3b82f6", flexShrink: 0 }}>•</span> {t}
                    </div>
                  ))}
                </div>
                <div style={{
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  borderRadius: 12, padding: "14px 16px", fontSize: 14, color: "#1e40af",
                }}>
                  💡 After submitting a complaint, the relevant department will process your case within 3–5 business days.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ranking" && <AnimalRankingBoard />}

        {activeTab === "solutions" && <SolutionAggregation />}

        {/* Footer */}
        <footer style={{
          marginTop: 40, paddingTop: 24, borderTop: "1px solid #e5e7eb",
          textAlign: "center", fontSize: 13, color: "#9ca3af",
        }}>
          © 2026 Brisbane Animal Complaint Analysis System · Data Updated: March 23, 2026
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
