"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SoilHealthGauge() {
  const [score, setScore] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const maxScore = 100
  const healthScore = 78 // This would come from your data analysis
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Animate the gauge filling up
    const timer = setTimeout(() => {
      setScore(healthScore)
    }, 500)
    return () => clearTimeout(timer)
  }, [healthScore])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 200
    canvas.height = 200

    const drawGauge = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 80

      // Draw gauge background
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false)
      ctx.lineWidth = 20
      ctx.strokeStyle = "#f1f1f1"
      ctx.stroke()

      // Calculate angle based on score
      const angle = (score / maxScore) * Math.PI

      // Draw filled gauge
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + angle, false)
      ctx.lineWidth = 20

      // Gradient based on score
      let gradient
      if (score < 40) {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "#ef4444")
        gradient.addColorStop(1, "#f97316")
      } else if (score < 70) {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "#f97316")
        gradient.addColorStop(1, "#84cc16")
      } else {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, "#84cc16")
        gradient.addColorStop(1, "#22c55e")
      }

      ctx.strokeStyle = gradient
      ctx.stroke()

      // Draw center point
      ctx.beginPath()
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = "#d1d5db"
      ctx.stroke()

      // Draw needle
      const needleAngle = Math.PI + (score / maxScore) * Math.PI
      const needleLength = radius - 20

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + needleLength * Math.cos(needleAngle), centerY + needleLength * Math.sin(needleAngle))
      ctx.lineWidth = 3
      ctx.strokeStyle = "#334155"
      ctx.stroke()

      // Draw score text
      ctx.font = "bold 24px sans-serif"
      ctx.fillStyle = "#334155"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(score.toString(), centerX, centerY + 50)

      // Draw label
      ctx.font = "14px sans-serif"
      ctx.fillStyle = "#64748b"
      ctx.fillText("Soil Health Score", centerX, centerY + 75)
    }

    drawGauge()
  }, [score, maxScore])

  // Determine color based on score
  const getColor = (score: number) => {
    if (score < 40) return "#ef4444" // red
    if (score < 70) return "#f59e0b" // amber
    return "#22c55e" // green
  }

  const color = getColor(score)

  return (
    <div className="relative w-full flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas ref={canvasRef} width="200" height="200" />

        {/* Score indicators */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
          <div className="text-xs text-muted-foreground">0</div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xs text-muted-foreground">50</div>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
          <div className="text-xs text-muted-foreground">100</div>
        </div>

        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm font-medium">Soil Health Details</div>
              <div className="text-xs text-muted-foreground mt-1">Excellent nutrient balance</div>
              <div className="text-xs text-muted-foreground">Good microbial activity</div>
              <div className="text-xs text-muted-foreground">Optimal pH levels</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">Health Assessment</div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className={`inline-block h-3 w-3 rounded-full`} style={{ backgroundColor: color }}></span>
          <span className="font-medium" style={{ color }}>
            {score < 40 ? "Poor" : score < 70 ? "Good" : "Excellent"}
          </span>
        </div>
      </div>
    </div>
  )
}
