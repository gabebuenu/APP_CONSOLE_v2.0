"use client"
import { useState, useEffect } from "react"

import { RefreshCw, AlertTriangle, FileText, Settings, Eye, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Definição de interface para tipagem
interface RPS {
  id: string
  remessa: string
  periodoInicio: string
  periodoFim: string
  quantidade: number
  valorTotal: number
  deducoes: number
}

// Dados de exemplo para os RPS
const rpsData: RPS[] = [
  {
    id: "1",
    remessa: "aaf5ac9c-279b-4f5d-bb8f-490bf6acf141",
    periodoInicio: "01/01/2025",
    periodoFim: "01/04/2025",
    quantidade: 2,
    valorTotal: 4974.13,
    deducoes: 0.0,
  },
  {
    id: "2",
    remessa: "46156b15-16cb-4811-ba04-a86f65200ec3",
    periodoInicio: "01/01/2025",
    periodoFim: "01/02/2025",
    quantidade: 2,
    valorTotal: 4945.43,
    deducoes: 0.0,
  },
  {
    id: "3",
    remessa: "68ffd138-dc96-4d1e-81c1-b31b1f2f3eaf",
    periodoInicio: "01/02/2025",
    periodoFim: "01/03/2025",
    quantidade: 1,
    valorTotal: 28.7,
    deducoes: 0.0,
  },
  {
    id: "4",
    remessa: "74685b10-4375-45a4-aa70-acd2b7a53c76",
    periodoInicio: "01/02/2025",
    periodoFim: "01/03/2025",
    quantidade: 1,
    valorTotal: 28.7,
    deducoes: 0.0,
  },
]

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase"># Remessa</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Período do RPS</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qtde</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor Total</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deduções</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 4 }).map((_, index) => (
            <tr key={index}>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-64" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 py-3">
                <Skeleton className="h-4 w-32" />
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
      {Array.from({ length: 4 }).map((_, index) => (
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

// Componente para card mobile
function MobileRPSCard({ rps }: { rps: RPS }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-3">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div>
          <div className="font-medium text-gray-900 text-xs sm:text-sm">Remessa: {rps.remessa.substring(0, 8)}...</div>
          <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">
            {rps.periodoInicio} a {rps.periodoFim}
          </div>
        </div>
        <div className="text-xs text-gray-500">Qtde: {rps.quantidade}</div>
      </div>

      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
        <div className="text-sm font-medium text-green-600">
          R$ {rps.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500">
          <span className="font-medium">Deduções:</span> R${" "}
          {rps.deducoes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors">
          <Settings className="h-3 w-3" />
          Cancelar
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
          <Eye className="h-3 w-3" />
          Visualizar
        </button>
      </div>
    </div>
  )
}

export default function SpedRPSPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [rpsData, setRpsData] = useState<RPS[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isProcessarModalOpen, setIsProcessarModalOpen] = useState(false)

  // Detectar mobile e simular carregamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Simular carregamento
    setTimeout(() => {
      setRpsData([
        {
          id: "1",
          remessa: "aaf5ac9c-279b-4f5d-bb8f-490bf6acf141",
          periodoInicio: "01/01/2025",
          periodoFim: "01/04/2025",
          quantidade: 2,
          valorTotal: 4974.13,
          deducoes: 0.0,
        },
        {
          id: "2",
          remessa: "46156b15-16cb-4811-ba04-a86f65200ec3",
          periodoInicio: "01/01/2025",
          periodoFim: "01/02/2025",
          quantidade: 2,
          valorTotal: 4945.43,
          deducoes: 0.0,
        },
        {
          id: "3",
          remessa: "68ffd138-dc96-4d1e-81c1-b31b1f2f3eaf",
          periodoInicio: "01/02/2025",
          periodoFim: "01/03/2025",
          quantidade: 1,
          valorTotal: 28.7,
          deducoes: 0.0,
        },
        {
          id: "4",
          remessa: "74685b10-4375-45a4-aa70-acd2b7a53c76",
          periodoInicio: "01/02/2025",
          periodoFim: "01/03/2025",
          quantidade: 1,
          valorTotal: 28.7,
          deducoes: 0.0,
        },
      ])
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
      setRpsData([
        {
          id: "1",
          remessa: "aaf5ac9c-279b-4f5d-bb8f-490bf6acf141",
          periodoInicio: "01/01/2025",
          periodoFim: "01/04/2025",
          quantidade: 2,
          valorTotal: 4974.13,
          deducoes: 0.0,
        },
        {
          id: "2",
          remessa: "46156b15-16cb-4811-ba04-a86f65200ec3",
          periodoInicio: "01/01/2025",
          periodoFim: "01/02/2025",
          quantidade: 2,
          valorTotal: 4945.43,
          deducoes: 0.0,
        },
        {
          id: "3",
          remessa: "68ffd138-dc96-4d1e-81c1-b31b1f2f3eaf",
          periodoInicio: "01/02/2025",
          periodoFim: "01/03/2025",
          quantidade: 1,
          valorTotal: 28.7,
          deducoes: 0.0,
        },
        {
          id: "4",
          remessa: "74685b10-4375-45a4-aa70-acd2b7a53c76",
          periodoInicio: "01/02/2025",
          periodoFim: "01/03/2025",
          quantidade: 1,
          valorTotal: 28.7,
          deducoes: 0.0,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  // Função para processar NF-e
  const handleProcessarNFe = () => {
    setIsProcessarModalOpen(true)
  }

  // Função para cancelar RPS
  const handleCancelarRPS = (id: string) => {
    console.log("Cancelando RPS:", id)
    // Implementar lógica de cancelamento
  }

  // Função para visualizar RPS
  const handleVisualizarRPS = (id: string) => {
    console.log("Visualizando RPS:", id)
    // Implementar lógica de visualização
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Sped / Transmissão automática</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Aviso sobre transmissão automática */}
      <Alert className="border-orange-200 bg-orange-50 mb-6">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>Verifique se a transmissão automática está disponível com a sua prefeitura.</strong>
        </AlertDescription>
      </Alert>

      {/* Botão Processar NF-e */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleProcessarNFe}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" /> Processar NF-e
        </button>

        <div className="flex-grow"></div>

        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
        </button>
      </div>

      {/* Título da seção */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Relação de RPS</h3>
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
                    # Remessa
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Período do RPS
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Qtde
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Valor Total
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Deduções
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rpsData.length > 0 ? (
                  rpsData.map((rps) => (
                    <tr key={rps.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm font-mono text-gray-900" title={rps.remessa}>
                        {rps.remessa}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500">
                        {rps.periodoInicio} a {rps.periodoFim}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 text-center">{rps.quantidade}</td>
                      <td className="px-3 py-3 text-sm font-medium text-green-600">
                        R$ {rps.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500">
                        R$ {rps.deducoes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCancelarRPS(rps.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
                          >
                            <Settings className="h-3 w-3" />
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleVisualizarRPS(rps.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="h-3 w-3" />
                            Visualizar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-500">
                      Nenhum RPS encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden mb-6">
            {rpsData.length > 0 ? (
              rpsData.map((rps) => <MobileRPSCard key={rps.id} rps={rps} />)
            ) : (
              <div className="text-center py-8 text-gray-500">Nenhum RPS encontrado.</div>
            )}
          </div>
        </>
      )}

      {/* Modal: Processar NF-e */}
      {isProcessarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsProcessarModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Processar NF-e</h2>
              <button
                onClick={() => setIsProcessarModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Processamento de NF-e</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Deseja iniciar o processamento das Notas Fiscais Eletrônicas para os RPS selecionados?
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Atenção:</strong> Este processo pode levar alguns minutos para ser concluído. Você será
                    notificado quando o processamento estiver finalizado.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    onClick={() => setIsProcessarModalOpen(false)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      console.log("Processando NF-e...")
                      setIsProcessarModalOpen(false)
                    }}
                    className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
                  >
                    Processar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
