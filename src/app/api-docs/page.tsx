export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground">
            The SoilMonitor API allows your soil monitoring device to send data to our platform for analysis and
            visualization. This documentation provides information on how to integrate your device with our system.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p className="text-muted-foreground mb-4">
            All API requests require authentication using an API key. You can obtain your API key from the settings page
            after registering your device.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <pre className="text-sm">
              <code>
                {`// Example request with authentication header
fetch('https://api.soilmonitor.com/soil-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify(data)
})`}
              </code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-2">POST /api/soil-data</h3>
              <p className="text-muted-foreground mb-2">Send soil measurement data from your device to the platform.</p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <pre className="text-sm">
                  <code>
                    {`// Request body example
{
  "deviceId": "device_12345",
  "timestamp": "2024-03-15T09:31:27Z",
  "readings": {
    "nitrogen": 65,
    "phosphorus": 42,
    "potassium": 120,
    "ph": 6.8,
    "temperature": 22.5,
    "moisture": 38
  },
  "location": {
    "latitude": 41.8781,
    "longitude": -87.6298
  }
}`}
                  </code>
                </pre>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>
                    {`// Response example
{
  "success": true,
  "message": "Data received successfully"
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">GET /api/soil-data</h3>
              <p className="text-muted-foreground mb-2">Retrieve soil measurement data for your devices.</p>
              <div className="bg-muted p-4 rounded-md mb-4">
                <pre className="text-sm">
                  <code>
                    {`// Query parameters
deviceId: (optional) Filter by device ID
from: (optional) Start date in ISO format
to: (optional) End date in ISO format
limit: (optional) Maximum number of records to return`}
                  </code>
                </pre>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>
                    {`// Response example
{
  "data": [
    {
      "id": "1678901234567",
      "deviceId": "device_12345",
      "timestamp": "2024-03-15T09:31:27Z",
      "readings": {
        "nitrogen": 65,
        "phosphorus": 42,
        "potassium": 120,
        "ph": 6.8,
        "temperature": 22.5,
        "moisture": 38
      },
      "location": {
        "latitude": 41.8781,
        "longitude": -87.6298
      }
    },
    // More records...
  ]
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Error Codes</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Status Code</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">400</td>
                <td className="py-2">Bad Request - Missing required fields or invalid data format</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">401</td>
                <td className="py-2">Unauthorized - Invalid or missing API key</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">403</td>
                <td className="py-2">Forbidden - You don't have permission to access this resource</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">404</td>
                <td className="py-2">Not Found - The requested resource does not exist</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">429</td>
                <td className="py-2">Too Many Requests - Rate limit exceeded</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">500</td>
                <td className="py-2">Internal Server Error - Something went wrong on our end</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Device Integration</h2>
          <p className="text-muted-foreground mb-4">
            To integrate your soil monitoring device with our platform, follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Register your device on the dashboard to obtain a device ID and API key</li>
            <li>Configure your device to collect the required soil metrics (N, P, K, pH, temperature, moisture)</li>
            <li>Implement the API calls in your device firmware to send data to our platform</li>
            <li>Set up a regular schedule for data transmission (recommended: every 1-6 hours)</li>
            <li>Test your integration using the API testing tools in your dashboard</li>
          </ol>
        </section>
      </div>
    </div>
  )
}
