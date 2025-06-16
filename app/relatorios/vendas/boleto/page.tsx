"use client"
import { useState, useEffect } from "react"

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
  Search,
  Filter,
  AlertTriangle,
  Settings,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// Definição de interfaces para tipagem
interface PagamentoConta {
  id: string
  cpfCnpj: string
  terminal: string
  razaoSocial: string
  bandeira: string
  nsu: string
  valorTotal: number
  receita: number
  taxa: number
  produto: string
  viConta: string
  data: string
  situacao: "Aprovado" | "Pendente" | "Negado"
}

// Dados de exemplo (vazio conforme especificado)
const pagamentosContaData: PagamentoConta[] = []

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 13 }).map((_, index) => (
              <th key={index} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 13 }).map((_, colIndex) => (
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
              <Skeleton className="h-6 w-16 rounded-full" />
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

// Componente para card mobile de pagamento
function MobilePagamentoCard({
  pagamento,
  onManage,
}: {
  pagamento: PagamentoConta
  onManage: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">NSU: {pagamento.nsu}</div>
          <div className="text-xs text-gray-500 mt-1">{pagamento.data}</div>
        </div>
        <span
          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
            pagamento.situacao === "Aprovado"
              ? "bg-green-100 text-green-800"
              : pagamento.situacao === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {pagamento.situacao === "Aprovado" && <CheckCircle className="h-3 w-3 mr-1" />}
          {pagamento.situacao === "Pendente" && <Clock className="h-3 w-3 mr-1" />}
          {pagamento.situacao === "Negado" && <XCircle className="h-3 w-3 mr-1" />}
          {pagamento.situacao}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">CPF/CNPJ:</span> {pagamento.cpfCnpj}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Razão Social:</span> {pagamento.razaoSocial}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Bandeira:</span> {pagamento.bandeira}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor Total:</span> R${" "}
          {pagamento.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Produto:</span> {pagamento.produto}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">VI Conta:</span> {pagamento.viConta}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onManage(pagamento.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
        >
          <Settings className="h-3 w-3 mr-1.5" />
          Gerenciar
        </button>
      </div>
    </div>
  )
}

export default function PagamentosContaPage() {
  const [searchCpfCnpj, setSearchCpfCnpj] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-06-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [pagamentos, setPagamentos] = useState<PagamentoConta[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const itemsPerPage = 10
  const totalPages = 1 // Sem dados
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = pagamentos.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setPagamentos(pagamentosContaData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar pagamentos com base nos filtros
  useEffect(() => {
    let filtered = [...pagamentosContaData]

    if (searchCpfCnpj.trim() !== "") {
      filtered = filtered.filter((p) => p.cpfCnpj.toLowerCase().includes(searchCpfCnpj.toLowerCase()))
    }

    // Aqui você implementaria filtros de data

    setPagamentos(filtered)
    setCurrentPage(1)
  }, [searchCpfCnpj, dataInicio, dataFim])

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

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPagamentos(pagamentosContaData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para gerenciar pagamento
  const handleManagePagamento = (id: string) => {
    console.log("Gerenciar pagamento:", id)
    // Implementação futura
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Pagamentos de Conta</h2>
        <p className="text-xs text-gray-500 mb-6">Consulta de Pagamentos de Conta</p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar por CPF/CNPJ"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                value={searchCpfCnpj}
                onChange={(e) => setSearchCpfCnpj(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type="date"
                placeholder="Data início"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type="date"
                placeholder="Data fim"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Período:</span> de {new Date(dataInicio).toLocaleDateString("pt-BR")} até{" "}
              {new Date(dataFim).toLocaleDateString("pt-BR")}
            </div>
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

      {/* Conteúdo */}
      {isLoading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tabela de Pagamentos de Conta</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela de Pagamentos de Conta</h3>
              <p className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      CPF/CNPJ
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Terminal
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Razão Social
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Bandeira
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      NSU
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Valor Total
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Receita
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Taxa
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Produto
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      VI Conta
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Situação
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[8%]"
                    >
                      Gerenciar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((pagamento) => (
                      <tr key={pagamento.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{pagamento.cpfCnpj}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{pagamento.terminal}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={pagamento.razaoSocial}>
                          {pagamento.razaoSocial}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900">{pagamento.bandeira}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{pagamento.nsu}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {pagamento.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {pagamento.receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {pagamento.taxa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{pagamento.produto}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{pagamento.viConta}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{pagamento.data}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              pagamento.situacao === "Aprovado"
                                ? "bg-green-100 text-green-800"
                                : pagamento.situacao === "Pendente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {pagamento.situacao === "Aprovado" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {pagamento.situacao === "Pendente" && <Clock className="h-3 w-3 mr-1" />}
                            {pagamento.situacao === "Negado" && <XCircle className="h-3 w-3 mr-1" />}
                            {pagamento.situacao}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => handleManagePagamento(pagamento.id)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Gerenciar"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="px-3 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3" />
                          <p className="text-sm text-gray-500 font-medium">
                            Nenhum pagamento de conta encontrado até o momento.
                          </p>
                        </div>
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
              currentItems.map((pagamento) => (
                <MobilePagamentoCard key={pagamento.id} pagamento={pagamento} onManage={handleManagePagamento} />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3 mx-auto" />
                <p className="text-sm text-gray-500 font-medium">Nenhum pagamento de conta encontrado até o momento.</p>
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
    </div>
  )
}
