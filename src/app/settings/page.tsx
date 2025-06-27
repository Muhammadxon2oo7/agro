"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, User, Bell, Globe, Shield, Moon, Sun, Laptop } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MobileMenu } from "@/components/mobile-menu"

export default function SettingsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [formState, setFormState] = useState({
    name: "Aziz Karimov",
    email: "aziz.karimov@example.com",
    phone: "+998 97 123 45 67",
    language: "uz",
    theme: "system",
    notifications: {
      email: true,
      push: true,
      sms: false,
      alerts: true,
      reports: true,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (field: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: checked,
      },
    }))
  }

  const handleThemeChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      theme: value,
    }))
  }

  const handleLanguageChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      language: value,
    }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    console.log("Saving settings:", formState)
    // Show success message or notification
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
            <Link
              href="/devices"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Qurilmalar
            </Link>
            <Link href="/settings" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-soil-500/50">
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
            <h1 className="text-2xl font-bold tracking-tight text-soil-800">Sozlamalar</h1>
            <p className="text-muted-foreground">Hisob va dastur sozlamalarini boshqaring</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-1 bg-white">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Orqaga</span>
              </Button>
            </Link>
            <Button size="sm" className="gap-1 bg-soil-600 hover:bg-soil-700 text-white" onClick={handleSaveSettings}>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Saqlash</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="account" className="data-[state=active]:bg-white">
              <User className="h-4 w-4 mr-2" />
              Hisob
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-white">
              <Bell className="h-4 w-4 mr-2" />
              Bildirishnomalar
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-white">
              <Globe className="h-4 w-4 mr-2" />
              Ko'rinish
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white">
              <Shield className="h-4 w-4 mr-2" />
              Xavfsizlik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Hisob ma'lumotlari</CardTitle>
                  <CardDescription>Shaxsiy ma'lumotlaringizni yangilang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">To'liq ism</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon raqami</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Saqlash</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Bildirishnoma sozlamalari</CardTitle>
                  <CardDescription>Qanday bildirishnomalarni olishni xohlashingizni sozlang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Bildirishnoma kanallari</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex-1">
                          Email bildirishnomalari
                        </Label>
                        <Switch
                          id="email-notifications"
                          checked={formState.notifications.email}
                          onCheckedChange={(checked) => handleSwitchChange("email", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex-1">
                          Push bildirishnomalari
                        </Label>
                        <Switch
                          id="push-notifications"
                          checked={formState.notifications.push}
                          onCheckedChange={(checked) => handleSwitchChange("push", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-notifications" className="flex-1">
                          SMS bildirishnomalari
                        </Label>
                        <Switch
                          id="sms-notifications"
                          checked={formState.notifications.sms}
                          onCheckedChange={(checked) => handleSwitchChange("sms", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Bildirishnoma turlari</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="alerts" className="flex-1">
                          Ogohlantirish bildirishnomalari
                          <span className="block text-xs text-muted-foreground mt-1">
                            Tuproq ko'rsatkichlari optimal diapazondan tashqariga chiqqanda
                          </span>
                        </Label>
                        <Switch
                          id="alerts"
                          checked={formState.notifications.alerts}
                          onCheckedChange={(checked) => handleSwitchChange("alerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reports" className="flex-1">
                          Hisobot bildirishnomalari
                          <span className="block text-xs text-muted-foreground mt-1">
                            Haftalik va oylik tuproq tahlili hisobotlari
                          </span>
                        </Label>
                        <Switch
                          id="reports"
                          checked={formState.notifications.reports}
                          onCheckedChange={(checked) => handleSwitchChange("reports", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Saqlash</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Ko'rinish sozlamalari</CardTitle>
                  <CardDescription>Til va mavzu sozlamalarini o'zgartiring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Til</h3>
                    <div className="max-w-xs">
                      <Select value={formState.language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Tilni tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uz">O'zbek</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ru">Русский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Mavzu</h3>
                    <RadioGroup
                      value={formState.theme}
                      onValueChange={handleThemeChange}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                        <Label
                          htmlFor="theme-light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Yorug'</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                        <Label
                          htmlFor="theme-dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Qorong'i</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                        <Label
                          htmlFor="theme-system"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Laptop className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Tizim</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Saqlash</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Xavfsizlik sozlamalari</CardTitle>
                  <CardDescription>Hisobingiz xavfsizligini boshqaring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Joriy parol</Label>
                      <Input id="current-password" type="password" className="bg-white" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Yangi parol</Label>
                      <Input id="new-password" type="password" className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                      <Input id="confirm-password" type="password" className="bg-white" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>Parolni yangilash</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
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
