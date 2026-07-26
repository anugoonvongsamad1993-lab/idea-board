'use client';

import { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: "design",    label: "🎨 ดีไซน์เหยื่อ",    color: "#4ade80" },
  { id: "behavior",  label: "🐟 พฤติกรรมปลา",    color: "#60a5fa" },
  { id: "simulator", label: "⚙️ Simulator",        color: "#f472b6" },
  { id: "feature",   label: "💡 ฟีเจอร์โปรแกรม", color: "#fb923c" },
  { id: "other",     label: "📝 อื่นๆ",            color: "#a78bfa" },
];

const STORAGE_KEY = "fishing-ideas";

export default function Home() {
  const [ideas, setIdeas]             = useState([]);
  const [input, setInput]             = useState("");
  const [selectedCat, setSelectedCat] = useState("design");
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState("all");
  const [editingId, setEditingId]     = useState(null);
  const [editText, setEditText]       = useState("");
  const [toast, setToast]             = useState(null);
  const [loaded, setLoaded]           = useState(false);

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setIdeas(JSON.parse(saved));
        showToast("โหลดข้อมูลสำเร็จ ✓");
      }
    } catch (_) {
      // Start fresh
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  const save = (newIdeas) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdeas));
      showToast("บันทึกสำเร็จ ✓");
    } catch (e) {
      showToast("บันทึกไม่สำเร็จ", "error");
    }
  };

  const addIdea = async () => {
    if (!input.trim()) return;
    const idea = {
      id: Date.now(),
      text: input.trim(),
      category: selectedCat,
      createdAt: new Date().toISOString(),
    };
    const updated = [idea, ...ideas];
    setIdeas(updated);
    setInput("");
    save(updated);
  };

  const deleteIdea = (id) => {
    const updated = ideas.filter((i) => i.id !== id);
    setIdeas(updated);
    save(updated);
  };

  const saveEdit = (id) => {
    const updated = ideas.map((i) => (i.id === id ? { ...i, text: editText } : i));
    setIdeas(updated);
    setEditingId(null);
    save(updated);
  };

  const filtered = ideas.filter((i) => {
    const matchCat    = filterCat === "all" || i.category === filterCat;
    const matchSearch = i.text.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCat = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];

  return (
    <div style={s.root}>
      <div style={s.bgDeco1} />
      <div style={s.bgDeco2} />

      {toast && (
        <div style={{
          ...s.toast,
          background: toast.type === "error" ? "#ef444422" : "#4ade8022",
          border: `1px solid ${toast.type === "error" ? "#ef4444" : "#4ade80"}`,
          color: toast.type === "error" ? "#ef4444" : "#4ade80",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={s.header}>
        <div style={s.logoWrap}>
          <span style={s.logoEmoji}>🎣</span>
          <div>
            <div style={s.title}>TO-DO-LIST & Idea</div>
            <div style={s.subtitle}>บันทึกไอเดีย •  24 ชั่วโมง</div>
          </div>
        </div>
        <div style={s.countBadge}>{ideas.length} ไอเดีย</div>
      </div>

      {/* Input Card */}
      <div style={s.card}>
        <div style={s.catRow}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              style={{
                ...s.catBtn,
                background:   selectedCat === c.id ? c.color + "25" : "transparent",
                border:       `1px solid ${selectedCat === c.id ? c.color : "#1e3a5f"}`,
                color:        selectedCat === c.id ? c.color : "#4a6fa5",
                transform:    selectedCat === c.id ? "scale(1.05)" : "scale(1)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={s.inputRow}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addIdea(); }
            }}
            placeholder="พิมพ์ไอเดียของคุณที่นี่… (Enter เพื่อบันทึก)"
            style={s.textarea}
            rows={2}
          />
          <button
            onClick={addIdea}
            disabled={!input.trim()}
            style={{ ...s.addBtn, opacity: input.trim() ? 1 : 0.4 }}
          >
            +<br />บันทึก
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div style={s.filterRow}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 ค้นหา…"
          style={s.searchInput}
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          style={s.select}
        >
          <option value="all">ทั้งหมด ({ideas.length})</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label} ({ideas.filter((i) => i.category === c.id).length})
            </option>
          ))}
        </select>
      </div>

      {/* Ideas List */}
      <div style={s.list}>
        {!loaded && (
          <div style={s.empty}>⏳ กำลังโหลด…</div>
        )}
        {loaded && filtered.length === 0 && (
          <div style={s.empty}>
            {ideas.length === 0
              ? "🎣 ยังไม่มีไอเดีย — เริ่มเพิ่มได้เลย!"
              : "🔍 ไม่พบไอเดียที่ค้นหา"}
          </div>
        )}
        {filtered.map((idea, idx) => {
          const cat       = getCat(idea.category);
          const isEditing = editingId === idea.id;
          return (
            <div
              key={idea.id}
              style={{
                ...s.ideaCard,
                borderLeft: `3px solid ${cat.color}`,
                animationDelay: `${idx * 0.04}s`,
              }}
            >
              <div style={s.ideaTop}>
                <span style={{ ...s.catTag, color: cat.color, background: cat.color + "18" }}>
                  {cat.label}
                </span>
                <span style={s.date}>
                  {new Date(idea.createdAt).toLocaleDateString("th-TH", {
                    day: "numeric", month: "short", year: "2-digit",
                  })}
                </span>
              </div>

              {isEditing ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ ...s.textarea, marginTop: 8 }}
                    rows={2}
                    autoFocus
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => saveEdit(idea.id)} style={s.saveBtn}>✓ บันทึก</button>
                    <button onClick={() => setEditingId(null)} style={s.cancelBtn}>✕ ยกเลิก</button>
                  </div>
                </div>
              ) : (
                <div style={s.ideaText}>{idea.text}</div>
              )}

              <div style={s.actions}>
                <button
                  onClick={() => { setEditingId(idea.id); setEditText(idea.text); }}
                  style={s.actionBtn}
                >✏️ แก้ไข</button>
                <button
                  onClick={() => deleteIdea(idea.id)}
                  style={{ ...s.actionBtn, color: "#ef4444" }}
                >🗑️ ลบ</button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={s.footer}>💾 ข้อมูลบันทึกถาวรในเครื่องของคุณ • ตลาด 24 ชั่วโมง</div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&display=swap');
      `}</style>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#050d1a",
    color: "#c8d8f0",
    fontFamily: "'Kanit', 'Noto Sans Thai', sans-serif",
    fontWeight: 300,
    padding: "20px 16px 60px",
    maxWidth: 700,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },
  bgDeco1: {
    position: "fixed", top: -120, right: -120,
    width: 340, height: 340, borderRadius: "50%",
    background: "radial-gradient(circle, #0d3b6e44 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgDeco2: {
    position: "fixed", bottom: -80, left: -80,
    width: 260, height: 260, borderRadius: "50%",
    background: "radial-gradient(circle, #4ade8018 0%, transparent 70%)",
    pointerEvents: "none",
  },
  toast: {
    position: "fixed", top: 16, right: 16, left: 16,
    zIndex: 999, borderRadius: 10, padding: "10px 16px",
    fontSize: 13, textAlign: "center", backdropFilter: "blur(8px)",
  },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10,
  },
  logoWrap: { display: "flex", alignItems: "center", gap: 12 },
  logoEmoji: { fontSize: 38, filter: "drop-shadow(0 0 8px #4ade8066)" },
  title: { fontSize: 22, fontWeight: 700, color: "#e8f4ff", letterSpacing: 0.3 },
  subtitle: { fontSize: 11, color: "#3a6a9a", marginTop: 2 },
  countBadge: {
    background: "#0d2a4a", border: "1px solid #1a4a7a",
    borderRadius: 20, padding: "4px 14px",
    fontSize: 12, color: "#60a5fa",
  },
  card: {
    background: "#0a1e35",
    border: "1px solid #0d3060",
    borderRadius: 16, padding: 16, marginBottom: 14,
    boxShadow: "0 4px 24px #00000066",
  },
  catRow: { display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 },
  catBtn: {
    borderRadius: 20, padding: "4px 11px", fontSize: 11.5,
    cursor: "pointer", transition: "all .18s", fontFamily: "inherit",
    fontWeight: 400,
  },
  inputRow: { display: "flex", gap: 10, alignItems: "flex-end" },
  textarea: {
    flex: 1, background: "#040e1c", border: "1px solid #0d3060",
    borderRadius: 10, color: "#c8d8f0", padding: "10px 13px",
    fontSize: 14, resize: "none", outline: "none", lineHeight: 1.65,
    fontFamily: "inherit", fontWeight: 300,
  },
  addBtn: {
    background: "linear-gradient(135deg, #1a6b3a, #4ade80)",
    color: "#050d1a", border: "none", borderRadius: 10,
    padding: "0 14px", fontWeight: 700, cursor: "pointer",
    fontSize: 13, lineHeight: 1.4, alignSelf: "stretch",
    minWidth: 54, textAlign: "center", fontFamily: "inherit",
  },
  filterRow: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" },
  searchInput: {
    flex: 1, background: "#0a1e35", border: "1px solid #0d3060",
    borderRadius: 10, color: "#c8d8f0", padding: "9px 13px",
    fontSize: 13, outline: "none", fontFamily: "inherit", minWidth: 140,
  },
  select: {
    background: "#0a1e35", border: "1px solid #0d3060",
    borderRadius: 10, color: "#4a6fa5", padding: "9px 13px",
    fontSize: 12, outline: "none", cursor: "pointer", fontFamily: "inherit",
  },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  empty: {
    textAlign: "center", color: "#475569", padding: 40, fontSize: 15,
  },
  ideaCard: {
    background: "#0a1e35", border: "1px solid #0d2a4a",
    borderRadius: 12, padding: "13px 15px",
    animation: "fadeIn .3s ease both",
    boxShadow: "0 2px 12px #00000044",
  },
  ideaTop: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  catTag: { borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600 },
  date: { fontSize: 11, color: "#1e4a7a" },
  ideaText: { fontSize: 14.5, lineHeight: 1.75, color: "#b0c8e8" },
  actions: { display: "flex", gap: 12, marginTop: 10 },
  actionBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: 12, color: "#2a5a8a", padding: 0, fontFamily: "inherit",
  },
  saveBtn: {
    background: "#4ade8018", border: "1px solid #4ade80", color: "#4ade80",
    borderRadius: 8, padding: "4px 14px", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
  },
  cancelBtn: {
    background: "transparent", border: "1px solid #0d3060", color: "#3a6a9a",
    borderRadius: 8, padding: "4px 14px", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
  },
  footer: {
    marginTop: 24, textAlign: "center", color: "#334155", fontSize: 11,
  },
};
