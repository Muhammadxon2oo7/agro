import { type NextRequest, NextResponse } from "next/server"

// This would be replaced with your actual database connection
const mockDatabase: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate the incoming data
    if (!data.deviceId || !data.readings) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Basic validation of readings
    const requiredMetrics = ["nitrogen", "phosphorus", "potassium", "ph", "temperature", "moisture"]
    const missingMetrics = requiredMetrics.filter((metric) => !data.readings[metric])

    if (missingMetrics.length > 0) {
      return NextResponse.json({ error: `Missing required metrics: ${missingMetrics.join(", ")}` }, { status: 400 })
    }

    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString()
    }

    // In a real application, you would save this to a database
    mockDatabase.push({
      id: Date.now().toString(),
      ...data,
    })

    return NextResponse.json({ success: true, message: "Data received successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error processing soil data:", error)
    return NextResponse.json({ error: "Failed to process data" }, { status: 500 })
  }
}

export async function GET() {
  // In a real application, you would fetch this from a database
  return NextResponse.json({ data: mockDatabase })
}
