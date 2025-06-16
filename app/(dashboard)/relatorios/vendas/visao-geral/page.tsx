"use client"
import { useState, useEffect } from "react"
import type React from "react"

import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  FolderSyncIcon as Sync,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  Filter,
  Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface Transacao {
  id: string
  dataHora: string
  split: boolean
  bandeira: string
  nsu: string
  codigoEC: string
  razaoSocial: string
  autorizacao: string
  parcelas: string
  modalidade: string
  valorVenda: number
  valorCancelado: number
  terminal: string
  online: boolean
  captura: string
  situacao: "Aprovada" | "Pendente" | "Negada" | "Estornada"
  bloqueio: string
  resolucao: "Pendente" | "Resolvida" | "Em Análise"
}

interface ResumoVendas {
  aprovadas: {
    valor: number
    quantidade: number
  }
  pendentes: {
    valor: number
    quantidade: number
  }
  negadas: {
    valor: number
    quantidade: number
  }
  estornadas: {
    valor: number
    quantidade: number
  }
  bloqueadas: {
    valor: number
    quantidade: number
  }
}

// Dados de exemplo para as transações
const transacoesData: Transacao[] = [
  {
    id: "1",
    dataHora: "13/06/2025 09:49hs",
    split: false,
    bandeira: "Mastercard",
    nsu: "glC7vb1x1Df1",
    codigoEC: "981295",
    razaoSocial: "Estabelecimento Comercial LTDA",
    autorizacao: "bNOzKa",
    parcelas: "4x",
    modalidade: "Crédito parcelado",
    valorVenda: 1032.0,
    valorCancelado: 0.0,
    terminal: "TEF",
    online: false,
    captura: "CAPTURA_TESTE",
    situacao: "Aprovada",
    bloqueio: "–",
    resolucao: "Pendente",
  },
  {
    id: "2",
    dataHora: "13/06/2025 09:49hs",
    split: false,
    bandeira: "VISA",
    nsu: "AqKZnfRg8jCT",
    codigoEC: "981295",
    razaoSocial: "Estabelecimento Comercial LTDA",
    autorizacao: "9PLbKH",
    parcelas: "10x",
    modalidade: "Crédito parcelado",
    valorVenda: 3866.0,
    valorCancelado: 0.0,
    terminal: "TEF",
    online: false,
    captura: "CAPTURA_TESTE",
    situacao: "Aprovada",
    bloqueio: "–",
    resolucao: "Pendente",
  },
  {
    id: "3",
    dataHora: "13/06/2025 09:49hs",
    split: false,
    bandeira: "VISA",
    nsu: "zNx7q6zc3Pg6",
    codigoEC: "162154",
    razaoSocial: "sdsfdsfd",
    autorizacao: "H1heqZ",
    parcelas: "10x",
    modalidade: "Crédito parcelado",
    valorVenda: 1614.0,
    valorCancelado: 0.0,
    terminal: "TEF",
    online: false,
    captura: "CAPTURA_TESTE",
    situacao: "Aprovada",
    bloqueio: "–",
    resolucao: "Pendente",
  },
  {
    id: "4",
    dataHora: "13/06/2025 09:49hs",
    split: false,
    bandeira: "Mastercard",
    nsu: "TR2H2XLiCySP",
    codigoEC: "981295",
    razaoSocial: "Estabelecimento Comercial LTDA",
    autorizacao: "x1dhVv",
    parcelas: "8x",
    modalidade: "Crédito parcelado",
    valorVenda: 7206.0,
    valorCancelado: 0.0,
    terminal: "TEF",
    online: false,
    captura: "CAPTURA_TESTE",
    situacao: "Aprovada",
    bloqueio: "–",
    resolucao: "Pendente",
  },
]

// Dados do resumo de vendas
const resumoVendasData: ResumoVendas = {
  aprovadas: {
    valor: 1588832.25,
    quantidade: 299,
  },
  pendentes: {
    valor: 0.0,
    quantidade: 0,
  },
  negadas: {
    valor: 0.0,
    quantidade: 0,
  },
  estornadas: {
    valor: 0.0,
    quantidade: 0,
  },
  bloqueadas: {
    valor: 11174.0,
    quantidade: 2,
  },
}

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 17 }).map((_, index) => (
              <th key={index} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 17 }).map((_, colIndex) => (
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, index) => (
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
        <p className="text-sm text-gray-500">{quantidade} VENDAS</p>
      </div>
    </div>
  )
}

