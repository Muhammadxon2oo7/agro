"use client"

import { useEffect, useRef } from "react"

export function AnimatedSoilIcon({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 120
    canvas.height = 120

    // Soil layers data
    const layers = [
      { y: 30, height: 20, color: "#8B4513" }, // Top soil
      { y: 50, height: 25, color: "#A0522D" }, // Sub soil
      { y: 75, height: 25, color: "#CD853F" }, // Deep soil
    ]

    // Plant data
    const plant = {
      stemX: 60,
      stemY: 30,
      stemHeight: 40,
      leafSize: 15,
      growthProgress: 0,
    }

    // Animate the soil and plant
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw soil layers
      layers.forEach((layer) => {
        ctx.fillStyle = layer.color
        ctx.fillRect(0, layer.y, canvas.width, layer.height)

        // Add texture to soil
        ctx.fillStyle = "rgba(0,0,0,0.1)"
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * canvas.width
          const y = layer.y + Math.random() * layer.height
          const size = Math.random() * 3 + 1
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Animate plant growth
      if (plant.growthProgress < 1) {
        plant.growthProgress += 0.005
      }

      const currentStemHeight = plant.stemHeight * plant.growthProgress

      // Draw plant stem
      ctx.strokeStyle = "#4CAF50"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(plant.stemX, plant.stemY)
      ctx.lineTo(plant.stemX, plant.stemY - currentStemHeight)
      ctx.stroke()

      // Draw leaves if growth is sufficient
      if (plant.growthProgress > 0.3) {
        const leafProgress = Math.min(1, (plant.growthProgress - 0.3) / 0.7)
        const leafSize = plant.leafSize * leafProgress

        // Left leaf
        ctx.fillStyle = "#66BB6A"
        ctx.beginPath()
        ctx.ellipse(
          plant.stemX - leafSize / 2,
          plant.stemY - currentStemHeight / 2,
          leafSize,
          leafSize / 2,
          Math.PI / 4,
          0,
          Math.PI * 2,
        )
        ctx.fill()

        // Right leaf
        ctx.beginPath()
        ctx.ellipse(
          plant.stemX + leafSize / 2,
          plant.stemY - currentStemHeight / 2,
          leafSize,
          leafSize / 2,
          -Math.PI / 4,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }

      // Draw sensors in soil
      if (plant.growthProgress > 0.5) {
        // Sensor 1
        ctx.fillStyle = "#03A9F4"
        ctx.beginPath()
        ctx.rect(30, 60, 5, 20)
        ctx.fill()

        // Sensor 2
        ctx.fillStyle = "#FF5722"
        ctx.beginPath()
        ctx.rect(85, 50, 5, 30)
        ctx.fill()

        // Sensor data visualization
        const dataVisualizationProgress = Math.max(0, (plant.growthProgress - 0.5) / 0.5)

        // Data waves
        ctx.strokeStyle = "rgba(3, 169, 244, 0.5)"
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let i = 0; i < 3; i++) {
          const radius = (i + 1) * 8 * dataVisualizationProgress
          ctx.arc(32.5, 70, radius, 0, Math.PI * 2)
        }
        ctx.stroke()

        ctx.strokeStyle = "rgba(255, 87, 34, 0.5)"
        ctx.beginPath()
        for (let i = 0; i < 3; i++) {
          const radius = (i + 1) * 8 * dataVisualizationProgress
          ctx.arc(87.5, 65, radius, 0, Math.PI * 2)
        }
        ctx.stroke()
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
