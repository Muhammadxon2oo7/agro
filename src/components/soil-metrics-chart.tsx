"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { motion } from "framer-motion"

// Mock data for the chart
const data = [
  { date: "Mar 1", nitrogen: 55, phosphorus: 40, potassium: 110, ph: 6.5, temperature: 21, moisture: 35 },
  { date: "Mar 5", nitrogen: 57, phosphorus: 42, potassium: 112, ph: 6.6, temperature: 22, moisture: 37 },
  { date: "Mar 10", nitrogen: 59, phosphorus: 41, potassium: 115, ph: 6.7, temperature: 23, moisture: 36 },
  { date: "Mar 15", nitrogen: 62, phosphorus: 43, potassium: 118, ph: 6.7, temperature: 22.5, moisture: 38 },
  { date: "Mar 20", nitrogen: 63, phosphorus: 44, potassium: 119, ph: 6.8, temperature: 22, moisture: 37 },
  { date: "Mar 25", nitrogen: 64, phosphorus: 43, potassium: 118, ph: 6.8, temperature: 21.5, moisture: 36 },
  { date: "Mar 30", nitrogen: 65, phosphorus: 42, potassium: 120, ph: 6.8, temperature: 22.5, moisture: 38 },
]

export function SoilMetricsChart() {
  const [chartType, setChartType] = useState<"line" | "area">("area")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setChartType("line")}
          className={`px-3 py-1 text-xs rounded-md ${chartType === "line" ? "bg-primary text-white" : "bg-muted"}`}
        >
          Line
        </button>
        <button
          onClick={() => setChartType("area")}
          className={`px-3 py-1 text-xs rounded-md ${chartType === "area" ? "bg-primary text-white" : "bg-muted"}`}
        >
          Area
        </button>
      </div>

      <motion.div
        className="h-[300px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={chartType}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#f0f0f0" }}
                axisLine={{ stroke: "#f0f0f0" }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "#f0f0f0" }} axisLine={{ stroke: "#f0f0f0" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="nitrogen"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="phosphorus"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={1500}
                animationBegin={300}
              />
              <Line
                type="monotone"
                dataKey="potassium"
                stroke="#ffc658"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                animationDuration={1500}
                animationBegin={600}
              />
            </LineChart>
          ) : (
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={{ stroke: "#f0f0f0" }}
                axisLine={{ stroke: "#f0f0f0" }}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={{ stroke: "#f0f0f0" }} axisLine={{ stroke: "#f0f0f0" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="nitrogen"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="phosphorus"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
                animationDuration={1500}
                animationBegin={300}
              />
              <Area
                type="monotone"
                dataKey="potassium"
                stackId="3"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.6}
                animationDuration={1500}
                animationBegin={600}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
