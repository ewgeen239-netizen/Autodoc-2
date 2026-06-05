import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function Chart({ data }) {
  return (
    <div style={{ background: "#111826", padding: 12, borderRadius: 12 }}>
      <div style={{ fontSize: 12, color: "#8B98A5", marginBottom: 10 }}>
        Performance Trend
      </div>

      <div style={{ height: 180 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#8B98A5" />
            <YAxis stroke="#8B98A5" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pph"
              stroke="#4DA3FF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}