"use client"
import { useState, useEffect } from "react"
import type React from "react"

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
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface Relatorio {
  id: string
  numero: number
  tipoArquivo: string
  periodoRemessa: string
  solicitado: string
  disponibilizado: string
  duracao: string
  situacao: "Concluído" | "Processando" | "Erro" | "Pendente"
  linkDownload?: string
}

interface FormData {
  tipoArquivo: string
  dataInicio: string
  dataFim: string
  observacoes: string
}

// Dados de exemplo para os relatórios
const relatoriosData: Relatorio[] = [
  {
    id: "160",
    numero: 160,
    tipoArquivo: "Facilitador - Base Cadastral",
    periodoRemessa: "01/09/2024 a 10/09/2024",
    solicitado: "01/10/2024 15:06:36",
    disponibilizado: "01/10/2024 15:06:36",
    duracao: "0s",
    situacao: "Concluído",
    linkDownload: "#",
  },
  {
    id: "159",
    numero: 159,
    tipoArquivo: "Facilitador - Base Transacional",
    periodoRemessa: "15/08/2024 a 31/08/2024",
    solicitado: "15/09/2024 10:30:22",
    disponibilizado: "15/09/2024 10:32:15",
    duracao: "1m 53s",
    situacao: "Concluído",
    linkDownload: "#",
  },
  {
    id: "158",
    numero: 158,
    tipoArquivo: "Facilitador - Base Cadastral",
    periodoRemessa: "01/08/2024 a 15/08/2024",
    solicitado: "20/08/2024 14:15:30",
    disponibilizado: "",
    duracao: "",
    situacao: "Processando",
  },
  {
    id: "157",
    numero: 157,
    tipoArquivo: "Facilitador - Base Transacional",
    periodoRemessa: "01/07/2024 a 31/07/2024",
    solicitado: "05/08/2024 09:45:12",
    disponibilizado: "",
    duracao: "",
    situacao: "Erro",
  },
  {
    id: "156",
    numero: 156,
    tipoArquivo: "Facilitador - Base Cadastral",
    periodoRemessa: "15/06/2024 a 30/06/2024",
    solicitado: "10/07/2024 16:20:45",
    disponibilizado: "10/07/2024 16:21:02",
    duracao: "17s",
    situacao: "Concluído",
    linkDownload: "#",
  },
  {
    id: "155",
    numero: 155,
    tipoArquivo: "Facilitador - Base Transacional",
    periodoRemessa: "01/06/2024 a 15/06/2024",
    solicitado: "25/06/2024 11:30:18",
    disponibilizado: "",
    duracao: "",
    situacao: "Pendente",
  },
  {
    id: "153",
    numero: 153,
    tipoArquivo: "Facilitador - Base Cadastral",
    periodoRemessa: "01/02/2020 a 01/04/2020",
    solicitado: "22/04/2024 13:42:38",
    disponibilizado: "22/04/2024 13:42:38",
    duracao: "0s",
    situacao: "Concluído",
    linkDownload: "#",
  },
  {
    id: "142",
    numero: 142,
    tipoArquivo: "Facilitador - Base Cadastral",
    periodoRemessa: "10/11/1111 a 11/11/1111",
    solicitado: "10/08/2021 15:13:21",
    disponibilizado: "10/08/2021 15:13:21",
    duracao: "0s",
    situacao: "Concluído",
    linkDownload: "#",
  },
]

