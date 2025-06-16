"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Plus, Search, Eye, ChevronLeft, ChevronRight, X, Trash2, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/skeleton"

const cnaeData = [
  {
    id: "33286",
    mcc: "222",
    cnae: "2221121",
    descricao: "25",
    dataCadastro: "19/06/2024 17:06:26",
    codigoDepartamento: "215",
  },
  {
    id: "19980",
    mcc: "9402",
    cnae: "5310502",
    descricao: "Serviços Postais (Apenas Publicos)",
    dataCadastro: "11/08/2022 10:32:33",
    codigoDepartamento: "180",
  },
  {
    id: "19979",
    mcc: "9402",
    cnae: "5310501",
    descricao: "Serviços Postais (Apenas Publicos)",
    dataCadastro: "11/08/2022 10:32:33",
    codigoDepartamento: "180",
  },
  {
    id: "19978",
    mcc: "9399",
    cnae: "8430200",
    descricao: "Serviços Governamentais ( cartorios, orgao da administraçao publica, taxas registro de veiculos)",
    dataCadastro: "11/08/2022 10:32:33",
    codigoDepartamento: "175",
  },
]

// Skeleton Components
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">MCC</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">CNAE</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
              Data de Cadastro
            </th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3 hidden lg:table-cell">
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

export default function CnaeMccConsole() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof cnaeData)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    codigoDepartamento: "",
    codigoCnae: "",
    codigoMcc: "",
    descricaoCnae: "",
    descricaoMcc: "",
  })

  // Simulate loading and detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

  const filteredData = cnaeData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.id.includes(searchTerm) ||
      item.mcc.includes(searchTerm) ||
      item.cnae.includes(searchTerm) ||
      item.descricao.toLowerCase().includes(searchLower)
    )
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Cadastrando CNAE/MCC:", formData)
    setIsAddModalOpen(false)
    setFormData({
      codigoDepartamento: "",
      codigoCnae: "",
      codigoMcc: "",
      descricaoCnae: "",
      descricaoMcc: "",
    })
  }

  const handleView = (item: (typeof cnaeData)[0]) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log("Excluir item:", id)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Mobile Card Component
  const MobileCnaeCard = ({ item }: { item: (typeof cnaeData)[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">ID: {item.id}</div>
          <div className="text-xs text-gray-500 mt-1">
            MCC: {item.mcc} | CNAE: {item.cnae}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleView(item)}
            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
            title="Visualizar"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.descricao}</div>
        <div className="text-xs text-gray-500">Cadastro: {item.dataCadastro}</div>
      </div>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar CNAE / MCC</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar
        </button>
      </div>

      {/* Search and Refresh */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Pesquisar por ID, MCC, CNAE ou Descrição..."
            className="pl-8 pr-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
        </button>
      </div>

      {/* Content */}
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    MCC
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    CNAE
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
                  >
                    Data de Cadastro
                  </th>
                  <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{item.mcc}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{item.cnae}</td>
                      <td className="px-3 py-3 text-sm text-gray-900 max-w-[300px]" title={item.descricao}>
                        <div className="line-clamp-2">{item.descricao}</div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {item.dataCadastro}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(item)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
                    <td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum registro encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentItems.length > 0 ? (
              currentItems.map((item) => <MobileCnaeCard key={item.id} item={item} />)
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum registro encontrado.</div>
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Cadastrar CNAE / MCC</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-2">Aviso Importante!</h3>
                <p className="text-sm text-orange-800">
                  Verifique com sua adquirente se é necessário informar o código do departamento.
                </p>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label htmlFor="codigoDepartamento" className="text-sm font-medium text-gray-700">
                    Código Departamento <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-1">(Obrigatório caso a adquirente seja a "ADIQ")</p>
                  <Input
                    id="codigoDepartamento"
                    type="text"
                    value={formData.codigoDepartamento}
                    onChange={(e) => setFormData({ ...formData, codigoDepartamento: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe o código do departamento"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="codigoCnae" className="text-sm font-medium text-gray-700">
                    Código CNAE
                  </label>
                  <Input
                    id="codigoCnae"
                    type="text"
                    value={formData.codigoCnae}
                    onChange={(e) => setFormData({ ...formData, codigoCnae: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe o código CNAE"
                  />
                </div>

                <div>
                  <label htmlFor="codigoMcc" className="text-sm font-medium text-gray-700">
                    Código MCC
                  </label>
                  <Input
                    id="codigoMcc"
                    type="text"
                    value={formData.codigoMcc}
                    onChange={(e) => setFormData({ ...formData, codigoMcc: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe o código MCC"
                  />
                </div>

                <div>
                  <label htmlFor="descricaoCnae" className="text-sm font-medium text-gray-700">
                    Descrição CNAE
                  </label>
                  <textarea
                    id="descricaoCnae"
                    value={formData.descricaoCnae}
                    onChange={(e) => setFormData({ ...formData, descricaoCnae: e.target.value })}
                    placeholder="Informe uma descrição / denominação do CNAE"
                    rows={3}
                    className="mt-1 w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="descricaoMcc" className="text-sm font-medium text-gray-700">
                    Descrição MCC
                  </label>
                  <textarea
                    id="descricaoMcc"
                    value={formData.descricaoMcc}
                    onChange={(e) => setFormData({ ...formData, descricaoMcc: e.target.value })}
                    placeholder="Informe uma descrição / denominação do MCC"
                    rows={3}
                    className="mt-1 w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Alterar MCC</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-medium text-orange-900 mb-2">Aviso Importante!</h3>
                <p className="text-sm text-orange-800">
                  Não é permitido alterar o código MCC ou CNAE. Caso necessário, cadastre novamente.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Código Departamento</label>
                <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                  {selectedItem.codigoDepartamento}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Descrição CNAE</label>
                <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900 min-h-[80px] flex items-start">
                  {selectedItem.descricao}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Descrição MCC</label>
                <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900 min-h-[80px] flex items-start">
                  {selectedItem.descricao}
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
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
