"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Leaf,
  BarChart3,
  Droplets,
  Thermometer,
  Zap,
  Users,
  FileText,
  Play,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedSoilParticles } from "@/components/animated-soil-particles"
import { AnimatedCounter } from "@/components/animated-counter"
import { ParallaxSection } from "@/components/parallax-section"
import { MobileMenu } from "@/components/mobile-menu"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useSmoothScroll()

  // Initialize soil particles animation
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("span")
      particle.className = "soil-particle animate-float"

      // Random position
      const posX = Math.random() * window.innerWidth
      const posY = Math.random() * window.innerHeight

      // Random size
      const size = Math.random() * 5 + 2

      // Set styles
      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`

      // Add to DOM
      document.querySelector(".soil-particles")?.appendChild(particle)

      // Remove after animation
      setTimeout(() => {
        particle.remove()
      }, 15000)
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle()
    }

    // Create new particles periodically
    const interval = setInterval(createParticle, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-soil-800 backdrop-blur-md border-b border-soil-700 shadow-sm">
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
            <a
              href="#features"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Xususiyatlar
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Qanday ishlaydi
            </a>
            <a
              href="#benefits"
              className="px-4 py-2 rounded-md text-sm font-medium text-white transition-colors hover:bg-soil-500/50"
            >
              Afzalliklar
            </a>
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

      <main className="flex-1 pt-16">
        {/* Hero Section with Parallax */}
        <section id="hero" ref={heroRef} className="relative overflow-hidden hero-pattern">
          <div className="soil-particles" />
          <AnimatedSoilParticles />

          <motion.div
            className="container px-4 md:px-6 flex flex-col items-center justify-center min-h-[90vh] relative z-10"
            style={{ y, opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center space-y-4 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-foliage-100 text-foliage-800 text-sm font-medium mb-4 animate-bounce-slow">
                Inqilobiy tuproq monitoring texnologiyasi
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                Aqlli tuproq monitoringi va tahlili
              </h1>
              <p className="max-w-[800px] text-muted-foreground md:text-xl mt-4">
                Real vaqt tuproq ma'lumotlari bilan qishloq xo'jaligi amaliyotingizni o'zgartiring. Bizning keng
                qamrovli tahlil platformamiz bilan azot, fosfor, kaliy, namlik, pH darajasi va haroratni kuzating.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-full group bg-soil-600 hover:bg-soil-700 text-white">
                    Boshqaruv panelini ko'rish
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-full" onClick={() => setIsVideoModalOpen(true)}>
                  <Play className="mr-2 h-4 w-4" />
                  Demo ko'rish
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foliage-700">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Aniqlik darajasi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foliage-700">
                    <AnimatedCounter end={35} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Hosil oshishi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foliage-700">
                    <AnimatedCounter end={42} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Suv tejamkorligi</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="h-8 w-8 rotate-90 text-muted-foreground" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text mb-4">
                Ilg'or xususiyatlar
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
                Bizning platformamiz qishloq xo'jaligi amaliyotini inqilob qiladigan keng qamrovli tuproq tahlili va
                monitoring imkoniyatlarini taqdim etadi
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="h-10 w-10 text-foliage-600" />,
                  title: "Real vaqt monitoringi",
                  description:
                    "Qurilmangizdan avtomatik ma'lumotlarni sinxronlash orqali tuproq parametrlarini real vaqtda kuzating. Qiymatlar optimal diapazondan tashqariga chiqqanda darhol ogohlantirishlar oling.",
                  delay: 0.1,
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-foliage-600" />,
                  title: "Ilg'or tahlillar",
                  description:
                    "Tendentsiyalar, taqqoslashlar va amaliy tushunchalar bilan keng qamrovli ma'lumotlar tahlili. Tuproq sog'lig'ini intuitiv diagrammalar va grafiklar bilan vizualizatsiya qiling.",
                  delay: 0.2,
                },
                {
                  icon: <Zap className="h-10 w-10 text-foliage-600" />,
                  title: "Aqlli tavsiyalar",
                  description:
                    "Ma'lumotlaringiz asosida tuproq sog'lig'ini yaxshilash uchun shaxsiy tavsiyalar oling. Bizning AI tuproq holatini tahlil qiladi va optimal harakatlarni taklif qiladi.",
                  delay: 0.3,
                },
                {
                  icon: <Droplets className="h-10 w-10 text-foliage-600" />,
                  title: "Namlik boshqaruvi",
                  description:
                    "Real vaqt tuproq namligi ma'lumotlari asosida sug'orish jadvallarini optimallashtiring. Suv isrofini kamaytiring va o'simliklar aynan kerak bo'lgan narsani olishini ta'minlang.",
                  delay: 0.4,
                },
                {
                  icon: <Thermometer className="h-10 w-10 text-foliage-600" />,
                  title: "Harorat kuzatuvi",
                  description:
                    "O'simliklarning o'sishi va mikrob faoliyatiga ta'sir qiladigan tuproq harorati o'zgarishlarini kuzating. Optimal ekish vaqti va sharoitlarini aniqlang.",
                  delay: 0.5,
                },
                {
                  icon: <FileText className="h-10 w-10 text-foliage-600" />,
                  title: "Batafsil hisobotlar",
                  description:
                    "Tuproq sog'lig'i va vaqt davomida tendentsiyalar haqida keng qamrovli hisobotlar yarating. Ma'lumotlarni keyingi tahlil yoki hisob yuritish uchun turli formatlarda eksport qiling.",
                  delay: 0.6,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-4 rounded-xl border p-6 shadow-sm bg-white card-hover-effect"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className="p-3 rounded-full bg-foliage-100">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-center">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32 how-it-works-pattern">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text mb-4">
                Qanday ishlaydi
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
                Bizning tuproq monitoring tizimimiz ilg'or sensorlarni kuchli tahlillar bilan birlashtiradi
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative rounded-xl overflow-hidden border shadow-lg">
                  <Image
                    src="/images/how.jpg"
                    alt="Tuproq monitoring qurilmasi ishlayotgan holda"
                    width={600}
                    height={600}
                    className="w-full h-[500px]"
                    quality={100} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Ilg'or Sensor Texnologiyasi</h3>
                      <p className="text-sm opacity-90">
                        Uzoq muddatli batareya quvvati bilan ko'p parametrli sensorlar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border animate-float">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500 relative">
                      <span className="absolute inset-0 h-full w-full rounded-full bg-green-500 animate-pulse-ring"></span>
                    </div>
                    <span className="text-sm font-medium">Jonli ma'lumot Uzatish</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {[
                  {
                    number: "01",
                    title: "Sensor o'rnatish",
                    description:
                      "Tuproq monitoring qurilmasini dalangiz yoki bog'ingizga joylashtiring. Sensorlar avtomatik ravishda azot, fosfor, kaliy, namlik, pH va harorat bo'yicha ma'lumotlarni yig'ishni boshlaydi.",
                  },
                  {
                    number: "02",
                    title: "Ma'lumot uzatish",
                    description:
                      "Qurilma yig'ilgan ma'lumotlarni bizning bulut platformamizga simsiz tarzda real vaqtda uzatadi, bu sizga doimo tuproq holati haqida eng yangi ma'lumotlarga ega bo'lishingizni ta'minlaydi.",
                  },
                  {
                    number: "03",
                    title: "Tahlil va qayta ishlash",
                    description:
                      "Bizning ilg'or algoritmlarimiz ma'lumotlarni tahlil qiladi, naqshlar, tendentsiyalar va potentsial muammolarni aniqlaydi. Tizim sizning ko'rsatkichlaringizni muayyan ekinlaringiz uchun optimal diapazonlar bilan taqqoslaydi.",
                  },
                  {
                    number: "04",
                    title: "Amaliy tushunchalar",
                    description:
                      "Keng qamrovli tahlillarni ko'rish, tavsiyalar olish va tuproq sog'lig'i va hosil unumdorligini optimallashtirish uchun ma'lumotlarga asoslangan qarorlar qabul qilish uchun shaxsiy boshqaruv panelingizga kiring.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-foliage-100 text-foliage-700 flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 md:py-32 benefits-pattern">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text mb-4">
                Isbotlangan afzalliklar
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
                Mijozlarimiz qishloq xo'jaligi unumdorligida sezilarli yaxshilanishlarni boshdan kechirdilar
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  metric: "35%",
                  title: "Hosil unumdorligining oshishi",
                  description:
                    "Mijozlar bizning tuproq monitoring tizimimizni joriy qilgandan so'ng hosil unumdorligining o'rtacha 35% oshganligini xabar qilmoqdalar.",
                },
                {
                  metric: "42%",
                  title: "Suv sarfining kamayishi",
                  description:
                    "Real vaqt tuproq namligi ma'lumotlari asosida sug'orishni optimallashtiring, suv sarfini 42% gacha kamaytiring.",
                },
                {
                  metric: "28%",
                  title: "O'g'it xarajatlarining kamayishi",
                  description:
                    "O'g'itlarni faqat kerak bo'lganda va kerakli joyda qo'llang, xarajatlarni va atrof-muhitga ta'sirni 28% ga kamaytiring.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border bg-white p-8 shadow-sm flex flex-col items-center text-center card-hover-effect"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-5xl font-extrabold text-foliage-600 mb-4">{benefit.metric}</div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <ParallaxSection speed={0.2}>
              <motion.div
                className="bg-white rounded-xl border shadow-lg p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Barqaror qishloq xo'jaligiga ta'siri</h3>
                    <p className="text-muted-foreground mb-6">
                      Bizning tuproq monitoring texnologiyamiz nafaqat hosildorlikni oshiradi va xarajatlarni
                      kamaytiradi, balki uzoq muddatli ekologik foydalari bilan barqaror qishloq xo'jaligi amaliyotiga
                      ham hissa qo'shadi.
                    </p>

                    <ul className="space-y-3">
                      {[
                        "Suv yo'llariga kimyoviy oqimlarning kamayishi",
                        "Optimallashtirilgan o'g'it ishlatishdan issiqxona gazlari chiqindilarining kamayishi",
                        "Tuproq sog'lig'i va biologik xilma-xillikning yaxshilanishi",
                        "Suv resurslarini saqlash",
                        "Yaxshiroq boshqaruv orqali tuproq eroziyasining kamayishi",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Check className="h-5 w-5 text-foliage-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button className="rounded-full bg-soil-600 hover:bg-soil-700 text-white">
                        Barqarorlik hisobotini yuklab olish
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.div
                      className="rounded-xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <Image
                        src="/images/grow.png"
                        alt="Tuproq monitoring bilan barqaror dehqonchilik"
                        width={600}
                        height={500}
                        className="w-full h-[500px]"
                      />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-2.5 -left-6 bg-white rounded-xl p-4 shadow-lg border"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-foliage-600" />
                        <span className="text-sm font-medium">10,000+ Fermerlar Bizning yechimimizga ishonadi</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 testimonials-pattern">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text mb-4">
                Foydalanuvchilarimiz nima deydi
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
                O'z amaliyotlarini o'zgartirgan fermerlar va qishloq xo'jaligi mutaxassislaridan eshiting
              </p>
            </motion.div>

            <Tabs defaultValue="farmers" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="farmers">Fermerlar</TabsTrigger>
                  <TabsTrigger value="researchers">Tadqiqotchilar</TabsTrigger>
                  <TabsTrigger value="educators">O'qituvchilar</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="farmers" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      quote:
                        "Tuproq monitoring tizimi mening fermamni boshqarish usulimni butunlay o'zgartirdi. Men hosildorlikni 40% oshganini ko'rdim va suv va o'g'it sarfini sezilarli darajada kamaytirishga erishdim.",
                      name: "Aziz Karimov",
                      role: "Organik fermer, Samarqand",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Aniq qishloq xo'jaligi tarafdori sifatida, men ko'plab yechimlarni sinab ko'rdim, lekin bu tuproq monitoring tizimi ajralib turadi. Real vaqt ma'lumotlari va amaliy tushunchalar o'yin qoidalarini o'zgartirdi.",
                      name: "Nodira Rahimova",
                      role: "Tijorat ferma menejeri, Toshkent",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Investitsiyadan qaytim ajoyib bo'ldi. Bir mavsumda suv tejamkorligi butun tizim uchun to'landi. Endi men butun operatsiyamni kuzatish uchun kengaytiryapman.",
                      name: "Dilshod Ahmedov",
                      role: "Uzumzor egasi, Farg'ona",
                      image: "/images/ghost.png",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl border p-6 shadow-sm card-hover-effect"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full w-[30px] h-[30px]"
                          />
                          <div>
                            <div className="font-medium">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="researchers" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      quote:
                        "Bu tuproq monitoring tizimidan olingan ma'lumotlarning aniqligi bizning qishloq xo'jaligi tadqiqotlarimiz uchun juda qimmatli bo'ldi. Biz tuproq holati va ekin unumdorligi o'rtasida aniq bog'liqliklarni o'rnatishga muvaffaq bo'ldik.",
                      name: "Dr. Gulnora Saidova",
                      role: "Qishloq xo'jaligi olimi, Universitet Tadqiqot Markazi",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Barqaror dehqonchilik amaliyotini o'rganayotgan kishi sifatida, bu texnologiya fermerlarga dalillarga asoslangan tavsiyalar berish uchun kerak bo'lgan aniq ma'lumotlarni taqdim etadi.",
                      name: "Prof. Jamshid Toshmatov",
                      role: "Ekologiya fanlari bo'limi",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Tuproq monitoring ma'lumotlariga API orqali kirish imkoniyati bizga uni iqlim modellarimiz bilan integratsiya qilish imkonini berdi, bu esa qishloq xo'jaligi ekotizimlarining yanada keng qamrovli tasvirini yaratdi.",
                      name: "Dr. Malika Yusupova",
                      role: "Iqlim Tadqiqot Instituti",
                      image: "/images/ghost.png",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl border p-6 shadow-sm card-hover-effect"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full w-[30px] h-[30px]"
                          />
                          <div>
                            <div className="font-medium">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="educators" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      quote:
                        "Biz bu tuproq monitoring tizimini qishloq xo'jaligi o'quv dasturimizga kiritdik. Talabalar zamonaviy aniq qishloq xo'jaligi texnikalari bilan amaliy tajriba olishadi.",
                      name: "Prof. Rustam Qodirov",
                      role: "Qishloq xo'jaligi kolleji",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Vizual boshqaruv paneli murakkab tuproq fanini talabalarga tushunarli qiladi. Bu tuproqni boshqarish tamoyillarini o'rgatish usulimizni o'zgartirdi.",
                      name: "Manzura Aliyeva",
                      role: "O'rta maktab qishloq xo'jaligi o'qituvchisi",
                      image: "/images/ghost.png",
                    },
                    {
                      quote:
                        "Biz bu tizimni mahalliy fermerlarga eng yaxshi amaliyotlarni namoyish qilish uchun kengaytirish dasturlarimizda ishlatamiz. Aniq ma'lumotlarni vizualizatsiya qilish murakkab tushunchalarni samarali yetkazishga yordam beradi.",
                      name: "Tohir Rasulov",
                      role: "Qishloq xo'jaligi kengaytirish mutaxassisi",
                      image: "/images/ghost.png",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl border p-6 shadow-sm card-hover-effect"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={50}
                            height={50}
                            className="rounded-full w-[30px] h-[30px]"
                          />
                          <div>
                            <div className="font-medium">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 animated-gradient-bg">
          <div className="container px-4 md:px-6">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#432e16] mb-4">
                Tuproq boshqaruvingizni o'zgartirishga tayyormisiz?
              </h2>
              <p className="text-gray md:text-xl mb-8">
                Bizning tuproq monitoring texnologiyamiz bilan o'z amaliyotlarini inqilob qilgan minglab fermerlar va
                qishloq xo'jaligi mutaxassislariga qo'shiling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="rounded-full bg-white text-soil-700 hover:bg-white/90">
                    Bugun boshlang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-full border-white text-[#333] bg-white hover-bg-white">
                  Demo so'rash
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "10,000+", label: "Faol qurilmalar" },
                  { number: "25+", label: "Mamlakatlar" },
                  { number: "1.2M", label: "Kuzatilgan gektar" },
                  { number: "98%", label: "Mijoz mamnuniyati" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-[#333]">{stat.number}</div>
                    <div className="text-sm text-[#333]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-soil-800 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/agrotahlil-logo.png"
                  alt="AgroTahlil logo"
                  width={48}
                  height={48}
                  className="mr-2"
                />
                <span className="font-bold text-xl">AgroTahlil</span>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Ilg'or tuproq monitoring texnologiyasi va ma'lumotlarga asoslangan tushunchalar orqali qishloq
                xo'jaligini inqilob qilish.
              </p>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-white/70">+998 97 495 68 88</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/70">info@agrotahlil.uz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Manzil</p>
                    <p className="text-white/70">Toshkent shahri, Chilonzor tumani, Islom Karimov ko'chasi, 49-uy</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Kompaniya</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Biz haqimizda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Bizning jamoa
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Hamkorlar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Karyera
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Yangiliklar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Mahsulotlar</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Tuproq sensorlari
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Monitoring tizimi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Tahlil platformasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Mobil ilova
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    API integratsiyasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Yordam</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Ko'p so'raladigan savollar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Qo'llanma
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Texnik yordam
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Bog'lanish
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Hamkorlik
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">© 2024 AgroTahlil. Barcha huquqlar himoyalangan.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Maxfiylik siyosati
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Foydalanish shartlari
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Cookie siyosati
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="font-bold">AgroTahlil Demo Video</h3>
                <button onClick={() => setIsVideoModalOpen(false)} className="p-1 rounded-full hover:bg-muted">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://youtu.be/8-QmQl9U82A"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={[
          { label: "Xususiyatlar", href: "#features", isExternal: true },
          { label: "Qanday ishlaydi", href: "#how-it-works", isExternal: true },
          { label: "Afzalliklar", href: "#benefits", isExternal: true },
          { label: "Boshqaruv paneli", href: "/dashboard" },
        ]}
      />
    </div>
  )
}
