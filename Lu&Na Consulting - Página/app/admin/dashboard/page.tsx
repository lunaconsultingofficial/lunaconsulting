"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Database, 
  Users, 
  Eye, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabaseService } from "@/lib/supabase-client"
import NavbarPremium from "@/components/navbar-premium"
import FooterPremium from "@/components/footer-premium"

interface DashboardStats {
  totalStocks: number
  totalViews: number
  totalLeads: number
  recentLeads: any[]
  topStocks: any[]
  connectionStatus: boolean
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStocks: 0,
    totalViews: 0,
    totalLeads: 0,
    recentLeads: [],
    topStocks: [],
    connectionStatus: false
  })
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Test connection
      const connected = await supabaseService.testConnection()
      
      if (!connected) {
        setStats(prev => ({ ...prev, connectionStatus: false }))
        return
      }

      // Load data in parallel
      const [stocks, analytics, leads] = await Promise.all([
        supabaseService.getAllStocks().catch(() => []),
        supabaseService.getAnalytics().catch(() => []),
        supabaseService.getLeads().catch(() => [])
      ])

      // Calculate stats
      const totalViews = analytics.filter(a => a.event_type === 'stock_view').length
      const stockViewCounts = analytics
        .filter(a => a.event_type === 'stock_view')
        .reduce((acc, a) => {
          const stockId = a.stock_id
          if (stockId) {
            acc[stockId] = (acc[stockId] || 0) + 1
          }
          return acc
        }, {} as Record<string, number>)

      const topStocks = stocks
        .map(stock => ({
          ...stock,
          views: stockViewCounts[stock.id] || 0
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)

      setStats({
        totalStocks: stocks.length,
        totalViews,
        totalLeads: leads.length,
        recentLeads: leads.slice(0, 10),
        topStocks,
        connectionStatus: true
      })

      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setStats(prev => ({ ...prev, connectionStatus: false }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const StatCard = ({ icon: Icon, title, value, trend, color = "emerald" }: any) => (
    <Card className="border-emerald-500/20 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-slate-300">
          <span>{title}</span>
          <Icon className={`h-4 w-4 text-${color}-400`} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {trend && (
          <p className="text-xs text-slate-400 mt-1">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
      <NavbarPremium />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Dashboard Administrativo
                </h1>
                <p className="text-slate-300">
                  Sistema de gestión y analytics para Lu&Na Consulting
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>Última actualización:</span>
                  <span>{lastRefresh.toLocaleTimeString()}</span>
                </div>
                
                <Button
                  onClick={loadDashboardData}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-emerald-500/20 bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-emerald-400" />
                  <span className="font-medium text-white">Estado de Supabase:</span>
                  {stats.connectionStatus ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Conectado
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Desconectado - Usando datos locales
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={BarChart3}
              title="Total Stocks"
              value={stats.totalStocks}
              trend="Assets en portafolio"
            />
            <StatCard
              icon={Eye}
              title="Total Views"
              value={stats.totalViews}
              trend="Visualizaciones registradas"
            />
            <StatCard
              icon={Users}
              title="Leads Generados"
              value={stats.totalLeads}
              trend="Contactos interesados"
            />
            <StatCard
              icon={TrendingUp}
              title="Tasa Conversión"
              value={stats.totalViews > 0 ? `${((stats.totalLeads / stats.totalViews) * 100).toFixed(1)}%` : '0%'}
              trend="Leads por visualización"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Stocks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-emerald-500/20 bg-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Stocks Más Vistos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topStocks.map((stock, index) => (
                      <div key={stock.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                        <div>
                          <div className="font-medium text-white text-sm">
                            {stock.title}
                          </div>
                          <div className="text-xs text-slate-400">
                            {stock.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">
                            {stock.views}
                          </div>
                          <div className="text-xs text-slate-400">
                            views
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Leads */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-emerald-500/20 bg-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageSquare className="h-5 w-5 text-emerald-400" />
                    Leads Recientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.recentLeads.length > 0 ? (
                      stats.recentLeads.map((lead) => (
                        <div key={lead.id} className="p-3 rounded-lg bg-slate-700/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-white text-sm">
                              {lead.name || 'Anónimo'}
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                              {lead.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-slate-400">
                            {lead.email && <div>📧 {lead.email}</div>}
                            {lead.phone && <div>📱 {lead.phone}</div>}
                            <div>🕒 {new Date(lead.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        No hay leads registrados aún
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card className="border-emerald-500/20 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Configuración de Supabase</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Para conectar Supabase:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Ve a tu proyecto en Supabase Dashboard</li>
                      <li>Copia la URL del proyecto y la API Key</li>
                      <li>Ejecuta el SQL de migración: <code className="bg-slate-700 px-2 py-1 rounded">supabase/migrations/20250811000001_initial_schema.sql</code></li>
                      <li>Configura las variables de entorno</li>
                    </ol>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-xs font-mono">
                      NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co<br/>
                      NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key<br/>
                      SUPABASE_SERVICE_KEY=tu_service_key
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <FooterPremium />
    </main>
  )
}
