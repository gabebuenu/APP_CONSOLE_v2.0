"use client"
import { useState, useEffect } from "react"

import { Download, ChevronLeft, ChevronRight, RefreshCw, Search, Store, Info, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Definição de interfaces para tipagem
interface TotalFormaPagamento {
  id: string
  mid: string
  razaoSocial: string
  ultimaVenda: string
  ticketMedio: number
  totalDebito: number
  totalCredito: number
  totalParcelado: number
  pagtoContas: number
  capEcommerce: number
  totalFormaPag: number
}

// Dados de exemplo conforme especificado
const totalFormaPagamentoData: TotalFormaPagamento[] = [
  {
    id: "1",
    mid: "981295",
    razaoSocial: "Estabelecimento Do Pedro",
    ultimaVenda: "13/06/2025 09:49",
    ticketMedio: 4823.51,
    totalDebito: 15192.01,
    totalCredito: 51925.0,
    totalParcelado: 588881.0,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 655998.01,
  },
  {
    id: "2",
    mid: "162154",
    razaoSocial: "Sfsfsd",
    ultimaVenda: "13/06/2025 09:49",
    ticketMedio: 4711.46,
    totalDebito: 0.0,
    totalCredito: 12190.0,
    totalParcelado: 308189.0,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 320379.0,
  },
  {
    id: "3",
    mid: "178930",
    razaoSocial: "Teste 999",
    ultimaVenda: "04/06/2025 17:26",
    ticketMedio: 9753.34,
    totalDebito: 0.0,
    totalCredito: 0.0,
    totalParcelado: 282846.93,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 282846.93,
  },
  {
    id: "4",
    mid: "274218",
    razaoSocial: "Teste Entrepay 1",
    ultimaVenda: "03/06/2025 11:24",
    ticketMedio: 10037.23,
    totalDebito: 0.0,
    totalCredito: 0.0,
    totalParcelado: 70260.61,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 70260.61,
  },
  {
    id: "5",
    mid: "133199",
    razaoSocial: "Teste 999",
    ultimaVenda: "26/05/2025 17:04",
    ticketMedio: 4332.52,
    totalDebito: 199.8,
    totalCredito: 0.0,
    totalParcelado: 64788.0,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 64987.8,
  },
  {
    id: "6",
    mid: "300302",
    razaoSocial: "Movingale",
    ultimaVenda: "20/05/2025 15:13",
    ticketMedio: 1942.98,
    totalDebito: 99.9,
    totalCredito: 0.0,
    totalParcelado: 7672.0,
    pagtoContas: 0.0,
    capEcommerce: 0.0,
    totalFormaPag: 7771.9,
  },
]

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
          {Array.from({ length: 6 }).map((_, index) => (
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

// Componente para card mobile de total forma pagamento
function MobileTotalCard({ total }: { total: TotalFormaPagamento }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">MID: {total.mid}</div>
          <div className="text-xs text-gray-500 mt-1">{total.ultimaVenda}</div>
        </div>
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            R$ {total.totalFormaPag.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Razão Social:</span> {total.razaoSocial}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Ticket Médio:</span> R${" "}
          {total.ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Total Débito:</span> R${" "}
          {total.totalDebito.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Total Crédito:</span> R${" "}
          {total.totalCredito.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Total Parcelado:</span> R${" "}
          {total.totalParcelado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  )
}

export default function TotalFormaPagamentoPage() {
  const [searchLojaMid, setSearchLojaMid] = useState("")
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("")
  const [dataInicio] = useState("2025-05-16")
  const [dataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [totais, setTotais] = useState<TotalFormaPagamento[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const itemsPerPage = 6
  const totalPages = 6 // Conforme especificado
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = totais.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setTotais(totalFormaPagamentoData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar totais com base nos filtros
  useEffect(() => {
    let filtered = [...totalFormaPagamentoData]

    if (searchLojaMid.trim() !== "") {
      filtered = filtered.filter(
        (t) =>
          t.mid.toLowerCase().includes(searchLojaMid.toLowerCase()) ||
          t.razaoSocial.toLowerCase().includes(searchLojaMid.toLowerCase()),
      )
    }

    // Aqui você implementaria filtros de unidade

    setTotais(filtered)
    setCurrentPage(1)
  }, [searchLojaMid, unidadeSelecionada])

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
      setTotais(totalFormaPagamentoData)
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
        <h2 className="text-sm font-medium text-gray-900 mb-1">Total por Forma de Pagamento</h2>
        <p className="text-xs text-gray-500 mb-6">Relatório de Totais por Forma de Pagamento</p>
      </div>

      {/* Informação importante */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">Informação Importante!</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>Somente as transações aprovadas são consideradas nos cálculos.</p>
              <p>Para efeitos, foi utilizado apenas os valores brutos sem descontos.</p>
              <p>A soma do "Total Forma Pag." não é representada pela soma das demais colunas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de pesquisa */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>

        <div className="space-y-4">
          {/* Filtros em linha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar Loja / MID"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                value={searchLojaMid}
                onChange={(e) => setSearchLojaMid(e.target.value)}
              />
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div>
              <Select value={unidadeSelecionada} onValueChange={setUnidadeSelecionada}>
                <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as unidades</SelectItem>
                  <SelectItem value="unidade1">Unidade 1</SelectItem>
                  <SelectItem value="unidade2">Unidade 2</SelectItem>
                  <SelectItem value="unidade3">Unidade 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Período e botão de pesquisa */}
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
                <h3 className="text-lg font-medium text-gray-900">Tabela - Total por Forma de Pagamento</h3>
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
              <h3 className="text-lg font-medium text-gray-900">Tabela - Total por Forma de Pagamento</h3>
              <p className="text-sm text-gray-500">
                Página {currentPage} de {totalPages}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      MID
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Razão Social
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Última Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Ticket Médio
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Total Débito
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Total Crédito
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Total Parcelado
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[9%]">
                      Pagto. Contas
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Cap. E-commerce
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[11%]">
                      Total Forma Pag.
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((total) => (
                      <tr key={total.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{total.mid}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={total.razaoSocial}>
                          {total.razaoSocial}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{total.ultimaVenda}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.totalDebito.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.totalCredito.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.totalParcelado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.pagtoContas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {total.capEcommerce.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2">
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm font-bold">
                              R$ {total.totalFormaPag.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-3 py-6 text-center text-sm text-gray-500">
                        Nenhum dado encontrado.
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
              currentItems.map((total) => <MobileTotalCard key={total.id} total={total} />)
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum dado encontrado.</div>
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
