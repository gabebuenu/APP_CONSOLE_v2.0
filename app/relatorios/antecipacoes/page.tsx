"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const anticipationsMock: any[] = [
  // Dados mock vazios para mostrar a mensagem de "nenhuma informação disponível"
]

const adquirentes = [
  { value: "todas", label: "Exibir todas" },
  { value: "8", label: "8 - STONE S/A" },
  { value: "9", label: "9 - GETNET S/A" },
  { value: "17", label: "17 - ADIQ S/A" },
  { value: "18", label: "18 - PAGSEGURO INTERNET S/A" },
  { value: "19", label: "19 - ENTRE PAYMENTS S/A" },
  { value: "20", label: "20 - CIELO PAGAMENTOS S/A" },
  { value: "21", label: "21 - BIN" },
  { value: "22", label: "22 - SAFRAPAY" },
  { value: "38166", label: "38166 - PIX BACEN" },
]

const tiposPesquisa = [
  { value: "1", label: "1 - Data antecipação" },
  { value: "2", label: "2 - Data aprovação" },
  { value: "3", label: "3 - Data transação" },
  { value: "4", label: "4 - Data pagamento" },
  { value: "5", label: "5 - Data atualização" },
]

const situacoes = [
  { value: "todos", label: "Exibir Todos" },
  { value: "1", label: "1 - Aprovado" },
  { value: "2", label: "2 - Pendente" },
  { value: "3", label: "3 - Negado" },
  { value: "4", label: "4 - Processando" },
]

const tiposSolicitacao = [
  { value: "todos", label: "Exibir todos" },
  { value: "1", label: "1 - Automatico" },
  { value: "2", label: "2 - Spot" },
]

const unidades = [
  { value: "outros", label: "Outros" },
  { value: "posto", label: "Posto de gasolina" },
  { value: "farmacia", label: "Farmácia" },
]

export default function AnticipationPage() {
  const [filterAdquirente, setFilterAdquirente] = useState("todas")
  const [filterTipoPesquisa, setFilterTipoPesquisa] = useState("1")
  const [filterAgrupar, setFilterAgrupar] = useState("todos")
  const [filterSituacao, setFilterSituacao] = useState("todos")
  const [filterTipoSolicitacao, setFilterTipoSolicitacao] = useState("todos")
  const [recordsPerPage, setRecordsPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUnidade, setSelectedUnidade] = useState("outros")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const handleExportCSV = () => {
    console.log("Exportando antecipações para CSV...")
    setShowExportDropdown(false)
  }

  const handleRefresh = () => {
    console.log("Atualizando lista de antecipações...")
  }

  useEffect(() => {
    const handleClickOutside = () => setShowExportDropdown(false)
    if (showExportDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown])

  return (
    <div className="p-4">
      {/* Cabeçalho da Página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Antecipações</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Container Principal */}
      <div className="bg-white">
        {/* Aviso Informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Informação importante!</h3>
          <p className="text-sm text-blue-700">
            As antecipações disponibilizadas nessa tela são dos objetos de antecipação processados.
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Aprovado no Período</div>
              <div className="text-2xl font-bold text-gray-900">R$ 0,00</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Receita de Antecipação</div>
              <div className="text-2xl font-bold text-green-600">R$ 0,00</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Custo de Antecipação</div>
              <div className="text-2xl font-bold text-red-600">R$ 0,00</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Pendente</div>
              <div className="text-2xl font-bold text-yellow-600">R$ 0,00</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Primeira linha - Filtros principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            <select
              value={filterAdquirente}
              onChange={(e) => setFilterAdquirente(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              {adquirentes.map((adq) => (
                <option key={adq.value} value={adq.value}>
                  {adq.label}
                </option>
              ))}
            </select>

            <select
              value={filterTipoPesquisa}
              onChange={(e) => setFilterTipoPesquisa(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              {tiposPesquisa.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>

            <select
              value={filterAgrupar}
              onChange={(e) => setFilterAgrupar(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              <option value="todos">Exibir todos</option>
              <option value="1">1 - Estabelecimento</option>
            </select>

            <select
              value={filterSituacao}
              onChange={(e) => setFilterSituacao(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              {situacoes.map((sit) => (
                <option key={sit.value} value={sit.value}>
                  {sit.label}
                </option>
              ))}
            </select>

            <select
              value={filterTipoSolicitacao}
              onChange={(e) => setFilterTipoSolicitacao(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              {tiposSolicitacao.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>

            <select
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              <option value="10">10 registros</option>
              <option value="50">50 registros</option>
              <option value="100">100 registros</option>
              <option value="250">250 registros</option>
              <option value="500">500 registros</option>
            </select>
          </div>

          {/* Segunda linha - Botões de ação */}
          <div className="flex justify-end gap-2">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowExportDropdown(!showExportDropdown)
                }}
                className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
              >
                <Download className="h-3 w-3 mr-1" /> Exportar
              </button>

              {showExportDropdown && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <button
                    onClick={handleExportCSV}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    CSV
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Atualizar
            </button>
          </div>

          {/* Terceira linha - Pesquisa, unidade e filtros de data */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar por MID/CPF/NSU"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8"
              />
            </div>

            <select
              value={selectedUnidade}
              onChange={(e) => setSelectedUnidade(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8 w-40"
            >
              {unidades.map((unidade) => (
                <option key={unidade.value} value={unidade.value}>
                  {unidade.label}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data inicial"
              />

              <span className="text-sm text-gray-500">até</span>

              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data final"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Antecipações */}
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  MID
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Estabelecimento
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  NSU
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Autorização
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Parcela
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Total
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Receita
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Custo
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Líquido
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  RAV
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Dias
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Venda
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Antecipação
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Pagamento
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Situação Antecipação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {anticipationsMock.length === 0 ? (
                <tr>
                  <td colSpan={16} className="px-6 py-12 text-center text-sm text-gray-500">
                    Nenhuma informação disponível até o momento. Tente novamente mais tarde.
                  </td>
                </tr>
              ) : (
                anticipationsMock.map((anticipation: any) => (
                  <tr key={anticipation.id} className="hover:bg-gray-50">
                    {/* Aqui seriam renderizadas as linhas de dados quando houver */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Informações de paginação */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span>Mostrando 0 de 0 registros</span>
          <span>Página 0 de 0</span>
        </div>
      </div>
    </div>
  )
}
