"use client"
import { useState, useEffect } from "react"

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  RefreshCw,
  Filter,
  AlertTriangle,
  User,
  CreditCard,
  CheckCircle,
  X,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// Definição de interfaces para tipagem
interface VendaPendente {
  id: string
  estabelecimento: string
  adquirente: string
  nsu: string
  bandeira: string
  modalidade: string
  valor: number
  dataVenda: string
  captura: string
  online: boolean
  situacao: "PENDENTE"
}

// Dados de exemplo para as vendas pendentes
const vendasPendentesData: VendaPendente[] = [
  {
    id: "1",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "616142",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 15.0,
    dataVenda: "02/07/2024 11:13hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "2",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "365020",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 15.0,
    dataVenda: "15/05/2024 10:08hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "3",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "363595",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 15.0,
    dataVenda: "14/05/2024 09:54hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "4",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "362460",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 15.0,
    dataVenda: "13/05/2024 17:50hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "5",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "362012",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 15.0,
    dataVenda: "13/05/2024 09:24hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "6",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "361875",
    bandeira: "MASTERCARD",
    modalidade: "PRE_AUTORIZACAO",
    valor: 25.0,
    dataVenda: "12/05/2024 16:32hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "7",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "361234",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 30.0,
    dataVenda: "11/05/2024 14:15hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
  {
    id: "8",
    estabelecimento: "295285 TESATRT",
    adquirente: "19-GLOBAL_PAYMENTS",
    nsu: "360987",
    bandeira: "VISA",
    modalidade: "PRE_AUTORIZACAO",
    valor: 20.0,
    dataVenda: "10/05/2024 11:45hs",
    captura: "PARCELAMOS_TUDO",
    online: true,
    situacao: "PENDENTE",
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 11 }).map((_, index) => (
              <th key={index} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 11 }).map((_, colIndex) => (
                <td key={colIndex} className="px-2 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Componente de Skeleton para cards mobile
function MobileCardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <Skeleton className="h-5 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6 rounded" />
              <Skeleton className="h-6 w-6 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para card mobile de venda pendente
function MobileVendaCard({
  venda,
  onView,
  onApprove,
}: {
  venda: VendaPendente
  onView: (id: string) => void
  onApprove: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">NSU: {venda.nsu}</div>
          <div className="text-xs text-gray-500 mt-1">{venda.dataVenda}</div>
        </div>
        <span className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-yellow-100 text-yellow-800">
          PENDENTE
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Estabelecimento:</span> {venda.estabelecimento}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Bandeira:</span> {venda.bandeira}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor:</span> R${" "}
          {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Captura:</span> {venda.captura}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Online:</span> {venda.online ? "Sim" : "Não"}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onApprove(venda.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors flex-1"
        >
          <CheckCircle className="h-3 w-3 mr-1.5" />
          Aprovar
        </button>
        <button
          onClick={() => onView(venda.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex-1"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
      </div>
    </div>
  )
}

export default function VendasPendentesPage() {
  const [searchEstabelecimento, setSearchEstabelecimento] = useState("")
  const [searchNSU, setSearchNSU] = useState("")
  const [periodoSelecionado, setPeriodoSelecionado] = useState("todo")
  const [dataInicio, setDataInicio] = useState("2025-06-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [vendas, setVendas] = useState<VendaPendente[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedVenda, setSelectedVenda] = useState<VendaPendente | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsPerPage = 8
  const totalPages = 11 // Conforme especificado
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = vendas.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setVendas(vendasPendentesData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar vendas com base nos filtros
  useEffect(() => {
    let filtered = [...vendasPendentesData]

    if (searchEstabelecimento.trim() !== "") {
      filtered = filtered.filter((v) => v.estabelecimento.toLowerCase().includes(searchEstabelecimento.toLowerCase()))
    }

    if (searchNSU.trim() !== "") {
      filtered = filtered.filter((v) => v.nsu.toLowerCase().includes(searchNSU.toLowerCase()))
    }

    // Aqui você implementaria filtros de data baseado no período selecionado

    setVendas(filtered)
    setCurrentPage(1)
  }, [searchEstabelecimento, searchNSU, periodoSelecionado, dataInicio, dataFim])

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  // Função para visualizar detalhes
  const handleViewDetails = (id: string) => {
    const venda = vendas.find((v) => v.id === id)
    if (venda) {
      setSelectedVenda(venda)
      setIsViewModalOpen(true)
    }
  }

  // Função para aprovar venda
  const handleApproveVenda = (id: string) => {
    const venda = vendas.find((v) => v.id === id)
    if (venda) {
      setSelectedVenda(venda)
      setIsApproveModalOpen(true)
    }
  }

  // Função para confirmar aprovação
  const handleConfirmApprove = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedVenda) {
        // Remover a venda da lista (simulando aprovação)
        const updatedVendas = vendas.filter((v) => v.id !== selectedVenda.id)
        setVendas(updatedVendas)
        setIsSubmitting(false)
        setIsApproveModalOpen(false)
        setSelectedVenda(null)
      }
    }, 1000)
  }

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVendas(vendasPendentesData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Tela inicial</h2>
        <p className="text-xs text-gray-500 mb-6">Gerenciamento de Vendas Pendentes</p>
      </div>

      {/* Alerta de vendas pendentes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-1">VENDAS PENDENTES</h3>
            <p className="text-sm text-yellow-800 mb-2">
              Para que as vendas sejam aprovadas automaticamente, é necessário entrar em contato com o provedor/captura.
            </p>
            <p className="text-sm text-yellow-800">
              Caso a venda já tenha sido solucionada no provedor, mas ainda não tenha sido refletida em nosso sistema,
              entre em contato com o nosso suporte para assistência.
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
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
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="text-sm text-gray-500 flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            {isFilterExpanded ? "Recolher filtros" : "Expandir filtros"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Estabelecimento"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchEstabelecimento}
              onChange={(e) => setSearchEstabelecimento(e.target.value)}
            />
            <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="NSU Transação"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchNSU}
              onChange={(e) => setSearchNSU(e.target.value)}
            />
            <CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isFilterExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Período:</label>
                <RadioGroup
                  value={periodoSelecionado}
                  onValueChange={setPeriodoSelecionado}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="todo" id="todo" />
                    <Label htmlFor="todo" className="text-sm">
                      Todo Período
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personalizado" id="personalizado" />
                    <Label htmlFor="personalizado" className="text-sm">
                      Período Personalizado
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {periodoSelecionado === "personalizado" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">De:</label>
                    <div className="relative">
                      <Input
                        type="date"
                        className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                      <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Até:</label>
                    <div className="relative">
                      <Input
                        type="date"
                        className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                      />
                      <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tabela de Vendas Pendentes</h3>
                <p className="text-sm text-gray-500">
                  Página {currentPage} de {totalPages}
                </p>
              </div>
              <TableSkeleton />
            </div>
          </div>
          {/* Mobile Skeleton */}
          <div className="md:hidden">
            <MobileCardSkeleton />
          </div>
        </>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Tabela de Vendas Pendentes</h3>
              <p className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Estabelecimento
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                      Adquirente
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      NSU
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Bandeira
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Modalidade
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Valor
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                      Data Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Captura
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Online
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Situação
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[8%]"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((venda) => (
                      <tr key={venda.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={venda.estabelecimento}>
                          {venda.estabelecimento}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{venda.adquirente}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{venda.nsu}</td>
                        <td className="px-2 py-2 text-sm text-gray-900">{venda.bandeira}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{venda.modalidade}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {venda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{venda.dataVenda}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{venda.captura}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{venda.online ? "Sim" : "Não"}</td>
                        <td className="px-2 py-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            PENDENTE
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleApproveVenda(venda.id)}
                              className="text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 rounded p-1 transition-colors"
                              title="Aprovar"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleViewDetails(venda.id)}
                              className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-3 py-6 text-center text-sm text-gray-500">
                        Nenhuma venda pendente encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((venda) => (
                <MobileVendaCard
                  key={venda.id}
                  venda={venda}
                  onView={handleViewDetails}
                  onApprove={handleApproveVenda}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhuma venda pendente encontrada.</div>
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

      {/* Modal: Aprovar Venda */}
      {isApproveModalOpen && selectedVenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsApproveModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Aprovar Venda</h2>
              <button
                onClick={() => !isSubmitting && setIsApproveModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-900 mb-1">Confirmar Aprovação</h3>
                    <p className="text-sm text-green-800">
                      Você está prestes a aprovar a venda <strong>NSU: {selectedVenda.nsu}</strong> no valor de{" "}
                      <strong>R$ {selectedVenda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Estabelecimento:</span>
                  <span className="ml-2 text-gray-900">{selectedVenda.estabelecimento}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Data da Venda:</span>
                  <span className="ml-2 text-gray-900">{selectedVenda.dataVenda}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Bandeira:</span>
                  <span className="ml-2 text-gray-900">{selectedVenda.bandeira}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsApproveModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmApprove}
                  className="px-4 py-2 text-xs sm:text-sm bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 order-1 sm:order-2 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                    </>
                  ) : (
                    "Confirmar Aprovação"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Visualizar Detalhes */}
      {isViewModalOpen && selectedVenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Detalhes da Venda</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">NSU</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.nsu}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Estabelecimento</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.estabelecimento}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Adquirente</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.adquirente}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Bandeira</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.bandeira}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Modalidade</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.modalidade}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Valor</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    R$ {selectedVenda.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Data da Venda</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.dataVenda}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Captura</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.captura}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Online</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedVenda.online ? "Sim" : "Não"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Situação</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    PENDENTE
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
