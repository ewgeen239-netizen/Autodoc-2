import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { initTelegram, user } from "./lib/telegram";
import { calc } from "./lib/calc";
import { theme } from "./ui/theme";

export default function App() {
  const [peaks, setPeaks] = useState("");
  const [hours, setHours] = useState("");
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    initTelegram();
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("shifts")
      .select("*")
      .eq("telegram_id", user?.id)
      .order("created_at", { ascending: false });

    setShifts(data || []);
  }

  async function add() {
    const p = Number(peaks);
    const h = Number(hours);
    if (!p || !h) return;

    const c = calc(p, h);

    const row = {
      telegram_id: user.id,
      shift_date: new Date().toISOString().slice(0, 10),
      peaks: p,
      hours: h,
      ...c
    };

    const { data } = await supabase.from("shifts").insert([row]).select();
    if (data) setShifts([data[0], ...shifts]);

    setPeaks("");
    setHours("");
  }

  const total = shifts.reduce((s, i) => s + i.bonus, 0);
  const avgPph = shifts.reduce((s, i) => s + i.pph, 0) / (shifts.length || 1);

  return (
    <div style={styles.app}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Performance Dashboard</div>
          <div style={styles.subtitle}>OS Tracker · Financial View</div>
        </div>

        <div style={styles.badge}>
          ID: {user?.id}
        </div>
      </div>

      {/* METRICS */}
      <div style={styles.grid}>
        <Card title="Total Profit" value={`${total.toFixed(2)} zł`} color={theme.profit} />
        <Card title="Avg PPH" value={avgPph.toFixed(1)} color={theme.accent} />
        <Card title="Shifts" value={shifts.length} color={theme.text} />
      </div>

      {/* INPUT */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Peaks"
          value={peaks}
          onChange={e => setPeaks(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Hours"
          value={hours}
          onChange={e => setHours(e.target.value)}
        />

        <button style={styles.button} onClick={add}>
          Add Shift
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {shifts.map(s => (
          <div key={s.id} style={styles.item}>
            <div>
              <b>{s.peaks}</b> peaks · {s.hours}h
            </div>

            <div style={{ color: theme.muted, fontSize: 12 }}>
              PPH {s.pph.toFixed(1)} · Bonus {s.bonus.toFixed(2)} zł
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* COMPONENT */
function Card({ title, value, color }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricTitle}>{title}</div>
      <div style={{ ...styles.metricValue, color }}>{value}</div>
    </div>
  );
}