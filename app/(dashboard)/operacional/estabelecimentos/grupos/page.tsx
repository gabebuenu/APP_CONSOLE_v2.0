"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Eye, Edit, ChevronLeft, ChevronRight, X, Download, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/skeleton"
import { toast } from "@/hooks/use-toast"

const gruposData = [
  {
    id: 47,
    refExterna: "B82D4E12-285",
    nome: "Teste 03246626",
    descricao: "17e7aa4f-cb56-403f-8acb-00172e10...",
    estabelecimentos: 0,
    situacao: "Habilitado",
    dataCadastro: "29/01/2025 10:37:05",
  },
  {
    id: 10,
    refExterna: "C93E5F23-396",
    nome: "Teste 4444",
    descricao: "Grupo Teste 4444",
    estabelecimentos: 0,
    situacao: "Habilitado",
    dataCadastro: "05/02/2024 02:10:18",
  },
  {
    id: 8,
    refExterna: "D04F6G34-407",
    nome: "Teste 08",
    descricao: "Grupo Econocmico Teste #00008",
    estabelecimentos: 0,
    situacao: "Habilitado",
    dataCadastro: "03/02/2024 22:53:22",
  },
  {
    id: 6,
    refExterna: "Asd",
    nome: "Teste 06asd",
    descricao: "Grupo Econocmico Teste #00006ad",
    estabelecimentos: 0,
    situacao: "Habilitado",
    dataCadastro: "03/02/2024 22:45:18",
  },
]

const estabelecimentosDisponiveis = [
  {
    codigo: "990012",
    nome: "Gabriel Bueno",
    cpf: "40000000001",
  },
  {
    codigo: "990013",
    nome: "Maria Silva",
    cpf: "40000000002",
  },
  {
    codigo: "990014",
    nome: "João Santos",
    cpf: "40000000003",
  },
]

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">#</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Ref. Externa</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Estabelecimento(s)</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Data de Cadastro</th>
            <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
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

