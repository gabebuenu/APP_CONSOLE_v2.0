"use client"
import { useState, useEffect } from "react"

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
  Search,
  Store,
  CreditCard,
  AlertTriangle,
  Filter,
  X,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

// Definição de interfaces para tipagem
interface TransacaoInternacional {
  id: string
  adquirente: string
  mid: string
  bandeira: string
  nsuTransacao: string
  autorizacao: string
  valorVenda: number
  parcelas: string
  portadorCartao: string
  numeroCartao: string
  situacao: "Aprovada" | "Pendente" | "Negada"
  dataVenda: string
}

// Dados de exemplo (vazio conforme especificado)
const transacoesInternacionaisData: TransacaoInternacional[] = []

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

// Componente para card mobile de transação
function MobileTransacaoCard({ transacao }: { transacao: TransacaoInternacional }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">NSU: {transacao.nsuTransacao}</div>
          <div className="text-xs text-gray-500 mt-1">{transacao.dataVenda}</div>
        </div>
        <span
          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
            transacao.situacao === "Aprovada"
              ? "bg-green-100 text-green-800"
              : transacao.situacao === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {transacao.situacao === "Aprovada" && <CheckCircle className="h-3 w-3 mr-1" />}
          {transacao.situacao === "Pendente" && <Clock className="h-3 w-3 mr-1" />}
          {transacao.situacao === "Negada" && <XCircle className="h-3 w-3 mr-1" />}
          {transacao.situacao}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Adquirente:</span> {transacao.adquirente}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">MID:</span> {transacao.mid}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Bandeira:</span> {transacao.bandeira}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor:</span> R${" "}
          {transacao.valorVenda.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Portador:</span> {transacao.portadorCartao}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Cartão:</span> {transacao.numeroCartao}
        </div>
      </div>
    </div>
  )
}

export default function TransacoesInternacionaisPage() {
  const [searchIdLoja, setSearchIdLoja] = useState("")
  const [searchNSU, setSearchNSU] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-04-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [transacoes, setTransacoes] = useState<TransacaoInternacional[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const itemsPerPage = 10
  const totalPages = 1 // Sem dados
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = transacoes.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setTransacoes(transacoesInternacionaisData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar transações com base nos filtros
  useEffect(() => {
    let filtered = [...transacoesInternacionaisData]

    if (searchIdLoja.trim() !== "") {
      filtered = filtered.filter((t) => t.mid.toLowerCase().includes(searchIdLoja.toLowerCase()))
    }

    if (searchNSU.trim() !== "") {
      filtered = filtered.filter((t) => t.nsuTransacao.toLowerCase().includes(searchNSU.toLowerCase()))
    }

    // Aqui você implementaria filtros de data

    setTransacoes(filtered)
    setCurrentPage(1)
  }, [searchIdLoja, searchNSU, dataInicio, dataFim])

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
      setTransacoes(transacoesInternacionaisData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para pesquisar
  const handleSearch = () => {
    console.log("Pesquisando...")
    handleRefresh()
  }

  // Função para aplicar filtros
  const handleApplyFilters = () => {
    setIsFilterModalOpen(false)
    handleRefresh()
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Transações Internacionais</h2>
        <p className="text-xs text-gray-500 mb-6">Consulta de Transações com Cartão Internacional</p>
      </div>

      {/* Aviso importante */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Aviso importante!</h3>
            <p className="text-sm text-blue-800">
              As transações apresentadas nesta tela foram realizadas utilizando cartão de crédito emitido fora do país
              de origem.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de pesquisa */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
        </div>

        <div className="space-y-4">
          {/* Single row with search fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar por ID Loja..."
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                value={searchIdLoja}
                onChange={(e) => setSearchIdLoja(e.target.value)}
              />
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar por NSU..."
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                value={searchNSU}
                onChange={(e) => setSearchNSU(e.target.value)}
              />
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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

          {/* Period summary and search button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              <span className="font-medium">Período:</span> de {new Date(dataInicio).toLocaleDateString("pt-BR")} até{" "}
              {new Date(dataFim).toLocaleDateString("pt-BR")}
            </div>
            <Button
              onClick={handleSearch}
              className="bg-[#169BFF] hover:bg-[#169affb2] text-white px-6 py-2 text-sm font-medium order-1 sm:order-2 w-full sm:w-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
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
                <h3 className="text-lg font-medium text-gray-900">Tabela de Transações Internacionais</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela de Transações Internacionais</h3>
              <p className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Adquirente
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      MID
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Bandeira
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      NSU Transação
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Autorização
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Valor da Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Parcelas
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                      Portador do Cartão
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Nº Cartão
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Situação
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Data da Venda
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((transacao) => (
                      <tr key={transacao.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.adquirente}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.mid}</td>
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.bandeira}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.nsuTransacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.autorizacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {transacao.valorVenda.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.parcelas}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={transacao.portadorCartao}>
                          {transacao.portadorCartao}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.numeroCartao}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              transacao.situacao === "Aprovada"
                                ? "bg-green-100 text-green-800"
                                : transacao.situacao === "Pendente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transacao.situacao === "Aprovada" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {transacao.situacao === "Pendente" && <Clock className="h-3 w-3 mr-1" />}
                            {transacao.situacao === "Negada" && <XCircle className="h-3 w-3 mr-1" />}
                            {transacao.situacao}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.dataVenda}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-3 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3" />
                          <p className="text-sm text-gray-500 font-medium">
                            Nenhuma transação encontrada até o momento.
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
              currentItems.map((transacao) => <MobileTransacaoCard key={transacao.id} transacao={transacao} />)
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3 mx-auto" />
                <p className="text-sm text-gray-500 font-medium">Nenhuma transação encontrada até o momento.</p>
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

      {/* Modal: Filtros */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsFilterModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filtros</h2>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Pesquisar por ID Loja..."
                    className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    value={searchIdLoja}
                    onChange={(e) => setSearchIdLoja(e.target.value)}
                  />
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Pesquisar por NSU..."
                    className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                    value={searchNSU}
                    onChange={(e) => setSearchNSU(e.target.value)}
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Data início</label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Data fim</label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169BFF] order-1 sm:order-2"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
