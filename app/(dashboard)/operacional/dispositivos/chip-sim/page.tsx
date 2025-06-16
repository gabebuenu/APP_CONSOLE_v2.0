"use client"
import { useState, useEffect } from "react"
import type React from "react"

import {
  Search,
  Plus,
  Eye,
  RefreshCw,
  Download,
  Loader2,
  AlertCircle,
  X,
  Signal,
  Phone,
  Clock,
  Database,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface SimCard {
  id: string
  operadora: string
  numero: string
  planoMB: number
  valorMensal: number
  situacao: "Habilitado" | "Bloqueado" | "Suspenso"
  dataCadastro: string
  dispositivo?: string
}

interface FormData {
  operadora: string
  numero: string
  planoMB: string
  valorMensal: string
  situacao: string
}

// Dados de exemplo para as operadoras
const operadorasData = [
  { id: "1", nome: "Claro" },
  { id: "2", nome: "Vivo" },
  { id: "3", nome: "TIM" },
  { id: "4", nome: "Oi" },
]

// Dados de exemplo para os SIM Cards
const simCardsData: SimCard[] = [
  {
    id: "1001",
    operadora: "Vivo",
    numero: "14998147567",
    planoMB: 6,
    valorMensal: 50.0,
    situacao: "Habilitado",
    dataCadastro: "12/09/2024 16:48",
    dispositivo: "GERTEC GPOS700",
  },
  {
    id: "1002",
    operadora: "Claro",
    numero: "11987654321",
    planoMB: 10,
    valorMensal: 65.0,
    situacao: "Habilitado",
    dataCadastro: "10/09/2024 09:22",
  },
  {
    id: "1003",
    operadora: "TIM",
    numero: "21912345678",
    planoMB: 4,
    valorMensal: 45.0,
    situacao: "Bloqueado",
    dataCadastro: "05/09/2024 14:35",
    dispositivo: "PAX A920",
  },
  {
    id: "1004",
    operadora: "Vivo",
    numero: "14997974499",
    planoMB: 6,
    valorMensal: 50.0,
    situacao: "Habilitado",
    dataCadastro: "01/09/2024 11:15",
  },
  {
    id: "1005",
    operadora: "Oi",
    numero: "31987654321",
    planoMB: 3,
    valorMensal: 35.0,
    situacao: "Suspenso",
    dataCadastro: "28/08/2024 16:40",
  },
  {
    id: "1006",
    operadora: "Claro",
    numero: "11912345678",
    planoMB: 8,
    valorMensal: 55.0,
    situacao: "Habilitado",
    dataCadastro: "25/08/2024 10:20",
    dispositivo: "VERIFONE V240m",
  },
]

// Componente de Skeleton para os cards
function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="h-px bg-gray-100 my-3"></div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para o card de SIM
function SimCardComponent({
  sim,
  onView,
  onToggleStatus,
}: {
  sim: SimCard
  onView: (sim: SimCard) => void
  onToggleStatus: (sim: SimCard) => void
}) {
  // Determinar cores baseadas na situação
  const situacaoColors = {
    Habilitado: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: "text-emerald-500",
    },
    Bloqueado: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: "text-red-500",
    },
    Suspenso: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      icon: "text-yellow-500",
    },
  }

  const situacaoColor = situacaoColors[sim.situacao]

  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
      {/* Status badge */}
      <div
        className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg ${situacaoColor.bg} ${situacaoColor.text} ${situacaoColor.border}`}
      >
        {sim.situacao}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Signal className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700">Operadora: {sim.operadora}</h3>
        </div>

        {/* Número */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Phone className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">Número:</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 tracking-tight">{sim.numero}</div>
        </div>

        {/* Detalhes */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-1.5">
            <Database className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">Plano de dados: {sim.planoMB} MB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">Valor mensal: R$ {sim.valorMensal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">Adicionado em: {sim.dataCadastro}</span>
          </div>
          {sim.dispositivo && (
            <div className="mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
              Em uso: {sim.dispositivo}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3"></div>

        {/* Footer */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
          <button
            onClick={() => onView(sim)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 py-0 bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors w-full xs:w-auto"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            Visualizar
          </button>

          {sim.situacao !== "Suspenso" && (
            <button
              onClick={() => onToggleStatus(sim)}
              disabled={sim.dispositivo !== undefined}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 py-0 shadow-sm border transition-colors w-full xs:w-auto ${
                sim.dispositivo !== undefined
                  ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                  : sim.situacao === "Habilitado"
                    ? "bg-white text-red-600 border-gray-200 hover:bg-red-50 hover:border-red-200"
                    : "bg-white text-green-600 border-gray-200 hover:bg-green-50 hover:border-green-200"
              }`}
            >
              {sim.situacao === "Habilitado" ? (
                <>
                  <Pause className="h-3.5 w-3.5 mr-1.5" />
                  Suspender
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 mr-1.5" />
                  Ativar SIM
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Hover effect - left border accent */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 opacity-0 group-hover:opacity-100 ${situacaoColor.bg} ${situacaoColor.border}`}
      ></div>
    </div>
  )
}

export default function SimCardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [isLoading, setIsLoading] = useState(true)
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedSim, setSelectedSim] = useState<SimCard | null>(null)
  const [simCards, setSimCards] = useState<SimCard[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    operadora: "",
    numero: "",
    planoMB: "",
    valorMensal: "",
    situacao: "Habilitado",
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(simCards.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = simCards.slice(startIndex, endIndex)

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setSimCards(simCardsData)
      setIsLoading(false)
    }, 1500)
  }, [])

  // Filtrar SIM Cards com base no termo de pesquisa e filtro de status
  useEffect(() => {
    let filtered = [...simCardsData]

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (sim) =>
          sim.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sim.operadora.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (sim.dispositivo && sim.dispositivo.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "Todos") {
      filtered = filtered.filter((sim) => sim.situacao === statusFilter)
    }

    setSimCards(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  // Função para visualizar SIM Card
  const handleViewSim = (sim: SimCard) => {
    setSelectedSim(sim)
    setFormData({
      operadora: operadorasData.find((op) => op.nome === sim.operadora)?.id || "",
      numero: sim.numero,
      planoMB: sim.planoMB.toString(),
      valorMensal: sim.valorMensal.toFixed(2),
      situacao: sim.situacao,
    })
    setIsViewModalOpen(true)
  }

  // Função para alternar status do SIM Card
  const handleToggleStatus = (sim: SimCard) => {
    if (sim.dispositivo) {
      alert("Não é possível alterar o status de um SIM Card que está em uso.")
      return
    }

    const updatedSim = {
      ...sim,
      situacao: sim.situacao === "Habilitado" ? "Bloqueado" : "Habilitado",
    } as SimCard

    const updatedSimCards = simCards.map((s) => (s.id === sim.id ? updatedSim : s))
    setSimCards(updatedSimCards)
  }

  // Função para cadastrar SIM Card
  const handleCadastrarSim = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const operadora = operadorasData.find((op) => op.id === formData.operadora)?.nome || ""
      const newSim: SimCard = {
        id: (Math.floor(Math.random() * 100) + 1007).toString(),
        operadora,
        numero: formData.numero,
        planoMB: Number(formData.planoMB),
        valorMensal: Number(formData.valorMensal),
        situacao: formData.situacao as "Habilitado" | "Bloqueado" | "Suspenso",
        dataCadastro: new Date().toLocaleString("pt-BR"),
      }

      setSimCards([newSim, ...simCards])
      setIsSubmitting(false)
      setIsCadastrarModalOpen(false)

      // Resetar formulário
      setFormData({
        operadora: "",
        numero: "",
        planoMB: "",
        valorMensal: "",
        situacao: "Habilitado",
      })
    }, 1000)
  }

  // Função para atualizar SIM Card
  const handleUpdateSim = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedSim) {
        const operadora = operadorasData.find((op) => op.id === formData.operadora)?.nome || ""
        const updatedSim: SimCard = {
          ...selectedSim,
          operadora,
          numero: formData.numero,
          planoMB: Number(formData.planoMB),
          valorMensal: Number(formData.valorMensal),
          situacao: formData.situacao as "Habilitado" | "Bloqueado" | "Suspenso",
        }

        const updatedSimCards = simCards.map((s) => (s.id === selectedSim.id ? updatedSim : s))
        setSimCards(updatedSimCards)
        setIsSubmitting(false)
        setIsViewModalOpen(false)
      }
    }, 1000)
  }

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setSimCards(simCardsData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar SIM Cards</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Aviso informativo no topo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Controle do uso de dados (MB)</h3>
            <p className="text-sm text-blue-700">
              A Movingpay realiza o controle da utilização baseado no payload de entrada/saída.
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsCadastrarModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar SIM
        </button>

        <div className="flex-grow"></div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros e Busca</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por Número, Operadora..."
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os status</SelectItem>
                <SelectItem value="Habilitado">Habilitado</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Listagem de SIM Cards */}
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentItems.length > 0 ? (
              currentItems.map((sim) => (
                <SimCardComponent key={sim.id} sim={sim} onView={handleViewSim} onToggleStatus={handleToggleStatus} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Nenhum SIM Card encontrado com os filtros selecionados.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-between pt-6" aria-label="Pagination">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">Próximo</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="text-sm text-gray-700">
                Página <span className="font-medium">{currentPage}</span> de{" "}
                <span className="font-medium">{totalPages}</span>
              </div>
            </nav>
          )}
        </>
      )}

      {/* Modal: Cadastrar SIM Card */}
      {isCadastrarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastro de SIM</h2>
              <button
                onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-medium text-blue-800 mb-1">Controle do uso de dados (MB)</h3>
                <p className="text-sm text-blue-700">
                  A Movingpay realiza o controle da utilização baseado no payload de entrada/saída.
                </p>
              </div>

              <form onSubmit={handleCadastrarSim} className="space-y-4">
                {/* Nome da operadora */}
                <div>
                  <label htmlFor="operadora" className="text-sm font-medium text-gray-700">
                    Nome da operadora
                  </label>
                  <Select
                    value={formData.operadora}
                    onValueChange={(value) => setFormData({ ...formData, operadora: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {operadorasData.map((operadora) => (
                        <SelectItem key={operadora.id} value={operadora.id}>
                          {operadora.id} - {operadora.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Número SIM */}
                <div>
                  <label htmlFor="numero" className="text-sm font-medium text-gray-700">
                    Número SIM
                  </label>
                  <Input
                    id="numero"
                    type="text"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o número do SIM"
                    required
                  />
                </div>

                {/* Plano de Dados (MB) */}
                <div>
                  <label htmlFor="planoMB" className="text-sm font-medium text-gray-700">
                    Plano de Dados (MB)
                  </label>
                  <Input
                    id="planoMB"
                    type="number"
                    value={formData.planoMB}
                    onChange={(e) => setFormData({ ...formData, planoMB: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                {/* Valor Mensal */}
                <div>
                  <label htmlFor="valorMensal" className="text-sm font-medium text-gray-700">
                    Valor Mensal
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="valorMensal"
                      type="text"
                      value={formData.valorMensal}
                      onChange={(e) => setFormData({ ...formData, valorMensal: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Situação */}
                <div>
                  <label htmlFor="situacao" className="text-sm font-medium text-gray-700">
                    Situação
                  </label>
                  <Select
                    value={formData.situacao}
                    onValueChange={(value) => setFormData({ ...formData, situacao: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Habilitado">Habilitado</SelectItem>
                      <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                      </>
                    ) : (
                      "Cadastrar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Atualizar SIM Card */}
      {isViewModalOpen && selectedSim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Atualizar SIM</h2>
              <button
                onClick={() => !isSubmitting && setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {selectedSim.dispositivo && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-yellow-900 mb-1">SIM Card em uso</h3>
                      <p className="text-sm text-yellow-800">
                        Este SIM Card está atualmente em uso no dispositivo: <strong>{selectedSim.dispositivo}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdateSim} className="space-y-4">
                {/* Nome da operadora */}
                <div>
                  <label htmlFor="editOperadora" className="text-sm font-medium text-gray-700">
                    Nome da operadora
                  </label>
                  <Select
                    value={formData.operadora}
                    onValueChange={(value) => setFormData({ ...formData, operadora: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {operadorasData.map((operadora) => (
                        <SelectItem key={operadora.id} value={operadora.id}>
                          {operadora.id} - {operadora.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Número SIM */}
                <div>
                  <label htmlFor="editNumero" className="text-sm font-medium text-gray-700">
                    Número SIM
                  </label>
                  <Input
                    id="editNumero"
                    type="text"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o número do SIM"
                    required
                  />
                </div>

                {/* Plano de Dados (MB) */}
                <div>
                  <label htmlFor="editPlanoMB" className="text-sm font-medium text-gray-700">
                    Plano de Dados (MB)
                  </label>
                  <Input
                    id="editPlanoMB"
                    type="number"
                    value={formData.planoMB}
                    onChange={(e) => setFormData({ ...formData, planoMB: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                {/* Valor Mensal */}
                <div>
                  <label htmlFor="editValorMensal" className="text-sm font-medium text-gray-700">
                    Valor Mensal
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="editValorMensal"
                      type="text"
                      value={formData.valorMensal}
                      onChange={(e) => setFormData({ ...formData, valorMensal: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Situação */}
                <div>
                  <label htmlFor="editSituacao" className="text-sm font-medium text-gray-700">
                    Situação
                  </label>
                  <Select
                    value={formData.situacao}
                    onValueChange={(value) => setFormData({ ...formData, situacao: value })}
                    disabled={selectedSim.dispositivo !== undefined}
                  >
                    <SelectTrigger
                      className={`mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent ${
                        selectedSim.dispositivo !== undefined ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Habilitado">Habilitado</SelectItem>
                      <SelectItem value="Bloqueado">Bloqueado</SelectItem>
                      <SelectItem value="Suspenso">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                  {selectedSim.dispositivo && (
                    <p className="text-xs text-yellow-600 mt-1">
                      Não é possível alterar a situação de um SIM Card em uso.
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsViewModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                      </>
                    ) : (
                      "Atualizar Dados"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
