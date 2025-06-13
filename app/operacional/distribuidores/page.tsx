"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface Distribuidor {
  id: string
  cpfCnpj: string
  nome: string
  email: string
  telefone: string
  situacao: "Liberado" | "Bloqueado" | "Pendente"
  endereco: {
    cep: string
    rua: string
    bairro: string
    numero: string
    cidade: string
    estado: string
  }
  dataCadastro: string
  visualizarFiltros: boolean
}

interface FormData {
  nome: string
  cpfCnpj: string
  celular: string
  email: string
  cep: string
  rua: string
  bairro: string
  numero: string
  cidade: string
  estado: string
}

interface SyncData {
  dataInicial: string
  periodoInicial: string
  dataFinal: string
  periodoFinal: string
  distribuidor: string
}

// Dados de exemplo para os distribuidores
const distribuidoresData: Distribuidor[] = [
  {
    id: "1906",
    cpfCnpj: "88587218700",
    nome: "Pedro Vendedor",
    email: "pedro@vendedor.com",
    telefone: "27983755711",
    situacao: "Liberado",
    endereco: {
      cep: "29100-000",
      rua: "Rua das Palmeiras",
      bairro: "Centro",
      numero: "123",
      cidade: "Vila Velha",
      estado: "ES",
    },
    dataCadastro: "15/06/2025 10:30:22",
    visualizarFiltros: true,
  },
  {
    id: "1907",
    cpfCnpj: "12345678000195",
    nome: "Maria Distribuidora LTDA",
    email: "contato@mariadist.com.br",
    telefone: "11987654321",
    situacao: "Liberado",
    endereco: {
      cep: "01310-100",
      rua: "Avenida Paulista",
      bairro: "Bela Vista",
      numero: "1000",
      cidade: "São Paulo",
      estado: "SP",
    },
    dataCadastro: "20/06/2025 14:45:18",
    visualizarFiltros: true,
  },
  {
    id: "1908",
    cpfCnpj: "98765432100",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "21999887766",
    situacao: "Bloqueado",
    endereco: {
      cep: "20040-020",
      rua: "Rua da Carioca",
      bairro: "Centro",
      numero: "50",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
    dataCadastro: "01/06/2025 16:22:45",
    visualizarFiltros: false,
  },
  {
    id: "1909",
    cpfCnpj: "11122233000144",
    nome: "Tech Solutions Distribuidora",
    email: "vendas@techsolutions.com",
    telefone: "47988776655",
    situacao: "Liberado",
    endereco: {
      cep: "89010-000",
      rua: "Rua XV de Novembro",
      bairro: "Centro",
      numero: "789",
      cidade: "Blumenau",
      estado: "SC",
    },
    dataCadastro: "10/06/2025 09:15:33",
    visualizarFiltros: true,
  },
  {
    id: "1910",
    cpfCnpj: "55544433322",
    nome: "Ana Costa",
    email: "ana.costa@vendas.com",
    telefone: "85987123456",
    situacao: "Pendente",
    endereco: {
      cep: "60160-230",
      rua: "Avenida Beira Mar",
      bairro: "Meireles",
      numero: "456",
      cidade: "Fortaleza",
      estado: "CE",
    },
    dataCadastro: "15/06/2025 11:10:05",
    visualizarFiltros: false,
  },
]

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF / CNPJ</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-mail</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciar</th>
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
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-16 rounded-full" />
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
function MobileDistribuidorCard({
  distribuidor,
  onEdit,
  onDelete,
}: {
  distribuidor: Distribuidor
  onEdit: (distribuidor: Distribuidor) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            #{distribuidor.id} - {distribuidor.nome}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">CPF/CNPJ: {distribuidor.cpfCnpj}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            distribuidor.situacao === "Liberado"
              ? "bg-green-100 text-green-800"
              : distribuidor.situacao === "Bloqueado"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {distribuidor.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">{distribuidor.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">{distribuidor.telefone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-xs sm:text-sm text-gray-600">
            {distribuidor.endereco.cidade}, {distribuidor.endereco.estado}
          </span>
        </div>
        <div className="text-xs text-gray-500">Cadastro: {distribuidor.dataCadastro}</div>
      </div>

      <div className="flex flex-col xs:flex-row gap-2 mt-3">
        <button
          onClick={() => onEdit(distribuidor)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors w-full xs:w-auto"
        >
          <Edit className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
        <button
          onClick={() => onDelete(distribuidor.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors w-full xs:w-auto"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function DistribuidoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dataInicial, setDataInicial] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDistribuidor, setSelectedDistribuidor] = useState<Distribuidor | null>(null)
  const [distribuidores, setDistribuidores] = useState<Distribuidor[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    cpfCnpj: "",
    celular: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    estado: "",
  })
  const [syncData, setSyncData] = useState<SyncData>({
    dataInicial: "",
    periodoInicial: "",
    dataFinal: "",
    periodoFinal: "",
    distribuidor: "",
  })
  const [distributorSuggestions, setDistributorSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const syncSearchRef = useRef(null)

  const itemsPerPage = 8
  const totalPages = Math.ceil(distribuidores.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = distribuidores.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setDistribuidores(distribuidoresData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar distribuidores com base no termo de pesquisa e período
  useEffect(() => {
    let filtered = [...distribuidoresData]

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (distribuidor) =>
          distribuidor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          distribuidor.cpfCnpj.includes(searchTerm) ||
          distribuidor.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (dataInicial && dataFinal) {
      filtered = filtered.filter((distribuidor) => {
        const dataCadastro = new Date(distribuidor.dataCadastro.split(" ")[0].split("/").reverse().join("-"))
        const inicio = new Date(dataInicial)
        const fim = new Date(dataFinal)
        return dataCadastro >= inicio && dataCadastro <= fim
      })
    }

    setDistribuidores(filtered)
    setCurrentPage(1)
  }, [searchTerm, dataInicial, dataFinal])

  // Função para adicionar novo distribuidor
  const handleAddDistribuidor = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newDistribuidor: Distribuidor = {
        id: (Math.floor(Math.random() * 10) + 1911).toString(),
        cpfCnpj: formData.cpfCnpj,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.celular,
        situacao: "Liberado",
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          bairro: formData.bairro,
          numero: formData.numero,
          cidade: formData.cidade,
          estado: formData.estado,
        },
        dataCadastro: new Date().toLocaleString("pt-BR"),
        visualizarFiltros: true,
      }

      setDistribuidores([newDistribuidor, ...distribuidores])
      setIsSubmitting(false)
      setIsAddModalOpen(false)

      // Resetar formulário
      setFormData({
        nome: "",
        cpfCnpj: "",
        celular: "",
        email: "",
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        estado: "",
      })
    }, 1000)
  }

  // Função para editar distribuidor
  const handleEditDistribuidor = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedDistribuidor) {
        const updatedDistribuidor: Distribuidor = {
          ...selectedDistribuidor,
          nome: formData.nome,
          cpfCnpj: formData.cpfCnpj,
          email: formData.email,
          telefone: formData.celular,
          endereco: {
            cep: formData.cep,
            rua: formData.rua,
            bairro: formData.bairro,
            numero: formData.numero,
            cidade: formData.cidade,
            estado: formData.estado,
          },
        }

        const updatedDistribuidores = distribuidores.map((d) =>
          d.id === selectedDistribuidor.id ? updatedDistribuidor : d,
        )
        setDistribuidores(updatedDistribuidores)
        setIsSubmitting(false)
        setIsEditModalOpen(false)
      }
    }, 1000)
  }

  // Função para abrir modal de edição
  const handleOpenEditModal = (distribuidor: Distribuidor) => {
    setSelectedDistribuidor(distribuidor)
    setFormData({
      nome: distribuidor.nome,
      cpfCnpj: distribuidor.cpfCnpj,
      celular: distribuidor.telefone,
      email: distribuidor.email,
      cep: distribuidor.endereco.cep,
      rua: distribuidor.endereco.rua,
      bairro: distribuidor.endereco.bairro,
      numero: distribuidor.endereco.numero,
      cidade: distribuidor.endereco.cidade,
      estado: distribuidor.endereco.estado,
    })
    setIsEditModalOpen(true)
  }

  // Função para abrir modal de exclusão
  const handleOpenDeleteModal = (id: string) => {
    const distribuidor = distribuidores.find((d) => d.id === id)
    if (distribuidor) {
      setSelectedDistribuidor(distribuidor)
      setIsDeleteModalOpen(true)
    }
  }

  // Função para excluir distribuidor
  const handleDeleteDistribuidor = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedDistribuidor) {
        const updatedDistribuidores = distribuidores.filter((d) => d.id !== selectedDistribuidor.id)
        setDistribuidores(updatedDistribuidores)
        setIsSubmitting(false)
        setIsDeleteModalOpen(false)
        setSelectedDistribuidor(null)
      }
    }, 1000)
  }

  // Função para sincronizar
  const handleSyncronize = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSyncModalOpen(false)
      setSyncData({
        dataInicial: "",
        periodoInicial: "",
        dataFinal: "",
        periodoFinal: "",
        distribuidor: "",
      })
    }, 3000)
  }

  // Função para busca de distribuidor - agora filtra da tabela atual
  const handleDistributorSearchSuggestions = (value: string) => {
    setSyncData({ ...syncData, distribuidor: value })
    if (value.length > 2) {
      // Filtrar dos distribuidores atuais (que já estão filtrados pela busca principal)
      const filtered = distribuidores
        .filter(
          (distribuidor) =>
            distribuidor.nome.toLowerCase().includes(value.toLowerCase()) ||
            distribuidor.cpfCnpj.includes(value) ||
            distribuidor.id.includes(value),
        )
        .map((distribuidor) => `[${distribuidor.id}] ${distribuidor.nome} - CPF/CNPJ: ${distribuidor.cpfCnpj}`)
        .slice(0, 5) // Limitar a 5 sugestões para não sobrecarregar a UI

      setDistributorSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
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
      setDistribuidores(distribuidoresData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  // Hook para detectar cliques fora do componente de sugestões do modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (syncSearchRef.current && !(syncSearchRef.current as HTMLElement).contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Função para filtrar sugestões de distribuidores com base no termo de pesquisa
  const filterDistributorSuggestions = (term: string): string[] => {
    const lowerTerm = term.toLowerCase()
    return distribuidores
      .filter(
        (distribuidor) =>
          distribuidor.id.includes(lowerTerm) ||
          distribuidor.nome.toLowerCase().includes(lowerTerm) ||
          distribuidor.cpfCnpj.includes(lowerTerm),
      )
      .map((distribuidor) => `[${distribuidor.id}] ${distribuidor.nome} - CPF/CNPJ: ${distribuidor.cpfCnpj}`)
      .slice(0, 5)
  }

  // Função para lidar com mudanças no campo de pesquisa de distribuidor
  const handleDistributorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSyncData({ ...syncData, distribuidor: term })

    if (term.trim()) {
      const filtered = filterDistributorSuggestions(term)
      setDistributorSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setDistributorSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Função para selecionar uma sugestão de distribuidor
  const handleSelectDistributorSuggestion = (suggestion: string) => {
    setSyncData({ ...syncData, distribuidor: suggestion })
    setShowSuggestions(false)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Distribuidores</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Botão Adicionar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar
        </button>
      </div>

      {/* Filtros e Ações */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros e Pesquisa</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por código ou nome"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div>
            <Input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Data Inicial"
            />
          </div>

          <div>
            <Input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Data Final"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </button>

          <button
            onClick={() => setIsSyncModalOpen(true)}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Sincronizar
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
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[8%]">
                    #
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    CPF / CNPJ
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">
                    Nome
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">
                    E-mail
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    Telefone
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Gerenciar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((distribuidor) => (
                    <tr key={distribuidor.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{distribuidor.id}</td>
                      <td className="px-2 py-2 text-sm text-gray-900">{distribuidor.cpfCnpj}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={distribuidor.nome}>
                        {distribuidor.nome}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 truncate" title={distribuidor.email}>
                        {distribuidor.email}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{distribuidor.telefone}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            distribuidor.situacao === "Liberado"
                              ? "bg-green-100 text-green-800"
                              : distribuidor.situacao === "Bloqueado"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {distribuidor.situacao}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(distribuidor)}
                            className="text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(distribuidor.id)}
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
                    <td colSpan={7} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum distribuidor encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((distribuidor) => (
                <MobileDistribuidorCard
                  key={distribuidor.id}
                  distribuidor={distribuidor}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum distribuidor encontrado.</div>
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

      {/* Modal: Cadastrar Distribuidor */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastrar Distribuidor</h2>
              <button
                onClick={() => !isSubmitting && setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Aviso Importante!</h3>
                    <p className="text-sm text-blue-700">
                      Você poderá configurar as opções de pagamento após o cadastro.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddDistribuidor} className="space-y-4">
                {/* Nome / Razão Social */}
                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome / Razão Social
                  </label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o nome ou razão social"
                    required
                  />
                </div>

                {/* CPF / CNPJ */}
                <div>
                  <label htmlFor="cpfCnpj" className="text-sm font-medium text-gray-700">
                    CPF / CNPJ
                  </label>
                  <Input
                    id="cpfCnpj"
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o CPF ou CNPJ"
                    required
                  />
                </div>

                {/* Celular */}
                <div>
                  <label htmlFor="celular" className="text-sm font-medium text-gray-700">
                    Celular
                  </label>
                  <Input
                    id="celular"
                    type="text"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o celular"
                    required
                  />
                </div>

                {/* Endereço de E-mail */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Endereço de E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o e-mail"
                    required
                  />
                </div>

                {/* Endereço Comercial */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Endereço Comercial</label>

                  {/* CEP */}
                  <div>
                    <label htmlFor="cep" className="text-sm font-medium text-gray-700">
                      CEP
                    </label>
                    <Input
                      id="cep"
                      type="text"
                      value={formData.cep}
                      onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="00000-000"
                    />
                  </div>

                  {/* Rua / Avenida */}
                  <div>
                    <label htmlFor="rua" className="text-sm font-medium text-gray-700">
                      Rua / Avenida
                    </label>
                    <Input
                      id="rua"
                      type="text"
                      value={formData.rua}
                      onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite a rua ou avenida"
                    />
                  </div>

                  {/* Bairro */}
                  <div>
                    <label htmlFor="bairro" className="text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <Input
                      id="bairro"
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite o bairro"
                    />
                  </div>

                  {/* Número */}
                  <div>
                    <label htmlFor="numero" className="text-sm font-medium text-gray-700">
                      Número
                    </label>
                    <Input
                      id="numero"
                      type="text"
                      value={formData.numero}
                      onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Nº"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label htmlFor="cidade" className="text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <Input
                      id="cidade"
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite a cidade"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <Select
                      value={formData.estado}
                      onValueChange={(value) => setFormData({ ...formData, estado: value })}
                    >
                      <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {estados.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsAddModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
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
                      "Salvar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Sincronização */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsSyncModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Sincronização de Venda(s) para Distribuidores
              </h2>
              <button
                onClick={() => !isSubmitting && setIsSyncModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900 mb-1">Atenção!</h3>
                    <p className="text-sm text-red-800">
                      Pode ocorrer de distribuidores/vendedores não estarem vinculados a estabelecimentos.
                      <br />A sincronização poderá demorar vários minutos, dependendo da quantidade de registros.
                      <br />
                      Distribuidores sincronizados não poderão ser sincronizados novamente.
                      <br />
                      Certifique-se de que as taxas/spreads estejam corretamente configuradas.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSyncronize} className="space-y-4">
                {/* Data Inicial */}
                <div>
                  <label htmlFor="syncDataInicial" className="text-sm font-medium text-gray-700">
                    Data Inicial
                  </label>
                  <Input
                    id="syncDataInicial"
                    type="date"
                    value={syncData.dataInicial}
                    onChange={(e) => setSyncData({ ...syncData, dataInicial: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                </div>

                {/* Período Inicial */}
                <div>
                  <label htmlFor="syncPeriodoInicial" className="text-sm font-medium text-gray-700">
                    Período Inicial
                  </label>
                  <Input
                    id="syncPeriodoInicial"
                    type="time"
                    value={syncData.periodoInicial}
                    onChange={(e) => setSyncData({ ...syncData, periodoInicial: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                </div>

                {/* Data Final */}
                <div>
                  <label htmlFor="syncDataFinal" className="text-sm font-medium text-gray-700">
                    Data Final
                  </label>
                  <Input
                    id="syncDataFinal"
                    type="date"
                    value={syncData.dataFinal}
                    onChange={(e) => setSyncData({ ...syncData, dataFinal: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                </div>

                {/* Período Final */}
                <div>
                  <label htmlFor="syncPeriodoFinal" className="text-sm font-medium text-gray-700">
                    Período Final
                  </label>
                  <Input
                    id="syncPeriodoFinal"
                    type="time"
                    value={syncData.periodoFinal}
                    onChange={(e) => setSyncData({ ...syncData, periodoFinal: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                </div>

                {/* Distribuidor / Vendedor */}
                <div className="relative" ref={syncSearchRef}>
                  <label htmlFor="distribuidor" className="text-sm font-medium text-gray-700">
                    Distribuidor / Vendedor (opcional)
                  </label>
                  <Input
                    id="distribuidor"
                    placeholder="Pesquisar por código, nome ou CPF/CNPJ..."
                    value={syncData.distribuidor}
                    onChange={handleDistributorSearch}
                    onFocus={() => syncData.distribuidor.trim() && setShowSuggestions(true)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                  {showSuggestions && distributorSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {distributorSuggestions.map((sugestao, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSelectDistributorSuggestion(sugestao)}
                        >
                          {sugestao}
                        </div>
                      ))}
                    </div>
                  )}
                  {showSuggestions && distributorSuggestions.length === 0 && syncData.distribuidor.trim() && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      <div className="px-3 py-2 text-sm text-gray-500">Nenhum distribuidor encontrado</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsSyncModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sincronizando...
                      </>
                    ) : (
                      "Sincronizar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Alterar Distribuidor */}
      {isEditModalOpen && selectedDistribuidor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsEditModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Alterar Distribuidor</h2>
              <button
                onClick={() => !isSubmitting && setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleEditDistribuidor} className="space-y-4">
                {/* Nome / Razão Social */}
                <div>
                  <label htmlFor="editNome" className="text-sm font-medium text-gray-700">
                    Nome / Razão Social
                  </label>
                  <Input
                    id="editNome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o nome ou razão social"
                    required
                  />
                </div>

                {/* CPF / CNPJ */}
                <div>
                  <label htmlFor="editCpfCnpj" className="text-sm font-medium text-gray-700">
                    CPF / CNPJ
                  </label>
                  <Input
                    id="editCpfCnpj"
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o CPF ou CNPJ"
                    required
                  />
                </div>

                {/* Celular */}
                <div>
                  <label htmlFor="editCelular" className="text-sm font-medium text-gray-700">
                    Celular
                  </label>
                  <Input
                    id="editCelular"
                    type="text"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o celular"
                    required
                  />
                </div>

                {/* Endereço de E-mail */}
                <div>
                  <label htmlFor="editEmail" className="text-sm font-medium text-gray-700">
                    Endereço de E-mail
                  </label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Digite o e-mail"
                    required
                  />
                </div>

                {/* Endereço Comercial */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Endereço Comercial</label>

                  {/* CEP */}
                  <div>
                    <label htmlFor="editCep" className="text-sm font-medium text-gray-700">
                      CEP
                    </label>
                    <Input
                      id="editCep"
                      type="text"
                      value={formData.cep}
                      onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="00000-000"
                    />
                  </div>

                  {/* Rua / Avenida */}
                  <div>
                    <label htmlFor="editRua" className="text-sm font-medium text-gray-700">
                      Rua / Avenida
                    </label>
                    <Input
                      id="editRua"
                      type="text"
                      value={formData.rua}
                      onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite a rua ou avenida"
                    />
                  </div>

                  {/* Bairro */}
                  <div>
                    <label htmlFor="editBairro" className="text-sm font-medium text-gray-700">
                      Bairro
                    </label>
                    <Input
                      id="editBairro"
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite o bairro"
                    />
                  </div>

                  {/* Número */}
                  <div>
                    <label htmlFor="editNumero" className="text-sm font-medium text-gray-700">
                      Número
                    </label>
                    <Input
                      id="editNumero"
                      type="text"
                      value={formData.numero}
                      onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Nº"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label htmlFor="editCidade" className="text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <Input
                      id="editCidade"
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite a cidade"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label htmlFor="editEstado" className="text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <Select
                      value={formData.estado}
                      onValueChange={(value) => setFormData({ ...formData, estado: value })}
                    >
                      <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {estados.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsEditModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
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
                      "Atualizar Dados"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão */}
      {isDeleteModalOpen && selectedDistribuidor && (
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
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900 mb-1">Atenção!</h3>
                    <p className="text-sm text-red-800">
                      Você está prestes a excluir o distribuidor <strong>{selectedDistribuidor.nome}</strong>. Esta ação
                      não pode ser desfeita.
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
                  onClick={handleDeleteDistribuidor}
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