export default function GruposEconomicosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false)
  const [selectedGrupo, setSelectedGrupo] = useState<any>(null)

  // Form states
  const [createForm, setCreateForm] = useState({
    nome: "",
    refExterna: "",
    descricao: "",
  })

  const [editForm, setEditForm] = useState({
    nome: "",
    refExterna: "",
    descricao: "",
    habilitado: true,
  })

  const [searchEstabelecimento, setSearchEstabelecimento] = useState("")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

  const filteredGrupos = gruposData.filter((grupo) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      grupo.id.toString().includes(searchTerm) ||
      grupo.nome.toLowerCase().includes(searchLower) ||
      grupo.descricao.toLowerCase().includes(searchLower) ||
      grupo.refExterna.toLowerCase().includes(searchLower)
    )
  })

  const totalPages = Math.ceil(filteredGrupos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentGrupos = filteredGrupos.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleCreateGrupo = () => {
    console.log("Criando grupo:", createForm)
    toast({
      title: "Grupo criado!",
      description: "O grupo econômico foi cadastrado com sucesso.",
    })
    setIsCreateModalOpen(false)
    setCreateForm({ nome: "", refExterna: "", descricao: "" })
  }

  const handleEditGrupo = () => {
    console.log("Editando grupo:", editForm)
    toast({
      title: "Grupo atualizado!",
      description: "As informações do grupo foram atualizadas com sucesso.",
    })
    setIsEditModalOpen(false)
  }

  const handleOpenEdit = (grupo: any) => {
    setSelectedGrupo(grupo)
    setEditForm({
      nome: grupo.nome,
      refExterna: grupo.refExterna,
      descricao: grupo.descricao,
      habilitado: grupo.situacao === "Habilitado",
    })
    setIsEditModalOpen(true)
  }

  const handleOpenVincular = (grupo: any) => {
    setSelectedGrupo(grupo)
    setIsVincularModalOpen(true)
  }

  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    toast({
      title: "Exportação iniciada",
      description: "O arquivo CSV será baixado em breve.",
    })
  }

  const filteredEstabelecimentos = estabelecimentosDisponiveis.filter((est) => {
    const searchLower = searchEstabelecimento.toLowerCase()
    return (
      est.codigo.includes(searchEstabelecimento) ||
      est.nome.toLowerCase().includes(searchLower) ||
      est.cpf.includes(searchEstabelecimento)
    )
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-medium text-gray-900 mb-1">Grupos Econômicos</h1>
        <p className="text-xs text-gray-500 mb-6">Gestão de grupos econômicos</p>
      </div>

      {/* Aviso Importante */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-orange-900 mb-1">Aviso Importante!</h3>
            <p className="text-sm text-orange-800">
              Não é possível excluir um grupo econômico caso tenha estabelecimentos vinculados.
            </p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Grupo
        </Button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisa: ID, Nome, Descrição..."
              className="pl-10 bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <Button onClick={handleExportCSV} variant="outline" className="font-['Montserrat']">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Ref. Externa
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Descrição
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Estabelecimento(s)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Situação
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Data de Cadastro
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentGrupos.length > 0 ? (
                  currentGrupos.map((grupo) => (
                    <tr key={grupo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 font-['Montserrat']">{grupo.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{grupo.refExterna}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-['Montserrat']">{grupo.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat'] max-w-[200px] truncate">
                        {grupo.descricao}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-['Montserrat']">
                        <button
                          onClick={() => handleOpenVincular(grupo)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {grupo.estabelecimentos}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full font-['Montserrat'] ${
                            grupo.situacao === "Habilitado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {grupo.situacao}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{grupo.dataCadastro}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(grupo)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-1 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenVincular(grupo)}
                            className="text-green-600 hover:text-green-900 hover:bg-green-50 p-1 rounded transition-colors"
                            title="Visualizar Estabelecimentos"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-sm text-gray-500 font-['Montserrat']">
                      Nenhum grupo econômico encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <nav className="flex items-center justify-between" aria-label="Pagination">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="font-['Montserrat']"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="font-['Montserrat']"
            >
              Próximo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="text-sm text-gray-700 font-['Montserrat']">
            Página <span className="font-medium">{currentPage}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
        </nav>
      )}

      {/* Modal Criar Grupo */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsCreateModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">Cadastrar Grupo Econômico</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="nome" className="font-['Montserrat']">
                  Nome do grupo
                </Label>
                <Input
                  id="nome"
                  value={createForm.nome}
                  onChange={(e) => setCreateForm({ ...createForm, nome: e.target.value })}
                  placeholder="TESTE 123"
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label htmlFor="refExterna" className="font-['Montserrat']">
                  Referência Externa
                </Label>
                <Input
                  id="refExterna"
                  value={createForm.refExterna}
                  onChange={(e) => setCreateForm({ ...createForm, refExterna: e.target.value })}
                  placeholder="B82D4E12-285"
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label htmlFor="descricao" className="font-['Montserrat']">
                  Descrição
                </Label>
                <Input
                  id="descricao"
                  value={createForm.descricao}
                  onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button onClick={() => setIsCreateModalOpen(false)} variant="outline" className="font-['Montserrat']">
                Cancelar
              </Button>
              <Button
                onClick={handleCreateGrupo}
                className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Grupo */}
      {isEditModalOpen && selectedGrupo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">
                Atualizar Grupo Econômico: #{selectedGrupo.id}
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="editNome" className="font-['Montserrat']">
                  Nome do grupo
                </Label>
                <Input
                  id="editNome"
                  value={editForm.nome}
                  onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label htmlFor="editRefExterna" className="font-['Montserrat']">
                  Referência Externa
                </Label>
                <Input
                  id="editRefExterna"
                  value={editForm.refExterna}
                  onChange={(e) => setEditForm({ ...editForm, refExterna: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label htmlFor="editDescricao" className="font-['Montserrat']">
                  Descrição
                </Label>
                <Input
                  id="editDescricao"
                  value={editForm.descricao}
                  onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="habilitado"
                  checked={editForm.habilitado}
                  onCheckedChange={(checked) => setEditForm({ ...editForm, habilitado: !!checked })}
                />
                <Label htmlFor="habilitado" className="font-['Montserrat']">
                  Grupo Econômico Habilitado
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="font-['Montserrat']">
                Cancelar
              </Button>
              <Button
                onClick={handleEditGrupo}
                className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
              >
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Vincular Estabelecimentos */}
      {isVincularModalOpen && selectedGrupo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsVincularModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">
                Vincular EC: Pesquisar Estabelecimento...
              </h2>
              <button onClick={() => setIsVincularModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Pesquisa de Estabelecimentos */}
              <div>
                <Label className="font-['Montserrat'] mb-2 block">Pesquisar Estabelecimentos</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchEstabelecimento}
                    onChange={(e) => setSearchEstabelecimento(e.target.value)}
                    placeholder="Pesquisar Estabelecimento..."
                    className="pl-10 bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                  />
                </div>
              </div>

              {/* Lista de Estabelecimentos Disponíveis */}
              {filteredEstabelecimentos.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 font-['Montserrat']">Estabelecimentos Disponíveis</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filteredEstabelecimentos.map((est) => (
                      <div
                        key={est.codigo}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          toast({
                            title: "Estabelecimento vinculado!",
                            description: `${est.nome} foi vinculado ao grupo.`,
                          })
                        }}
                      >
                        <div>
                          <span className="font-medium text-gray-900 font-['Montserrat']">
                            [{est.codigo}] {est.nome}
                          </span>
                          <span className="text-sm text-gray-500 ml-2 font-['Montserrat']">CPF: {est.cpf}</span>
                        </div>
                        <Plus className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Estabelecimentos Vinculados */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 font-['Montserrat']">Estabelecimento(s) vinculado(s)</h3>
                <div className="bg-white rounded-lg border border-gray-200">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                          Estabelecimento(s) vinculado(s)
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                          Gerenciamento
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center text-gray-500 font-['Montserrat']">
                          Nenhum Estabelecimento vinculado até o momento.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                onClick={() => setIsVincularModalOpen(false)}
                className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
