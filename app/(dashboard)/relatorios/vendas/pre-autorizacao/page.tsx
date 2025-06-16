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
  Info,
  CheckCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

// Definição de interfaces para tipagem
interface TransacaoPreAutorizacao {
  id: string
  adquirente: string
  bandeira: string
  cpfCnpj: string
  razaoSocial: string
  nsuTransacao: string
  autorizacao: string
  valorVenda: number
  parcelas: string
  numeroCartao: string
  dataCaptura: string
  dataPagamento: string
  situacao: string
}

// Dados de exemplo para as transações de pré-autorização
const transacoesPreAutorizacao: TransacaoPreAutorizacao[] = [
  {
    id: "1",
    adquirente: "22 - SafraPay",
    bandeira: "Mastercard",
    cpfCnpj: "64.431.661/0001-54",
    razaoSocial: "Estabelecimento do Pedro",
    nsuTransacao: "gJC7vb1x1Df1",
    autorizacao: "bNOzKa",
    valorVenda: 1032.0,
    parcelas: "4x",
    numeroCartao: "119064****2019",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
  {
    id: "2",
    adquirente: "21 - Bin",
    bandeira: "VISA",
    cpfCnpj: "64.431.661/0001-54",
    razaoSocial: "Estabelecimento do Pedro",
    nsuTransacao: "AqKZnfRg8jCT",
    autorizacao: "9PLbKH",
    valorVenda: 3866.0,
    parcelas: "10x",
    numeroCartao: "653993****3051",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
  {
    id: "3",
    adquirente: "22 - SafraPay",
    bandeira: "VISA",
    cpfCnpj: "460.137.478-22",
    razaoSocial: "sdsfdsfd",
    nsuTransacao: "zNx7q6zc3Pg6",
    autorizacao: "H1heqZ",
    valorVenda: 1614.0,
    parcelas: "10x",
    numeroCartao: "770358****7193",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
  {
    id: "4",
    adquirente: "17 - Adiq",
    bandeira: "Mastercard",
    cpfCnpj: "64.431.661/0001-54",
    razaoSocial: "Estabelecimento do Pedro",
    nsuTransacao: "TR2H2XLiCySP",
    autorizacao: "x1dhVv",
    valorVenda: 7206.0,
    parcelas: "8x",
    numeroCartao: "863720****7717",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
  {
    id: "5",
    adquirente: "17 - Adiq",
    bandeira: "Elo",
    cpfCnpj: "460.137.478-22",
    razaoSocial: "sdsfdsfd",
    nsuTransacao: "s0OUl gVzDoGs",
    autorizacao: "YFGW1G",
    valorVenda: 4797.0,
    parcelas: "3x",
    numeroCartao: "440045****7035",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
  {
    id: "6",
    adquirente: "21 - Bin",
    bandeira: "Mastercard",
    cpfCnpj: "64.431.661/0001-54",
    razaoSocial: "Estabelecimento do Pedro",
    nsuTransacao: "H8h3jCcN9rDY",
    autorizacao: "kWXmeQ",
    valorVenda: 6022.0,
    parcelas: "4x",
    numeroCartao: "418490****9868",
    dataCaptura: "13/06/2025 09:49:24",
    dataPagamento: "13/06/2025 09:49:24",
    situacao: "00 - Aprovado",
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 12 }).map((_, index) => (
              <th key={index} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 12 }).map((_, colIndex) => (
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
function MobileTransacaoCard({ transacao }: { transacao: TransacaoPreAutorizacao }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">NSU: {transacao.nsuTransacao}</div>
          <div className="text-xs text-gray-500 mt-1">{transacao.dataCaptura}</div>
        </div>
        <span className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Aprovado
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Adquirente:</span> {transacao.adquirente}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Bandeira:</span> {transacao.bandeira}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Razão Social:</span> {transacao.razaoSocial}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor:</span> R${" "}
          {transacao.valorVenda.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Parcelas:</span> {transacao.parcelas}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Cartão:</span> {transacao.numeroCartao}
        </div>
      </div>
    </div>
  )
}

export default function PreAutorizacaoPage() {
  const [searchIdLoja, setSearchIdLoja] = useState("")
  const [searchNSU, setSearchNSU] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-05-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [transacoes, setTransacoes] = useState<TransacaoPreAutorizacao[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const itemsPerPage = 6
  const totalPages = 307 // Conforme especificado
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
      setTransacoes(transacoesPreAutorizacao)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar transações com base nos filtros
  useEffect(() => {
    let filtered = [...transacoesPreAutorizacao]

    if (searchIdLoja.trim() !== "") {
      filtered = filtered.filter((t) => t.cpfCnpj.toLowerCase().includes(searchIdLoja.toLowerCase()))
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
      setTransacoes(transacoesPreAutorizacao)
      setIsLoading(false)
    }, 1000)
  }

  // Função para pesquisar
  const handleSearch = () => {
    console.log("Pesquisando...")
    handleRefresh()
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Pré-autorização</h2>
        <p className="text-xs text-gray-500 mb-6">Consulta de Transações</p>
      </div>

      {/* Aviso importante */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Aviso importante!</h3>
            <p className="text-sm text-blue-800">
              Poderá ocorrer um atraso no recebimento das informações da pré-autorização.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros de pesquisa */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros de pesquisa</h3>
        </div>

        <div className="space-y-4">
          {/* Single row with all 4 fields */}
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
                <h3 className="text-lg font-medium text-gray-900">Tabela de Transações</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela de Transações</h3>
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
                      Bandeira
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                      CPF/CNPJ
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Razão Social
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      NSU Transação
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Autorização
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Valor da Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Parcelas
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Nº Cartão
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Dt. Captura
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Dt. Pagamento
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Situação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((transacao) => (
                      <tr key={transacao.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.adquirente}</td>
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.bandeira}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.cpfCnpj}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={transacao.razaoSocial}>
                          {transacao.razaoSocial}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.nsuTransacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.autorizacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {transacao.valorVenda.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.parcelas}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.numeroCartao}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.dataCaptura}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.dataPagamento}</td>
                        <td className="px-2 py-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {transacao.situacao}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="px-3 py-6 text-center text-sm text-gray-500">
                        Nenhuma transação encontrada.
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
              <div className="text-center py-8 text-gray-500">Nenhuma transação encontrada.</div>
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
