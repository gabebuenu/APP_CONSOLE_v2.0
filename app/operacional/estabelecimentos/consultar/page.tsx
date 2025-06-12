"use client"
import { useState, useEffect } from "react"
import { Plus, Search, Eye, ChevronLeft, ChevronRight, X, Download, Calendar, Lock, Info, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/skeleton"

const sellersData = [
  {
    mid: "990571",
    codigoRecebedor: "2ef278f6-52d4-4e31-a92c-24c287f3141e",
    razaoSocial: "Matheus E Rita Casa Noturna Me",
    cpfCnpj: "63250605000150",
    analistaRelacionamento: "",
    dataCadastro: "11/06/2025 11:46:02",
    situacao: "1 - Liberado",
  },
  {
    mid: "990184",
    codigoRecebedor: "5e314bc9-97da-4558-8503-7f82d405518a",
    razaoSocial: "Geraldo Bruno Caio Figueiredo",
    cpfCnpj: "74164798351",
    analistaRelacionamento: "",
    dataCadastro: "11/06/2025 08:28:51",
    situacao: "1 - Liberado",
  },
  {
    mid: "989796",
    codigoRecebedor: "38a501d3-19d2-4b99-96fb-5165108f4de1",
    razaoSocial: "Ayla E Leandro Assessoria Jurí",
    cpfCnpj: "21807398000142",
    analistaRelacionamento: "",
    dataCadastro: "10/06/2025 19:04:05",
    situacao: "1 - Liberado",
  },
]

const situacaoOptions = [
  { value: "todas", label: "Exibir todas" },
  { value: "0", label: "0 - Bloqueado" },
  { value: "1", label: "1 - Liberado" },
  { value: "2", label: "2 - Análise Pendente" },
  { value: "3", label: "3 - Doc. Pendente" },
  { value: "4", label: "4 - Descredenciado" },
  { value: "5", label: "5 - Inativo" },
]

const unidadeNegociosOptions = [
  { value: "todas", label: "Exibir todas" },
  { value: "7", label: "7 - UNIDADE DE TESTE" },
  { value: "15", label: "15 - MERCADO" },
  { value: "16", label: "16 - FARMACIAS" },
  { value: "17", label: "17 - RESTAURANTES" },
  { value: "18", label: "18 - POSTO DE GASOLINA" },
  { value: "19", label: "19 - OUTROS" },
]

// Skeleton Components
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">MID</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
              Código do Recebedor
            </th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Razão Social</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
              CPF/CNPJ
            </th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
              Analista
            </th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
              Data Cadastro
            </th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
              Situação
            </th>
            <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-2 py-3 hidden sm:table-cell">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-2 py-3 hidden md:table-cell">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-2 py-3 hidden lg:table-cell">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-2 py-3 hidden lg:table-cell">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3 hidden sm:table-cell">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-2 py-3 text-center">
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
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SellersConsole() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [filterSituacao, setFilterSituacao] = useState("todas")
  const [filterUnidade, setFilterUnidade] = useState("todas")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

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

  const filteredSellers = sellersData.filter((seller) => {
    const matchesSearch =
      seller.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.cpfCnpj.includes(searchTerm) ||
      seller.mid.includes(searchTerm) ||
      seller.codigoRecebedor.includes(searchTerm)

    const matchesSituacao = filterSituacao === "todas" || seller.situacao.startsWith(filterSituacao)

    return matchesSearch && matchesSituacao
  })

  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSellers = filteredSellers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddSeller = () => {
    router.push("/operacional/estabelecimentos/credenciamento")
  }

  const handleExportExcel = () => {
    console.log("Exportando para Excel...")
    setShowExportDropdown(false)
  }

  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    setShowExportDropdown(false)
  }

  const handleVisualizarAgenda = () => {
    console.log("Visualizar Agenda de Pagamentos")
  }

  const handleVisualizar = (mid: string) => {
    console.log("Visualizar seller:", mid)
  }

  const handleTravar = (mid: string) => {
    console.log("Travar seller:", mid)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setShowExportDropdown(false)
      setShowMobileFilters(false)
    }
    if (showExportDropdown || showMobileFilters) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown, showMobileFilters])

  // Mobile Card Component
  const MobileSellerCard = ({ seller }: { seller: (typeof sellersData)[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900 text-sm">MID: {seller.mid}</div>
          <div className="text-xs text-gray-500 mt-1">{seller.cpfCnpj}</div>
        </div>
        <span
          className={`px-2 py-1 inline-flex text-xs leading-3 font-medium rounded-full ${
            seller.situacao.includes("Liberado") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {seller.situacao}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="text-sm font-medium text-gray-900 line-clamp-2">{seller.razaoSocial}</div>
        <div className="text-xs text-gray-500 truncate" title={seller.codigoRecebedor}>
          Código: {seller.codigoRecebedor}
        </div>
        <div className="text-xs text-gray-500">Cadastro: {seller.dataCadastro}</div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => handleVisualizar(seller.mid)}
          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
          title="Visualizar"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleTravar(seller.mid)}
          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
          title="Travar"
        >
          <Lock className="h-4 w-4" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Consultar</h2>
        <p className="text-xs text-gray-500 mb-6">Tela Inicial</p>
      </div>
      {/* Header */}
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <button
            onClick={handleAddSeller}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> Adicionar Seller
          </button>
        </div>
      </div>

      {/* Agenda de Pagamentos Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-blue-900 mb-1">Agenda de Pagamentos</h3>
            <p className="text-sm text-blue-700 mb-3">
              Encontramos 124 estabelecimentos que não realizam antecipação automática.
            </p>
            <button
              onClick={handleVisualizarAgenda}
              className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Visualizar Agenda
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-3">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <Menu className="h-4 w-4 mr-2" />
          Filtros e Busca
        </button>
      </div>

      {/* Filters and Search */}
      <div className={`${showMobileFilters || !isMobile ? "block" : "hidden"} md:block mb-4`}>
        <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-2 md:items-center">
          {/* Search */}
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[200px]">
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="pl-8 pr-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-2">
            <select
              value={filterSituacao}
              onChange={(e) => {
                setFilterSituacao(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {situacaoOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filterUnidade}
              onChange={(e) => {
                setFilterUnidade(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {unidadeNegociosOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:ml-auto">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowExportDropdown(!showExportDropdown)
                }}
                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" /> Export
              </button>

              {showExportDropdown && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                  <button
                    onClick={handleExportExcel}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-md"
                  >
                    Excel
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-md"
                  >
                    CSV
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsWarningModalOpen(true)}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors w-full sm:w-auto"
            >
              <Info className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">O que é o código do recebedor?</span>
              <span className="sm:hidden">Info</span>
            </button>
          </div>
        </div>
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
                    MID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
                  >
                    Código do Recebedor
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Razão Social / Descrição
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    CPF/CNPJ
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden xl:table-cell"
                  >
                    Analista de Relacionamento
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
                  >
                    Data de Cadastro
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Situação
                  </th>
                  <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSellers.length > 0 ? (
                  currentSellers.map((seller) => (
                    <tr key={seller.mid} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{seller.mid}</td>
                      <td
                        className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 max-w-[150px] truncate hidden lg:table-cell"
                        title={seller.codigoRecebedor}
                      >
                        {seller.codigoRecebedor}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 max-w-[200px]" title={seller.razaoSocial}>
                        <div className="line-clamp-2">{seller.razaoSocial}</div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">{seller.cpfCnpj}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                        {seller.analistaRelacionamento}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {seller.dataCadastro}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                            seller.situacao.includes("Liberado")
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {seller.situacao}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleVisualizar(seller.mid)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleTravar(seller.mid)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500 rounded p-1 transition-colors"
                            title="Travar"
                          >
                            <Lock className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum estabelecimento encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentSellers.length > 0 ? (
              currentSellers.map((seller) => <MobileSellerCard key={seller.mid} seller={seller} />)
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum estabelecimento encontrado.</div>
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

      {/* Warning Modal */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsWarningModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Aviso: Alterando um Recebedor</h2>
              <button
                onClick={() => setIsWarningModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800 font-medium mb-2">
                  Ao atrelar uma conta bancária a um recebedor, somente será possível trocar a conta se a nova tiver o
                  mesmo CPF ou CNPJ.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Um recipient é um recebedor — isto é, um vendedor ou empresa que expõe os seus produtos dentro do seu
                  Marketplace. A Movingpay atribui as transações que tenham sido criadas por uma loja dentro de um
                  recebedor ou vários recebedores, em caso de split de pagamentos.
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  É através de um recipient que você especifica as suas regras de split, para que os valores a receber
                  sejam automaticamente atribuídos a cada um dos sellers envolvidos na transação.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">Vantagens dessa funcionalidade:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Não é obrigatório a utilização de um CPF / CNPJ;</li>
                  <li>Possibilidade de vários sellers com o mesmo CPF / CNPJ;</li>
                  <li>Split de pagamentos (Antes e após a venda) entre os vários sellers;</li>
                  <li>Split de pagamentos por captura entre os sellers;</li>
                  <li>Credenciamento com o mínimo de dados;</li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">Utilização das funcionalidades</h4>
                <p className="text-sm text-gray-700">
                  É através do "Código do Recebedor" que você realiza split de pagamentos, vincula contas bancárias e
                  muito mais.
                </p>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsWarningModalOpen(false)}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-medium rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169BFF]"
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
