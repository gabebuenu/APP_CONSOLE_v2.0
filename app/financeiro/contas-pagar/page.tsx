"use client"
import { useState, useEffect } from "react"

import { Download, RefreshCw, Menu, Building2, Store } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Definição de interfaces para tipagem
interface ContaPagar {
  id: string
  mid: string
  cpfCnpj: string
  razaoSocial: string
  domicilio: string
  tipoConta: string
  conta: string
  recebimento: string
  dataPgto: string
  valorPagar: number
  selected: boolean
}

// Dados de exemplo para as contas a pagar
const contasPagarData: ContaPagar[] = [
  {
    id: "1",
    mid: "133199",
    cpfCnpj: "41016522000169",
    razaoSocial: "Teste 999...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "23423-23",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 1822.56,
    selected: false,
  },
  {
    id: "2",
    mid: "878750",
    cpfCnpj: "44561256407",
    razaoSocial: "Bruno Raul Iago De P...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "61434-4",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 7867.31,
    selected: false,
  },
  {
    id: "3",
    mid: "908505",
    cpfCnpj: "36893335806",
    razaoSocial: "Mirella Sarah Aragão...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "12353-5",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 47237.9,
    selected: false,
  },
  {
    id: "4",
    mid: "910110",
    cpfCnpj: "58729651689",
    razaoSocial: "Andrea Valentina Raf...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "12353-5",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 12668.07,
    selected: false,
  },
  {
    id: "5",
    mid: "922942",
    cpfCnpj: "61516155815",
    razaoSocial: "Davi Manoel Teixeira...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "23464-4",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 58064.11,
    selected: false,
  },
  {
    id: "6",
    mid: "981295",
    cpfCnpj: "64431661000154",
    razaoSocial: "Estabelecimento Do P...",
    domicilio: "001 - BANCO DO BRASIL",
    tipoConta: "CONTA CORRENTE",
    conta: "112332-1",
    recebimento: "TED/DOC",
    dataPgto: "15/06/2025",
    valorPagar: 37083.22,
    selected: false,
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              <Skeleton className="h-4 w-4" />
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">MID</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPF / CNPJ</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Razão Social</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domicílio</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Conta</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conta</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recebimento</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Pgto</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor à Pagar</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-4" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-40" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-36" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-28" />
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
                <Skeleton className="h-4 w-24" />
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
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-4" />
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
function MobileContaCard({
  conta,
  onToggleSelect,
}: {
  conta: ContaPagar
  onToggleSelect: (id: string) => void
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">
            MID: {conta.mid} - {conta.razaoSocial}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">CPF/CNPJ: {conta.cpfCnpj}</div>
        </div>
        <Checkbox checked={conta.selected} onCheckedChange={() => onToggleSelect(conta.id)} className="mt-1" />
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Domicílio:</span> {conta.domicilio}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Conta:</span> {conta.tipoConta} - {conta.conta}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Recebimento:</span> {conta.recebimento}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Data Pgto:</span> {conta.dataPgto}
        </div>
        <div className="text-sm font-medium text-green-600">
          R$ {conta.valorPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  )
}

export default function PagamentosPage() {
  const [searchTermUnidade, setSearchTermUnidade] = useState("")
  const [searchTermLoja, setSearchTermLoja] = useState("")
  const [filtroSelecionado, setFiltroSelecionado] = useState("Todos")
  const [dataInicio, setDataInicio] = useState("2025-06-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [contas, setContas] = useState<ContaPagar[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setContas(contasPagarData)
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Função para alternar seleção de conta
  const handleToggleSelect = (id: string) => {
    setContas(contas.map((conta) => (conta.id === id ? { ...conta, selected: !conta.selected } : conta)))
  }

  // Função para selecionar/deselecionar todas
  const handleToggleSelectAll = () => {
    const allSelected = contas.every((conta) => conta.selected)
    setContas(contas.map((conta) => ({ ...conta, selected: !allSelected })))
  }

  // Calcular totais
  const contasSelecionadas = contas.filter((conta) => conta.selected)
  const valorSelecionado = contasSelecionadas.reduce((sum, conta) => sum + conta.valorPagar, 0)
  const totalVendas = 177946.51
  const lancamentos = -26628.99
  const totalPagarEC = 164743.17

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setContas(contasPagarData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Contas a pagar</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>
      {/* Top Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors">
          <Menu className="h-4 w-4 mr-2" /> Pagamentos detalhados
        </button>

        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors">
          Pagamentos consolidados
        </button>

        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors">
          Consultar Pgtos
        </button>

        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors">
          Autorizar
        </button>

        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors">
          Processar Pgtos
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
          <h3 className="text-sm font-medium text-gray-700">Contas A Pagar</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <Download className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <Select value={filtroSelecionado} onValueChange={setFiltroSelecionado}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pendentes">Pendentes</SelectItem>
                <SelectItem value="Processados">Processados</SelectItem>
                <SelectItem value="Autorizados">Autorizados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex items-center">
            <Building2 className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Selecione uma unidade"
              className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTermUnidade}
              onChange={(e) => setSearchTermUnidade(e.target.value)}
            />
          </div>

          <div className="relative flex items-center">
            <Store className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar por Loja..."
              className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTermLoja}
              onChange={(e) => setSearchTermLoja(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Data:</label>
            <Input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">até</label>
            <Input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm"
            />
          </div>
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
          <div className="hidden md:block overflow-x-auto rounded border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <Checkbox
                      checked={contas.length > 0 && contas.every((conta) => conta.selected)}
                      onCheckedChange={handleToggleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    MID
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    CPF / CNPJ
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Razão Social
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Domicílio
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tipo Conta
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Conta
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Recebimento
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Data Pgto
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Valor à Pagar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contas.length > 0 ? (
                  contas.map((conta) => (
                    <tr key={conta.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3">
                        <Checkbox checked={conta.selected} onCheckedChange={() => handleToggleSelect(conta.id)} />
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-900">{conta.mid}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.cpfCnpj}</td>
                      <td className="px-3 py-3 text-sm text-gray-900 truncate" title={conta.razaoSocial}>
                        {conta.razaoSocial}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.domicilio}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.tipoConta}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.conta}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.recebimento}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{conta.dataPgto}</td>
                      <td className="px-3 py-3 text-sm font-medium text-green-600">
                        R$ {conta.valorPagar.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhuma conta a pagar encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden mb-6">
            {contas.length > 0 ? (
              contas.map((conta) => (
                <MobileContaCard key={conta.id} conta={conta} onToggleSelect={handleToggleSelect} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhuma conta a pagar encontrada.</div>
            )}
          </div>
        </>
      )}

      {/* Rodapé com Totalizadores */}
      <div className="bg-gray-50 rounded-xl p-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-gray-600">
            <span className="font-medium">
              R$ {valorSelecionado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-gray-500 ml-1">— Selecionado(s)</span>
          </div>

          <div className="text-blue-600">
            <span className="font-medium">R$ {totalVendas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            <span className="text-gray-500 ml-1">— Total de Vendas</span>
          </div>

          <div className="text-red-600">
            <span className="font-medium">R$ {lancamentos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            <span className="text-gray-500 ml-1">— Lançamentos</span>
          </div>

          <div className="text-green-600">
            <span className="font-medium">R$ {totalPagarEC.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            <span className="text-gray-500 ml-1">— Total a Pagar EC</span>
          </div>
        </div>
      </div>
    </div>
  )
}