// Tipos de arquivo disponíveis
const tiposArquivo = [
  "Facilitador - Base Cadastral",
  "Facilitador - Base Transacional",
  "Facilitador - Base Completa",
  "Facilitador - Movimentação Financeira",
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo de Arquivo</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período da Remessa</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solicitado</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disponibilizado</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duração</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-20 rounded-full" />
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
function MobileRelatorioCard({
  relatorio,
  onView,
  onDelete,
  onDownload,
}: {
  relatorio: Relatorio
  onView: (relatorio: Relatorio) => void
  onDelete: (id: string) => void
  onDownload: (relatorio: Relatorio) => void
}) {
  const getSituacaoIcon = (situacao: string) => {
    switch (situacao) {
      case "Concluído":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Processando":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Erro":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pendente":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Processando":
        return "bg-blue-100 text-blue-800"
      case "Erro":
        return "bg-red-100 text-red-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            #{relatorio.numero} - {relatorio.tipoArquivo}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">Período: {relatorio.periodoRemessa}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex items-center text-xs leading-3 font-medium rounded-full ${getSituacaoColor(
            relatorio.situacao,
          )}`}
        >
          {getSituacaoIcon(relatorio.situacao)}
          <span className="ml-1">{relatorio.situacao}</span>
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Solicitado:</span> {relatorio.solicitado}
        </div>
        {relatorio.disponibilizado && (
          <div className="text-xs text-gray-500">
            <span className="font-medium">Disponibilizado:</span> {relatorio.disponibilizado}
          </div>
        )}
        {relatorio.duracao && (
          <div className="text-xs text-gray-500">
            <span className="font-medium">Duração:</span> {relatorio.duracao}
          </div>
        )}
      </div>

      <div className="flex flex-col xs:flex-row gap-2 mt-3">
        <button
          onClick={() => onView(relatorio)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors w-full xs:w-auto"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
        {relatorio.situacao === "Concluído" && relatorio.linkDownload && (
          <button
            onClick={() => onDownload(relatorio)}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors w-full xs:w-auto"
          >
            <Download className="h-3 w-3 mr-1.5" />
            Download
          </button>
        )}
        <button
          onClick={() => onDelete(relatorio.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors w-full xs:w-auto"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function RelatoriosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [situacaoFilter, setSituacaoFilter] = useState("Todos")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [isLoading, setIsLoading] = useState(true)
  const [isGerarModalOpen, setIsGerarModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRelatorio, setSelectedRelatorio] = useState<Relatorio | null>(null)
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    tipoArquivo: "",
    dataInicio: "",
    dataFim: "",
    observacoes: "",
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(relatorios.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = relatorios.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setRelatorios(relatoriosData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar relatórios com base no termo de pesquisa e filtros
  useEffect(() => {
    let filtered = [...relatoriosData]

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (relatorio) =>
          relatorio.numero.toString().includes(searchTerm) ||
          relatorio.tipoArquivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          relatorio.periodoRemessa.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (situacaoFilter !== "Todos") {
      filtered = filtered.filter((relatorio) => relatorio.situacao === situacaoFilter)
    }

    if (tipoFilter !== "Todos") {
      filtered = filtered.filter((relatorio) => relatorio.tipoArquivo === tipoFilter)
    }

    setRelatorios(filtered)
    setCurrentPage(1)
  }, [searchTerm, situacaoFilter, tipoFilter])

  // Função para visualizar relatório
  const handleViewRelatorio = (relatorio: Relatorio) => {
    setSelectedRelatorio(relatorio)
    setIsViewModalOpen(true)
  }

  // Função para abrir modal de exclusão
  const handleOpenDeleteModal = (id: string) => {
    const relatorio = relatorios.find((r) => r.id === id)
    if (relatorio) {
      setSelectedRelatorio(relatorio)
      setIsDeleteModalOpen(true)
    }
  }

  // Função para fazer download
  const handleDownload = (relatorio: Relatorio) => {
    console.log("Fazendo download do relatório:", relatorio.numero)
    // Implementação futura do download
  }

  // Função para gerar relatório
  const handleGerarRelatorio = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newRelatorio: Relatorio = {
        id: (Math.floor(Math.random() * 100) + 200).toString(),
        numero: Math.floor(Math.random() * 100) + 200,
        tipoArquivo: formData.tipoArquivo,
        periodoRemessa: `${formData.dataInicio} a ${formData.dataFim}`,
        solicitado: new Date().toLocaleString("pt-BR"),
        disponibilizado: "",
        duracao: "",
        situacao: "Processando",
      }

      setRelatorios([newRelatorio, ...relatorios])
      setIsSubmitting(false)
      setIsGerarModalOpen(false)

      // Resetar formulário
      setFormData({
        tipoArquivo: "",
        dataInicio: "",
        dataFim: "",
        observacoes: "",
      })
    }, 1000)
  }

  // Função para excluir relatório
  const handleDeleteRelatorio = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedRelatorio) {
        const updatedRelatorios = relatorios.filter((r) => r.id !== selectedRelatorio.id)
        setRelatorios(updatedRelatorios)
        setIsSubmitting(false)
        setIsDeleteModalOpen(false)
        setSelectedRelatorio(null)
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
      setRelatorios(relatoriosData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  // Função para obter ícone da situação
  const getSituacaoIcon = (situacao: string) => {
    switch (situacao) {
      case "Concluído":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Processando":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Erro":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pendente":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  // Função para obter cor da situação
  const getSituacaoColor = (situacao: string) => {
    switch (situacao) {
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Processando":
        return "bg-blue-100 text-blue-800"
      case "Erro":
        return "bg-red-100 text-red-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Relatórios</h2>
        <p className="text-xs text-gray-500 mb-6">Gerenciamento de Relatórios do Facilitador</p>
      </div>

      {/* Aviso informativo no topo */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-1">Informação importante!</h3>
            <p className="text-sm text-yellow-800">
              Para utilização deste serviço, é necessário informar o código do facilitador em parâmetros.
            </p>
            <p className="text-sm text-yellow-800 mt-2">
              Os arquivos deverão ser transmitidos através do portal:{" "}
              <a
                href="https://www.eloportal.com.br/troca_arquivos/login"
                className="underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.eloportal.com.br/troca_arquivos/login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsGerarModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" /> Gerar Relatório
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
          <h3 className="text-sm font-medium text-gray-700">Aba: Relatórios</h3>
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
              placeholder="Pesquisar por número ou tipo"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div>
            <Select value={situacaoFilter} onValueChange={setSituacaoFilter}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Filtrar por situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas as situações</SelectItem>
                <SelectItem value="Concluído">Concluído</SelectItem>
                <SelectItem value="Processando">Processando</SelectItem>
                <SelectItem value="Erro">Erro</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os tipos</SelectItem>
                {tiposArquivo.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isFilterExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data de Solicitação - De</label>
              <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data de Solicitação - Até</label>
              <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Período da Remessa</label>
              <div className="flex gap-2">
                <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" placeholder="De" />
                <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" placeholder="Até" />
              </div>
            </div>
          </div>
        )}
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
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[6%]">
                    #
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">
                    Tipo de Arquivo
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[18%]">
                    Período da Remessa
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Solicitado
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Disponibilizado
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Duração
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Link / URL
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((relatorio) => (
                    <tr key={relatorio.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{relatorio.numero}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={relatorio.tipoArquivo}>
                        {relatorio.tipoArquivo}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{relatorio.periodoRemessa}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{relatorio.solicitado}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{relatorio.disponibilizado || "-"}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{relatorio.duracao || "-"}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-medium rounded-full ${getSituacaoColor(
                            relatorio.situacao,
                          )}`}
                        >
                          {getSituacaoIcon(relatorio.situacao)}
                          <span className="ml-1">{relatorio.situacao}</span>
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleViewRelatorio(relatorio)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {relatorio.situacao === "Concluído" && relatorio.linkDownload && (
                            <button
                              onClick={() => handleDownload(relatorio)}
                              className="text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 rounded p-1 transition-colors"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenDeleteModal(relatorio.id)}
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
                    <td colSpan={8} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum relatório encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((relatorio) => (
                <MobileRelatorioCard
                  key={relatorio.id}
                  relatorio={relatorio}
                  onView={handleViewRelatorio}
                  onDelete={handleOpenDeleteModal}
                  onDownload={handleDownload}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum relatório encontrado.</div>
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

      {/* Modal: Gerar Relatório */}
      {isGerarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsGerarModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Gerar Relatório</h2>
              <button
                onClick={() => !isSubmitting && setIsGerarModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleGerarRelatorio} className="space-y-4">
                {/* Tipo de Arquivo */}
                <div>
                  <label htmlFor="tipoArquivo" className="text-sm font-medium text-gray-700">
                    Tipo de Arquivo
                  </label>
                  <Select
                    value={formData.tipoArquivo}
                    onValueChange={(value) => setFormData({ ...formData, tipoArquivo: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione o tipo de arquivo..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposArquivo.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data de Início */}
                <div>
                  <label htmlFor="dataInicio" className="text-sm font-medium text-gray-700">
                    Data de Início do Período
                  </label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Data de Fim */}
                <div>
                  <label htmlFor="dataFim" className="text-sm font-medium text-gray-700">
                    Data de Fim do Período
                  </label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Observações */}
                <div>
                  <label htmlFor="observacoes" className="text-sm font-medium text-gray-700">
                    Observações (Opcional)
                  </label>
                  <textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Digite observações sobre o relatório..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsGerarModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Cancelar
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
                      "Gerar Relatório"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Visualizar Relatório */}
      {isViewModalOpen && selectedRelatorio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Detalhes do Relatório</h2>
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
                  <label className="text-sm font-medium text-gray-700">Número do Relatório</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    #{selectedRelatorio.numero}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Tipo de Arquivo</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRelatorio.tipoArquivo}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Período da Remessa</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRelatorio.periodoRemessa}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Data de Solicitação</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRelatorio.solicitado}
                  </div>
                </div>

                {selectedRelatorio.disponibilizado && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Data de Disponibilização</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      {selectedRelatorio.disponibilizado}
                    </div>
                  </div>
                )}

                {selectedRelatorio.duracao && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Duração do Processamento</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      {selectedRelatorio.duracao}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700">Situação</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm">
                    <span
                      className={`px-2 py-1 inline-flex items-center text-xs leading-4 font-medium rounded-full ${getSituacaoColor(
                        selectedRelatorio.situacao,
                      )}`}
                    >
                      {getSituacaoIcon(selectedRelatorio.situacao)}
                      <span className="ml-1">{selectedRelatorio.situacao}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Fechar
                </button>
                {selectedRelatorio.situacao === "Concluído" && selectedRelatorio.linkDownload && (
                  <button
                    onClick={() => handleDownload(selectedRelatorio)}
                    className="px-4 py-2 text-xs sm:text-sm bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 order-1 sm:order-2 flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão */}
      {isDeleteModalOpen && selectedRelatorio && (
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
                      Você está prestes a excluir o relatório{" "}
                      <strong>
                        #{selectedRelatorio.numero} - {selectedRelatorio.tipoArquivo}
                      </strong>
                      . Esta ação não pode ser desfeita.
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
                  onClick={handleDeleteRelatorio}
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
