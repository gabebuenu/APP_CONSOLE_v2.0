"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronDown, ChevronRight, CreditCard } from "lucide-react"

const DashboardOverview = () => {
  return (
    <div>
      <DashboardHeader />
      <StatsSection />
      <SalesChart />
      <TransactionsSection />
    </div>
  )
}

// Dashboard Header Component
const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#555555] mb-1">Visão geral</h1>
        <p className="text-[#555555] text-sm font-normal">Informação sobre as vendas</p>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:space-x-3">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">02/06/2025</span>
        </div>
        <span className="text-gray-500 text-sm">Até</span>
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">02/06/2025</span>
        </div>
      </div>
    </div>
  )
}

// Stats Section Component
const StatsSection = () => {
  const metrics = [
    { label: "Débito", value: "R$00,00" },
    { label: "Crédito", value: "R$00,00" },
    { label: "Parcelado", value: "R$00,00" },
    { label: "Ticket médio", value: "R$00,00" },
    { label: "Receita MDR", value: "R$00,00" },
    { label: "Receita total", value: "R$00,00" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8">
      {/* Faturamento Total */}
      <div className="bg-[#F8F8F8] rounded-2xl p-6 group hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            Faturamento total
          </h3>
          <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
            <ChevronDown size={16} className="text-gray-500 hover:text-gray-700 transition-colors" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-4xl font-bold text-gray-900">R$ 12.300,00</div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-lg">↗</span>
            <span className="text-green-500 font-medium text-lg">10 vendas</span>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="bg-[#F8F8F8] rounded-[24px] p-6 group hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
            Informações
          </h3>
          <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
            <ChevronDown size={16} className="text-gray-500 hover:text-gray-700 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] flex flex-col justify-between cursor-pointer
                transition-all duration-300 hover:shadow-md hover:scale-[1.02] w-[calc(50%-4px)] sm:w-[calc(33.333%-8px)] md:w-[calc(16.666%-10px)]"
            >
              {/* Valor no canto superior esquerdo */}
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {metric.value}
                </div>
              </div>

              {/* Ícone acima da label na parte inferior */}
              <div className="flex flex-col items-start space-y-2">
                <CreditCard size={16} className="text-gray-400 hover:text-gray-600 transition-colors" />
                <div className="flex items-center space-x-1 w-full">
                  <span className="text-xs text-gray-600 font-medium truncate max-w-[80%]">{metric.label}</span>
                  <div className="bg-gray-100 rounded-[8px] p-1 flex items-center justify-center ml-auto hover:bg-gray-200 transition-colors">
                    <ChevronDown size={8} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Sales Chart Component
const SalesChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const yAxisValues = [500, 400, 300, 200, 100, 0]

  // Dados que correspondem exatamente à imagem
  const grayData = [500, 200, 180, 250, 400, 500, 300, 250, 350, 150, 400, 450]
  const blueData = [200, 150, 120, 200, 350, 450, 250, 200, 300, 100, 350, 400]

  // Função para gerar curvas suaves (Bézier)
  const generateSmoothPath = (data: number[]) => {
    const points = data.map((value, index) => ({
      x: (index * 1200) / 11,
      y: 256 - (value * 256) / 500,
    }))

    if (points.length < 2) return ""

    let path = `M ${points[0].x},${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const next = points[i + 1]

      // Calcular pontos de controle para curvas suaves
      const cp1x = prev.x + (curr.x - prev.x) * 0.3
      const cp1y = prev.y
      const cp2x = curr.x - (next ? (next.x - curr.x) * 0.3 : 0)
      const cp2y = curr.y

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`
    }

    return path
  }

  const generateSmoothAreaPath = (data: number[]) => {
    const linePath = generateSmoothPath(data)
    const lastX = ((data.length - 1) * 1200) / 11
    return `${linePath} L ${lastX},256 L 0,256 Z`
  }

  return (
    <div className="mb-8">
      {/* Card Container */}
      <div className="bg-[#F8F8F8] rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Header dentro do card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Vendas por período</h3>
            <p className="text-sm text-green-500 font-medium">Junho de 2025</p>
          </div>
          <button className="px-4 sm:px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 w-fit">
            Bandeira
          </button>
        </div>

        {/* Chart Area */}
        <div
          className="relative h-64 sm:h-80 w-full bg-gray-50/30 rounded-lg overflow-hidden cursor-crosshair"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setHoveredPoint(null)
          }}
        >
          {/* Y-Axis */}
          <div className="absolute left-2 sm:left-4 top-4 bottom-12 flex flex-col justify-between text-[10px] sm:text-xs text-gray-400">
            {yAxisValues.map((value) => (
              <span key={value} className="font-medium">
                {value}
              </span>
            ))}
          </div>

          {/* Chart SVG */}
          <div className="ml-8 sm:ml-12 mr-2 sm:mr-4 mt-4 mb-12 h-48 sm:h-64 relative">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 256"
              preserveAspectRatio="none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 1200
                const monthIndex = Math.round((x / 1200) * 11)
                setHoveredPoint(Math.max(0, Math.min(11, monthIndex)))
              }}
            >
              <defs>
                {/* Gradiente Cinza/Preto para Transparente */}
                <linearGradient id="grayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#374151" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#6b7280" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#9ca3af" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
                </linearGradient>

                {/* Gradiente Azul para Transparente */}
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0092FF" stopOpacity="1" />
                  <stop offset="40%" stopColor="#66BFFF" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#B3DFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                {/* Filtros para efeitos de hover */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines sutis */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 51.2}
                  x2="1200"
                  y2={i * 51.2}
                  stroke="#f3f4f6"
                  strokeWidth="0.5"
                  opacity={0.7}
                />
              ))}

              {/* Área Cinza (Background) - Curvas Suaves */}
              <path
                d={generateSmoothAreaPath(grayData)}
                fill="url(#grayGradient)"
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? "brightness(1.1)" : "none",
                }}
              />

              {/* Área Azul (Foreground) - Curvas Suaves */}
              <path
                d={generateSmoothAreaPath(blueData)}
                fill="url(#blueGradient)"
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? "brightness(1.1) saturate(1.2)" : "none",
                }}
              />

              {/* Linha Cinza - Curvas Suaves */}
              <path
                d={generateSmoothPath(grayData)}
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? "url(#glow)" : "none",
                  strokeWidth: isHovered ? "2.5" : "2",
                }}
              />

              {/* Linha Azul - Curvas Suaves */}
              <path
                d={generateSmoothPath(blueData)}
                fill="none"
                stroke="#0092FF"
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? "url(#glow)" : "none",
                  strokeWidth: isHovered ? "2.5" : "2",
                }}
              />

              {/* Pontos interativos */}
              {hoveredPoint !== null && (
                <>
                  {/* Ponto Cinza */}
                  <circle
                    cx={(hoveredPoint * 1200) / 11}
                    cy={256 - (grayData[hoveredPoint] * 256) / 500}
                    r="4"
                    fill="#374151"
                    stroke="white"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Ponto Azul */}
                  <circle
                    cx={(hoveredPoint * 1200) / 11}
                    cy={256 - (blueData[hoveredPoint] * 256) / 500}
                    r="4"
                    fill="#1d4ed8"
                    stroke="white"
                    strokeWidth="2"
                    className="animate-pulse"
                  />

                  {/* Linha vertical de referência */}
                  <line
                    x1={(hoveredPoint * 1200) / 11}
                    y1="0"
                    x2={(hoveredPoint * 1200) / 11}
                    y2="256"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.7"
                  />
                </>
              )}
            </svg>

            {/* Tooltip */}
            {hoveredPoint !== null && (
              <div
                className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10 transition-all duration-200"
                style={{
                  left: `${(hoveredPoint * 100) / 11}%`,
                  top: "10px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="text-xs font-medium text-gray-800 mb-1">{months[hoveredPoint]}</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">{grayData[hoveredPoint]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-blue-600">{blueData[hoveredPoint]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* X-Axis */}
          <div className="absolute bottom-2 sm:bottom-4 left-8 sm:left-12 right-2 sm:right-4 flex justify-between text-[8px] sm:text-xs text-gray-400 font-medium">
            {months.map((month, index) => (
              <span
                key={month}
                className={`transition-colors duration-200 ${
                  hoveredPoint === index ? "text-blue-600 font-semibold" : ""
                } ${index % 2 !== 0 ? "hidden sm:inline" : ""}`}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Transactions Section Component
const TransactionsSection = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const transactions = [
    {
      date: "03/06/2025 13:45hs",
      bandeira: "Mastercard",
      bandeiraSigla: "MC",
      nsu: "8M2J7P93Ba",
      codEc: "981295",
      razaoSocial: "Estabelecime...",
      autorizacao: "3703Go",
      situacao: "Aprovada",
      valor: "R$ 1.250,00",
    },
    {
      date: "03/06/2025 13:45hs",
      bandeira: "Visa",
      bandeiraSigla: "VS",
      nsu: "7K1J6P82Aa",
      codEc: "981295",
      razaoSocial: "Estabelecime...",
      autorizacao: "3703Go",
      situacao: "Aprovada",
      valor: "R$ 850,00",
    },
    {
      date: "03/06/2025 13:45hs",
      bandeira: "Elo",
      bandeiraSigla: "EL",
      nsu: "6H5G4N71Za",
      codEc: "981295",
      razaoSocial: "Estabelecime...",
      autorizacao: "3703Go",
      situacao: "Aprovada",
      valor: "R$ 320,00",
    },
    {
      date: "03/06/2025 13:45hs",
      bandeira: "Mastercard",
      bandeiraSigla: "MC",
      nsu: "5F4D3M60Ya",
      codEc: "981295",
      razaoSocial: "Estabelecime...",
      autorizacao: "3703Go",
      situacao: "Aprovada",
      valor: "R$ 95,50",
    },
  ]

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Vendas/Transações */}
      <div className="lg:col-span-2 bg-[#F8F8F8] rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Vendas/Transações</h3>

        {/* Desktop Table */}
        {!isMobile && (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-700 mb-4 pb-2">
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Data</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Bandeira</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>NSU</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Cód. EC</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Razão Social</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Autorização</span>
                <span className="text-xs">↓</span>
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition-colors duration-200">
                <span>Situação</span>
                <span className="text-xs">↓</span>
              </span>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 gap-4 text-sm items-center py-2 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                  <span className="text-gray-800 font-medium">{transaction.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {transaction.bandeiraSigla}
                    </div>
                    <span className="text-gray-700">{transaction.bandeira}</span>
                  </div>
                  <span className="text-blue-600 cursor-pointer font-medium hover:text-blue-800 transition-colors duration-200">
                    {transaction.nsu}
                  </span>
                  <span className="text-blue-600 cursor-pointer font-medium hover:text-blue-800 transition-colors duration-200">
                    {transaction.codEc}
                  </span>
                  <span className="text-gray-800">{transaction.razaoSocial}</span>
                  <span className="text-gray-800">{transaction.autorizacao}</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit hover:shadow-md transition-all duration-200 ${
                      transaction.situacao === "Aprovada" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {transaction.situacao}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mobile Cards */}
        {isMobile && (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => toggleRow(index)}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                        {transaction.bandeiraSigla}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{transaction.nsu}</div>
                      <div className="text-xs text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.situacao === "Aprovada" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {transaction.situacao}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform duration-200 ${expandedRow === index ? "rotate-90" : ""}`}
                    />
                  </div>
                </div>

                {/* Card Details (expandable) */}
                {expandedRow === index && (
                  <div className="px-3 pb-3 pt-1 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Valor</span>
                      <span className="text-sm font-medium text-gray-800">{transaction.valor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Cód. EC</span>
                      <span className="text-sm text-blue-600">{transaction.codEc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Razão Social</span>
                      <span className="text-sm text-gray-800">{transaction.razaoSocial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Autorização</span>
                      <span className="text-sm text-gray-800">{transaction.autorizacao}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Distribuição por bandeira */}
      <div className="bg-[#F8F8F8] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Distribuição por bandeira</h3>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all duration-200">
            <span className="text-sm text-gray-600">This Week</span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-700 font-medium">Vendas</span>
        </div>

        {/* Donut Chart */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray="350 90"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">Aprovadas</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">MASTERCARD 4 Vendas</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