// Componente para card mobile de transação
function MobileTransacaoCard({
  transacao,
  onView,
}: {
  transacao: Transacao
  onView: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">NSU: {transacao.nsu}</div>
          <div className="text-xs text-gray-500 mt-1">{transacao.dataHora}</div>
        </div>
        <span
          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
            transacao.situacao === "Aprovada"
              ? "bg-green-100 text-green-800"
              : transacao.situacao === "Pendente"
                ? "bg-yellow-100 text-yellow-800"
                : transacao.situacao === "Negada"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
          }`}
        >
          {transacao.situacao}
        </span>
      </div>

      <div className="space-y-2 mb-3">
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
          <span className="font-medium">Modalidade:</span> {transacao.modalidade}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onView(transacao.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
      </div>
    </div>
  )
}

export default function VendasPage() {
  const [searchNSU, setSearchNSU] = useState("")
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-05-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [resumoVendas, setResumoVendas] = useState<ResumoVendas | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  const itemsPerPage = 10
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
      setTransacoes(transacoesData)
      setResumoVendas(resumoVendasData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar transações com base nos filtros
  useEffect(() => {
    let filtered = [...transacoesData]

    if (searchNSU.trim() !== "") {
      filtered = filtered.filter((t) => t.nsu.toLowerCase().includes(searchNSU.toLowerCase()))
    }

    // Aqui você implementaria outros filtros como unidade e data

    setTransacoes(filtered)
    setCurrentPage(1)
  }, [searchNSU, unidadeSelecionada, dataInicio, dataFim])

  // Função para sincronizar
  const handleSincronizar = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      // Aqui você implementaria a lógica de sincronização
    }, 2000)
  }

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
    console.log("Visualizar detalhes da transação:", id)
    // Implementação futura
  }

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTransacoes(transacoesData)
      setResumoVendas(resumoVendasData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Dashboard de Vendas e Transações</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Aviso informativo no topo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800">
              <span className="font-medium">Acompanhe suas vendas e transações em tempo real.</span> Use os filtros para
              encontrar transações específicas e mantenha seus dados sempre atualizados.
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleSincronizar}
          disabled={isSyncing}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors disabled:opacity-50"
        >
          <Sync className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Sincronizando..." : "Sincronizar"}
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
              placeholder="Pesquisar por NSU"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchNSU}
              onChange={(e) => setSearchNSU(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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

        {isFilterExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data início</label>
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
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data fim</label>
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Situação</label>
              <Select>
                <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Todas as situações" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as situações</SelectItem>
                  <SelectItem value="aprovada">Aprovada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="negada">Negada</SelectItem>
                  <SelectItem value="estornada">Estornada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Resumo de vendas */}
      {isLoading ? (
        <ResumoSkeleton />
      ) : resumoVendas ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResumoCard
            icon={<CheckCircle className="h-5 w-5 text-green-600" />}
            titulo="Vendas Aprovadas"
            valor={resumoVendas.aprovadas.valor}
            quantidade={resumoVendas.aprovadas.quantidade}
            cor="bg-green-100"
          />
          <ResumoCard
            icon={<Clock className="h-5 w-5 text-yellow-600" />}
            titulo="Vendas Pendentes"
            valor={resumoVendas.pendentes.valor}
            quantidade={resumoVendas.pendentes.quantidade}
            cor="bg-yellow-100"
          />
          <ResumoCard
            icon={<XCircle className="h-5 w-5 text-red-600" />}
            titulo="Vendas Negadas"
            valor={resumoVendas.negadas.valor}
            quantidade={resumoVendas.negadas.quantidade}
            cor="bg-red-100"
          />
          <ResumoCard
            icon={<RotateCcw className="h-5 w-5 text-blue-600" />}
            titulo="Devolvida / Estornada"
            valor={resumoVendas.estornadas.valor}
            quantidade={resumoVendas.estornadas.quantidade}
            cor="bg-blue-100"
          />
        </div>
      ) : null}

      {/* Alerta de transações bloqueadas */}
      {resumoVendas && resumoVendas.bloqueadas.quantidade > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-orange-900 mb-1">Transações / Parcelas bloqueadas</h3>
              <p className="text-sm text-orange-800">
                {resumoVendas.bloqueadas.quantidade} transações bloqueadas, no valor de R${" "}
                {resumoVendas.bloqueadas.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      )}

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
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Data e Hora
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[4%]">
                      Split
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Bandeira
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      NSU (DOC/CV)
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Cód. EC
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                      Razão Social
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Autorização
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Parcelas
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                      Modalidade
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                      Valor Venda
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Terminal
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                      Situação
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[5%]"
                    >
                      Detalhes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((transacao) => (
                      <tr key={transacao.id} className="hover:bg-gray-50">
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.dataHora}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.split ? "✓" : "✖"}</td>
                        <td className="px-2 py-2 text-sm text-gray-900">{transacao.bandeira}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.nsu}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.codigoEC}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 truncate" title={transacao.razaoSocial}>
                          {transacao.razaoSocial}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-mono">{transacao.autorizacao}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.parcelas}</td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.modalidade}</td>
                        <td className="px-2 py-2 text-sm text-gray-900 font-medium">
                          R$ {transacao.valorVenda.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-2 py-2 text-sm text-gray-500">{transacao.terminal}</td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                              transacao.situacao === "Aprovada"
                                ? "bg-green-100 text-green-800"
                                : transacao.situacao === "Pendente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : transacao.situacao === "Negada"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {transacao.situacao === "Aprovada" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {transacao.situacao === "Pendente" && <Clock className="h-3 w-3 mr-1" />}
                            {transacao.situacao === "Negada" && <XCircle className="h-3 w-3 mr-1" />}
                            {transacao.situacao === "Estornada" && <RotateCcw className="h-3 w-3 mr-1" />}
                            {transacao.situacao}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button
                            onClick={() => handleViewDetails(transacao.id)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="px-3 py-6 text-center text-sm text-gray-500">
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
              currentItems.map((transacao) => (
                <MobileTransacaoCard key={transacao.id} transacao={transacao} onView={handleViewDetails} />
              ))
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
