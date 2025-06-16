"use client"
import { useState, useEffect } from "react"

import { Download, RefreshCw, Calendar, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Definição de interface para tipagem
interface Antecipacao {
  id: string
  ec: string
  razaoSocial: string
  nsuTransacao: string
  plano: string
  dataVenda: string
  dataVenc: string
  vlVenda: number
  vlBrutoParcela: number
  vlLiqParcela: number
  txRAV: number
  dias: number
  proporcionalRAV: number
  liquidoReceber: number
  selected: boolean
}

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">EC</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Razão Social</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">NSU Transação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plano</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data da Venda</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Venc.</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vl da Venda</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vl. Bruto Parcela</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vl. Liq Parcela</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tx. RAV</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dias(s)</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proporcional RAV</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Líquido à Receber</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
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

export default function AntecipacaoPage() {
  const [codigoEC, setCodigoEC] = useState("")
  const [nsuTransacao, setNsuTransacao] = useState("")
  const [dataPersonalizada, setDataPersonalizada] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [antecipacoes, setAntecipacoes] = useState<Antecipacao[]>([])

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setAntecipacoes([])
      setIsLoading(false)
    }, 1500)
  }, [])

  // Valores dos botões
  const valorPendentes = 298.18
  const valorAntecipar = 0.0

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setAntecipacoes([])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Antecipação de Recebíveis</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Avisos Importantes */}
      <div className="space-y-3 mb-6">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Aviso Importante!</strong> É necessário informar o código do estabelecimento para realizar a
            antecipação.
          </AlertDescription>
        </Alert>

        <Alert className="border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            É necessário autorizar o lote de pagamento após realizar o processo de antecipação.
          </AlertDescription>
        </Alert>
      </div>

      {/* Botões de Status */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors">
          Pendentes — R$ {valorPendentes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </button>

        <button
          disabled
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-300 rounded-lg cursor-not-allowed opacity-60"
        >
          Antecipar — R$ {valorAntecipar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </button>

        <div className="flex-grow"></div>

        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros e Campos de Busca</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Código EC:</label>
            <Input
              type="text"
              placeholder="Código do estabelecimento"
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              value={codigoEC}
              onChange={(e) => setCodigoEC(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">NSU Transação:</label>
            <Input
              type="text"
              placeholder="NSU da transação"
              className="bg-white border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
              value={nsuTransacao}
              onChange={(e) => setNsuTransacao(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200 mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  EC
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Razão Social
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  NSU Transação
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Plano
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data da Venda
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Venc.
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vl da Venda
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vl. Bruto Parcela
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vl. Liq Parcela
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tx. RAV
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Dias(s)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Proporcional RAV
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Líquido à Receber
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-orange-50">
                <td className="px-3 py-4 text-center">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
                <td className="px-3 py-4 text-center text-gray-400">-</td>
              </tr>
              <tr>
                <td colSpan={13} className="px-3 py-2 text-sm text-orange-700 bg-orange-50 border-t border-orange-200">
                  → É necessário informar o código do estabelecimento para realizar a antecipação.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Rodapé com Botões */}
      <div className="bg-gray-50 rounded-xl p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Personalizado:</label>
            <Input
              type="date"
              value={dataPersonalizada}
              onChange={(e) => setDataPersonalizada(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm w-auto"
            />
          </div>

          <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors">
            <Calendar className="h-4 w-4 mr-2" />
            Todos Pgtos
          </button>
        </div>
      </div>
    </div>
  )
}
