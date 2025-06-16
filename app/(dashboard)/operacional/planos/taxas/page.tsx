"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import {
  Search,
  AlertCircle,
  Plus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Download,
  Settings,
  Edit,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Definição de interfaces para tipagem
interface Plano {
  id: string
  nome: string
  limiteMaximo: number
  descricao: string
  situacao: "Ativo" | "Inativo"
  dataCadastro: string
  estabelecimentosVinculados: Estabelecimento[]
  periodoValidade: boolean
  habilitado: boolean
}

interface Estabelecimento {
  mid: string
  nome: string
  cpfCnpj: string
}

interface FormData {
  nome: string
  limiteMaximo: string
  descricao: string
  periodoValidade: boolean
  habilitado: boolean
}

// Dados de exemplo para os planos
const planosData: Plano[] = [
  {
    id: "7502",
    nome: "Testemarcos",
    limiteMaximo: 12,
    descricao: "Teste Marcos",
    situacao: "Ativo",
    dataCadastro: "27/05/2025 08:53:27",
    estabelecimentosVinculados: [
      {
        mid: "990571",
        nome: "Matheus E Rita Casa Noturna Me",
        cpfCnpj: "63250605000150",
      },
    ],
    periodoValidade: false,
    habilitado: true,
  },
  {
    id: "7501",
    nome: "Plano Premium",
    limiteMaximo: 50,
    descricao: "Plano para grandes empresas",
    situacao: "Ativo",
    dataCadastro: "25/05/2025 14:22:10",
    estabelecimentosVinculados: [],
    periodoValidade: true,
    habilitado: true,
  },
  {
    id: "7500",
    nome: "Plano Básico",
    limiteMaximo: 5,
    descricao: "Plano para pequenas empresas",
    situacao: "Inativo",
    dataCadastro: "20/05/2025 09:15:33",
    estabelecimentosVinculados: [
      {
        mid: "990184",
        nome: "Geraldo Bruno Caio Figueiredo",
        cpfCnpj: "74164798351",
      },
      {
        mid: "989796",
        nome: "Ayla E Leandro Assessoria Jurídica",
        cpfCnpj: "21807398000142",
      },
    ],
    periodoValidade: false,
    habilitado: false,
  },
]

