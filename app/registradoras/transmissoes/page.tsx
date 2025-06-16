"use client"
import { useState, useEffect } from "react"

import { RefreshCw, AlertTriangle, Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Definição de interface para tipagem
interface Transmissao {
  id: string
  registradora: string
  tipoOperacao: string
  codigoReferencia: string
  enviadoRecebido: string
  situacao: string
  dataCadastro: string
  dataAtualizacao: string
}

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registradora</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo de Operação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cód. Referência</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enviado / Recebido</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dt. Cadastro</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dt. Atualização</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-28" />
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
            <Skeleton className="h-4 w-16" />
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

export default function TransmissoesPage() {
  const [codigoReferencia, setCodigoReferencia] = useState("")
  const [tipoData, setTipoData] = useState("criacao")
  const [dataInicio, setDataInicio] = useState("2025-06-15")
  const [dataFim, setDataFim] = useState("2025-06-15")
  const [isLoading, setIsLoading] = useState(true)
  const [transmissoes, setTransmissoes] = useState<Transmissao[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento - retorna vazio para mostrar a mensagem
    setTimeout(() => {
      setTransmissoes([]) // Array vazio para mostrar "nenhuma transmissão"
      setIsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTransmissoes([]) // Mantém vazio
      setIsLoading(false)
    }, 1000)
  }

  // Função para pesquisar
  const handlePesquisar = () => {
    setIsLoading(true)
    setTimeout(() => {
      setTransmissoes([]) // Mantém vazio
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Transmissões</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Aviso Importante */}
      <Alert className="border-orange-200 bg-orange-50 mb-6">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Aviso Importante:</strong> Registro pendente significa que foi gerada a operação, porém não há janela
          de transmissão disponível.
        </AlertDescription>
      </Alert>

      {/* Filtros */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Código de referência */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Código de referência:</label>
            <div className="relative flex items-center">
              <Search className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar código..."
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
                value={codigoReferencia}
                onChange={(e) => setCodigoReferencia(e.target.value)}
              />
            </div>
          </div>

          {/* Tipo de Data */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Dt. Criação:</label>
            <Select value={tipoData} onValueChange={setTipoData}>
              <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                <SelectValue placeholder="Tipo de data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="criacao">Data de Criação</SelectItem>
                <SelectItem value="cadastro">Data de Cadastro</SelectItem>
                <SelectItem value="atualizacao">Data de Atualização</SelectItem>
                <SelectItem value="envio">Data de Envio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data Início */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Início:</label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Data Fim */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Fim:</label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3 z-10 h-4 w-4 text-gray-400" />
              <Input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="pl-10 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
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

      {/* Título da seção */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Tabela de Registros</h3>
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
                    Registradora
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tipo de Operação
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cód. Referência
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Enviado / Recebido
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Situação
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dt. Cadastro
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dt. Atualização
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transmissoes.length > 0 ? (
                  transmissoes.map((transmissao) => (
                    <tr key={transmissao.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900">{transmissao.registradora}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.tipoOperacao}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.codigoReferencia}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.enviadoRecebido}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.situacao}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.dataCadastro}</td>
                      <td className="px-3 py-3 text-sm text-gray-500">{transmissao.dataAtualizacao}</td>
                    </tr>
                  ))
                ) : (
                  <>
                    {/* Linha com dados vazios para mostrar estrutura */}
                    <tr className="bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                      <td className="px-3 py-3 text-sm text-gray-400 text-center">(sem dados)</td>
                    </tr>
                    {/* Mensagem de nenhuma transmissão */}
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertTriangle className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 font-medium">
                            Nenhuma transmissão realizada até o momento.
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Use os filtros acima para buscar por transmissões específicas.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden mb-6">
            {transmissoes.length > 0 ? (
              transmissoes.map((transmissao) => (
                <div key={transmissao.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div>
                      <div className="font-medium text-gray-900 text-xs sm:text-sm">{transmissao.registradora}</div>
                      <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">{transmissao.tipoOperacao}</div>
                    </div>
                    <div className="text-xs text-gray-500">{transmissao.situacao}</div>
                  </div>

                  <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Cód. Ref.:</span> {transmissao.codigoReferencia}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Enviado/Recebido:</span> {transmissao.enviadoRecebido}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Cadastro:</span> {transmissao.dataCadastro}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Atualização:</span> {transmissao.dataAtualizacao}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 font-medium mb-2">Nenhuma transmissão realizada até o momento.</p>
                <p className="text-xs text-gray-400">Use os filtros acima para buscar por transmissões específicas.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
