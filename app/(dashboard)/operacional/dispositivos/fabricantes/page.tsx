"use client"
import { useState, useEffect } from "react"
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
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Definição de interfaces para tipagem
interface Fabricante {
  id: string
  nome: string
  descricao: string
  situacao: "Ativo" | "Inativo"
  dataCadastro: string
}

interface FormData {
  nome: string
  descricao: string
  habilitado: boolean
}

// Dados de exemplo para os fabricantes
const fabricantesData: Fabricante[] = [
  {
    id: "154",
    nome: "POSITIVO",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Ativo",
    dataCadastro: "15/06/2025 10:30:22",
  },
  {
    id: "153",
    nome: "GERTEC",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Ativo",
    dataCadastro: "10/06/2025 14:45:18",
  },
  {
    id: "152",
    nome: "PAX",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Ativo",
    dataCadastro: "05/06/2025 09:15:33",
  },
  {
    id: "151",
    nome: "VERIFONE",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Inativo",
    dataCadastro: "01/06/2025 16:22:45",
  },
  {
    id: "150",
    nome: "INGENICO",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Ativo",
    dataCadastro: "28/05/2025 11:10:05",
  },
  {
    id: "149",
    nome: "CIELO",
    descricao: "FABRICANTE DE POS / SMART POS",
    situacao: "Inativo",
    dataCadastro: "25/05/2025 08:55:17",
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
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
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
                <Skeleton className="h-4 w-40" />
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
function MobileFabricanteCard({
  fabricante,
  onEdit,
  onDelete,
}: {
  fabricante: Fabricante
  onEdit: (fabricante: Fabricante) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            #{fabricante.id} - {fabricante.nome}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">Cadastro: {fabricante.dataCadastro}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            fabricante.situacao === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {fabricante.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs sm:text-sm text-gray-900 line-clamp-2">{fabricante.descricao}</div>
      </div>

      <div className="flex flex-col xs:flex-row gap-2 mt-3">
        <button
          onClick={() => onEdit(fabricante)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded transition-colors w-full xs:w-auto"
        >
          <Edit className="h-3 w-3 mr-1.5" />
          Alterar
        </button>
        <button
          onClick={() => onDelete(fabricante.id)}
          className="inline-flex items-center justify-center px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors w-full xs:w-auto"
        >
          <Trash2 className="h-3 w-3 mr-1.5" />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default function FabricantesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFabricante, setSelectedFabricante] = useState<Fabricante | null>(null)
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    habilitado: true,
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(fabricantes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = fabricantes.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setFabricantes(fabricantesData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Filtrar fabricantes com base no termo de pesquisa
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFabricantes(fabricantesData)
      return
    }

    const filtered = fabricantesData.filter(
      (fabricante) =>
        fabricante.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fabricante.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fabricante.descricao.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFabricantes(filtered)
    setCurrentPage(1)
  }, [searchTerm])

  // Função para adicionar novo fabricante
  const handleAddFabricante = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newFabricante: Fabricante = {
        id: (Math.floor(Math.random() * 10) + 155).toString(),
        nome: formData.nome.toUpperCase(),
        descricao: formData.descricao.toUpperCase(),
        situacao: formData.habilitado ? "Ativo" : "Inativo",
        dataCadastro: new Date().toLocaleString("pt-BR"),
      }

      setFabricantes([newFabricante, ...fabricantes])
      setIsSubmitting(false)
      setIsAddModalOpen(false)

      // Resetar formulário
      setFormData({
        nome: "",
        descricao: "",
        habilitado: true,
      })
    }, 1000)
  }

  // Função para editar fabricante
  const handleEditFabricante = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedFabricante) {
        const updatedFabricante: Fabricante = {
          ...selectedFabricante,
          nome: formData.nome.toUpperCase(),
          descricao: formData.descricao.toUpperCase(),
          situacao: formData.habilitado ? "Ativo" : "Inativo",
        }

        const updatedFabricantes = fabricantes.map((f) => (f.id === selectedFabricante.id ? updatedFabricante : f))
        setFabricantes(updatedFabricantes)
        setIsSubmitting(false)
        setIsEditModalOpen(false)
      }
    }, 1000)
  }

  // Função para abrir modal de edição
  const handleOpenEditModal = (fabricante: Fabricante) => {
    setSelectedFabricante(fabricante)
    setFormData({
      nome: fabricante.nome,
      descricao: fabricante.descricao,
      habilitado: fabricante.situacao === "Ativo",
    })
    setIsEditModalOpen(true)
  }

  // Função para abrir modal de exclusão
  const handleOpenDeleteModal = (id: string) => {
    const fabricante = fabricantes.find((f) => f.id === id)
    if (fabricante) {
      setSelectedFabricante(fabricante)
      setIsDeleteModalOpen(true)
    }
  }

  // Função para excluir fabricante
  const handleDeleteFabricante = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedFabricante) {
        const updatedFabricantes = fabricantes.filter((f) => f.id !== selectedFabricante.id)
        setFabricantes(updatedFabricantes)
        setIsSubmitting(false)
        setIsDeleteModalOpen(false)
        setSelectedFabricante(null)
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
      setFabricantes(fabricantesData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Fabricantes</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Botão Novo Fabricante */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Fabricante
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
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                    #
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[20%]">
                    Nome
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[40%]">
                    Descrição
                  </th>
                  <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Situação
                  </th>
                  <th scope="col" className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-[15%]">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((fabricante) => (
                    <tr key={fabricante.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm font-medium text-gray-900">{fabricante.id}</td>
                      <td className="px-2 py-2 text-sm text-gray-900 truncate" title={fabricante.nome}>
                        {fabricante.nome}
                      </td>
                      <td className="px-2 py-2 text-sm text-gray-500 truncate" title={fabricante.descricao}>
                        {fabricante.descricao}
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            fabricante.situacao === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {fabricante.situacao}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(fabricante)}
                            className="text-green-600 hover:text-green-900 hover:bg-green-50 focus:outline-none focus:ring-1 focus:ring-green-500 rounded p-1 transition-colors"
                            title="Alterar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(fabricante.id)}
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
                    <td colSpan={5} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum fabricante encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((fabricante) => (
                <MobileFabricanteCard
                  key={fabricante.id}
                  fabricante={fabricante}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteModal}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum fabricante encontrado.</div>
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

      {/* Modal: Cadastrar Fabricante */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastrar Fabricante</h2>
              <button
                onClick={() => !isSubmitting && setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleAddFabricante} className="space-y-4">
                {/* Nome do Fabricante */}
                <div>
                  <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome do Fabricante
                  </label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="ex: PAX, VERIFONE, GERTEC..."
                    required
                  />
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
                    placeholder="Fabricante de POS / Smart POS"
                  />
                </div>

                {/* Habilitar fabricante */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="habilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                  />
                  <Label htmlFor="habilitado" className="text-sm font-medium text-gray-700">
                    Habilitar fabricante após cadastro
                  </Label>
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
                      "Cadastrar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Alterar Fabricante */}
      {isEditModalOpen && selectedFabricante && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsEditModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Alterar Fabricante</h2>
              <button
                onClick={() => !isSubmitting && setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <form onSubmit={handleEditFabricante} className="space-y-4">
                {/* Nome do Fabricante */}
                <div>
                  <label htmlFor="editNome" className="text-sm font-medium text-gray-700">
                    Nome do Fabricante
                  </label>
                  <Input
                    id="editNome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="ex: PAX, VERIFONE, GERTEC..."
                    required
                  />
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
                    placeholder="Fabricante de POS / Smart POS"
                  />
                </div>

                {/* Habilitar fabricante */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editHabilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                  />
                  <Label htmlFor="editHabilitado" className="text-sm font-medium text-gray-700">
                    Habilitar fabricante
                  </Label>
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
      {isDeleteModalOpen && selectedFabricante && (
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
                      Você está prestes a excluir o fabricante <strong>{selectedFabricante.nome}</strong>. Esta ação não
                      pode ser desfeita.
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
                  onClick={handleDeleteFabricante}
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
