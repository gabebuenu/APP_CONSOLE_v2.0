"use client"
import { useState, useEffect } from "react"
import type React from "react"

import {
  Search,
  Plus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface Banco {
  id: string
  codigo: string
  ispb: string
  nome: string
  tarifaDocTed: number
  situacao: "Habilitado" | "Bloqueado"
  dataCadastro: string
  visualizarFiltros: boolean
}

interface FormData {
  ispb: string
  codigo: string
  nome: string
  tarifaDocTed: string
  habilitado: boolean
  visualizarFiltros: boolean
}

// Dados de exemplo para os bancos
const bancosData: Banco[] = [
  {
    id: "1",
    codigo: "001",
    ispb: "00000000",
    nome: "BANCO DO BRASIL S.A",
    tarifaDocTed: 3.5,
    situacao: "Habilitado",
    dataCadastro: "06/03/2019 06:31:21",
    visualizarFiltros: true,
  },
  {
    id: "2",
    codigo: "033",
    ispb: "90400888",
    nome: "BANCO SANTANDER (BRASIL) S.A.",
    tarifaDocTed: 4.0,
    situacao: "Habilitado",
    dataCadastro: "06/03/2019 06:31:21",
    visualizarFiltros: true,
  },
  {
    id: "3",
    codigo: "104",
    ispb: "00360305",
    nome: "CAIXA ECONOMICA FEDERAL",
    tarifaDocTed: 3.0,
    situacao: "Habilitado",
    dataCadastro: "06/03/2019 06:31:21",
    visualizarFiltros: true,
  },
  {
    id: "4",
    codigo: "237",
    ispb: "60746948",
    nome: "BANCO BRADESCO S.A.",
    tarifaDocTed: 4.5,
    situacao: "Habilitado",
    dataCadastro: "06/03/2019 06:31:21",
    visualizarFiltros: true,
  },
  {
    id: "5",
    codigo: "341",
    ispb: "60701190",
    nome: "ITAÚ UNIBANCO S.A.",
    tarifaDocTed: 4.0,
    situacao: "Habilitado",
    dataCadastro: "06/03/2019 06:31:21",
    visualizarFiltros: true,
  },
  {
    id: "6",
    codigo: "077",
    ispb: "00416968",
    nome: "BANCO INTER S.A.",
    tarifaDocTed: 0.0,
    situacao: "Habilitado",
    dataCadastro: "10/05/2020 14:22:45",
    visualizarFiltros: true,
  },
  {
    id: "7",
    codigo: "260",
    ispb: "18236120",
    nome: "NU PAGAMENTOS S.A.",
    tarifaDocTed: 0.0,
    situacao: "Habilitado",
    dataCadastro: "15/08/2020 09:15:33",
    visualizarFiltros: true,
  },
  {
    id: "8",
    codigo: "336",
    ispb: "17351180",
    nome: "BANCO C6 S.A.",
    tarifaDocTed: 0.0,
    situacao: "Bloqueado",
    dataCadastro: "22/10/2020 16:40:12",
    visualizarFiltros: false,
  },
  {
    id: "9",
    codigo: "655",
    ispb: "60872504",
    nome: "BANCO VOTORANTIM S.A.",
    tarifaDocTed: 3.8,
    situacao: "Bloqueado",
    dataCadastro: "05/12/2020 08:55:17",
    visualizarFiltros: false,
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cód.</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">ISPB</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instituição</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarifa DOC / TED</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de Cadastro</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-6 w-20 rounded-full" />
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
function MobileBancoCard({
  banco,
  onView,
  onDelete,
}: {
  banco: Banco
  onView: (banco: Banco) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            Cód: {banco.codigo} - {banco.nome}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">ISPB: {banco.ispb}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            banco.situacao === "Habilitado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {banco.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Tarifa DOC/TED:</span> R$ {banco.tarifaDocTed.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500">Cadastro: {banco.dataCadastro}</div>
        {banco.visualizarFiltros && (
          <div className="text-xs text-blue-600 font-medium">Visível nos filtros de Contas a Pagar</div>
        )}
      </div>

      <div className="flex flex-col xs:flex-row gap-2 mt-3">
        <button
          onClick={() => onView(banco)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors w-full xs:w-auto"
        >
          <Eye className="h-3 w-3 mr-1.5" />
          Visualizar
        </button>
        <button
          onClick={() => onDelete(banco.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors w-full xs:w-auto"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function BancosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [isLoading, setIsLoading] = useState(true)
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedBanco, setSelectedBanco] = useState<Banco | null>(null)
  const [bancos, setBancos] = useState<Banco[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    ispb: "",
    codigo: "",
    nome: "",
    tarifaDocTed: "",
    habilitado: true,
    visualizarFiltros: true,
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(bancos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = bancos.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setBancos(bancosData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar bancos com base no termo de pesquisa e filtro de status
  useEffect(() => {
    let filtered = [...bancosData]

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (banco) =>
          banco.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banco.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          banco.ispb.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "Todos") {
      filtered = filtered.filter((banco) => banco.situacao === statusFilter)
    }

    setBancos(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  // Função para visualizar banco
  const handleViewBanco = (banco: Banco) => {
    setSelectedBanco(banco)
    setFormData({
      ispb: banco.ispb,
      codigo: banco.codigo,
      nome: banco.nome,
      tarifaDocTed: banco.tarifaDocTed.toFixed(2),
      habilitado: banco.situacao === "Habilitado",
      visualizarFiltros: banco.visualizarFiltros,
    })
    setIsViewModalOpen(true)
  }

  // Função para abrir modal de exclusão
  const handleOpenDeleteModal = (id: string) => {
    const banco = bancos.find((b) => b.id === id)
    if (banco) {
      setSelectedBanco(banco)
      setIsDeleteModalOpen(true)
    }
  }

  // Função para cadastrar banco
  const handleCadastrarBanco = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newBanco: Banco = {
        id: (Math.floor(Math.random() * 100) + 10).toString(),
        codigo: formData.codigo,
        ispb: formData.ispb,
        nome: formData.nome,
        tarifaDocTed: Number(formData.tarifaDocTed),
        situacao: formData.habilitado ? "Habilitado" : "Bloqueado",
        dataCadastro: new Date().toLocaleString("pt-BR"),
        visualizarFiltros: formData.visualizarFiltros,
      }

      setBancos([newBanco, ...bancos])
      setIsSubmitting(false)
      setIsCadastrarModalOpen(false)

      // Resetar formulário
      setFormData({
        ispb: "",
        codigo: "",
        nome: "",
        tarifaDocTed: "",
        habilitado: true,
        visualizarFiltros: true,
      })
    }, 1000)
  }

  // Função para atualizar banco
  const handleUpdateBanco = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedBanco) {
        const updatedBanco: Banco = {
          ...selectedBanco,
          ispb: formData.ispb,
          nome: formData.nome,
          tarifaDocTed: Number(formData.tarifaDocTed),
          situacao: formData.habilitado ? "Habilitado" : "Bloqueado",
          visualizarFiltros: formData.visualizarFiltros,
        }

        const updatedBancos = bancos.map((b) => (b.id === selectedBanco.id ? updatedBanco : b))
        setBancos(updatedBancos)
        setIsSubmitting(false)
        setIsViewModalOpen(false)
      }
    }, 1000)
  }

  // Função para excluir banco
  const handleDeleteBanco = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedBanco) {
        const updatedBancos = bancos.filter((b) => b.id !== selectedBanco.id)
        setBancos(updatedBancos)
        setIsSubmitting(false)
        setIsDeleteModalOpen(false)
        setSelectedBanco(null)
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
      setBancos(bancosData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Instituições Financeiras</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsCadastrarModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Filtrar por situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Habilitado">Disponível</SelectItem>
                <SelectItem value="Bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                    Cód.
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    ISPB
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[30%]">
                    Instituição
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[12%]">
                    Tarifa DOC / TED
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[18%]">
                    Data de Cadastro
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[10%]">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((banco) => (
                    <tr key={banco.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{banco.codigo}</td>
                      <td className="px-2 py-2 text-sm text-gray-500">{banco.ispb}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={banco.nome}>
                        {banco.nome}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">R$ {banco.tarifaDocTed.toFixed(2)}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            banco.situacao === "Habilitado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {banco.situacao}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500">{banco.dataCadastro}</td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleViewBanco(banco)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(banco.id)}
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
                      Nenhuma instituição financeira encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((banco) => (
                <MobileBancoCard
                  key={banco.id}
                  banco={banco}
                  onView={handleViewBanco}
                  onDelete={handleOpenDeleteModal}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhuma instituição financeira encontrada.</div>
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

      {/* Modal: Cadastrar Banco */}
      {isCadastrarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastrar Banco</h2>
              <button
                onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-yellow-900 mb-1">Aviso importante!</h3>
                    <p className="text-sm text-yellow-800">
                      É obrigatório informar o ISPB para gerar as informações da registradora.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCadastrarBanco} className="space-y-4">
                {/* ISPB */}
                <div>
                  <label htmlFor="ispb" className="text-sm font-medium text-gray-700">
                    ISPB
                  </label>
                  <Input
                    id="ispb"
                    type="text"
                    value={formData.ispb}
                    onChange={(e) => setFormData({ ...formData, ispb: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Exemplo: 1"
                    required
                  />
                </div>

                {/* Código do Banco */}
                <div>
                  <label htmlFor="codigo" className="text-sm font-medium text-gray-700">
                    Código do Banco
                  </label>
                  <Input
                    id="codigo"
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Exemplo: 1"
                    required
                  />
                </div>

                {/* Instituição */}
                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Instituição
                  </label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Nome da instituição financeira"
                    required
                  />
                </div>

                {/* Tarifa DOC / TED */}
                <div>
                  <label htmlFor="tarifaDocTed" className="text-sm font-medium text-gray-700">
                    Tarifa DOC / TED
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="tarifaDocTed"
                      type="text"
                      value={formData.tarifaDocTed}
                      onChange={(e) => setFormData({ ...formData, tarifaDocTed: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                {/* Visualizar banco nos filtros */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visualizarFiltros"
                    checked={formData.visualizarFiltros}
                    onCheckedChange={(checked) => setFormData({ ...formData, visualizarFiltros: checked === true })}
                  />
                  <Label htmlFor="visualizarFiltros" className="text-sm font-medium text-gray-700">
                    Visualizar banco nos filtros em Financeiro &gt; Contas a pagar
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
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
                      "Cadastrar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Alterar Dados */}
      {isViewModalOpen && selectedBanco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Alterar Banco</h2>
              <button
                onClick={() => !isSubmitting && setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-yellow-900 mb-1">Aviso importante!</h3>
                    <p className="text-sm text-yellow-800">
                      Não é possível alterar o código da instituição financeira.
                      <br />
                      Se necessário, exclua e cadastre novamente.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateBanco} className="space-y-4">
                {/* Código do Banco (somente leitura) */}
                <div>
                  <label htmlFor="viewCodigo" className="text-sm font-medium text-gray-700">
                    Código do Banco
                  </label>
                  <Input
                    id="viewCodigo"
                    type="text"
                    value={formData.codigo}
                    className="mt-1 bg-gray-100 border-0 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                    disabled
                  />
                </div>

                {/* ISPB */}
                <div>
                  <label htmlFor="viewIspb" className="text-sm font-medium text-gray-700">
                    ISPB
                  </label>
                  <Input
                    id="viewIspb"
                    type="text"
                    value={formData.ispb}
                    onChange={(e) => setFormData({ ...formData, ispb: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Instituição */}
                <div>
                  <label htmlFor="viewNome" className="text-sm font-medium text-gray-700">
                    Instituição
                  </label>
                  <Input
                    id="viewNome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Tarifa DOC / TED */}
                <div>
                  <label htmlFor="viewTarifaDocTed" className="text-sm font-medium text-gray-700">
                    Tarifa DOC / TED
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="viewTarifaDocTed"
                      type="text"
                      value={formData.tarifaDocTed}
                      onChange={(e) => setFormData({ ...formData, tarifaDocTed: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Habilitado */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="habilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                  />
                  <Label htmlFor="habilitado" className="text-sm font-medium text-gray-700">
                    Habilitado
                  </Label>
                </div>

                {/* Visualizar banco nos filtros */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="viewVisualizarFiltros"
                    checked={formData.visualizarFiltros}
                    onCheckedChange={(checked) => setFormData({ ...formData, visualizarFiltros: checked === true })}
                  />
                  <Label htmlFor="viewVisualizarFiltros" className="text-sm font-medium text-gray-700">
                    Visualizar banco nos filtros em Financeiro &gt; Contas a pagar
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsViewModalOpen(false)}
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
      {isDeleteModalOpen && selectedBanco && (
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
                      Você está prestes a excluir a instituição financeira{" "}
                      <strong>
                        {selectedBanco.codigo} - {selectedBanco.nome}
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
                  onClick={handleDeleteBanco}
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
