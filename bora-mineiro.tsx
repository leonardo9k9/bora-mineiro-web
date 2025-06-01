"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Shield,
  Heart,
  CreditCard,
  Navigation,
  Star,
  Users,
  Car,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Bell,
  X,
  Music,
  Wifi,
  Coffee,
  Cigarette,
  Zap,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Edit3,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Compass,
  Lock,
  UserPlus,
  Mail,
  DollarSign,
  LogIn,
  User,
  Settings,
  LogOut,
  Camera,
  Share2,
  Send,
  Paperclip,
  ImageIcon,
  History,
  Wallet,
  HelpCircle,
} from "lucide-react"

export default function BoraMineiro() {
  const [currentView, setCurrentView] = useState("splash")
  const [userType, setUserType] = useState<"passenger" | "driver" | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [ratingData, setRatingData] = useState<{ type: "driver" | "passenger"; name: string; avatar: string } | null>(
    null,
  )
  const [chatWith, setChatWith] = useState<{ name: string; avatar: string; type: "driver" | "passenger" } | null>(null)
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      type: "message" | "ride" | "system"
      title: string
      message: string
      time: string
      read: boolean
      from?: string
      avatar?: string
    }>
  >([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "me" | "other"; time: string }>>([
    { id: "1", text: "Olá! Estou a caminho do ponto de encontro.", sender: "other", time: "14:30" },
    { id: "2", text: "Perfeito! Estou te esperando aqui.", sender: "me", time: "14:32" },
    { id: "3", text: "Chegando em 5 minutos!", sender: "other", time: "14:35" },
  ])
  const [newMessage, setNewMessage] = useState("")

  // Simular notificações chegando
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular nova mensagem chegando aleatoriamente
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now().toString(),
          type: "message" as const,
          title: "Nova mensagem",
          message: "Ana Silva: Já estou chegando no ponto de encontro!",
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
          from: "Ana Silva",
          avatar: "A",
        }

        setNotifications((prev) => [newNotification, ...prev])
        setUnreadCount((prev) => prev + 1)

        // Mostrar notificação toast
        showToastNotification(newNotification)
      }
    }, 15000) // A cada 15 segundos

    return () => clearInterval(interval)
  }, [])

  const showToastNotification = (notification: any) => {
    // Criar elemento de notificação toast
    const toast = document.createElement("div")
    toast.className =
      "fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white p-4 rounded-xl shadow-2xl z-50 max-w-sm animate-slide-in border border-purple-400/30 backdrop-blur-sm"
    toast.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
          ${notification.avatar || "🔔"}
        </div>
        <div class="flex-1">
          <div class="font-semibold text-purple-100">${notification.title}</div>
          <div class="text-sm text-purple-200 mt-1">${notification.message}</div>
          <div class="text-xs text-purple-300 mt-2">${notification.time}</div>
        </div>
      </div>
    `

    document.body.appendChild(toast)

    // Remover após 5 segundos
    setTimeout(() => {
      toast.remove()
    }, 5000)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const openChat = (name: string, avatar: string, type: "driver" | "passenger") => {
    setChatWith({ name, avatar, type })
    setShowChat(true)
  }

  const openRating = (type: "driver" | "passenger", name: string, avatar: string) => {
    setRatingData({ type, name, avatar })
    setShowRating(true)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "me" as const,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const openLocationInMap = (location: string, coordinates?: { lat: number; lng: number }) => {
    // Para dispositivos móveis, usar o app nativo de mapas
    if (coordinates) {
      const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
      window.open(url, "_blank")
    } else {
      // Fallback para busca por nome
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Minas Gerais, Brasil")}`
      window.open(url, "_blank")
    }
  }

  const renderSplash = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Top 30% - Enhanced Purple section with car */}
      <div className="h-[35vh] bg-gradient-to-br from-purple-400 via-purple-500 to-violet-600 flex items-center justify-center relative overflow-hidden">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 w-12 h-12 border-2 border-purple-700 rounded-full animate-pulse"></div>
          <div className="absolute top-16 right-12 w-6 h-6 bg-purple-700 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-16 w-8 h-8 border-2 border-purple-700 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-8 right-8 w-4 h-4 bg-purple-700 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-8 w-3 h-16 bg-purple-700/50 rounded-full"></div>
          <div className="absolute top-1/2 right-8 w-3 h-16 bg-purple-700/50 rounded-full"></div>
        </div>

        {/* Enhanced car icon with multiple layers */}
        <div className="relative z-10">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl scale-150 animate-pulse"></div>

          {/* Shadow layer */}
          <div className="absolute inset-0 bg-black/30 rounded-2xl blur-xl scale-110 translate-y-2"></div>

          {/* Main container */}
          <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl p-8 shadow-2xl border border-purple-300/20">
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl"></div>

            {/* Car icon */}
            <Car className="h-24 w-24 text-purple-200 drop-shadow-2xl relative z-10" strokeWidth={1.5} />

            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-violet-300 rounded-full animate-ping delay-500"></div>
          </div>
        </div>

        {/* Floating road elements */}
        <div className="absolute top-12 left-1/4 animate-float delay-1000">
          <div className="w-3 h-3 bg-black/40 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 right-1/4 animate-float delay-500">
          <div className="w-4 h-4 bg-black/30 rounded-full"></div>
        </div>
        <div className="absolute top-20 right-1/3 animate-bounce delay-1500">
          <MapPin className="h-5 w-5 text-black/40" />
        </div>
      </div>

      {/* Bottom 65% - Enhanced Black section with improved content */}
      <div className="h-[65vh] bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center space-y-10 px-6 relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent"></div>

        {/* Top gradient from purple section */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/30 via-purple-900/10 to-transparent"></div>

        {/* Enhanced Logo Section */}
        <div className="text-center relative z-10 space-y-6">
          {/* Multiple glow layers for BM */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl opacity-40">
              <h1 className="text-9xl font-black text-purple-500">BM</h1>
            </div>
            <div className="absolute inset-0 blur-xl opacity-60">
              <h1 className="text-9xl font-black text-purple-400">BM</h1>
            </div>

            {/* Main BM logo with gradient */}
            <h1 className="text-9xl font-black bg-gradient-to-br from-white via-purple-100 to-purple-200 bg-clip-text text-transparent relative tracking-wider drop-shadow-2xl">
              BM
            </h1>
          </div>

          {/* App name with enhanced styling */}
          <div className="space-y-3">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
              Bora Mineiro
            </h2>

            {/* Enhanced subtitle with icon */}
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5 text-purple-400" />
              <p className="text-purple-300 text-lg font-medium tracking-wide">Caronas seguras em Minas Gerais</p>
              <Heart className="h-5 w-5 text-purple-400" />
            </div>

            {/* Decorative elements */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-purple-500"></div>
              <Star className="h-4 w-4 text-purple-400 animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-purple-400 to-purple-500"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Enter Button */}
        <div className="relative z-10">
          {/* Multiple glow layers */}
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-40 scale-125 animate-pulse"></div>
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-60 scale-110"></div>

          <Button
            className="relative w-72 h-16 bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700 hover:from-purple-700 hover:via-purple-800 hover:to-violet-800 text-white text-xl font-bold rounded-full shadow-2xl border border-purple-400/30 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30 group overflow-hidden"
            onClick={() => setCurrentView("auth")}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <span>Entrar</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        </div>

        {/* Enhanced bottom decorative elements */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-4 h-4 bg-purple-300 rounded-full animate-pulse delay-700"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1300"></div>
          </div>
        </div>

        {/* Side decorative elements */}
        <div className="absolute bottom-20 left-8 opacity-30">
          <Navigation className="h-6 w-6 text-purple-400 animate-bounce" />
        </div>
        <div className="absolute bottom-20 right-8 opacity-30">
          <MapPin className="h-6 w-6 text-purple-400 animate-bounce delay-700" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )

  const renderAuth = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        {/* Header background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border border-purple-300 rounded-full"></div>
          <div className="absolute top-8 right-8 w-4 h-4 bg-purple-300 rounded-full"></div>
          <div className="absolute bottom-4 left-8 w-6 h-6 border border-purple-300 rotate-45"></div>
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("splash")}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                BoraMineiro
              </h1>
              <p className="text-xs text-purple-200">Conectando Minas</p>
            </div>
          </div>
          <div className="w-16"></div>
        </div>

        <div className="text-center relative z-10">
          <p className="text-purple-100 text-lg font-medium">Acesse sua conta ou crie uma nova</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Shield className="h-4 w-4 text-purple-200" />
            <span className="text-sm text-purple-200">100% seguro e verificado</span>
          </div>
        </div>
      </div>

      {/* Enhanced Login/Cadastro */}
      <div className="p-6 relative z-10">
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-white text-2xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Bem-vindo ao BoraMineiro
            </CardTitle>
            <CardDescription className="text-gray-300">
              Junte-se à maior comunidade de caronas de Minas Gerais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-purple-400" />
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-purple-400" />
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-300">
                      <input type="checkbox" className="rounded border-purple-500" />
                      <span>Lembrar-me</span>
                    </label>
                    <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0">
                      Esqueci minha senha
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setCurrentView("home")}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Entrar
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-800 px-2 text-gray-400">ou continue com</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12"
                    onClick={() => {
                      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth"
                      const params = {
                        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
                        redirect_uri: window.location.origin + "/auth/google/callback",
                        response_type: "code",
                        scope: "email profile",
                        prompt: "select_account",
                      }
                      const queryString = new URLSearchParams(params).toString()
                      window.location.href = `${googleAuthUrl}?${queryString}`
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12"
                    onClick={() => {
                      const facebookAuthUrl = "https://www.facebook.com/v18.0/dialog/oauth"
                      const params = {
                        client_id: "YOUR_FACEBOOK_APP_ID", // Replace with your actual Facebook App ID
                        redirect_uri: window.location.origin + "/auth/facebook/callback",
                        response_type: "code",
                        scope: "email,public_profile",
                      }
                      const queryString = new URLSearchParams(params).toString()
                      window.location.href = `${facebookAuthUrl}?${queryString}`
                    }}
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-purple-400" />
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-reg" className="text-white font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-purple-400" />
                      E-mail
                    </Label>
                    <Input
                      id="email-reg"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-purple-400" />
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(31) 99999-9999"
                      className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-reg" className="text-white font-medium flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-purple-400" />
                      Senha
                    </Label>
                    <Input
                      id="password-reg"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 text-sm text-gray-300">
                      <input type="checkbox" className="rounded border-purple-500 mt-0.5" />
                      <span>
                        Aceito os{" "}
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                          Termos de Uso
                        </Button>{" "}
                        e{" "}
                        <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto">
                          Política de Privacidade
                        </Button>
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 text-sm text-gray-300">
                      <input type="checkbox" className="rounded border-purple-500" />
                      <span>Quero receber ofertas e novidades por e-mail</span>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={() => setCurrentView("home")}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Cadastrar Grátis
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-6 text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">SSL Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Verificado</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">Confiável</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Mais de 50.000 usuários confiam no BoraMineiro para suas viagens por Minas Gerais
          </p>
        </div>
      </div>
    </div>
  )

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 to-violet-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        {/* Header background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 left-4 w-12 h-12 border border-purple-300 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-purple-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 left-8 w-8 h-8 border border-purple-300 rotate-45 animate-spin-slow"></div>
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                BoraMineiro
              </h1>
              <p className="text-xs text-purple-200">Conectando Minas</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Enhanced Notifications Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white relative hover:bg-white/10 rounded-full p-2 transition-all duration-300"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs flex items-center justify-center p-0 border-2 border-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>

            {/* Enhanced Support Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Suporte</span>
            </Button>
          </div>
        </div>

        <div className="text-center relative z-10 space-y-2">
          <p className="text-purple-100 text-lg font-medium">Caronas seguras e turismo em Minas Gerais</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-purple-200">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>50k+ usuários</span>
            </div>
            <div className="w-1 h-1 bg-purple-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>4.9 estrelas</span>
            </div>
            <div className="w-1 h-1 bg-purple-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-green-400" />
              <span>100% seguro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-24 right-4 w-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-purple-500/30 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-600/10 to-violet-600/10">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center">
                <Bell className="h-4 w-4 mr-2 text-purple-400" />
                Notificações
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-300 text-xs hover:bg-purple-900/50"
                    onClick={markAllAsRead}
                  >
                    Marcar todas como lidas
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowNotifications(false)}
                  className="hover:bg-red-900/50 rounded-full"
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">Nenhuma notificação</p>
                <p className="text-gray-500 text-sm mt-1">Você está em dia!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700/50 cursor-pointer hover:bg-gray-800/50 transition-all duration-300 ${
                    !notification.read ? "bg-purple-900/20 border-l-4 border-l-purple-500" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {notification.avatar || "🔔"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm truncate">{notification.title}</h4>
                        {!notification.read && <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-gray-300 text-sm mt-1 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-400 text-xs">{notification.time}</span>
                        {notification.type === "message" && (
                          <Button size="sm" variant="ghost" className="text-purple-400 hover:bg-purple-900/50 h-6 px-2">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Responder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 space-y-8 relative z-10">
        {/* Enhanced User Type Selection */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-white text-2xl text-center bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Como você quer usar o BoraMineiro?
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Escolha sua experiência de viagem ideal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white h-20 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group overflow-hidden relative"
              onClick={() => {
                setUserType("passenger")
                setCurrentView("passenger-dashboard")
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <div className="flex items-center justify-between w-full relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Buscar Carona</div>
                    <div className="text-sm opacity-90">Encontre uma viagem confortável</div>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full border-purple-500/50 text-white hover:bg-purple-900/30 bg-gray-800/50 h-20 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group overflow-hidden relative backdrop-blur-sm"
              onClick={() => {
                setUserType("driver")
                setCurrentView("driver-dashboard")
              }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                    <Car className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Oferecer Carona</div>
                    <div className="text-sm opacity-70">Seja um motorista parceiro</div>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 text-purple-400" />
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Enhanced Diferenciais */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-white text-2xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 mr-3 text-purple-400" />
              <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Nossos Diferenciais
              </span>
            </CardTitle>
            <CardDescription className="text-gray-300 text-center">
              Por que escolher o BoraMineiro para suas viagens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {[
              {
                icon: Shield,
                title: "Caronas especiais para mulheres",
                description: "Ambiente seguro e confortável",
                color: "text-pink-400",
                bgColor: "bg-pink-500/10",
              },
              {
                icon: MapPin,
                title: "Sugestões de pontos turísticos em MG",
                description: "Descubra as belezas de Minas",
                color: "text-green-400",
                bgColor: "bg-green-500/10",
              },
              {
                icon: CreditCard,
                title: "Pagamento via PIX, cartão e boleto",
                description: "Flexibilidade total nos pagamentos",
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
              },
              {
                icon: Heart,
                title: "Seguro de vida incluso",
                description: "Proteção completa durante a viagem",
                color: "text-red-400",
                bgColor: "bg-red-500/10",
              },
              {
                icon: Navigation,
                title: "GPS de rastreio em tempo real",
                description: "Acompanhe sua viagem ao vivo",
                color: "text-purple-400",
                bgColor: "bg-purple-500/10",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700/50 hover:border-purple-500/30 group"
              >
                <div
                  className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Pontos Turísticos */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-white text-2xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Descubra Minas Gerais
            </CardTitle>
            <CardDescription className="text-gray-300">
              Destinos turísticos imperdíveis para suas próximas aventuras
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Ouro Preto",
                  image: "🏛️",
                  description: "História e arquitetura colonial",
                  gradient: "from-yellow-500/20 to-orange-500/20",
                  coordinates: { lat: -20.3856, lng: -43.5035 },
                },
                {
                  name: "Tiradentes",
                  image: "🚂",
                  description: "Charme e tradição mineira",
                  gradient: "from-green-500/20 to-emerald-500/20",
                  coordinates: { lat: -21.1089, lng: -44.1742 },
                },
                {
                  name: "Diamantina",
                  image: "💎",
                  description: "Patrimônio da humanidade",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  coordinates: { lat: -18.2394, lng: -43.6014 },
                },
                {
                  name: "Inhotim",
                  image: "🎨",
                  description: "Arte contemporânea e natureza",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  coordinates: { lat: -20.1267, lng: -44.2089 },
                },
              ].map((place, index) => (
                <div
                  key={index}
                  className={`text-center p-6 border border-purple-500/30 rounded-xl hover:bg-purple-900/20 cursor-pointer bg-gradient-to-br ${place.gradient} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {place.image}
                  </div>
                  <div className="font-bold text-lg text-white mb-1">{place.name}</div>
                  <div className="text-xs text-gray-400 mb-3">{place.description}</div>
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-purple-400 hover:bg-purple-900/50 w-full"
                      onClick={() => openLocationInMap(place.name, place.coordinates)}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      Ver no Mapa
                    </Button>
                    <Button size="sm" variant="ghost" className="text-purple-400 hover:bg-purple-900/50 w-full">
                      <Car className="h-3 w-3 mr-1" />
                      Ver caronas
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 rounded-xl"
                onClick={() => openLocationInMap("Minas Gerais pontos turísticos")}
              >
                <Compass className="h-4 w-4 mr-2" />
                Ver todos no mapa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  50k+
                </div>
                <div className="text-sm text-gray-300">Usuários ativos</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  200k+
                </div>
                <div className="text-sm text-gray-300">Viagens realizadas</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-300">Avaliação média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPassengerDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("home")}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Buscar Carona
              </h1>
              <p className="text-xs text-purple-200">Encontre sua viagem ideal</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(true)}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300 relative group"
          >
            <div className="relative">
              <Avatar className="w-8 h-8 border-2 border-purple-300/50">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white text-sm font-semibold">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 relative z-10">
        {/* Search Form */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Para onde você quer ir?
            </CardTitle>
            <CardDescription className="text-gray-300">Encontre caronas disponíveis para seu destino</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="origin" className="text-white font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                Origem
              </Label>
              <Input
                id="origin"
                placeholder="De onde você vai sair?"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination" className="text-white font-medium flex items-center">
                <Navigation className="h-4 w-4 mr-2 text-purple-400" />
                Destino
              </Label>
              <Input
                id="destination"
                placeholder="Para onde você quer ir?"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passengers" className="text-white font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-400" />
                  Passageiros
                </Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="4"
                  defaultValue="1"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <Search className="h-5 w-5 mr-2" />
              Buscar Caronas
            </Button>
          </CardContent>
        </Card>

        {/* Available Rides */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Caronas Disponíveis
            </CardTitle>
            <CardDescription className="text-gray-300">3 caronas encontradas para sua rota</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                driver: "João Silva",
                rating: 4.9,
                car: "Honda Civic 2020",
                price: "R$ 45,00",
                time: "14:30",
                seats: 2,
                verified: true,
              },
              {
                driver: "Maria Santos",
                rating: 4.8,
                car: "Toyota Corolla 2019",
                price: "R$ 40,00",
                time: "15:00",
                seats: 3,
                verified: true,
              },
              {
                driver: "Pedro Costa",
                rating: 4.7,
                car: "Volkswagen Jetta 2021",
                price: "R$ 50,00",
                time: "16:15",
                seats: 1,
                verified: false,
              },
            ].map((ride, index) => (
              <div
                key={index}
                className="p-4 border border-purple-500/30 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                        {ride.driver
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-semibold">{ride.driver}</h3>
                        {ride.verified && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{ride.rating}</span>
                        <span>•</span>
                        <span>{ride.car}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">{ride.price}</div>
                    <div className="text-sm text-gray-400">por pessoa</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span>{ride.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>{ride.seats} vagas</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 text-xs px-2 py-1 h-8"
                      onClick={() =>
                        openChat(
                          ride.driver,
                          ride.driver
                            .split(" ")
                            .map((n) => n[0])
                            .join(""),
                          "driver",
                        )
                      }
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/30 text-xs px-2 py-1 h-8"
                      onClick={() =>
                        openRating(
                          "driver",
                          ride.driver,
                          ride.driver
                            .split(" ")
                            .map((n) => n[0])
                            .join(""),
                        )
                      }
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Avaliar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Filters */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Filtros Rápidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Shield, label: "Apenas mulheres", color: "text-pink-400" },
                { icon: Star, label: "Bem avaliados", color: "text-yellow-400" },
                { icon: Zap, label: "Saída imediata", color: "text-green-400" },
                { icon: DollarSign, label: "Melhor preço", color: "text-blue-400" },
              ].map((filter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-gray-300 hover:bg-purple-900/30 rounded-full"
                >
                  <filter.icon className={`h-4 w-4 mr-2 ${filter.color}`} />
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDriverDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("home")}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Oferecer Carona
              </h1>
              <p className="text-xs text-purple-200">Seja um motorista parceiro</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(true)}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300 relative group"
          >
            <div className="relative">
              <Avatar className="w-8 h-8 border-2 border-purple-300/50">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white text-sm font-semibold">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 relative z-10">
        {/* Create Ride Form */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Criar Nova Carona
            </CardTitle>
            <CardDescription className="text-gray-300">
              Ofereça uma carona e ganhe dinheiro ajudando outros viajantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="origin-driver" className="text-white font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                Origem
              </Label>
              <Input
                id="origin-driver"
                placeholder="De onde você vai sair?"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination-driver" className="text-white font-medium flex items-center">
                <Navigation className="h-4 w-4 mr-2 text-purple-400" />
                Destino
              </Label>
              <Input
                id="destination-driver"
                placeholder="Para onde você vai?"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date-driver" className="text-white font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  Data
                </Label>
                <Input
                  id="date-driver"
                  type="date"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-driver" className="text-white font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-400" />
                  Horário
                </Label>
                <Input
                  id="time-driver"
                  type="time"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="seats-driver" className="text-white font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-400" />
                  Vagas
                </Label>
                <Input
                  id="seats-driver"
                  type="number"
                  min="1"
                  max="4"
                  defaultValue="2"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price-driver" className="text-white font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                  Preço (por pessoa)
                </Label>
                <Input
                  id="price-driver"
                  placeholder="R$ 0,00"
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="car-info" className="text-white font-medium flex items-center">
                <Car className="h-4 w-4 mr-2 text-purple-400" />
                Informações do Veículo
              </Label>
              <Input
                id="car-info"
                placeholder="Ex: Honda Civic 2020 - Prata"
                className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
              />
            </div>

            {/* Preferences */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Preferências da Viagem</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Music, label: "Música permitida" },
                  { icon: Cigarette, label: "Fumantes OK" },
                  { icon: Coffee, label: "Paradas para café" },
                  { icon: Wifi, label: "Wi-Fi no carro" },
                ].map((pref, index) => (
                  <label key={index} className="flex items-center space-x-3 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-purple-500" />
                    <pref.icon className="h-4 w-4 text-purple-400" />
                    <span>{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <Plus className="h-5 w-5 mr-2" />
              Criar Carona
            </Button>
          </CardContent>
        </Card>

        {/* My Rides */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Minhas Caronas
            </CardTitle>
            <CardDescription className="text-gray-300">Gerencie suas caronas ativas e histórico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                route: "Belo Horizonte → Ouro Preto",
                date: "Hoje, 15:30",
                passengers: 2,
                maxPassengers: 3,
                status: "active",
                earnings: "R$ 90,00",
                passengerName: "Ana Silva",
              },
              {
                route: "Ouro Preto → Belo Horizonte",
                date: "Amanhã, 18:00",
                passengers: 1,
                maxPassengers: 3,
                status: "pending",
                earnings: "R$ 45,00",
                passengerName: "Carlos Lima",
              },
            ].map((ride, index) => (
              <div key={index} className="p-4 border border-purple-500/30 rounded-xl bg-gray-800/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{ride.route}</h3>
                    <p className="text-sm text-gray-400">{ride.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">{ride.earnings}</div>
                    <Badge
                      className={`${
                        ride.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }`}
                    >
                      {ride.status === "active" ? "Ativa" : "Pendente"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>
                        {ride.passengers}/{ride.maxPassengers} passageiros
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 text-xs px-2 py-1 h-7 flex-1"
                        onClick={() =>
                          openChat(
                            ride.passengerName,
                            ride.passengerName
                              .split(" ")
                              .map((n) => n[0])
                              .join(""),
                            "passenger",
                          )
                        }
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/30 text-xs px-2 py-1 h-7 flex-1"
                        onClick={() =>
                          openRating(
                            "passenger",
                            ride.passengerName,
                            ride.passengerName
                              .split(" ")
                              .map((n) => n[0])
                              .join(""),
                          )
                        }
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Avaliar
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-900/30 text-xs px-2 py-1 h-7 flex-1"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-900/30 text-xs px-2 py-1 h-7 flex-1"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Earnings Summary */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Resumo de Ganhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  R$ 450
                </div>
                <div className="text-sm text-gray-300">Este mês</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  15
                </div>
                <div className="text-sm text-gray-300">Viagens</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-300">Avaliação</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUserProfile = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowProfile(false)}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Meu Perfil
              </h1>
              <p className="text-xs text-purple-200">Gerencie suas informações</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 relative z-10">
        {/* Profile Info */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Enhanced Profile Picture with Photo Selection */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-purple-500/30 shadow-2xl">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-700 text-white text-3xl font-bold shadow-inner">
                    JS
                  </AvatarFallback>
                </Avatar>

                {/* Photo selection overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <div className="text-center">
                    <Camera className="h-6 w-6 text-white mx-auto mb-1" />
                    <span className="text-xs text-white font-medium">Alterar</span>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // Here you would typically upload the file to your server
                      console.log("Selected file:", file)
                      // For demo purposes, we'll just show an alert
                      alert(`Foto selecionada: ${file.name}`)
                    }
                  }}
                />

                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-gray-900 flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  João Silva
                </h3>
                <p className="text-gray-400 text-sm flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                  Membro desde Janeiro 2024
                </p>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">4.9</span>
                  </div>
                  <span className="text-gray-400 text-sm">(127 avaliações)</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                </div>
              </div>
            </div>

            {/* Personal Info Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white font-medium">
                    Nome
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="João"
                    className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white font-medium">
                    Sobrenome
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Silva"
                    className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-profile" className="text-white font-medium">
                  E-mail
                </Label>
                <Input
                  id="email-profile"
                  type="email"
                  defaultValue="joao.silva@email.com"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-profile" className="text-white font-medium">
                  Telefone
                </Label>
                <Input
                  id="phone-profile"
                  defaultValue="(31) 99999-9999"
                  className="bg-gray-800/50 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white font-medium">
                  Sobre mim
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl min-h-[100px]"
                  defaultValue="Adoro viajar por Minas Gerais e conhecer pessoas novas. Sempre pontual e respeitoso!"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">47</div>
                <div className="text-sm text-gray-300">Viagens realizadas</div>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-2xl font-bold text-green-400">R$ 1.250</div>
                <div className="text-sm text-gray-300">Economizado</div>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">127</div>
                <div className="text-sm text-gray-300">Avaliações</div>
              </div>
              <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                <div className="text-2xl font-bold text-yellow-400">4.9★</div>
                <div className="text-sm text-gray-300">Nota média</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: History, label: "Histórico de viagens", color: "text-blue-400" },
              { icon: Wallet, label: "Carteira e pagamentos", color: "text-green-400" },
              {
                icon: Sparkles,
                label: "Planos Premium",
                color: "text-yellow-400",
                onClick: () => setShowPlans(true),
              },
              { icon: Shield, label: "Segurança e privacidade", color: "text-purple-400" },
              { icon: HelpCircle, label: "Ajuda e suporte", color: "text-orange-400" },
              { icon: Share2, label: "Indicar amigos", color: "text-pink-400" },
            ].map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-800/50 h-12 rounded-xl"
                onClick={action.onClick}
              >
                <action.icon className={`h-5 w-5 mr-3 ${action.color}`} />
                {action.label}
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full border-red-500/50 text-red-400 hover:bg-red-900/30 h-12 rounded-xl"
          onClick={() => {
            setShowProfile(false)
            setCurrentView("splash")
          }}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair da conta
        </Button>
      </div>
    </div>
  )

  const renderChat = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChat(false)}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                {chatWith?.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                {chatWith?.name}
              </h1>
              <p className="text-xs text-purple-200">{chatWith?.type === "driver" ? "Motorista" : "Passageiro"}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-4 relative z-10 max-h-[calc(100vh-200px)] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "me"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                  : "bg-gray-800 text-white border border-purple-500/30"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "me" ? "text-purple-200" : "text-gray-400"}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-6 relative z-10">
        <div className="flex items-center space-x-3 bg-gray-800/50 border border-purple-500/30 rounded-xl p-3">
          <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-900/30 rounded-full p-2">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-900/30 rounded-full p-2">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button
            onClick={sendMessage}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 rounded-full p-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderRating = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <Star className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-white text-xl">
            Avaliar {ratingData?.type === "driver" ? "Motorista" : "Passageiro"}
          </CardTitle>
          <CardDescription className="text-gray-300">Como foi sua experiência com {ratingData?.name}?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-3">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-600 text-white text-xl">
                {ratingData?.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-semibold text-lg">{ratingData?.name}</h3>
              <p className="text-gray-400 text-sm">{ratingData?.type === "driver" ? "Motorista" : "Passageiro"}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center">
            <p className="text-white font-medium mb-3">Sua avaliação:</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button key={star} variant="ghost" size="sm" className="p-1 hover:bg-yellow-900/30">
                  <Star className="h-8 w-8 text-yellow-400 hover:fill-current transition-all duration-200" />
                </Button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-white font-medium">
              Comentário (opcional)
            </Label>
            <Textarea
              id="comment"
              placeholder="Conte como foi sua experiência..."
              className="bg-gray-800/50 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => setShowRating(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              onClick={() => setShowRating(false)}
            >
              Enviar Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlans = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 to-violet-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-violet-800 text-white p-6 rounded-b-3xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPlans(false)}
            className="text-white hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg border-2 border-purple-300/30">
                <div className="w-full h-5 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <Car className="h-3 w-3 text-black" />
                </div>
                <div className="w-full h-5 bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">BM</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Planos Premium
              </h1>
              <p className="text-xs text-purple-200">Desbloqueie recursos exclusivos</p>
            </div>
          </div>

          <div className="w-16"></div>
        </div>

        <div className="text-center relative z-10 space-y-2">
          <p className="text-purple-100 text-lg font-medium">Escolha o plano ideal para você</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Sparkles className="h-4 w-4 text-purple-200" />
            <span className="text-sm text-purple-200">Recursos exclusivos e benefícios únicos</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 relative z-10">
        {/* Plans Grid */}
        <div className="space-y-4">
          {/* Básico Plan */}
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-400/5"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-400" />
                    Plano Básico
                  </CardTitle>
                  <CardDescription className="text-gray-300">Perfeito para começar</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-400">Grátis</div>
                  <div className="text-sm text-gray-500">Para sempre</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="space-y-3">
                {[
                  "Buscar e oferecer caronas",
                  "Chat básico com outros usuários",
                  "Avaliações e comentários",
                  "Suporte por email",
                  "Até 5 caronas por mês",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 h-12 rounded-xl"
                disabled
              >
                Plano Atual
              </Button>
            </CardContent>
          </Card>

          {/* Plus Plan */}
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-purple-400" />
                    Plano Plus
                    <Badge className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">Popular</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">Ideal para usuários frequentes</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-400">R$ 19,90</div>
                  <div className="text-sm text-gray-400">por mês</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="space-y-3">
                {[
                  "Tudo do plano Básico",
                  "Caronas ilimitadas",
                  "Prioridade na busca",
                  "Chat com fotos e localização",
                  "Suporte prioritário 24/7",
                  "Filtros avançados de busca",
                  "Histórico completo de viagens",
                  "Desconto de 10% em seguros",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                <Sparkles className="h-5 w-5 mr-2" />
                Assinar Plus
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-yellow-500/30 shadow-2xl backdrop-blur-sm overflow-hidden relative">
            {/* Premium Badge */}
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none px-3 py-1 text-xs font-bold">
                MELHOR VALOR
              </Badge>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    Plano Premium
                  </CardTitle>
                  <CardDescription className="text-gray-300">Experiência completa e exclusiva</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-400">R$ 39,90</div>
                  <div className="text-sm text-gray-400">por mês</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="space-y-3">
                {[
                  "Tudo do plano Plus",
                  "Verificação premium com selo dourado",
                  "Acesso a caronas VIP",
                  "Motorista pessoal sob demanda",
                  "Seguro premium incluso",
                  "Concierge de viagem 24/7",
                  "Acesso a eventos exclusivos",
                  "Cashback de 5% em todas as viagens",
                  "Upgrade gratuito de veículo",
                  "Suporte VIP com atendimento dedicado",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg font-semibold h-12 rounded-xl shadow-lg hover:shadow-yellow-500/25 transition-all duration-300">
                <Star className="h-5 w-5 mr-2" />
                Assinar Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
              Formas de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "PIX", icon: "💳", color: "text-green-400" },
                { name: "Cartão", icon: "💳", color: "text-blue-400" },
                { name: "Boleto", icon: "📄", color: "text-orange-400" },
              ].map((method, index) => (
                <div key={index} className="text-center p-3 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className={`text-sm font-medium ${method.color}`}>{method.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-purple-400" />
              Perguntas Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                question: "Posso cancelar a qualquer momento?",
                answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas.",
              },
              {
                question: "Os benefícios são válidos imediatamente?",
                answer: "Sim, todos os benefícios são ativados assim que o pagamento é confirmado.",
              },
              {
                question: "Há desconto para pagamento anual?",
                answer: "Sim, oferecemos 20% de desconto para assinaturas anuais.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-white font-medium text-sm">{faq.question}</h4>
                <p className="text-gray-400 text-xs">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">Pagamento Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Sem Compromisso</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">Satisfação Garantida</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Mais de 10.000 usuários já escolheram nossos planos premium
          </p>
        </div>
      </div>
    </div>
  )

  const [showPhotoModal, setShowPhotoModal] = useState(false)

  const renderPhotoModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-purple-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-white text-xl">Alterar Foto de Perfil</CardTitle>
          <CardDescription className="text-gray-300">Escolha uma nova foto para seu perfil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-purple-500/50 text-white hover:bg-purple-900/30 h-16 flex-col space-y-2"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "image/*"
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    console.log("Selected file:", file)
                    alert(`Foto selecionada: ${file.name}`)
                    setShowPhotoModal(false)
                  }
                }
                input.click()
              }}
            >
              <ImageIcon className="h-6 w-6 text-purple-400" />
              <span className="text-sm">Galeria</span>
            </Button>

            <Button
              variant="outline"
              className="border-purple-500/50 text-white hover:bg-purple-900/30 h-16 flex-col space-y-2"
              onClick={() => {
                // Here you would implement camera functionality
                alert("Funcionalidade da câmera em desenvolvimento")
                setShowPhotoModal(false)
              }}
            >
              <Camera className="h-6 w-6 text-purple-400" />
              <span className="text-sm">Câmera</span>
            </Button>
          </div>

          <div className="space-y-3">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">Ou escolha um avatar padrão:</p>
              <div className="grid grid-cols-4 gap-2">
                {["👤", "🧑‍💼", "👩‍💼", "🧑‍🎓", "👩‍🎓", "🧑‍💻", "👩‍💻", "🧑‍🚗"].map((emoji, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-900/30 h-12 text-2xl"
                    onClick={() => {
                      console.log("Selected avatar:", emoji)
                      alert(`Avatar selecionado: ${emoji}`)
                      setShowPhotoModal(false)
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => setShowPhotoModal(false)}
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-black min-h-screen relative overflow-hidden">
      {showRating && renderRating()}
      {showPhotoModal && renderPhotoModal()}
      {showPlans ? (
        renderPlans()
      ) : showChat ? (
        renderChat()
      ) : showProfile ? (
        renderUserProfile()
      ) : (
        <>
          {currentView === "splash" && renderSplash()}
          {currentView === "auth" && renderAuth()}
          {currentView === "home" && renderHome()}
          {currentView === "passenger-dashboard" && renderPassengerDashboard()}
          {currentView === "driver-dashboard" && renderDriverDashboard()}
        </>
      )}
    </div>
  )
}
