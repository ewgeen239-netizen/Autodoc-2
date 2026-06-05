import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { initTelegram, user } from "./lib/telegram";
import { calc } from "./lib/calc";
import Chart from "./components/Chart";

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

    const { data } = await supabase
      .from("shifts")
      .insert([row])
      .select();

    if (data) setShifts([data[0], ...shifts]);

    setPeaks("");
    setHours("");
  }

  const chartData = shifts.map(s => ({
    date: s.shift_date,
    pph: s.pph
  }));

  const total = shifts.reduce((s, i) => s + i.bonus, 0);

  return (
    <div style={{ padding: 16, background: "#0f0f10", color: "#fff", minHeight: "100vh" }}>
      <h2>OS Tracker SaaS</h2>

      <input placeholder="Пики" value={peaks} onChange={e => setPeaks(e.target.value)} />
      <input placeholder="Часы" value={hours} onChange={e => setHours(e.target.value)} />

      <button onClick={add}>Добавить</button>

      <div style={{ marginTop: 10 }}>
        💰 Total: {total.toFixed(2)} zł
      </div>

      {shifts.length > 0 && <Chart data={chartData} />}

      {shifts.map(s => (
        <div key={s.id} style={{ marginTop: 8, background: "#1a1a1d", padding: 10 }}>
          {s.peaks} / {s.hours}h → {s.pph.toFixed(1)} pph
        </div>
      ))}
    </div>
  );
}