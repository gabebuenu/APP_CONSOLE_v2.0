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
  AlertTriangle,
  CheckCircle,
  Clock,
  RotateCcw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// Definição de interfaces para tipagem
interface Chargeback {
  id: string
  adquirente: string
  estabelecimento: string
  nsuTransacao: string
  autorizacao: string
  valor: number
  recuperado: boolean
  dataCBK: string
  dataReceb: string
  dataLanc: string
  dataVenda: string
  situacao: "Recuperado" | "Agendado" | "Em Andamento"
}

interface ResumoChargebacks {
  recuperados: {
    valor: number
    quantidade: number
  }
  agendados: {
    valor: number
    quantidade: number
  }
  emAndamento: {
    valor: number
    quantidade: number
  }
}

// Dados de exemplo (vazio conforme especificado)
const chargebacksData: Chargeback[] = []

// Dados do resumo (todos zerados conforme especificado)
const resumoChargebacksData: ResumoChargebacks = {
  recuperados: {
    valor: 0.0,
    quantidade: 0,
  },
  agendados: {
    valor: 0.0,
    quantidade: 0,
  },
  emAndamento: {
    valor: 0.0,
    quantidade: 0,
  },
}

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

// Componente para card de resumo
function ResumoCard({
  icon,
  titulo,
  valor,
  quantidade,
  cor,
}: {
  icon: React.ReactNode
  titulo: string
  valor: number
  quantidade: number
  cor: string
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${cor}`}>{icon}</div>
        <h3 className="text-sm font-medium text-gray-700">{titulo}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          R$ {valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500">
          {quantidade} chargeback{quantidade !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  )
}

export default function ChargebacksPage() {
  const [searchEstabelecimento, setSearchEstabelecimento] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-06-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [chargebacks, setChargebacks] = useState<Chargeback[]>([])
  const [resumoChargebacks, setResumoChargebacks] = useState<ResumoChargebacks | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const itemsPerPage = 10
  const totalPages = 1 // Sem dados
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = chargebacks.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setChargebacks(chargebacksData)
      setResumoChargebacks(resumoChargebacksData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar chargebacks com base nos filtros
  useEffect(() => {
    let filtered = [...chargebacksData]

    if (searchEstabelecimento.trim() !== "") {
      filtered = filtered.filter((c) => c.estabelecimento.toLowerCase().includes(searchEstabelecimento.toLowerCase()))
    }

    // Aqui você implementaria filtros de data

    setChargebacks(filtered)
    setCurrentPage(1)
  }, [searchEstabelecimento, dataInicio, dataFim])

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
      setChargebacks(chargebacksData)
      setResumoChargebacks(resumoChargebacksData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Chargebacks</h2>
        <p className="text-xs text-gray-500 mb-6">Dashboard de Chargebacks e Contestações</p>
      </div>

      {/* Informação importante */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Informação importante!</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>Transações contestadas no mesmo dia não são exibidas nessa tela.</p>
              <p>
                Este dashboard reflete apenas os chargebacks/contestações que geraram descontos (lançamentos) para o
                estabelecimento.
              </p>
              <p>
                <span className="font-medium">Para visualizar os ajustes do adquirente, consulte em:</span>
                <br />
                Relatórios → Conciliação → Movimento Adquirente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar por estabelecimento..."
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                value={searchEstabelecimento}
                onChange={(e) => setSearchEstabelecimento(e.target.value)}
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
              <span className="font-medium">Data Contestação:</span> de{" "}
              {new Date(dataInicio).toLocaleDateString("pt-BR")} até {new Date(dataFim).toLocaleDateString("pt-BR")}
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

      {/* Resumo de Chargebacks */}
      {isLoading ? (
        <ResumoSkeleton />
      ) : resumoChargebacks ? (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo de Chargebacks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResumoCard
              icon={<CheckCircle className="h-5 w-5 text-green-600" />}
              titulo={`${resumoChargebacks.recuperados.quantidade} recuperado(s)`}
              valor={resumoChargebacks.recuperados.valor}
              quantidade={resumoChargebacks.recuperados.quantidade}
              cor="bg-green-100"
            />
            <ResumoCard
              icon={<Clock className="h-5 w-5 text-yellow-600" />}
              titulo={`${resumoChargebacks.agendados.quantidade} Lançamento(s) Agendado(s)`}
              valor={resumoChargebacks.agendados.valor}
              quantidade={resumoChargebacks.agendados.quantidade}
              cor="bg-yellow-100"
            />
            <ResumoCard
              icon={<RotateCcw className="h-5 w-5 text-blue-600" />}
              titulo={`${resumoChargebacks.emAndamento.quantidade} em andamento`}
              valor={resumoChargebacks.emAndamento.valor}
              quantidade={resumoChargebacks.emAndamento.quantidade}
              cor="bg-blue-100"
            />
          </div>
        </div>
      ) : null}

      {/* Conteúdo */}
      {isLoading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tabela de Chargebacks</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela de Chargebacks</h3>
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
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Estabelecimento
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      NSU Transação
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Autorização
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Valor
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Recuperado
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data CBK.
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data Receb.
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data Lanç.
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Situação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((chargeback) => (
                      <tr key={chargeback.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900">{chargeback.adquirente}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={chargeback.estabelecimento}>
                          {chargeback.estabelecimento}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{chargeback.nsuTransacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{chargeback.autorizacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {chargeback.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{chargeback.recuperado ? "Sim" : "Não"}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{chargeback.dataCBK}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{chargeback.dataReceb}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{chargeback.dataLanc}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{chargeback.dataVenda}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              chargeback.situacao === "Recuperado"
                                ? "bg-green-100 text-green-800"
                                : chargeback.situacao === "Agendado"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {chargeback.situacao === "Recuperado" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {chargeback.situacao === "Agendado" && <Clock className="h-3 w-3 mr-1" />}
                            {chargeback.situacao === "Em Andamento" && <RotateCcw className="h-3 w-3 mr-1" />}
                            {chargeback.situacao}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="px-3 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3" />
                          <p className="text-sm text-gray-500 font-medium">
                            Nenhum chargeback realizado no período informado.
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
              currentItems.map((chargeback) => (
                <div key={chargeback.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">NSU: {chargeback.nsuTransacao}</div>
                      <div className="text-xs text-gray-500 mt-1">{chargeback.dataCBK}</div>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                        chargeback.situacao === "Recuperado"
                          ? "bg-green-100 text-green-800"
                          : chargeback.situacao === "Agendado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {chargeback.situacao}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Adquirente:</span> {chargeback.adquirente}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Estabelecimento:</span> {chargeback.estabelecimento}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Valor:</span> R${" "}
                      {chargeback.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Recuperado:</span> {chargeback.recuperado ? "Sim" : "Não"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mb-3 mx-auto" />
                <p className="text-sm text-gray-500 font-medium">Nenhum chargeback realizado no período informado.</p>
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
