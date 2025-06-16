"use client"
import { useState } from "react"

import { Search, FileText, AlertTriangle, Download, RefreshCw, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definição de interfaces para tipagem
interface RendimentoImposto {
  id: string
  mes: string
  descricaoRetencao: string
  rendimento: number
  impostoRetido: number
}

interface InformacoesAdicionais {
  cnpj: string
  fontePagadora: string
  endereco: string
  cpfCnpjBeneficiario: string
  beneficiario: string
  responsavelInformacoes: string
  telefone: string
}

// Dados de exemplo (vazio conforme especificado)
const rendimentosImpostosData: RendimentoImposto[] = []

// Dados das informações adicionais (vazios conforme especificado)
const informacoesAdicionaisData: InformacoesAdicionais = {
  cnpj: "",
  fontePagadora: "",
  endereco: "",
  cpfCnpjBeneficiario: "",
  beneficiario: "",
  responsavelInformacoes: "",
  telefone: "",
}

// Componente de Skeleton para a tabela
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: 4 }).map((_, index) => (
              <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Componente de Skeleton para informações adicionais
function InformacoesAdicionaisSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InformeRendimentosPage() {
  const [cpfCnpj, setCpfCnpj] = useState("")
  const [anoReferencia, setAnoReferencia] = useState("2024")
  const [aliquota, setAliquota] = useState("1.5")
  const [isLoading, setIsLoading] = useState(false)
  const [rendimentos, setRendimentos] = useState<RendimentoImposto[]>([])
  const [informacoesAdicionais, setInformacoesAdicionais] = useState<InformacoesAdicionais>(informacoesAdicionaisData)
  const [hasSearched, setHasSearched] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Função para pesquisar
  const handleSearch = () => {
    if (!cpfCnpj.trim()) {
      alert("CPF/CNPJ é obrigatório!")
      return
    }

    if (!anoReferencia) {
      alert("Ano de Referência é obrigatório!")
      return
    }

    if (!aliquota) {
      alert("Alíquota é obrigatória!")
      return
    }

    setIsLoading(true)
    setHasSearched(false)

    // Simular pesquisa
    setTimeout(() => {
      setRendimentos(rendimentosImpostosData)
      setInformacoesAdicionais(informacoesAdicionaisData)
      setIsLoading(false)
      setHasSearched(true)
    }, 2000)
  }

  // Função para gerar PDF
  const handleGeneratePDF = () => {
    if (!hasSearched) {
      alert("Realize uma pesquisa primeiro!")
      return
    }

    setIsGeneratingPDF(true)

    // Simular geração de PDF
    setTimeout(() => {
      console.log("Gerando PDF do informe de rendimentos...")
      setIsGeneratingPDF(false)
      // Implementação futura
    }, 2000)
  }

  // Função para atualizar informações adicionais
  const handleUpdateInformacoes = (field: keyof InformacoesAdicionais, value: string) => {
    setInformacoesAdicionais((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Informe de rendimentos Pessoa Física ou Jurídica
        </h2>
        <p className="text-sm text-gray-600">
          Comprovante anual de rendimentos pagos ou creditados e de retenção na fonte.
        </p>
      </div>

      {/* Campos de pesquisa */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Campos de pesquisa
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                CPF / CNPJ (sem pontos ou traços)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="text"
                placeholder="Digite o CPF ou CNPJ"
                className="w-full focus:ring-blue-500 focus:border-blue-500"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value.replace(/\D/g, ""))}
                maxLength={14}
              />
              <p className="text-xs text-gray-500 mt-1">Apenas números</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Ano de Referência
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select value={anoReferencia} onValueChange={setAnoReferencia}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Alíquota
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Select value={aliquota} onValueChange={setAliquota}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a alíquota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5">1,5%</SelectItem>
                  <SelectItem value="3.0">3,0%</SelectItem>
                  <SelectItem value="4.5">4,5%</SelectItem>
                  <SelectItem value="6.0">6,0%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#169BFF] hover:bg-[#169affb2] text-white px-6 py-2 text-sm font-medium"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Pesquisando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisar
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      {(isLoading || hasSearched) && (
        <div className="mb-6">
          {isLoading ? (
            <InformacoesAdicionaisSkeleton />
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Informações adicionais
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CNPJ</label>
                  <Input
                    type="text"
                    placeholder="Digite o CNPJ"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.cnpj}
                    onChange={(e) => handleUpdateInformacoes("cnpj", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Fonte pagadora</label>
                  <Input
                    type="text"
                    placeholder="Digite a fonte pagadora"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.fontePagadora}
                    onChange={(e) => handleUpdateInformacoes("fontePagadora", e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Endereço</label>
                  <Input
                    type="text"
                    placeholder="Digite o endereço"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.endereco}
                    onChange={(e) => handleUpdateInformacoes("endereco", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CPF / CNPJ</label>
                  <Input
                    type="text"
                    placeholder="Digite o CPF/CNPJ do beneficiário"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.cpfCnpjBeneficiario}
                    onChange={(e) => handleUpdateInformacoes("cpfCnpjBeneficiario", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Beneficiário</label>
                  <Input
                    type="text"
                    placeholder="Digite o nome do beneficiário"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.beneficiario}
                    onChange={(e) => handleUpdateInformacoes("beneficiario", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Responsável pelas informações</label>
                  <Input
                    type="text"
                    placeholder="Digite o nome do responsável"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.responsavelInformacoes}
                    onChange={(e) => handleUpdateInformacoes("responsavelInformacoes", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label>
                  <Input
                    type="text"
                    placeholder="Digite o telefone"
                    className="w-full focus:ring-blue-500 focus:border-blue-500"
                    value={informacoesAdicionais.telefone}
                    onChange={(e) => handleUpdateInformacoes("telefone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabela de Rendimentos e Impostos */}
      {(isLoading || hasSearched) && (
        <div className="mb-6">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <Skeleton className="h-6 w-64" />
              </div>
              <div className="p-4">
                <TableSkeleton />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tabela de Rendimentos e Impostos Retido na Fonte</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Mês
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Descrição Retenção
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rendimento (R$)
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Imposto Retido (R$)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rendimentos.length > 0 ? (
                      rendimentos.map((rendimento) => (
                        <tr key={rendimento.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{rendimento.mes}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{rendimento.descricaoRetencao}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            R$ {rendimento.rendimento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            R$ {rendimento.impostoRetido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center">-</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão Gerar PDF */}
      {hasSearched && (
        <div className="flex justify-center">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-sm font-medium"
          >
            {isGeneratingPDF ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Gerando PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                GERAR PDF
              </>
            )}
          </Button>
        </div>
      )}

      {/* Aviso sobre campos obrigatórios */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-1">Campos obrigatórios</h3>
            <p className="text-sm text-yellow-800">
              Os campos marcados com <span className="text-red-500 font-medium">*</span> são obrigatórios para realizar
              a pesquisa. Certifique-se de preencher CPF/CNPJ (apenas números), Ano de Referência e Alíquota.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