// Dados de exemplo para sugestões de estabelecimentos
const estabelecimentosSugestoes: Estabelecimento[] = [
  {
    mid: "990571",
    nome: "Matheus E Rita Casa Noturna Me",
    cpfCnpj: "63250605000150",
  },
  {
    mid: "990184",
    nome: "Geraldo Bruno Caio Figueiredo",
    cpfCnpj: "74164798351",
  },
  {
    mid: "989796",
    nome: "Ayla E Leandro Assessoria Jurídica",
    cpfCnpj: "21807398000142",
  },
  {
    mid: "989123",
    nome: "Farmácia São João LTDA",
    cpfCnpj: "12345678000190",
  },
  {
    mid: "988456",
    nome: "Restaurante Sabor & Arte",
    cpfCnpj: "98765432000121",
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Limite Máx</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estabelecimento(s)</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taxas</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de Cadastro</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-20 rounded" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-20 rounded" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-16 rounded-full" />
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
      {Array.from({ length: 2 }).map((_, index) => (
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
function MobilePlanoCard({
  plano,
  onView,
  onEdit,
  onDelete,
  onConfigureTaxas,
}: {
  plano: Plano
  onView: (plano: Plano) => void
  onEdit: (plano: Plano) => void
  onDelete: (id: string) => void
  onConfigureTaxas: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            #{plano.id} - {plano.nome}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">Limite: {plano.limiteMaximo} ECs</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            plano.situacao === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {plano.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs sm:text-sm text-gray-900 line-clamp-2">{plano.descricao}</div>
        <div className="text-xs text-gray-500">Estabelecimentos: {plano.estabelecimentosVinculados.length}</div>
        <div className="text-xs text-gray-500">Cadastro: {plano.dataCadastro}</div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={() => onView(plano)}
          className="px-2 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
        >
          <Eye className="h-3 w-3 inline mr-1" />
          Estabelecimentos
        </button>
        <button
          onClick={() => onConfigureTaxas(plano.id)}
          className="px-2 py-1 text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 rounded transition-colors"
        >
          <Settings className="h-3 w-3 inline mr-1" />
          Taxas
        </button>
        <button
          onClick={() => onEdit(plano)}
          className="px-2 py-1 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors"
        >
          <Edit className="h-3 w-3 inline mr-1" />
          Alterar
        </button>
        <button
          onClick={() => onDelete(plano.id)}
          className="px-2 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
          disabled={plano.estabelecimentosVinculados.length > 0}
        >
          <Trash2 className="h-3 w-3 inline mr-1" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function PlanosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null)
  const [planos, setPlanos] = useState<Plano[]>([])
  const [searchEstabelecimentoTerm, setSearchEstabelecimentoTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<Estabelecimento[]>(estabelecimentosSugestoes)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    limiteMaximo: "",
    descricao: "",
    periodoValidade: false,
    habilitado: true,
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(planos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = planos.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setPlanos(planosData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar planos com base no termo de pesquisa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setPlanos(planosData)
      return
    }

    const filtered = planosData.filter(
      (plano) =>
        plano.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plano.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plano.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setPlanos(filtered)
    setCurrentPage(1)
  }, [searchTerm])

  // Função para filtrar sugestões de estabelecimentos
  const filterSuggestions = (term: string): Estabelecimento[] => {
    const lowerTerm = term.toLowerCase()
    return estabelecimentosSugestoes.filter(
      (est) =>
        est.mid.includes(lowerTerm) || est.nome.toLowerCase().includes(lowerTerm) || est.cpfCnpj.includes(lowerTerm),
    )
  }

  // Função para lidar com mudanças no campo de pesquisa de estabelecimentos
  const handleSearchEstabelecimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchEstabelecimentoTerm(term)

    if (term.trim()) {
      const filtered = filterSuggestions(term)
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSuggestions(estabelecimentosSugestoes)
      setShowSuggestions(false)
    }
  }

  // Função para selecionar uma sugestão de estabelecimento
  const handleSelectSuggestion = (suggestion: Estabelecimento) => {
    if (selectedPlano && !selectedPlano.estabelecimentosVinculados.some((est) => est.mid === suggestion.mid)) {
      const updatedPlano = {
        ...selectedPlano,
        estabelecimentosVinculados: [...selectedPlano.estabelecimentosVinculados, suggestion],
      }
      setSelectedPlano(updatedPlano)

      // Atualizar o plano na lista de planos
      const updatedPlanos = planos.map((p) => (p.id === selectedPlano.id ? updatedPlano : p))
      setPlanos(updatedPlanos)
    }

    setSearchEstabelecimentoTerm("")
    setShowSuggestions(false)
  }

  // Função para desvincular estabelecimento
  const handleDesvincularEstabelecimento = (planoId: string, midEstabelecimento: string) => {
    if (selectedPlano && selectedPlano.id === planoId) {
      const updatedEstabelecimentos = selectedPlano.estabelecimentosVinculados.filter(
        (est) => est.mid !== midEstabelecimento,
      )

      const updatedPlano = {
        ...selectedPlano,
        estabelecimentosVinculados: updatedEstabelecimentos,
      }

      setSelectedPlano(updatedPlano)

      // Atualizar o plano na lista de planos
      const updatedPlanos = planos.map((p) => (p.id === planoId ? updatedPlano : p))
      setPlanos(updatedPlanos)
    }
  }

  // Função para adicionar novo plano
  const handleAddPlano = (e: React.FormEvent) => {
    e.preventDefault()

    const newPlano: Plano = {
      id: (Math.floor(Math.random() * 1000) + 8000).toString(),
      nome: formData.nome,
      limiteMaximo: Number.parseInt(formData.limiteMaximo) || 0,
      descricao: formData.descricao,
      situacao: formData.habilitado ? "Ativo" : "Inativo",
      dataCadastro: new Date().toLocaleString("pt-BR"),
      estabelecimentosVinculados: [],
      periodoValidade: formData.periodoValidade,
      habilitado: formData.habilitado,
    }

    setPlanos([newPlano, ...planos])
    setIsAddModalOpen(false)

    // Resetar formulário
    setFormData({
      nome: "",
      limiteMaximo: "",
      descricao: "",
      periodoValidade: false,
      habilitado: true,
    })
  }

  // Função para editar plano
  const handleEditPlano = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedPlano) {
      const updatedPlano: Plano = {
        ...selectedPlano,
        nome: formData.nome,
        limiteMaximo: Number.parseInt(formData.limiteMaximo) || 0,
        descricao: formData.descricao,
        situacao: formData.habilitado ? "Ativo" : "Inativo",
        periodoValidade: formData.periodoValidade,
        habilitado: formData.habilitado,
      }

      const updatedPlanos = planos.map((p) => (p.id === selectedPlano.id ? updatedPlano : p))
      setPlanos(updatedPlanos)
      setIsEditModalOpen(false)
    }
  }

  // Função para visualizar estabelecimentos vinculados
  const handleViewEstabelecimentos = (plano: Plano) => {
    setSelectedPlano(plano)
    setIsViewModalOpen(true)
  }

  // Função para abrir modal de edição
  const handleOpenEditModal = (plano: Plano) => {
    setSelectedPlano(plano)
    setFormData({
      nome: plano.nome,
      limiteMaximo: plano.limiteMaximo.toString(),
      descricao: plano.descricao,
      periodoValidade: plano.periodoValidade,
      habilitado: plano.habilitado,
    })
    setIsEditModalOpen(true)
  }

  // Função para excluir plano
  const handleDeletePlano = (id: string) => {
    const planoToDelete = planos.find((p) => p.id === id)

    if (planoToDelete && planoToDelete.estabelecimentosVinculados.length > 0) {
      alert("Não é possível excluir um plano que tenha estabelecimentos vinculados.")
      return
    }

    const updatedPlanos = planos.filter((p) => p.id !== id)
    setPlanos(updatedPlanos)
  }

  // Função para configurar taxas
  const handleConfigureTaxas = (id: string) => {
    console.log("Configurar taxas para o plano:", id)
    // Implementação futura
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
      setPlanos(planosData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  const searchRef = useRef(null)

  // Hook para detectar cliques fora do componente de sugestões
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="bg-white min-h-screen">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Planos</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Aviso fixo no topo */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 sticky top-0 z-10">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-orange-900 mb-1">Aviso Importante!</h3>
            <p className="text-sm text-orange-800">
              Não é possível excluir um plano que tenha estabelecimentos vinculados.
            </p>
          </div>
        </div>
      </div>

      {/* Botão Adicionar Novo Plano */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar Novo Plano
        </button>
      </div>

      {/* Filtros e Ações */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Pesquisar por ID, Nome, Descrição"
            className="pl-8 pr-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
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
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[5%]">
                    #
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Plano
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Limite Máx
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">
                    Descrição
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    Estabelecimento(s)
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Taxas
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[14%]">
                    Data de Cadastro
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((plano) => (
                    <tr key={plano.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{plano.id}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={plano.nome}>
                        {plano.nome}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{plano.limiteMaximo}</td>
                      <td className="px-2 py-2 text-sm text-gray-500 truncate" title={plano.descricao}>
                        {plano.descricao}
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleViewEstabelecimentos(plano)}
                          className="px-2 py-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                        >
                          <Eye className="h-3 w-3 inline mr-1" />
                          Visualizar ({plano.estabelecimentosVinculados.length})
                        </button>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleConfigureTaxas(plano.id)}
                          className="px-2 py-1 text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 rounded transition-colors"
                        >
                          <Settings className="h-3 w-3 inline mr-1" />
                          Configurar
                        </button>
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            plano.situacao === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {plano.situacao}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{plano.dataCadastro}</td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(plano)}
                            className="text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 rounded p-1 transition-colors"
                            title="Alterar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePlano(plano.id)}
                            className={`text-red-600 hover:text-red-900 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-1 transition-colors ${
                              plano.estabelecimentosVinculados.length > 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            title="Excluir"
                            disabled={plano.estabelecimentosVinculados.length > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum plano encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((plano) => (
                <MobilePlanoCard
                  key={plano.id}
                  plano={plano}
                  onView={handleViewEstabelecimentos}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeletePlano}
                  onConfigureTaxas={handleConfigureTaxas}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum plano encontrado.</div>
            )}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <nav className="flex items-center justify-between pt-4" aria-label="Pagination">
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

      {/* Modal: Adicionar Plano */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastrar Plano</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleAddPlano} className="space-y-4">
                {/* Nome do Plano */}
                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome do Plano
                  </label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe o nome do plano"
                    required
                  />
                </div>

                {/* Limite Máximo de Estabelecimentos */}
                <div>
                  <label htmlFor="limiteMaximo" className="text-sm font-medium text-gray-700">
                    Limite Máximo de Estabelecimentos (ECs)
                  </label>
                  <Input
                    id="limiteMaximo"
                    type="number"
                    value={formData.limiteMaximo}
                    onChange={(e) => setFormData({ ...formData, limiteMaximo: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                {/* Período de validade */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="periodoValidade"
                    checked={formData.periodoValidade}
                    onCheckedChange={(checked) => setFormData({ ...formData, periodoValidade: checked === true })}
                  />
                  <Label htmlFor="periodoValidade" className="text-sm font-medium text-gray-700">
                    Quero definir um período de validade no plano
                  </Label>
                </div>

                {/* Descrição */}
                <div>
                  <label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent min-h-[100px]"
                    placeholder="Descreva uma informação sobre este Plano"
                  />
                  <p className="text-xs text-gray-500 mt-1">Descreva uma informação sobre este Plano</p>
                </div>

                {/* Habilitar plano */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="habilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                  />
                  <Label htmlFor="habilitado" className="text-sm font-medium text-gray-700">
                    Quero habilitar este plano para utilização após o cadastro
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Editar Plano */}
      {isEditModalOpen && selectedPlano && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Alterar Plano</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleEditPlano} className="space-y-4">
                {/* Nome do Plano */}
                <div>
                  <label htmlFor="editNome" className="text-sm font-medium text-gray-700">
                    Nome do Plano
                  </label>
                  <Input
                    id="editNome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe o nome do plano"
                    required
                  />
                </div>

                {/* Limite Máximo de Estabelecimentos */}
                <div>
                  <label htmlFor="editLimiteMaximo" className="text-sm font-medium text-gray-700">
                    Limite Máximo de Estabelecimentos (ECs)
                  </label>
                  <Input
                    id="editLimiteMaximo"
                    type="number"
                    value={formData.limiteMaximo}
                    onChange={(e) => setFormData({ ...formData, limiteMaximo: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                {/* Período de validade */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editPeriodoValidade"
                    checked={formData.periodoValidade}
                    onCheckedChange={(checked) => setFormData({ ...formData, periodoValidade: checked === true })}
                  />
                  <Label htmlFor="editPeriodoValidade" className="text-sm font-medium text-gray-700">
                    Período de validade
                  </Label>
                </div>

                {/* Descrição */}
                <div>
                  <label htmlFor="editDescricao" className="text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <Textarea
                    id="editDescricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent min-h-[100px]"
                    placeholder="Descreva uma informação sobre este Plano"
                  />
                </div>

                {/* Habilitar plano */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editHabilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                  />
                  <Label htmlFor="editHabilitado" className="text-sm font-medium text-gray-700">
                    Plano habilitado
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                  >
                    Atualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Visualizar Estabelecimentos */}
      {isViewModalOpen && selectedPlano && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Vincular EC</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Campo de busca para estabelecimentos */}
              <div className="relative" ref={searchRef}>
                <Input
                  type="text"
                  placeholder="Pesquisar estabelecimento..."
                  className="pl-8 pr-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
                  value={searchEstabelecimentoTerm}
                  onChange={handleSearchEstabelecimentoChange}
                  onFocus={() => searchEstabelecimentoTerm.trim() && setShowSuggestions(true)}
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                {/* Lista de sugestões filtradas */}
                {showSuggestions && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredSuggestions.length > 0 ? (
                      <ul className="py-1">
                        {filteredSuggestions.map((suggestion) => (
                          <li
                            key={suggestion.mid}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => handleSelectSuggestion(suggestion)}
                          >
                            <div className="font-medium">MID: {suggestion.mid}</div>
                            <div className="text-sm">Nome: {suggestion.nome}</div>
                            <div className="text-xs text-gray-500">CPF/CNPJ: {suggestion.cpfCnpj}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">Nenhum estabelecimento encontrado</div>
                    )}
                  </div>
                )}
              </div>

              {/* Tabela de estabelecimentos vinculados */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  {selectedPlano.estabelecimentosVinculados.length > 0
                    ? `${selectedPlano.estabelecimentosVinculados.length} Estabelecimento(s) vinculado(s):`
                    : "Estabelecimento(s) vinculado(s)"}
                </h3>

                {selectedPlano.estabelecimentosVinculados.length > 0 ? (
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Estabelecimento(s) vinculado(s)
                          </th>
                          <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                            Gerenciamento
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedPlano.estabelecimentosVinculados.map((est) => (
                          <tr key={est.mid} className="hover:bg-gray-50">
                            <td className="px-3 py-3">
                              <div className="text-sm font-medium text-gray-900">
                                [{est.mid}] {est.nome}
                              </div>
                              <div className="text-xs text-gray-500">CPF/CNPJ: {est.cpfCnpj}</div>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                                  title="Visualizar"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDesvincularEstabelecimento(selectedPlano.id, est.mid)}
                                  className="text-red-600 hover:text-red-900 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-1 transition-colors"
                                  title="Desvincular"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-gray-500 border border-gray-200 rounded-md">
                    Nenhum Estabelecimento vinculado até o momento.
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-medium rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169BFF]"
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
