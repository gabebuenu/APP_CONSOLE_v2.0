"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import {
  Search,
  AlertCircle,
  Megaphone,
  Plus,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Definição de interfaces para tipagem
interface SplitRule {
  hash: string
  refExterna: string
  mid: string
  cpfCnpj: string
  nome: string
  tags: string
  percentual: string
  situacao: string
  dataCadastro: string
  recebedorPrincipal: boolean
  cobradoTaxas: boolean
  assumeRiscos: boolean
  limiteMonsal: string
  email: string
}

interface Estabelecimento {
  mid: string
  nome: string
  cpfCnpj: string
}

interface FormData {
  refExterna: string
  recebedorPrincipal: boolean
  cobradoTaxas: boolean
  assumeRiscos: boolean
  percentual: string
  limiteMonsal: string
  email: string
}

// Dados de exemplo para as regras de split
const splitRulesData: SplitRule[] = [
  {
    hash: "3F0C285A-CD48-4899-8BE8-D0AB4226E294",
    refExterna: "aaaaaaaaaaada",
    mid: "990571",
    cpfCnpj: "63250605000150",
    nome: "Matheus E Rita Casa Noturna Me",
    tags: "Principal",
    percentual: "2.59",
    situacao: "Liberado",
    dataCadastro: "13/06/2025 10:14:08",
    recebedorPrincipal: true,
    cobradoTaxas: true,
    assumeRiscos: false,
    limiteMonsal: "5000.00",
    email: "contato@exemplo.com",
  },
  {
    hash: "5D7B1A3C-EF92-4567-B0D1-F23A45C67890",
    refExterna: "bbbbbbbbbbbb",
    mid: "990571",
    cpfCnpj: "63250605000150",
    nome: "Matheus E Rita Casa Noturna Me",
    tags: "Secundário",
    percentual: "97.41",
    situacao: "Liberado",
    dataCadastro: "13/06/2025 10:15:22",
    recebedorPrincipal: false,
    cobradoTaxas: false,
    assumeRiscos: true,
    limiteMonsal: "10000.00",
    email: "financeiro@exemplo.com",
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
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hash</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ref Externa</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">MID</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF/CNPJ</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentual</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de Cadastro</th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
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
function MobileSplitRuleCard({
  rule,
  onView,
  onDelete,
}: {
  rule: SplitRule
  onView: (rule: SplitRule) => void
  onDelete: (hash: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">Ref: {rule.refExterna}</div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">MID: {rule.mid}</div>
        </div>
        <span
          className={`px-2 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
            rule.situacao === "Liberado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {rule.situacao}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{rule.nome}</div>
        <div className="text-xs text-gray-500">CPF/CNPJ: {rule.cpfCnpj}</div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Percentual:</span> {rule.percentual}%
        </div>
        <div className="text-xs text-gray-500">Cadastro: {rule.dataCadastro}</div>
      </div>

      <div className="flex justify-end gap-1 sm:gap-2">
        <button
          onClick={() => onView(rule)}
          className="p-1.5 sm:p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
          title="Visualizar"
        >
          <Eye className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
        </button>
        <button
          onClick={() => onDelete(rule.hash)}
          className="p-1.5 sm:p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
          title="Excluir"
        >
          <Trash2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
        </button>
      </div>
    </div>
  )
}

export default function SplitRulesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState<SplitRule | null>(null)
  const [rules, setRules] = useState<SplitRule[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<Estabelecimento[]>(estabelecimentosSugestoes)
  const [formData, setFormData] = useState<FormData>({
    refExterna: "",
    recebedorPrincipal: false,
    cobradoTaxas: false,
    assumeRiscos: false,
    percentual: "",
    limiteMonsal: "",
    email: "",
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(rules.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = rules.slice(startIndex, endIndex)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Função para filtrar sugestões com base no termo de pesquisa
  const filterSuggestions = (term: string): Estabelecimento[] => {
    const lowerTerm = term.toLowerCase()
    return estabelecimentosSugestoes.filter(
      (est) =>
        est.mid.includes(lowerTerm) || est.nome.toLowerCase().includes(lowerTerm) || est.cpfCnpj.includes(lowerTerm),
    )
  }

  // Função para lidar com mudanças no campo de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim()) {
      const filtered = filterSuggestions(term)
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setFilteredSuggestions(estabelecimentosSugestoes)
      setShowSuggestions(false)
    }
  }

  // Função para pesquisar estabelecimento
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setIsLoading(true)
      setShowSuggestions(false)

      // Simular carregamento
      setTimeout(() => {
        setHasSearched(true)
        setRules(splitRulesData)
        setIsLoading(false)
      }, 1500)
    }
  }

  // Função para selecionar uma sugestão
  const handleSelectSuggestion = (suggestion: Estabelecimento) => {
    setSearchTerm(`[${suggestion.mid}] ${suggestion.nome}`)
    setShowSuggestions(false)

    // Iniciar pesquisa automaticamente
    setIsLoading(true)
    setTimeout(() => {
      setHasSearched(true)
      setRules(splitRulesData)
      setIsLoading(false)
    }, 1500)
  }

  // Função para adicionar nova regra
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nova regra:", formData)
    setIsAddModalOpen(false)

    // Resetar formulário
    setFormData({
      refExterna: "",
      recebedorPrincipal: false,
      cobradoTaxas: false,
      assumeRiscos: false,
      percentual: "",
      limiteMonsal: "",
      email: "",
    })
  }

  // Função para visualizar regra
  const handleViewRule = (rule: SplitRule) => {
    setSelectedRule(rule)
    setIsViewModalOpen(true)
  }

  // Função para excluir regra
  const handleDeleteRule = (hash: string) => {
    console.log("Excluir regra:", hash)
  }

  // Função para atualizar regra
  const handleUpdateRule = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Atualizar regra:", selectedRule)
    setIsViewModalOpen(false)
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
      setIsLoading(false)
    }, 1000)
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
        <h2 className="text-sm font-medium text-gray-900 mb-1">Regras de Split</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Seção de introdução */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-start gap-3">
          <Megaphone className="h-5 w-5 text-[#169BFF] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            Para que os valores de uma transação sejam divididos, você precisa especificar algumas regras. Elas ditam
            quem são os envolvidos em uma transação, quanto cada um recebe e quais são as responsabilidades deles.
          </p>
        </div>
      </div>

      {/* Campo de busca */}
      <div className="mb-6 relative" ref={searchRef}>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Informe um Estabelecimento para começar
        </label>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Input
              id="search"
              type="text"
              placeholder="Pesquisar por Razão Social, CPF ou CNPJ, Código MID..."
              className="pl-8 pr-3 py-2 text-sm bg-[#F2F2F2] border-0 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
          >
            Pesquisar
          </button>
        </form>

        {/* Lista de sugestões filtradas */}
        {showSuggestions && !hasSearched && !isLoading && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              <ul className="py-1">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.mid}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    <div className="font-medium">
                      [{suggestion.mid}] {suggestion.nome}
                    </div>
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

      {/* Aviso importante (mostrar apenas se não tiver pesquisado ainda) */}
      {!hasSearched && !isLoading && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-orange-900 mb-2">Aviso Importante!</h3>
              <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                <li>
                  Dentro das split rules, você deve passar apenas valor ou percentual — não usar os dois ao mesmo tempo.
                </li>
                <li>Caso escolha usar valor, a soma de cada regra deve ser igual ao valor total da transação.</li>
                <li>É preciso explicitamente definir todos os recebedores que irão participar da transação.</li>
                <li>O custo de saque é de responsabilidade do recebedor, não podendo ser dividido.</li>
                <li>Os custos de gateway e antifraude são de responsabilidade do marketplace (recebedor principal).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo após pesquisa */}
      {hasSearched && (
        <>
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" /> Adicionar Regra
            </button>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
            </button>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Regras de Divisão</h3>

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
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12 truncate"
                      >
                        Hash
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        Ref Externa
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        MID
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        CPF/CNPJ
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-2/12"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        Tags
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        Percentual
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        Situação
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-2/12"
                      >
                        Data de Cadastro
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-1/12"
                      >
                        Gerenciamento
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                      currentItems.map((rule) => (
                        <tr key={rule.hash} className="hover:bg-gray-50">
                          <td className="px-2 py-2 text-sm font-medium text-gray-900 truncate" title={rule.hash}>
                            {rule.hash}
                          </td>
                          <td className="px-2 py-2 text-sm text-gray-500 truncate">{rule.refExterna}</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{rule.mid}</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{rule.cpfCnpj}</td>
                          <td className="px-2 py-2 text-sm text-gray-900 truncate" title={rule.nome}>
                            {rule.nome}
                          </td>
                          <td className="px-2 py-2 text-sm text-gray-500">{rule.tags}</td>
                          <td className="px-2 py-2 text-sm text-gray-900">{rule.percentual}%</td>
                          <td className="px-2 py-2">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${
                                rule.situacao === "Liberado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {rule.situacao}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-sm text-gray-500 truncate" title={rule.dataCadastro}>
                            {rule.dataCadastro}
                          </td>
                          <td className="px-2 py-2 text-center text-sm font-medium">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleViewRule(rule)}
                                className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-1 transition-colors"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRule(rule.hash)}
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
                        <td colSpan={10} className="px-3 py-6 text-center text-sm text-gray-500">
                          Nenhuma regra de split cadastrada para este estabelecimento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                {currentItems.length > 0 ? (
                  currentItems.map((rule) => (
                    <MobileSplitRuleCard
                      key={rule.hash}
                      rule={rule}
                      onView={handleViewRule}
                      onDelete={handleDeleteRule}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma regra de split cadastrada para este estabelecimento.
                  </div>
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
        </>
      )}

      {/* Modal: Adicionar Regra */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Regra de Divisão</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Só deve haver um recebedor principal na regra de split;</li>
                  <li>É recomendado que um recebedor (ou mais) seja cobrado pelas taxas MDR;</li>
                  <li>Apenas um recebedor deve assumir o custo (MDR), ou todos devem assumir individualmente;</li>
                  <li>Todos os recebedores devem ter acordos válidos cadastrados.</li>
                </ul>
              </div>

              <form onSubmit={handleAddRule} className="space-y-4">
                {/* Estabelecimento */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Estabelecimento (Recebedor)</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    [990571] Matheus e Rita Casa Noturna ME
                  </div>
                </div>

                {/* Identificador externo */}
                <div>
                  <label htmlFor="refExterna" className="text-sm font-medium text-gray-700">
                    Identificador externo
                  </label>
                  <Input
                    id="refExterna"
                    type="text"
                    value={formData.refExterna}
                    onChange={(e) => setFormData({ ...formData, refExterna: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Informe um identificador externo"
                  />
                </div>

                {/* Recebedor principal */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="recebedorPrincipal" className="text-sm font-medium text-gray-700">
                    Recebedor principal
                  </Label>
                  <Switch
                    id="recebedorPrincipal"
                    checked={formData.recebedorPrincipal}
                    onCheckedChange={(checked) => setFormData({ ...formData, recebedorPrincipal: checked })}
                  />
                </div>

                {/* Recebedor será cobrado pelas taxas (MDR) */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="cobradoTaxas" className="text-sm font-medium text-gray-700">
                    Recebedor será cobrado pelas taxas (MDR)
                  </Label>
                  <Switch
                    id="cobradoTaxas"
                    checked={formData.cobradoTaxas}
                    onCheckedChange={(checked) => setFormData({ ...formData, cobradoTaxas: checked })}
                  />
                </div>

                {/* Recebedor assumirá os riscos de chargeback */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="assumeRiscos" className="text-sm font-medium text-gray-700">
                    Recebedor assumirá os riscos de chargeback
                  </Label>
                  <Switch
                    id="assumeRiscos"
                    checked={formData.assumeRiscos}
                    onCheckedChange={(checked) => setFormData({ ...formData, assumeRiscos: checked })}
                  />
                </div>

                {/* Percentual de divisão */}
                <div>
                  <label htmlFor="percentual" className="text-sm font-medium text-gray-700">
                    Percentual de divisão
                  </label>
                  <div className="relative mt-1">
                    <Input
                      id="percentual"
                      type="text"
                      value={formData.percentual}
                      onChange={(e) => setFormData({ ...formData, percentual: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent pr-8"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                {/* Limite mensal de splits */}
                <div>
                  <label htmlFor="limiteMonsal" className="text-sm font-medium text-gray-700">
                    Limite mensal de splits
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="limiteMonsal"
                      type="text"
                      value={formData.limiteMonsal}
                      onChange={(e) => setFormData({ ...formData, limiteMonsal: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* E-mail para relatório de splits */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    E-mail para relatório de splits
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="exemplo@email.com"
                  />
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

      {/* Modal: Visualizar/Editar Regra */}
      {isViewModalOpen && selectedRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-1">
                ALTERAR REGRA DE DIVISÃO: <span className="hidden sm:inline">{selectedRule.hash}</span>
                <span className="sm:hidden">...</span>
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Só deve haver um recebedor principal na regra de split;</li>
                  <li>É recomendado que um recebedor (ou mais) seja cobrado pelas taxas MDR;</li>
                  <li>Apenas um recebedor deve assumir o custo (MDR), ou todos devem assumir individualmente;</li>
                  <li>Todos os recebedores devem ter acordos válidos cadastrados.</li>
                </ul>
              </div>

              <form onSubmit={handleUpdateRule} className="space-y-4">
                {/* Estabelecimento */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Estabelecimento (Recebedor)</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    [{selectedRule.mid}] {selectedRule.nome}
                  </div>
                </div>

                {/* Identificador externo */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Identificador externo</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRule.refExterna}
                  </div>
                </div>

                {/* Percentual */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Percentual</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRule.percentual}%
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRule.situacao}
                  </div>
                </div>

                {/* Data de cadastro */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Data de cadastro</label>
                  <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                    {selectedRule.dataCadastro}
                  </div>
                </div>

                {/* Recebedor principal */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="viewRecebedorPrincipal" className="text-sm font-medium text-gray-700">
                    Recebedor principal
                  </Label>
                  <Switch
                    id="viewRecebedorPrincipal"
                    checked={selectedRule.recebedorPrincipal}
                    onCheckedChange={(checked) => setSelectedRule({ ...selectedRule, recebedorPrincipal: checked })}
                  />
                </div>

                {/* Recebedor será cobrado pelas taxas (MDR) */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="viewCobradoTaxas" className="text-sm font-medium text-gray-700">
                    Recebedor será cobrado pelas taxas (MDR)
                  </Label>
                  <Switch
                    id="viewCobradoTaxas"
                    checked={selectedRule.cobradoTaxas}
                    onCheckedChange={(checked) => setSelectedRule({ ...selectedRule, cobradoTaxas: checked })}
                  />
                </div>

                {/* Recebedor assumirá os riscos de chargeback */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="viewAssumeRiscos" className="text-sm font-medium text-gray-700">
                    Recebedor assumirá os riscos de chargeback
                  </Label>
                  <Switch
                    id="viewAssumeRiscos"
                    checked={selectedRule.assumeRiscos}
                    onCheckedChange={(checked) => setSelectedRule({ ...selectedRule, assumeRiscos: checked })}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsViewModalOpen(false)}
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
    </div>
  )
}
