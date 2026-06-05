import { useEffect, useState, useMemo } from "react";
import { supabase } from "./lib/supabase";
import { initTelegram, user } from "./lib/telegram";
import { calc } from "./lib/calc";
import Chart from "./components/Chart";
import { theme, styles } from "./ui/styles";

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

  /* 📊 METRICS ENGINE (level SaaS) */
  const metrics = useMemo(() => {
    const totalBonus = shifts.reduce((s, i) => s + (i.bonus || 0), 0);
    const totalPeaks = shifts.reduce((s, i) => s + (i.peaks || 0), 0);
    const totalHours = shifts.reduce((s, i) => s + (i.hours || 0), 0);
    const avgPph = totalHours ? totalPeaks / totalHours : 0;

    return { totalBonus, totalPeaks, totalHours, avgPph };
  }, [shifts]);

  /* 📈 CHART DATA */
  const chartData = shifts
    .slice()
    .reverse()
    .map(s => ({
      date: s.shift_date,
      pph: s.pph,
      bonus: s.bonus
    }));

  return (
    <div style={styles.app}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Performance SaaS</div>
          <div style={styles.subtitle}>Fintech-grade OS Analytics</div>
        </div>

        <div style={styles.userBox}>
          ID: {user?.id || "guest"}
        </div>
      </div>

      {/* KPI GRID */}
      <div style={styles.grid}>
        <Card label="Total Bonus" value={`${metrics.totalBonus.toFixed(2)} zł`} accent="green" />
        <Card label="Avg PPH" value={metrics.avgPph.toFixed(1)} accent="blue" />
        <Card label="Peaks" value={metrics.totalPeaks} accent="white" />
        <Card label="Hours" value={metrics.totalHours.toFixed(1)} accent="white" />
      </div>

      {/* CHART */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>Performance Trend</div>
        <Chart data={chartData} />
      </div>

      {/* INPUT */}
      <div style={styles.card}>
        <div style={styles.cardTitle}>Add Shift</div>

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
          Save Shift
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {shifts.map(s => (
          <div key={s.id} style={styles.item}>
            <div style={styles.itemTop}>
              <b>{s.peaks}</b> peaks · {s.hours}h
            </div>

            <div style={styles.itemBottom}>
              PPH {s.pph.toFixed(1)} · Bonus {s.bonus.toFixed(2)} zł
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Card({ label, value, accent }) {
  return (
    <div style={styles.kpi}>
      <div style={styles.kpiLabel}>{label}</div>
      <div
        style={{
          ...styles.kpiValue,
          color:
            accent === "green"
              ? theme.green
              : accent === "blue"
              ? theme.blue
              : theme.text
        }}
      >
        {value}
      </div>
    </div>
  );
}