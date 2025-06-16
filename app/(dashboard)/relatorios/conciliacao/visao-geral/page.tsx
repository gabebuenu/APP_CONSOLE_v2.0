"use client"

import { useState, useEffect } from "react"
import { Search, Download, RefreshCw, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const salesMock: any[] = [
  // Dados mock vazios para mostrar a mensagem de "nenhuma transação encontrada"
]

const unidades = [
  { value: "outros", label: "Outros" },
  { value: "posto", label: "Posto de gasolina" },
  { value: "farmacia", label: "Farmácia" },
]

export default function SalesDashboardPage() {
  const [searchClient, setSearchClient] = useState("")
  const [searchNSU, setSearchNSU] = useState("")
  const [selectedUnidade, setSelectedUnidade] = useState("outros")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const handleExportCSV = () => {
    console.log("Exportando vendas para CSV...")
    setShowExportDropdown(false)
  }

  const handleRefresh = () => {
    console.log("Atualizando dashboard de vendas...")
  }

  const handleSendEDI = () => {
    console.log("Enviando EDI...")
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
        <h2 className="text-sm font-medium text-gray-900 mb-1">Dashboard de Vendas</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Filtros e Controles */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Filtrar</h3>

        <div className="flex flex-col gap-4">
          {/* Primeira linha - Campos de pesquisa e unidade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar cliente"
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
                className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-8"
              />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar por NSU"
                value={searchNSU}
                onChange={(e) => setSearchNSU(e.target.value)}
                className="pl-10 bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-8"
              />
            </div>

            <select
              value={selectedUnidade}
              onChange={(e) => setSelectedUnidade(e.target.value)}
              className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              {unidades.map((unidade) => (
                <option key={unidade.value} value={unidade.value}>
                  {unidade.label}
                </option>
              ))}
            </select>
          </div>

          {/* Segunda linha - Filtros de data e botões */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data inicial"
              />

              <span className="text-sm text-gray-500">até</span>

              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data final"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSendEDI}
                className="flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors h-8"
              >
                <Send className="h-3 w-3 mr-1" /> Enviar EDI
              </button>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowExportDropdown(!showExportDropdown)
                  }}
                  className="flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
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
                className="flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aviso Informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Atenção para o período selecionado!</h3>
        <p className="text-sm text-blue-700">
          Todas as informações disponibilizadas neste dashboard se referem ao período selecionado no menu superior.
        </p>
      </div>

      {/* Cards de Resumo das Vendas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo das vendas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Resumo Geral</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500">Total de vendas</div>
              <div className="text-lg font-semibold text-gray-700">0</div>
              <div className="text-xs text-gray-500">Qtde de vendas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Débito à vista</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500">Total de vendas</div>
              <div className="text-lg font-semibold text-gray-700">0</div>
              <div className="text-xs text-gray-500">Qtde de vendas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Crédito à vista</div>
              <div className="text-2xl font-bold text-green-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500">Total de vendas</div>
              <div className="text-lg font-semibold text-gray-700">0</div>
              <div className="text-xs text-gray-500">Qtde de vendas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Crédito Parcelado</div>
              <div className="text-2xl font-bold text-purple-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500">Total de vendas</div>
              <div className="text-lg font-semibold text-gray-700">0</div>
              <div className="text-xs text-gray-500">Qtde de vendas</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Agenda Estabelecimento</div>
              <div className="text-xl font-bold text-green-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-1">Valor Pago</div>
              <div className="text-xl font-bold text-orange-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-2">Valor à Pagar</div>
              <div className="text-xs text-gray-400">Valor Líquido Pago / à Pagar EC no período.</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">Bandeira / Adquirente</div>
              <div className="text-xl font-bold text-red-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-1">Custo MDR</div>
              <div className="text-xl font-bold text-red-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-2">Custo ICC</div>
              <div className="text-xs text-gray-400">O custo IC Fee está incluso no MDR.</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">MDR / Antecipação EC</div>
              <div className="text-xl font-bold text-green-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-1">Receita MDR</div>
              <div className="text-xl font-bold text-green-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-2">Receita RAV</div>
              <div className="text-xs text-gray-400">MDR e RAV descontados do EC.</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-1">MDR / Antecipação Líquido</div>
              <div className="text-xl font-bold text-blue-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-1">MDR</div>
              <div className="text-xl font-bold text-blue-600 mb-1">R$ 0,00</div>
              <div className="text-xs text-gray-500 mb-2">Antecipação</div>
              <div className="text-xs text-gray-400">Spread Líquido no período.</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabela de Detalhamento das Vendas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhamento das vendas</h3>
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  EC / MID
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Adquirente
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Bandeira
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  NSU Trans.
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Total
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Parcelas
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Produto
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Situação
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Receita MDR
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Custo MDR
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Custo Antec.
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Receita Antec.
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Spread (MDR + RAV)
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data da venda
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Conta Adiq.
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Adquirente
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesMock.length === 0 ? (
                <tr>
                  <td colSpan={16} className="px-6 py-12 text-center text-sm text-gray-500">
                    Nenhuma transação encontrada até o momento.
                  </td>
                </tr>
              ) : (
                salesMock.map((sale: any) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    {/* Aqui seriam renderizadas as linhas de dados quando houver */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informações de paginação */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Mostrando 0 de 0 registros</span>
        <span>Página 0 de 0</span>
      </div>
    </div>
  )
}
