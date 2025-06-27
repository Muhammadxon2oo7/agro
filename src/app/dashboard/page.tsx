"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SoilMetricsChart } from "@/components/soil-metrics-chart"
import { SoilMetricsTable } from "@/components/soil-metrics-table"
import { SoilHealthGauge } from "@/components/soil-health-gauge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { MobileMenu } from "@/components/mobile-menu"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

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
            <Link
              href="/devices"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Qurilmalar
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Sozlamalar
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 rounded-full bg-white/20 hover:bg-white/30">
                  <img src="/placeholder.svg?height=32&width=32" className="rounded-full border" alt="Foydalanuvchi" />
                  <span className="sr-only">Foydalanuvchi menyusi</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mening hisobim</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    Sozlamalar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Yordam</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Chiqish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-amber-800">E'tibor talab qilinadi</h3>
                <p className="text-amber-700 text-sm mt-1">
                  3-dala azot darajasi optimal ko'rsatkichdan past. Keyingi 7 kun ichida azotga boy o'g'it qo'llashni
                  o'ylab ko'ring.
                </p>
                <div className="flex gap-3 mt-3">
                  <Button size="sm" variant="outline" className="h-8 text-xs bg-white">
                    Tavsiyalarni ko'rish
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 text-xs text-amber-700">
                    Yopish
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowAlert(false)}>
                <span className="sr-only">Yopish</span>
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
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold tracking-tight text-soil-800">Tuproq monitoring boshqaruv paneli</h1>
            <p className="text-muted-foreground">Tuproq sog'lig'i ko'rsatkichlarini kuzating va tahlil qiling</p>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1 bg-white">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">So'nggi 30 kun</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sana oralig'ini tanlang</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1 bg-white">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Filtrlash</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ma'lumotlarni filtrlash</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" className="h-9 gap-1 bg-soil-600 hover:bg-soil-700 text-white">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Yangilash</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ma'lumotlarni yangilash</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Azot (N)",
              value: "65 mg/kg",
              change: "+12%",
              status: "good",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20M12 18a6 6 0 0 0 0-12" />
                </svg>
              ),
              color: "bg-green-500",
              width: "w-2/3",
            },
            {
              title: "Fosfor (P)",
              value: "42 mg/kg",
              change: "-5%",
              status: "warning",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20M12 18a6 6 0 0 0 0-12" />
                </svg>
              ),
              color: "bg-yellow-500",
              width: "w-1/2",
            },
            {
              title: "Kaliy (K)",
              value: "120 mg/kg",
              change: "+8%",
              status: "good",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20M12 18a6 6 0 0 0 0-12" />
                </svg>
              ),
              color: "bg-green-500",
              width: "w-3/4",
            },
            {
              title: "pH darajasi",
              value: "6.8",
              change: "Optimal",
              status: "good",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M2 12h20M12 18a6 6 0 0 0 0-12" />
                </svg>
              ),
              color: "bg-green-500",
              width: "w-4/5",
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden border-t-4"
                style={{ borderTopColor: metric.status === "good" ? "#4caf50" : "#f59e0b" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{metric.title} haqida ma'lumot</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center mt-1">
                    {metric.status === "good" ? (
                      <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-yellow-500 mr-1" />
                    )}
                    <p className={`text-xs ${metric.status === "good" ? "text-green-500" : "text-yellow-500"}`}>
                      {metric.change} oxirgi o'lchovdan
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className={`h-1 ${metric.width} rounded-full ${metric.color}`}></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vaqt davomida tuproq ko'rsatkichlari</CardTitle>
                  <CardDescription>So'nggi 30 kun ichida tuproq tarkibidagi o'zgarishlarni kuzating</CardDescription>
                </div>
                <Badge variant="outline" className="ml-auto animate-pulse bg-green-50 text-green-700 border-green-200">
                  Jonli ma'lumotlar
                </Badge>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <SoilMetricsChart />
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Tuproq sog'lig'i baholash</CardTitle>
                <CardDescription>Barcha parametrlar asosida umumiy sog'liq baholash</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {isLoading ? (
                  <div className="h-[200px] w-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <SoilHealthGauge />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                  Umumiy ko'rinish
                </TabsTrigger>
                <TabsTrigger value="temperature" className="data-[state=active]:bg-white">
                  Harorat
                </TabsTrigger>
                <TabsTrigger value="moisture" className="data-[state=active]:bg-white">
                  Namlik
                </TabsTrigger>
                <TabsTrigger value="nutrients" className="data-[state=active]:bg-white">
                  Ozuqa moddalar
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="ml-auto gap-1 bg-white">
                <Download className="h-3.5 w-3.5" />
                <span>Eksport</span>
              </Button>
            </div>
            <TabsContent value="overview" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-foliage-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Harorat</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">22.5°C</div>
                    <p className="text-xs text-muted-foreground">Optimal diapazoni: 18-24°C</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">18°C</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="bg-foliage-500 h-full rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">24°C</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-water-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Namlik</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">38%</div>
                    <p className="text-xs text-muted-foreground">-2% oxirgi o'lchovdan</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">25%</span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="bg-water-500 h-full rounded-full" style={{ width: "52%" }}></div>
                      </div>
                      <span className="text-xs text-muted-foreground">50%</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Oxirgi yangilanish</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2 soat oldin</div>
                    <p className="text-xs text-muted-foreground">15 Mart, 2024 soat 9:31</p>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Qurilma onlayn</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Qurilma holati</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Onlayn</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Batareya: 78%</p>
                    <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>So'nggi o'lchovlar</CardTitle>
                      <CardDescription>
                        Qurilmangiz tomonidan to'plangan eng so'nggi tuproq ma'lumotlarini ko'ring
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white">
                          <span>1-dala</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>1-dala</DropdownMenuItem>
                        <DropdownMenuItem>2-dala</DropdownMenuItem>
                        <DropdownMenuItem>3-dala</DropdownMenuItem>
                        <DropdownMenuItem>Barcha dalalar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[200px] w-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <SoilMetricsTable />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="temperature" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Harorat tahlili</CardTitle>
                  <CardDescription>Batafsil harorat ma'lumotlari va tendentsiyalari</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Harorat ma'lumotlari vizualizatsiyasi bu yerda ko'rsatiladi
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="moisture" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Namlik tahlili</CardTitle>
                  <CardDescription>Batafsil namlik ma'lumotlari va tendentsiyalari</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Namlik ma'lumotlari vizualizatsiyasi bu yerda ko'rsatiladi
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="nutrients" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ozuqa moddalari tahlili</CardTitle>
                  <CardDescription>Batafsil ozuqa moddalari ma'lumotlari va tendentsiyalari</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ozuqa moddalari ma'lumotlari vizualizatsiyasi bu yerda ko'rsatiladi
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
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
