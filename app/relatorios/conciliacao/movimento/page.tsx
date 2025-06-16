"use client"

import { useState, useEffect } from "react"
import { Search, Download, RefreshCw, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const adjustmentsMock: any[] = [
  // Dados mock vazios para mostrar a mensagem de "nenhum lançamento encontrado"
]

const adquirentes = [
  { value: "todas", label: "Todas" },
  { value: "stone", label: "Stone" },
  { value: "cielo", label: "Cielo" },
  { value: "rede", label: "Rede" },
  { value: "getnet", label: "Getnet" },
]

const tiposAjuste = [
  { value: "todos", label: "Todos" },
  { value: "credito", label: "Ajuste à Crédito" },
  { value: "debito", label: "Ajuste à Débito" },
  { value: "cancelamento", label: "Cancelamento" },
  { value: "chargeback", label: "Chargeback" },
]

const lancamentos = [
  { value: "todos", label: "Todos" },
  { value: "confirmado", label: "Confirmado" },
  { value: "previsto", label: "Previsto" },
  { value: "informativo", label: "Informativo" },
]

const previsoes = [
  { value: "todas", label: "Todas" },
  { value: "liquidacao_normal", label: "Liquidação Normal" },
  { value: "liquidacao_antecipada", label: "Liquidação Antecipada" },
  { value: "em_aberto", label: "Em Aberto" },
]

export default function AdjustmentsPage() {
  const [searchNSUAjuste, setSearchNSUAjuste] = useState("")
  const [searchNSUTransacao, setSearchNSUTransacao] = useState("")
  const [filterAdquirente, setFilterAdquirente] = useState("todas")
  const [filterTipoAjuste, setFilterTipoAjuste] = useState("todos")
  const [filterLancamento, setFilterLancamento] = useState("todos")
  const [filterPrevisao, setFilterPrevisao] = useState("todas")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleExportCSV = () => {
    console.log("Exportando ajustes para CSV...")
    setShowExportDropdown(false)
  }

  const handleExportExcel = () => {
    console.log("Exportando relatório para Excel...")
  }

  const handleRefresh = () => {
    console.log("Atualizando ajustes...")
  }

  const handleClearFilters = () => {
    setSearchNSUAjuste("")
    setSearchNSUTransacao("")
    setFilterAdquirente("todas")
    setFilterTipoAjuste("todos")
    setFilterLancamento("todos")
    setFilterPrevisao("todas")
    setDateFrom("")
    setDateTo("")
  }

  useEffect(() => {
    const handleClickOutside = () => setShowExportDropdown(false)
    if (showExportDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown])

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da Página */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-1">Ajustes e Lançamentos</h2>
            <p className="text-xs text-gray-500">Tela Inicial</p>
          </div>
          {/* Botão Mobile para Filtros */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      {/* Aviso Informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Necessita de maiores informações?</h3>
        <p className="text-sm text-blue-700">Você pode exportar um relatório em Excel com informações adicionais.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de Filtros - Desktop */}
        <div className="hidden lg:block w-80 bg-gray-50 rounded-xl p-4 h-fit">
          <div className="space-y-4">
            {/* Campos de Pesquisa */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar NSU do Ajuste"
                value={searchNSUAjuste}
                onChange={(e) => setSearchNSUAjuste(e.target.value)}
                className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-10"
              />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar NSU da Transação"
                value={searchNSUTransacao}
                onChange={(e) => setSearchNSUTransacao(e.target.value)}
                className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-10"
              />
            </div>

            {/* Filtros Dropdown */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Adquirente</label>
              <select
                value={filterAdquirente}
                onChange={(e) => setFilterAdquirente(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {adquirentes.map((adq) => (
                  <option key={adq.value} value={adq.value}>
                    {adq.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo Ajuste</label>
              <select
                value={filterTipoAjuste}
                onChange={(e) => setFilterTipoAjuste(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {tiposAjuste.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Lançamento</label>
              <select
                value={filterLancamento}
                onChange={(e) => setFilterLancamento(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {lancamentos.map((lanc) => (
                  <option key={lanc.value} value={lanc.value}>
                    {lanc.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Previsão</label>
              <select
                value={filterPrevisao}
                onChange={(e) => setFilterPrevisao(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {previsoes.map((prev) => (
                  <option key={prev.value} value={prev.value}>
                    {prev.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtros de Data */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Data inicial"
                />
                <div className="text-center text-xs text-gray-500">até</div>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Data final"
                />
              </div>
            </div>

            {/* Botão Limpar Filtros */}
            <button
              onClick={handleClearFilters}
              className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" /> Limpar Filtros
            </button>

            {/* Seção Exportação */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Exportação</h4>
              <div className="space-y-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                >
                  CSV
                  <Download className="h-4 w-4 text-blue-500" />
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                >
                  Excel
                  <Download className="h-4 w-4 text-green-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros Mobile - Overlay */}
        {isMobileFiltersOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Campos de Pesquisa Mobile */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Pesquisar NSU do Ajuste"
                      value={searchNSUAjuste}
                      onChange={(e) => setSearchNSUAjuste(e.target.value)}
                      className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Pesquisar NSU da Transação"
                      value={searchNSUTransacao}
                      onChange={(e) => setSearchNSUTransacao(e.target.value)}
                      className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-10"
                    />
                  </div>

                  {/* Filtros Dropdown Mobile */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Adquirente</label>
                    <select
                      value={filterAdquirente}
                      onChange={(e) => setFilterAdquirente(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {adquirentes.map((adq) => (
                        <option key={adq.value} value={adq.value}>
                          {adq.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo Ajuste</label>
                    <select
                      value={filterTipoAjuste}
                      onChange={(e) => setFilterTipoAjuste(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {tiposAjuste.map((tipo) => (
                        <option key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Lançamento</label>
                    <select
                      value={filterLancamento}
                      onChange={(e) => setFilterLancamento(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {lancamentos.map((lanc) => (
                        <option key={lanc.value} value={lanc.value}>
                          {lanc.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Previsão</label>
                    <select
                      value={filterPrevisao}
                      onChange={(e) => setFilterPrevisao(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      {previsoes.map((prev) => (
                        <option key={prev.value} value={prev.value}>
                          {prev.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtros de Data Mobile */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Período</label>
                    <div className="space-y-2">
                      <Input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Data inicial"
                      />
                      <div className="text-center text-xs text-gray-500">até</div>
                      <Input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Data final"
                      />
                    </div>
                  </div>

                  {/* Botão Limpar Filtros Mobile */}
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
                  >
                    <Filter className="h-4 w-4 mr-2" /> Limpar Filtros
                  </button>

                  {/* Seção Exportação Mobile */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Exportação</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleExportCSV()
                          setIsMobileFiltersOpen(false)
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                      >
                        CSV
                        <Download className="h-4 w-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          handleExportExcel()
                          setIsMobileFiltersOpen(false)
                        }}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                      >
                        Excel
                        <Download className="h-4 w-4 text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="flex-1 min-w-0">
          {/* Botão Atualizar */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
            </button>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {/* Total Lançamentos - Ajuste à Crédito */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total Lançamentos - Ajuste à Crédito</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Confirmado</span>
                    <span className="text-sm font-semibold text-green-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Previsto</span>
                    <span className="text-sm font-semibold text-yellow-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Informativo</span>
                    <span className="text-sm font-semibold text-blue-600">R$ 0,00</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Lançamentos - Ajuste à Débito */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total Lançamentos - Ajuste à Débito</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Confirmado</span>
                    <span className="text-sm font-semibold text-red-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Previsto</span>
                    <span className="text-sm font-semibold text-yellow-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Informativo</span>
                    <span className="text-sm font-semibold text-blue-600">R$ 0,00</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Lançamentos - Saldo */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total Lançamentos - Saldo</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Confirmado</span>
                    <span className="text-sm font-semibold text-green-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Previsto</span>
                    <span className="text-sm font-semibold text-yellow-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Informativo</span>
                    <span className="text-sm font-semibold text-blue-600">R$ 0,00</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Recebimentos Transações */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total Recebimentos Transações</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Liquidação Normal</span>
                    <span className="text-sm font-semibold text-green-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Liquidação Antecipada</span>
                    <span className="text-sm font-semibold text-blue-600">R$ 0,00</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Desagendado */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total Desagendado</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Cancelamento</span>
                    <span className="text-sm font-semibold text-red-600">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Chargeback</span>
                    <span className="text-sm font-semibold text-red-600">R$ 0,00</span>
                  </div>
                  <div className="border-t pt-1 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total</span>
                      <span className="text-lg font-bold text-gray-900">R$ 0,00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total a Receber da Adquirente */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Total a Receber da Adquirente</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Total Em aberto</span>
                    <span className="text-lg font-bold text-orange-600">R$ 0,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Ajustes */}
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Adquirente
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Código
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    NSU Transação
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    NSU Ajuste
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Parcela
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Valor
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Taxa
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Vl Líquido
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Data do Ajuste
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Data Desconto
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    Previsão
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adjustmentsMock.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="px-6 py-12 text-center text-sm text-gray-500">
                      Não encontramos nenhum lançamento até o momento.
                    </td>
                  </tr>
                ) : (
                  adjustmentsMock.map((adjustment: any) => (
                    <tr key={adjustment.id} className="hover:bg-gray-50">
                      {/* Aqui seriam renderizadas as linhas de dados quando houver */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Informações de paginação */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
            <span>Mostrando 0 de 0 registros</span>
            <span>Página 0 de 0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
