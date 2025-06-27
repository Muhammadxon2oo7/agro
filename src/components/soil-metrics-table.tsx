"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for the table
const initialData = [
  {
    id: 1,
    timestamp: "2024-03-15 09:31:27",
    nitrogen: "65 mg/kg",
    phosphorus: "42 mg/kg",
    potassium: "120 mg/kg",
    ph: "6.8",
    temperature: "22.5°C",
    moisture: "38%",
  },
  {
    id: 2,
    timestamp: "2024-03-14 15:45:12",
    nitrogen: "64 mg/kg",
    phosphorus: "43 mg/kg",
    potassium: "118 mg/kg",
    ph: "6.8",
    temperature: "21.5°C",
    moisture: "36%",
  },
  {
    id: 3,
    timestamp: "2024-03-13 10:22:05",
    nitrogen: "63 mg/kg",
    phosphorus: "44 mg/kg",
    potassium: "119 mg/kg",
    ph: "6.7",
    temperature: "22.0°C",
    moisture: "37%",
  },
  {
    id: 4,
    timestamp: "2024-03-12 08:15:33",
    nitrogen: "62 mg/kg",
    phosphorus: "43 mg/kg",
    potassium: "118 mg/kg",
    ph: "6.7",
    temperature: "22.5°C",
    moisture: "38%",
  },
  {
    id: 5,
    timestamp: "2024-03-11 14:05:47",
    nitrogen: "59 mg/kg",
    phosphorus: "41 mg/kg",
    potassium: "115 mg/kg",
    ph: "6.6",
    temperature: "23.0°C",
    moisture: "36%",
  },
]

type SortDirection = "asc" | "desc" | null
type SortField = keyof (typeof initialData)[0] | null

export function SoilMetricsTable() {
  const [data, setData] = useState(initialData)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const handleSort = (field: keyof (typeof initialData)[0]) => {
    if (sortField === field) {
      // Toggle direction or reset
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      }
    } else {
      // New sort field
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Apply sorting and filtering
  const filteredAndSortedData = [...data]
    .filter((row) => {
      if (!searchTerm) return true

      // Search in all fields
      return Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    })
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0

      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return String(aValue).localeCompare(String(bValue))
      } else {
        return String(bValue).localeCompare(String(aValue))
      }
    })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="O'lchovlarni qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead onClick={() => handleSort("timestamp")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Vaqt
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "timestamp" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("nitrogen")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Azot
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "nitrogen" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("phosphorus")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Fosfor
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "phosphorus" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("potassium")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Kaliy
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "potassium" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("ph")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  pH
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "ph" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("temperature")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Harorat
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "temperature" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("moisture")} className="cursor-pointer hover:bg-muted/80">
                <div className="flex items-center">
                  Namlik
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                  {sortField === "moisture" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Natijalar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((row) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${expandedRow === row.id ? "bg-muted/30" : "hover:bg-muted/20"} border-b transition-colors`}
                >
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleRowExpansion(row.id)}>
                      {expandedRow === row.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.nitrogen}</TableCell>
                  <TableCell>{row.phosphorus}</TableCell>
                  <TableCell>{row.potassium}</TableCell>
                  <TableCell>{row.ph}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  <TableCell>{row.moisture}</TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {filteredAndSortedData.length} ta {data.length} ta yozuvdan ko'rsatilmoqda
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Oldingi
          </Button>
          <Button variant="outline" size="sm" disabled>
            Keyingi
          </Button>
        </div>
      </div>
    </div>
  )
}
