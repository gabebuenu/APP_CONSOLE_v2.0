"use client"
import { useState, useEffect } from "react"
import type React from "react"

import {
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  RefreshCw,
  Search,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

// Definição de interfaces para tipagem
interface AluguelMensalidade {
  id: string
  cliente: string
  nomeRazaoSocial: string
  numeroSerie: string
  valorTotal: number
  valorPago: number
  valorRestante: number
  dataLanc: string
  dataVenc: string
  situacao: "Atrasado" | "Em Dia" | "Pago"
  diasAtraso?: number
}

interface ResumoAluguel {
  valorRecorrente: {
    valor: number
    dispositivos: number
  }
  cobrancaMes: {
    valor: number
    lancamentos: number
  }
  totalAberto: {
    valor: number
  }
}

// Dados de exemplo conforme especificado
const aluguelMensalidadeData: AluguelMensalidade[] = [
  {
    id: "1",
    cliente: "177285",
    nomeRazaoSocial: "Teste 02",
    numeroSerie: "10203040",
    valorTotal: 0.01,
    valorPago: 0.0,
    valorRestante: 0.01,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "2",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-002",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "3",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-003",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "4",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-004",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "5",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-005",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "6",
    cliente: "128589",
    nomeRazaoSocial: "Ec Fantasia",
    numeroSerie: "002-002-005",
    valorTotal: 22.22,
    valorPago: 0.0,
    valorRestante: 22.22,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "7",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-006",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "8",
    cliente: "123111",
    nomeRazaoSocial: "Adiq Pj 6 Terminal",
    numeroSerie: "002-002-007",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "9",
    cliente: "123112",
    nomeRazaoSocial: "Pf 1 Terminal Tef",
    numeroSerie: "002-002-008",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
  {
    id: "10",
    cliente: "123113",
    nomeRazaoSocial: "Credenciamento Invalidado",
    numeroSerie: "002-002-009",
    valorTotal: 1.0,
    valorPago: 0.0,
    valorRestante: 1.0,
    dataLanc: "05/06/2025",
    dataVenc: "05/06/2025",
    situacao: "Atrasado",
    diasAtraso: 10,
  },
]

// Dados do resumo conforme especificado
const resumoAluguelData: ResumoAluguel = {
  valorRecorrente: {
    valor: 1792.09,
    dispositivos: 32,
  },
  cobrancaMes: {
    valor: 24.64,
    lancamentos: 1,
  },
  totalAberto: {
    valor: 875.91,
  },
}

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 10 }).map((_, colIndex) => (
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

// Componente de Skeleton para cards de resumo
function ResumoSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
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

// Componente para card de resumo
function ResumoCard({
  icon,
  titulo,
  valor,
  detalhe,
  cor,
  onDownload,
}: {
  icon: React.ReactNode
  titulo: string
  valor: number
  detalhe: string
  cor: string
  onDownload: () => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${cor}`}>{icon}</div>
        <h3 className="text-sm font-medium text-gray-700">{titulo}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">
          R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500">{detalhe}</p>
        <button
          onClick={onDownload}
          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Download className="h-3 w-3 mr-1" />
          Clique para download
        </button>
      </div>
    </div>
  )
}

// Componente para card mobile de aluguel
function MobileAluguelCard({
  aluguel,
  onView,
}: {
  aluguel: AluguelMensalidade
  onView: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">Cliente: {aluguel.cliente}</div>
          <div className="text-xs text-gray-500 mt-1">Série: {aluguel.numeroSerie}</div>
        </div>
        <span className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Atrasado {aluguel.diasAtraso} dia(s)
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Nome/Razão Social:</span> {aluguel.nomeRazaoSocial}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor Total:</span> R${" "}
          {aluguel.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Valor Restante:</span> R${" "}
          {aluguel.valorRestante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Data Vencimento:</span> {aluguel.dataVenc}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onView(aluguel.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
      </div>
    </div>
  )
}

export default function AluguelMensalidadePage() {
  const [dataInicio, setDataInicio] = useState("2025-06-01")
  const [dataFim, setDataFim] = useState("2025-06-30")
  const [isLoading, setIsLoading] = useState(true)
  const [alugueis, setAlugueis] = useState<AluguelMensalidade[]>([])
  const [resumoAluguel, setResumoAluguel] = useState<ResumoAluguel | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedAluguel, setSelectedAluguel] = useState<AluguelMensalidade | null>(null)

  const itemsPerPage = 10
  const totalPages = 28 // Conforme especificado
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = alugueis.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setAlugueis(aluguelMensalidadeData)
      setResumoAluguel(resumoAluguelData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

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
      setAlugueis(aluguelMensalidadeData)
      setResumoAluguel(resumoAluguelData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para pesquisar
  const handleSearch = () => {
    console.log("Pesquisando...")
    handleRefresh()
  }

  // Função para visualizar detalhes
  const handleViewDetails = (id: string) => {
    const aluguel = alugueis.find((a) => a.id === id)
    if (aluguel) {
      setSelectedAluguel(aluguel)
      setIsViewModalOpen(true)
    }
  }

  // Função para download
  const handleDownload = (tipo: string) => {
    console.log(`Download ${tipo}...`)
    // Implementação futura
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Aluguel / Mensalidade</h2>
        <p className="text-xs text-gray-500 mb-6">Gestão de Aluguel e Mensalidades</p>
      </div>

      {/* Aviso importante */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Aviso importante!</h3>
            <p className="text-sm text-blue-800">O desconto é realizado sempre que novos pagamentos são autorizados.</p>
          </div>
        </div>
      </div>

      {/* Resumo */}
      {isLoading ? (
        <ResumoSkeleton />
      ) : resumoAluguel ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResumoCard
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              titulo={`Valor Recorrente [${resumoAluguel.valorRecorrente.dispositivos} Dispositivos]`}
              valor={resumoAluguel.valorRecorrente.valor}
              detalhe={`${resumoAluguel.valorRecorrente.dispositivos} dispositivos`}
              cor="bg-green-100"
              onDownload={() => handleDownload("valor-recorrente")}
            />
            <ResumoCard
              icon={<AlertTriangle className="h-5 w-5 text-yellow-600" />}
              titulo={`Cobrança deste mês [${resumoAluguel.cobrancaMes.lancamentos} Lançamentos]`}
              valor={resumoAluguel.cobrancaMes.valor}
              detalhe={`${resumoAluguel.cobrancaMes.lancamentos} lançamento(s)`}
              cor="bg-yellow-100"
              onDownload={() => handleDownload("cobranca-mes")}
            />
            <ResumoCard
              icon={<XCircle className="h-5 w-5 text-red-600" />}
              titulo="Total em Aberto"
              valor={resumoAluguel.totalAberto.valor}
              detalhe="Valores pendentes"
              cor="bg-red-100"
              onDownload={() => handleDownload("total-aberto")}
            />
          </div>
        </div>
      ) : null}

      {/* Filtros de data */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtro de datas</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">De:</label>
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
              <label className="text-sm font-medium text-gray-700 mb-1 block">Até:</label>
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

            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="bg-[#169BFF] hover:bg-[#169affb2] text-white px-6 py-2 text-sm font-medium w-full"
              >
                <Search className="h-4 w-4 mr-2" />
                Pesquisar
              </Button>
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
                <h3 className="text-lg font-medium text-gray-900">Tabela - Aluguel / Mensalidade</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela - Aluguel / Mensalidade</h3>
              <p className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Cliente
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Nome / Razão Social
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Nº de Série
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Valor Total
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Valor Pago
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Valor Restante
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Data Lanç.
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Data Venc.
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                      Situação
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[9%]"
                    >
                      Gerenciamento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((aluguel) => (
                      <tr key={aluguel.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{aluguel.cliente}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={aluguel.nomeRazaoSocial}>
                          {aluguel.nomeRazaoSocial}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{aluguel.numeroSerie}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {aluguel.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {aluguel.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {aluguel.valorRestante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{aluguel.dataLanc}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{aluguel.dataVenc}</td>
                        <td className="px-2 py-2">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            <XCircle className="h-3 w-3 mr-1" />
                            Atrasado {aluguel.diasAtraso} dia(s)
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => handleViewDetails(aluguel.id)}
                            className="inline-flex items-center px-2 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Visualizar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-3 py-6 text-center text-sm text-gray-500">
                        Nenhum aluguel encontrado.
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
              currentItems.map((aluguel) => (
                <MobileAluguelCard key={aluguel.id} aluguel={aluguel} onView={handleViewDetails} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum aluguel encontrado.</div>
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

      {/* Modal: Visualizar Detalhes */}
      {isViewModalOpen && selectedAluguel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Detalhes do Aluguel</h2>
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
                  <label className="text-sm font-medium text-gray-700">Cliente</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedAluguel.cliente}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Nome / Razão Social</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedAluguel.nomeRazaoSocial}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Número de Série</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedAluguel.numeroSerie}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Valor Total</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      R$ {selectedAluguel.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Valor Pago</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      R$ {selectedAluguel.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Valor Restante</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    R$ {selectedAluguel.valorRestante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data Lançamento</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      {selectedAluguel.dataLanc}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Data Vencimento</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      {selectedAluguel.dataVenc}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Situação</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    <span className="inline-flex items-center text-red-600">
                      <XCircle className="h-4 w-4 mr-1" />
                      Atrasado {selectedAluguel.diasAtraso} dia(s)
                    </span>
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
