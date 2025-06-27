"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, Filter, RefreshCw, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MobileMenu } from "@/components/mobile-menu"

// Mock data for connected devices
const mockDevices = [
  {
    id: "DEV-001",
    name: "Tuproq Sensor A1",
    location: "Samarqand, 1-dala",
    status: "online",
    lastConnection: "2024-03-15T09:31:27",
    batteryLevel: 78,
    signalStrength: 85,
  },
  {
    id: "DEV-002",
    name: "Tuproq Sensor B2",
    location: "Toshkent, 3-dala",
    status: "online",
    lastConnection: "2024-03-15T08:45:12",
    batteryLevel: 65,
    signalStrength: 72,
  },
  {
    id: "DEV-003",
    name: "Tuproq Sensor C3",
    location: "Farg'ona, 2-dala",
    status: "offline",
    lastConnection: "2024-03-14T16:22:05",
    batteryLevel: 12,
    signalStrength: 0,
  },
  {
    id: "DEV-004",
    name: "Tuproq Sensor D4",
    location: "Buxoro, 1-dala",
    status: "online",
    lastConnection: "2024-03-15T07:18:33",
    batteryLevel: 91,
    signalStrength: 92,
  },
  {
    id: "DEV-005",
    name: "Tuproq Sensor E5",
    location: "Namangan, 4-dala",
    status: "maintenance",
    lastConnection: "2024-03-13T11:05:47",
    batteryLevel: 45,
    signalStrength: 38,
  },
]

export default function DevicesPage() {
  const [devices, setDevices] = useState(mockDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [deviceToTerminate, setDeviceToTerminate] = useState<string | null>(null)

  // Filter devices based on search term
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Format date to local string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Handle device termination
  const handleTerminateDevice = (deviceId: string) => {
    setDevices(devices.filter((device) => device.id !== deviceId))
    setDeviceToTerminate(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-soil-100/30">
      <header className="sticky top-0 z-50 bg-soil-800 backdrop-blur-md border-b border-soil-700 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16">
          <Link className="flex items-center gap-2" href="/#hero">
            <Image
              src="/images/agrotahlil-logo.png"
              alt="AgroTahlil logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="font-bold text-xl text-white">AgroTahlil</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Bosh sahifa
            </Link>
            <Link href="/devices" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-soil-500/50">
              Qurilmalar
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Sozlamalar
            </Link>
            <Link
              href="/dashboard"
              className="ml-2 px-4 py-2 bg-white text-soil-700 rounded-md text-sm font-medium transition-colors hover:bg-white/90"
            >
              Boshqaruv paneli
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-soil-500/50"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-soil-800">Qurilmalar</h1>
            <p className="text-muted-foreground">Barcha ulangan qurilmalarni boshqaring</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-1 bg-white">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Orqaga</span>
              </Button>
            </Link>
            <Button size="sm" className="gap-1 bg-soil-600 hover:bg-soil-700 text-white">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Yangilash</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Ulangan qurilmalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Qurilmalarni qidirish..."
                  className="pl-8 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="h-10 gap-1 bg-white">
                <Filter className="h-4 w-4" />
                <span>Filtrlash</span>
              </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Qurilma ID</TableHead>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Joylashuvi</TableHead>
                    <TableHead>Holati</TableHead>
                    <TableHead>So'nggi ulanish</TableHead>
                    <TableHead>Batareya</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead className="text-right">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDevices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Qurilmalar topilmadi
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDevices.map((device) => (
                      <motion.tr
                        key={device.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b hover:bg-muted/20"
                      >
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${device.status === "online" ? "bg-green-50 text-green-700 border-green-200" : ""}
                              ${device.status === "offline" ? "bg-red-50 text-red-700 border-red-200" : ""}
                              ${device.status === "maintenance" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                            `}
                          >
                            {device.status === "online" && "Onlayn"}
                            {device.status === "offline" && "Oflayn"}
                            {device.status === "maintenance" && "Texnik xizmat"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(device.lastConnection)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  device.batteryLevel > 60
                                    ? "bg-green-500"
                                    : device.batteryLevel > 20
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${device.batteryLevel}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{device.batteryLevel}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  device.signalStrength > 70
                                    ? "bg-green-500"
                                    : device.signalStrength > 30
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${device.signalStrength}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{device.signalStrength}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setDeviceToTerminate(device.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Uzish</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Qurilmani uzishni tasdiqlash</DialogTitle>
                                <DialogDescription>
                                  Siz rostdan ham {device.name} qurilmasini uzmoqchimisiz? Bu amal qurilma bilan aloqani
                                  to'xtatadi.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="sm:justify-start">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => handleTerminateDevice(device.id)}
                                >
                                  Ha, uzish
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setDeviceToTerminate(null)}>
                                  Bekor qilish
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Jami {filteredDevices.length} ta qurilma ko'rsatilmoqda
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={[
          { label: "Bosh sahifa", href: "/" },
          { label: "Qurilmalar", href: "/devices" },
          { label: "Sozlamalar", href: "/settings" },
          { label: "Boshqaruv paneli", href: "/dashboard" },
        ]}
      />
    </div>
  )
}
