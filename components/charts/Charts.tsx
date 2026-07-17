"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";

const COLORS = ["#0284c7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#f97316"];

// Generic Tooltip style
const customTooltipStyle = {
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  borderRadius: "0.5rem",
  color: "#0f172a",
  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  padding: "8px 12px",
  fontWeight: 600,
};

export function LineChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={customTooltipStyle} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
        <Line type="monotone" dataKey="value" stroke={COLORS[0]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: "#f1f5f9" }} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function HorizontalBarChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
        <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={80} />
        <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: "#f1f5f9" }} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={30}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AreaChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={customTooltipStyle} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
        <Area type="monotone" dataKey="value" stroke={COLORS[0]} fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PieChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={8}
          cornerRadius={6}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={customTooltipStyle} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadarChartWidget({ data }: { data: Record<string, string | number>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Indicadores" dataKey="A" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.4} />
        <Tooltip contentStyle={customTooltipStyle} allowEscapeViewBox={{ x: true, y: true }} wrapperStyle={{ zIndex: 100 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
