import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Chart({ data }) {
  return (
    <div style={{ background: "#1a1a1d", padding: 10, borderRadius: 10 }}>
      <h4>📈 PPC/H</h4>

      <div style={{ height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pph" stroke="#00c2ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}