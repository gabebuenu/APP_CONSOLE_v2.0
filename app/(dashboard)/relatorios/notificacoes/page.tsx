"use client"
import { useState, useEffect } from "react"

import {
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Download,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface Payload {
  id: string
  servico: string
  chave: string
  valorChave: string
  hash: string
  captura: string
  payload: string
  situacao: "Processado" | "Pendente" | "Erro"
  dataRecebimento: string
}

// Dados de exemplo para os payloads
const payloadsData: Payload[] = [
  {
    id: "1",
    servico: "PIX",
    chave: "email",
    valorChave: "usuario@email.com",
    hash: "a1b2c3d4e5f6",
    captura: "Webhook",
    payload: '{"amount": 100.00, "status": "approved"}',
    situacao: "Processado",
    dataRecebimento: "15/12/2024 14:30:25",
  },
  {
    id: "2",
    servico: "TED",
    chave: "cpf",
    valorChave: "123.456.789-00",
    hash: "f6e5d4c3b2a1",
    captura: "API",
    payload: '{"amount": 250.50, "status": "pending"}',
    situacao: "Pendente",
    dataRecebimento: "15/12/2024 13:45:12",
  },
  {
    id: "3",
    servico: "DOC",
    chave: "conta",
    valorChave: "12345-6",
    hash: "1a2b3c4d5e6f",
    captura: "Webhook",
    payload: '{"amount": 75.25, "status": "error"}',
    situacao: "Erro",
    dataRecebimento: "15/12/2024 12:15:08",
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chave</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor da Chave</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">HASH</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Captura</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payload</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data / Recebimento</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </td>
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
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
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

// Componente para card mobile
function MobilePayloadCard({
  payload,
  onView,
  onDelete,
}: {
  payload: Payload
  onView: (payload: Payload) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            {payload.servico} - {payload.chave}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">Hash: {payload.hash}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            payload.situacao === "Processado"
              ? "bg-green-100 text-green-800"
              : payload.situacao === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {payload.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor da Chave:</span> {payload.valorChave}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Captura:</span> {payload.captura}
        </div>
        <div className="text-xs text-gray-500">Recebimento: {payload.dataRecebimento}</div>
      </div>

      <div className="flex flex-col xs:flex-row gap-2 mt-3">
        <button
          onClick={() => onView(payload)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors w-full xs:w-auto"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
        <button
          onClick={() => onDelete(payload.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors w-full xs:w-auto"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function PayloadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPayload, setSelectedPayload] = useState<Payload | null>(null)
  const [payloads, setPayloads] = useState<Payload[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemsPerPage = 8
  const totalPages = Math.ceil(payloads.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = payloads.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setPayloads(payloadsData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar payloads com base no termo de pesquisa e filtros
  useEffect(() => {
    let filtered = [...payloadsData]

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (payload) =>
          payload.servico.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payload.chave.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payload.valorChave.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payload.hash.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "Todos") {
      filtered = filtered.filter((payload) => payload.situacao === statusFilter)
    }

    // Filtro por data (simulado)
    if (dataInicio && dataFim) {
      // Aqui você implementaria a lógica de filtro por data
      console.log("Filtrar por data:", dataInicio, "até", dataFim)
    }

    setPayloads(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, dataInicio, dataFim])

  // Função para visualizar payload
  const handleViewPayload = (payload: Payload) => {
    setSelectedPayload(payload)
    setIsViewModalOpen(true)
  }

  // Função para abrir modal de exclusão
  const handleOpenDeleteModal = (id: string) => {
    const payload = payloads.find((p) => p.id === id)
    if (payload) {
      setSelectedPayload(payload)
      setIsDeleteModalOpen(true)
    }
  }

  // Função para excluir payload
  const handleDeletePayload = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedPayload) {
        const updatedPayloads = payloads.filter((p) => p.id !== selectedPayload.id)
        setPayloads(updatedPayloads)
        setIsSubmitting(false)
        setIsDeleteModalOpen(false)
        setSelectedPayload(null)
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
      setPayloads(payloadsData)
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
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Webhooks e Payloads</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
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
          <h3 className="text-sm font-medium text-gray-700">Filtros e Busca</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por serviço"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="date"
              placeholder="Data início"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="date"
              placeholder="Data fim"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
            <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Filtrar por situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Processado">Processado</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Erro">Erro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden md:block">
            <TableSkeleton />
          </div>
          {/* Mobile Skeleton */}
          <div className="md:hidden">
            <MobileCardSkeleton />
          </div>
        </>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Serviço
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Chave
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Valor da Chave
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    HASH
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Captura
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    Payload
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Data / Recebimento
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((payload) => (
                    <tr key={payload.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{payload.servico}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{payload.chave}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={payload.valorChave}>
                        {payload.valorChave}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 font-mono">{payload.hash}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{payload.captura}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">
                        <span className="truncate block max-w-[100px]" title={payload.payload}>
                          {payload.payload}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            payload.situacao === "Processado"
                              ? "bg-green-100 text-green-800"
                              : payload.situacao === "Pendente"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payload.situacao}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{payload.dataRecebimento}</td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleViewPayload(payload)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(payload.id)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-1 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-3 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <AlertCircle className="h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-500 max-w-md">
                          <p className="font-medium mb-1">Não encontramos nenhum payload até o momento.</p>
                          <p>As notificações listadas foram recebidas e processadas pelo Movingpay Gateway.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((payload) => (
                <MobilePayloadCard
                  key={payload.id}
                  payload={payload}
                  onView={handleViewPayload}
                  onDelete={handleOpenDeleteModal}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-500 max-w-md px-4">
                    <p className="font-medium mb-1">Não encontramos nenhum payload até o momento.</p>
                    <p>As notificações listadas foram recebidas e processadas pelo Movingpay Gateway.</p>
                  </div>
                </div>
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

      {/* Modal: Visualizar Payload */}
      {isViewModalOpen && selectedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Detalhes do Payload</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Serviço</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{selectedPayload.servico}</div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Chave</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{selectedPayload.chave}</div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Valor da Chave</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                    {selectedPayload.valorChave}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">HASH</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900 font-mono">
                    {selectedPayload.hash}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Captura</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{selectedPayload.captura}</div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Situação</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                        selectedPayload.situacao === "Processado"
                          ? "bg-green-100 text-green-800"
                          : selectedPayload.situacao === "Pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedPayload.situacao}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Data de Recebimento</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                    {selectedPayload.dataRecebimento}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Payload</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono overflow-x-auto">
                    {JSON.stringify(JSON.parse(selectedPayload.payload), null, 2)}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão */}
      {isDeleteModalOpen && selectedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Confirmar Exclusão</h2>
              <button
                onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900 mb-1">Atenção!</h3>
                    <p className="text-sm text-red-800">
                      Você está prestes a excluir o payload do serviço <strong>{selectedPayload.servico}</strong> com
                      hash <strong>{selectedPayload.hash}</strong>. Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeletePayload}
                  className="px-4 py-2 text-xs sm:text-sm bg-red-600 text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 order-1 sm:order-2 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                    </>
                  ) : (
                    "Confirmar Exclusão"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
