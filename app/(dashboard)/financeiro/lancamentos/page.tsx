"use client"
import { useState, useEffect } from "react"

import { RefreshCw, Search, AlertTriangle, Plus, X, RotateCcw, Check, Ban, Building2, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

// Definição de interfaces para tipagem
interface Lancamento {
  id: string
  razaoSocial: string
  codigo: string
  parcela: string
  dataLancamento: string
  dataVencimento: string
  dataPagamento: string
  valorLancamento: number
  valorPago: number
  situacao: "Pend. Aprovação" | "Vencido" | "Pago" | "Cancelado"
  vencido?: boolean
}

// Dados de exemplo para os lançamentos
const lancamentosData: Lancamento[] = [
  {
    id: "1",
    razaoSocial: "EMPRESA TESTE LTDA",
    codigo: "AJ",
    parcela: "1/1",
    dataLancamento: "02/06/2025",
    dataVencimento: "02/06/2025",
    dataPagamento: "-",
    valorLancamento: 50.0,
    valorPago: 0.0,
    situacao: "Pend. Aprovação",
  },
  {
    id: "2",
    razaoSocial: "MovingAle",
    codigo: "DM",
    parcela: "1/1",
    dataLancamento: "05/06/2025",
    dataVencimento: "05/06/2025",
    dataPagamento: "-",
    valorLancamento: -50.0,
    valorPago: 0.0,
    situacao: "Vencido",
    vencido: true,
  },
  {
    id: "3",
    razaoSocial: "teste mudança nome",
    codigo: "DM",
    parcela: "1/1",
    dataLancamento: "05/06/2025",
    dataVencimento: "05/06/2025",
    dataPagamento: "-",
    valorLancamento: -0.02,
    valorPago: 0.0,
    situacao: "Vencido",
    vencido: true,
  },
  {
    id: "4",
    razaoSocial: "teste mudança nome",
    codigo: "DM",
    parcela: "1/1",
    dataLancamento: "05/06/2025",
    dataVencimento: "05/06/2025",
    dataPagamento: "-",
    valorLancamento: -1.23,
    valorPago: 0.0,
    situacao: "Vencido",
    vencido: true,
  },
  {
    id: "5",
    razaoSocial: "Alicia",
    codigo: "DM",
    parcela: "1/1",
    dataLancamento: "05/06/2025",
    dataVencimento: "05/06/2025",
    dataPagamento: "-",
    valorLancamento: -5.0,
    valorPago: 0.0,
    situacao: "Vencido",
    vencido: true,
  },
  {
    id: "6",
    razaoSocial: "TESTE 01",
    codigo: "DM",
    parcela: "1/1",
    dataLancamento: "05/06/2025",
    dataVencimento: "05/06/2025",
    dataPagamento: "-",
    valorLancamento: -1.0,
    valorPago: 0.0,
    situacao: "Vencido",
    vencido: true,
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Razão Social</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parc.</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Lançamento</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Vencimento</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Pagamento</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Lançamento</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Pago</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Componente para card de valor
function ValueCard({
  title,
  value,
  color = "text-gray-900",
}: {
  title: string
  value: number
  color?: string
}) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="text-xs text-gray-500 mb-1">→</div>
      <div className={`text-lg font-semibold ${color}`}>
        R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-gray-600 mt-1">{title}</div>
    </div>
  )
}

export default function LancamentosPage() {
  const [codigoEC, setCodigoEC] = useState("")
  const [nsuLancamento, setNsuLancamento] = useState("")
  const [idTransacao, setIdTransacao] = useState("")
  const [unidade, setUnidade] = useState("")
  const [dataInicio, setDataInicio] = useState("2025-06-01")
  const [dataFim, setDataFim] = useState("2025-06-30")
  const [isLoading, setIsLoading] = useState(true)
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [isNovoLancamentoModalOpen, setIsNovoLancamentoModalOpen] = useState(false)
  const [novoLancamentoData, setNovoLancamentoData] = useState({
    estabelecimento: "",
    codigoLancamento: "",
    tipoLancamento: "",
    nsuTransacao: "",
    valorTotal: "",
    quantidadeParcelas: "1",
    dataVencimento: "2025-06-15",
    periodicidade: "mensal",
    motivo: "",
  })

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setLancamentos(lancamentosData)
      setIsLoading(false)
    }, 1500)
  }, [])

  // Valores da visão geral
  const lancamentosCredito = 10657.8
  const lancamentosDebito = 13437.54
  const lancamentosVencidos = -26625.99
  const lancamentosVencer = 0.0

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setLancamentos(lancamentosData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para pesquisar
  const handlePesquisar = () => {
    setIsLoading(true)
    setTimeout(() => {
      setLancamentos(lancamentosData)
      setIsLoading(false)
    }, 1000)
  }

  // Função para cadastrar novo lançamento
  const handleCadastrarLancamento = () => {
    console.log("Cadastrando lançamento:", novoLancamentoData)
    setIsNovoLancamentoModalOpen(false)
    // Reset form
    setNovoLancamentoData({
      estabelecimento: "",
      codigoLancamento: "",
      tipoLancamento: "",
      nsuTransacao: "",
      valorTotal: "",
      quantidadeParcelas: "1",
      dataVencimento: "2025-06-15",
      periodicidade: "mensal",
      motivo: "",
    })
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Painel Principal – Lançamentos</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Informação Importante */}
      <Alert className="border-blue-200 bg-blue-50 mb-6">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Informação Importante:</strong> Os lançamentos são aplicados no momento da autorização no Contas a
          Pagar.
        </AlertDescription>
      </Alert>

      {/* Visão Geral */}
      <div className="bg-green-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-green-900">Visão Geral</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ValueCard title="Lançamentos à Crédito" value={lancamentosCredito} color="text-green-600" />
          <ValueCard title="Lançamentos à Débito" value={lancamentosDebito} color="text-red-600" />
          <ValueCard title="Lançamentos Vencidos" value={lancamentosVencidos} color="text-red-600" />
          <ValueCard title="Lançamentos à Vencer" value={lancamentosVencer} color="text-gray-600" />
        </div>
      </div>

      {/* Alerta de Lançamentos Pendentes */}
      <Alert className="border-orange-200 bg-orange-50 mb-6">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>LANÇAMENTOS PENDENTES:</strong> Existem lançamentos pendentes que necessitam de sua aprovação para
          serem descontados ou creditados.
        </AlertDescription>
      </Alert>

      {/* Botão Novo Lançamento */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsNovoLancamentoModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Novo Lançamento
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Código do EC:</label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Código do estabelecimento"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                value={codigoEC}
                onChange={(e) => setCodigoEC(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">NSU Lançamento:</label>
            <Input
              type="text"
              placeholder="NSU do lançamento"
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              value={nsuLancamento}
              onChange={(e) => setNsuLancamento(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">ID Transação:</label>
            <Input
              type="text"
              placeholder="ID da transação"
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              value={idTransacao}
              onChange={(e) => setIdTransacao(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Unidade:</label>
            <div className="relative flex items-center">
              <Store className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Selecione a unidade"
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Período:</label>
            <div className="flex gap-2">
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg text-sm"
              />
              <span className="text-xs text-gray-500 self-center">até</span>
              <Input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePesquisar}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
          >
            <Search className="h-4 w-4 mr-2" /> Pesquisar
          </button>

          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </button>
        </div>
      </div>

      {/* Tabela de Lançamentos */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Razão Social
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Código
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Parc.
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Lançamento
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Vencimento
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Pagamento
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Lançamento
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor Pago
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Situação
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Gerenciamento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lancamentos.length > 0 ? (
                lancamentos.map((lancamento) => (
                  <tr key={lancamento.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm text-gray-900">{lancamento.razaoSocial}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lancamento.codigo}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lancamento.parcela}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lancamento.dataLancamento}</td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      {lancamento.vencido && <AlertTriangle className="h-4 w-4 text-red-500 inline mr-1" />}
                      {lancamento.dataVencimento}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">{lancamento.dataPagamento}</td>
                    <td className="px-3 py-3 text-sm font-medium">
                      <span className={lancamento.valorLancamento < 0 ? "text-red-600" : "text-green-600"}>
                        R$ {lancamento.valorLancamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-500">
                      R$ {lancamento.valorPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          lancamento.situacao === "Pend. Aprovação"
                            ? "bg-yellow-100 text-yellow-800"
                            : lancamento.situacao === "Vencido"
                              ? "bg-red-100 text-red-800"
                              : lancamento.situacao === "Pago"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {lancamento.situacao === "Pend. Aprovação" && "🟨 "}
                        {lancamento.situacao === "Vencido" && "🔴 "}
                        {lancamento.situacao}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <div className="flex gap-1">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                          title="Reprocessar"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800 focus:outline-none" title="Aprovar">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 focus:outline-none" title="Cancelar">
                          <Ban className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-3 py-6 text-center text-sm text-gray-500">
                    Nenhum lançamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Novo Lançamento */}
      {isNovoLancamentoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsNovoLancamentoModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Novo Lançamento</h2>
              <button
                onClick={() => setIsNovoLancamentoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Informação Importante */}
              <Alert className="border-blue-200 bg-blue-50 mb-6">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Informação Importante:</strong> O desconto ocorrerá na data de vencimento. Em caso de saldo
                  insuficiente, o desconto será realizado até a quitação.
                </AlertDescription>
              </Alert>

              <form className="space-y-4">
                {/* Estabelecimento (MID) */}
                <div>
                  <label htmlFor="estabelecimento" className="text-sm font-medium text-gray-700">
                    Estabelecimento (MID) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="estabelecimento"
                    type="text"
                    value={novoLancamentoData.estabelecimento}
                    onChange={(e) => setNovoLancamentoData({ ...novoLancamentoData, estabelecimento: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Buscar estabelecimento..."
                    required
                  />
                </div>

                {/* Código de Lançamento */}
                <div>
                  <label htmlFor="codigoLancamento" className="text-sm font-medium text-gray-700">
                    Código de Lançamento <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={novoLancamentoData.codigoLancamento}
                    onValueChange={(value) => setNovoLancamentoData({ ...novoLancamentoData, codigoLancamento: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AJ">AJ - Ajuste</SelectItem>
                      <SelectItem value="DM">DM - Débito Manual</SelectItem>
                      <SelectItem value="CM">CM - Crédito Manual</SelectItem>
                      <SelectItem value="TX">TX - Taxa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de lançamento */}
                <div>
                  <label htmlFor="tipoLancamento" className="text-sm font-medium text-gray-700">
                    Tipo de lançamento <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={novoLancamentoData.tipoLancamento}
                    onValueChange={(value) => setNovoLancamentoData({ ...novoLancamentoData, tipoLancamento: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credito">Crédito</SelectItem>
                      <SelectItem value="debito">Débito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NSU da Transação */}
                <div>
                  <label htmlFor="nsuTransacao" className="text-sm font-medium text-gray-700">
                    NSU da Transação
                  </label>
                  <Input
                    id="nsuTransacao"
                    type="text"
                    value={novoLancamentoData.nsuTransacao}
                    onChange={(e) => setNovoLancamentoData({ ...novoLancamentoData, nsuTransacao: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="NSU da transação"
                  />
                </div>

                {/* Valor Total */}
                <div>
                  <label htmlFor="valorTotal" className="text-sm font-medium text-gray-700">
                    Valor Total (R$) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="valorTotal"
                      type="text"
                      value={novoLancamentoData.valorTotal}
                      onChange={(e) => setNovoLancamentoData({ ...novoLancamentoData, valorTotal: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>

                {/* Quantidade de Parcelas */}
                <div>
                  <label htmlFor="quantidadeParcelas" className="text-sm font-medium text-gray-700">
                    Quantidade de Parcelas <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="quantidadeParcelas"
                    type="number"
                    value={novoLancamentoData.quantidadeParcelas}
                    onChange={(e) =>
                      setNovoLancamentoData({ ...novoLancamentoData, quantidadeParcelas: e.target.value })
                    }
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    min="1"
                    required
                  />
                </div>

                {/* Data de Vencimento */}
                <div>
                  <label htmlFor="dataVencimento" className="text-sm font-medium text-gray-700">
                    Data de Vencimento (1ª Parcela) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="dataVencimento"
                    type="date"
                    value={novoLancamentoData.dataVencimento}
                    onChange={(e) => setNovoLancamentoData({ ...novoLancamentoData, dataVencimento: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Periodicidade */}
                <div>
                  <label htmlFor="periodicidade" className="text-sm font-medium text-gray-700">
                    Periodicidade <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={novoLancamentoData.periodicidade}
                    onValueChange={(value) => setNovoLancamentoData({ ...novoLancamentoData, periodicidade: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensal">Mensal</SelectItem>
                      <SelectItem value="quinzenal">Quinzenal</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="diario">Diário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Motivo / Descrição */}
                <div>
                  <label htmlFor="motivo" className="text-sm font-medium text-gray-700">
                    Motivo / Descrição <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="motivo"
                    value={novoLancamentoData.motivo}
                    onChange={(e) => setNovoLancamentoData({ ...novoLancamentoData, motivo: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Descreva o motivo do lançamento (até 255 caracteres)"
                    maxLength={255}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{novoLancamentoData.motivo.length}/255 caracteres</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsNovoLancamentoModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={handleCadastrarLancamento}
                    className="px-4 py-2 text-xs sm:text-sm bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 order-1 sm:order-2"
                  >
                    Cadastrar
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
