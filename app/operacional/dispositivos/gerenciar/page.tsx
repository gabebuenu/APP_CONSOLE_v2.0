"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Search, Info, Plus, Download, RefreshCw, Link, AlertCircle, X, Loader2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DispositivoCard } from "../components/dispositivo-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Definição de interfaces para tipagem
interface Dispositivo {
  id: string
  tecnologia: string
  numeroSerie: string
  fabricante: string
  modelo: string
  dataCadastro: string
  status: "Disponível" | "Bloqueado" | "Em uso"
  estabelecimento?: Estabelecimento
  proprio: boolean
  simCard?: string
  dataAtivacao?: string
  taxaAdesao?: string
  valorAluguel?: string
  carencia?: number
  finalidade?: string
  captura?: string
  departamento?: string
}

interface Estabelecimento {
  codigo: string
  nome: string
  cnpj: string
}

interface FormData {
  fabricante: string
  numeroSerie: string
  tecnologia: string
  modelo: string
  habilitado: boolean
}

interface VincularFormData {
  finalidade: string
  captura: string
  estabelecimento: string
  departamento: string
  dispositivo: string
  simCard: string
  dataAtivacao: string
  taxaAdesao: string
  valorAluguel: string
  carencia: string
}

// Dados de exemplo para os dispositivos
const dispositivosData: Dispositivo[] = [
  {
    id: "923449",
    tecnologia: "POS",
    numeroSerie: "4567778787878TESTEMARCOS",
    fabricante: "GERTEC",
    modelo: "GPOS700",
    dataCadastro: "28/05/2025 09:08",
    status: "Disponível",
    proprio: true,
  },
  {
    id: "923450",
    tecnologia: "SmartPOS",
    numeroSerie: "78945612378945612",
    fabricante: "PAX",
    modelo: "A920",
    dataCadastro: "27/05/2025 14:22",
    status: "Em uso",
    proprio: false,
    estabelecimento: {
      codigo: "11144477735",
      nome: "EMPRESA TESTE LTDA",
      cnpj: "11.444.777/0001-35",
    },
    simCard: "89550311000123456789",
    dataAtivacao: "27/05/2025",
    taxaAdesao: "50.00",
    valorAluguel: "89.90",
    carencia: 30,
    finalidade: "Vendas",
    captura: "Crédito e Débito",
    departamento: "Financeiro",
  },
  {
    id: "923451",
    tecnologia: "POS",
    numeroSerie: "123456789012345",
    fabricante: "VERIFONE",
    modelo: "V240m",
    dataCadastro: "26/05/2025 10:15",
    status: "Bloqueado",
    proprio: true,
  },
  {
    id: "923452",
    tecnologia: "mPOS",
    numeroSerie: "987654321098765",
    fabricante: "STONE",
    modelo: "Ton T1",
    dataCadastro: "25/05/2025 16:30",
    status: "Disponível",
    proprio: false,
  },
  {
    id: "923453",
    tecnologia: "SmartPOS",
    numeroSerie: "456123789456123",
    fabricante: "CIELO",
    modelo: "LIO+",
    dataCadastro: "24/05/2025 11:45",
    status: "Disponível",
    proprio: true,
  },
  {
    id: "923454",
    tecnologia: "mPOS",
    numeroSerie: "789456123789456",
    fabricante: "MODERNINHA",
    modelo: "Pro 2",
    dataCadastro: "23/05/2025 13:20",
    status: "Em uso",
    proprio: false,
    estabelecimento: {
      codigo: "22255588846",
      nome: "COMÉRCIO EXEMPLO S.A.",
      cnpj: "22.555.888/0001-46",
    },
  },
]

// Dados de exemplo para os fabricantes
const fabricantes = ["GERTEC", "PAX", "VERIFONE", "STONE", "CIELO", "MODERNINHA"]

// Dados de exemplo para as tecnologias
const tecnologias = ["POS", "SmartPOS", "mPOS", "POSEC", "TEF"]

// Dados de exemplo para as finalidades
const finalidades = ["Vendas", "Administrativo", "Financeiro", "Logística"]

// Dados de exemplo para os tipos de captura
const tiposCaptura = ["Crédito e Débito", "Apenas Crédito", "Apenas Débito", "Voucher", "QR Code"]

// Componente de Skeleton para os cards
function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <div className="h-px bg-gray-100 my-3"></div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DispositivosPage() {
  const [searchTermEC, setSearchTermEC] = useState("")
  const [searchTermSerie, setSearchTermSerie] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")
  const [isLoading, setIsLoading] = useState(true)
  const [isCadastrarModalOpen, setIsCadastrarModalOpen] = useState(false)
  const [isVincularModalOpen, setIsVincularModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDispositivo, setSelectedDispositivo] = useState<Dispositivo | null>(null)
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
  const [activeTab, setActiveTab] = useState("manual")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fabricante: "",
    numeroSerie: "",
    tecnologia: "",
    modelo: "",
    habilitado: true,
  })
  const [vincularFormData, setVincularFormData] = useState<VincularFormData>({
    finalidade: "",
    captura: "",
    estabelecimento: "",
    departamento: "",
    dispositivo: "",
    simCard: "",
    dataAtivacao: new Date().toISOString().split("T")[0],
    taxaAdesao: "",
    valorAluguel: "",
    carencia: "",
  })
  const [loteText, setLoteText] = useState("")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setDispositivos(dispositivosData)
      setIsLoading(false)
    }, 1500)
  }, [])

  // Filtrar dispositivos com base nos termos de pesquisa e filtro de status
  useEffect(() => {
    let filtered = [...dispositivosData]

    if (searchTermEC.trim() !== "") {
      filtered = filtered.filter(
        (d) =>
          d.estabelecimento &&
          (d.estabelecimento.codigo.toLowerCase().includes(searchTermEC.toLowerCase()) ||
            d.estabelecimento.nome.toLowerCase().includes(searchTermEC.toLowerCase()) ||
            d.estabelecimento.cnpj.toLowerCase().includes(searchTermEC.toLowerCase())),
      )
    }

    if (searchTermSerie.trim() !== "") {
      filtered = filtered.filter((d) => d.numeroSerie.toLowerCase().includes(searchTermSerie.toLowerCase()))
    }

    if (statusFilter !== "Todos") {
      filtered = filtered.filter((d) => d.status === statusFilter)
    }

    setDispositivos(filtered)
  }, [searchTermEC, searchTermSerie, statusFilter])

  // Função para visualizar dispositivo
  const handleViewDispositivo = (id: string) => {
    const dispositivo = dispositivos.find((d) => d.id === id)
    if (dispositivo) {
      setSelectedDispositivo(dispositivo)
      setFormData({
        fabricante: dispositivo.fabricante,
        numeroSerie: dispositivo.numeroSerie,
        tecnologia: dispositivo.tecnologia,
        modelo: dispositivo.modelo,
        habilitado: dispositivo.status !== "Bloqueado",
      })
      setIsViewModalOpen(true)
    }
  }

  // Função para excluir dispositivo
  const handleDeleteDispositivo = (id: string) => {
    const dispositivoToDelete = dispositivos.find((d) => d.id === id)

    if (dispositivoToDelete && dispositivoToDelete.status === "Em uso") {
      alert("Não é possível excluir um dispositivo que está em uso.")
      return
    }

    const updatedDispositivos = dispositivos.filter((d) => d.id !== id)
    setDispositivos(updatedDispositivos)
  }

  // Função para cadastrar dispositivo manualmente
  const handleCadastrarDispositivo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const newDispositivo: Dispositivo = {
        id: Math.floor(Math.random() * 10000 + 900000).toString(),
        tecnologia: formData.tecnologia,
        numeroSerie: formData.numeroSerie,
        fabricante: formData.fabricante,
        modelo: formData.modelo,
        dataCadastro: new Date().toLocaleString("pt-BR"),
        status: "Disponível",
        proprio: true,
      }

      setDispositivos([newDispositivo, ...dispositivos])
      setIsSubmitting(false)
      setIsCadastrarModalOpen(false)

      // Resetar formulário
      setFormData({
        fabricante: "",
        numeroSerie: "",
        tecnologia: "",
        modelo: "",
        habilitado: true,
      })
    }, 1000)
  }

  // Função para cadastrar dispositivos em lote
  const handleCadastrarLote = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      // Aqui seria implementada a lógica para processar o texto do lote
      // Por enquanto, apenas simularemos o sucesso
      alert(`Lote processado com sucesso! Linhas processadas: ${loteText.split("\n").length}`)
      setIsSubmitting(false)
      setIsCadastrarModalOpen(false)
      setLoteText("")
    }, 1500)
  }

  // Função para vincular dispositivo
  const handleVincularDispositivo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      // Aqui seria implementada a lógica para vincular o dispositivo
      // Por enquanto, apenas simularemos o sucesso
      alert("Dispositivo vinculado com sucesso!")
      setIsSubmitting(false)
      setIsVincularModalOpen(false)

      // Resetar formulário
      setVincularFormData({
        finalidade: "",
        captura: "",
        estabelecimento: "",
        departamento: "",
        dispositivo: "",
        simCard: "",
        dataAtivacao: new Date().toISOString().split("T")[0],
        taxaAdesao: "",
        valorAluguel: "",
        carencia: "",
      })
    }, 1000)
  }

  // Função para atualizar dispositivo
  const handleUpdateDispositivo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      if (selectedDispositivo) {
        const updatedDispositivo: Dispositivo = {
          ...selectedDispositivo,
          fabricante: formData.fabricante,
          numeroSerie: formData.numeroSerie,
          tecnologia: formData.tecnologia,
          modelo: formData.modelo,
          status: formData.habilitado ? "Disponível" : "Bloqueado",
        }

        const updatedDispositivos = dispositivos.map((d) => (d.id === selectedDispositivo.id ? updatedDispositivo : d))
        setDispositivos(updatedDispositivos)
      }

      setIsSubmitting(false)
      setIsViewModalOpen(false)
    }, 1000)
  }

  // Função para exportar CSV
  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    // Implementação futura
  }

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDispositivos(dispositivosData)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Dispositivos</h2>
        <p className="text-xs text-gray-500 mb-6">Tela de Gerenciamento</p>
      </div>

      {/* Aviso informativo no topo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800">
              Não encontrou o fabricante na hora de cadastrar?{" "}
              <span className="font-medium">
                Entre em contato com nossa equipe que teremos o prazer em realizar a homologação.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsCadastrarModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Cadastrar Dispositivos
        </button>

        <button
          onClick={() => setIsVincularModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
        >
          <Link className="h-4 w-4 mr-2" /> Vincular Dispositivo
        </button>

        <div className="flex-grow"></div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" /> Exportar CSV
          </button>
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filtros e Busca</h3>
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="text-sm text-gray-500 flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            {isFilterExpanded ? "Recolher filtros" : "Expandir filtros"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por Código EC"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTermEC}
              onChange={(e) => setSearchTermEC(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="Pesquisar por Número de Série"
              className="pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchTermSerie}
              onChange={(e) => setSearchTermSerie(e.target.value)}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          <div>
            <RadioGroup
              defaultValue="Todos"
              className="flex flex-wrap gap-2"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Todos" id="todos" />
                <Label htmlFor="todos" className="text-sm">
                  Todos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Disponível" id="disponivel" />
                <Label htmlFor="disponivel" className="text-sm">
                  Disponível
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Bloqueado" id="bloqueado" />
                <Label htmlFor="bloqueado" className="text-sm">
                  Bloqueado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Em uso" id="emuso" />
                <Label htmlFor="emuso" className="text-sm">
                  Em uso
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {isFilterExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Fabricante</label>
              <Select>
                <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Todos os fabricantes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os fabricantes</SelectItem>
                  {fabricantes.map((fabricante) => (
                    <SelectItem key={fabricante} value={fabricante.toLowerCase()}>
                      {fabricante}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Tecnologia</label>
              <Select>
                <SelectTrigger className="bg-white border border-gray-200 rounded-lg">
                  <SelectValue placeholder="Todas as tecnologias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as tecnologias</SelectItem>
                  {tecnologias.map((tecnologia) => (
                    <SelectItem key={tecnologia} value={tecnologia.toLowerCase()}>
                      {tecnologia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Data de Cadastro</label>
              <div className="flex gap-2">
                <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" placeholder="De" />
                <Input type="date" className="bg-white border border-gray-200 rounded-lg text-sm" placeholder="Até" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Listagem de dispositivos */}
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dispositivos.length > 0 ? (
            dispositivos.map((dispositivo) => (
              <DispositivoCard
                key={dispositivo.id}
                id={dispositivo.id}
                tecnologia={dispositivo.tecnologia}
                numeroSerie={dispositivo.numeroSerie}
                fabricante={dispositivo.fabricante}
                modelo={dispositivo.modelo}
                dataCadastro={dispositivo.dataCadastro}
                status={dispositivo.status}
                onView={handleViewDispositivo}
                onDelete={handleDeleteDispositivo}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Nenhum dispositivo encontrado com os filtros selecionados.
            </div>
          )}
        </div>
      )}

      {/* Modal: Cadastrar Dispositivos */}
      {isCadastrarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cadastrar Dispositivos</h2>
              <button
                onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Tabs defaultValue="manual" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-gray-200">
                <TabsList className="flex w-full rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="manual"
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-[#169BFF] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Cadastro Manual
                  </TabsTrigger>
                  <TabsTrigger
                    value="lote"
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-[#169BFF] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Cadastrar em Lote
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="manual" className="p-4 sm:p-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Como vincular o dispositivo em um estabelecimento?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  O dispositivo deverá ser vinculado ao estabelecimento através do número lógico.
                </p>

                <form onSubmit={handleCadastrarDispositivo} className="space-y-4">
                  {/* Fabricante */}
                  <div>
                    <label htmlFor="fabricante" className="text-sm font-medium text-gray-700">
                      Fabricante
                    </label>
                    <Select
                      value={formData.fabricante}
                      onValueChange={(value) => setFormData({ ...formData, fabricante: value })}
                    >
                      <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {fabricantes.map((fabricante) => (
                          <SelectItem key={fabricante} value={fabricante}>
                            {fabricante}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Número de Série */}
                  <div>
                    <label htmlFor="numeroSerie" className="text-sm font-medium text-gray-700">
                      Número de Série
                    </label>
                    <Input
                      id="numeroSerie"
                      type="text"
                      value={formData.numeroSerie}
                      onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite o número de série"
                      required
                    />
                  </div>

                  {/* Tecnologia */}
                  <div>
                    <label htmlFor="tecnologia" className="text-sm font-medium text-gray-700">
                      Tecnologia
                    </label>
                    <Select
                      value={formData.tecnologia}
                      onValueChange={(value) => setFormData({ ...formData, tecnologia: value })}
                    >
                      <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {tecnologias.map((tecnologia) => (
                          <SelectItem key={tecnologia} value={tecnologia}>
                            {tecnologia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Modelo */}
                  <div>
                    <label htmlFor="modelo" className="text-sm font-medium text-gray-700">
                      Modelo
                    </label>
                    <Input
                      id="modelo"
                      type="text"
                      value={formData.modelo}
                      onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="Digite o modelo"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                      className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                      disabled={isSubmitting}
                    >
                      Fechar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                        </>
                      ) : (
                        "Liberar Acesso"
                      )}
                    </button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="lote" className="p-4 sm:p-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Informações importantes para o cadastro de dispositivos!
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
                  <li>Os dispositivos deverão ser escritos na seguinte ordem:</li>
                  <li className="ml-4 text-gray-500">fabricante;modelo;numero_serie;tecnologia;proprio;status</li>
                  <li>As informações devem ser separadas por ponto e vírgula (;)</li>
                  <li>Cada dispositivo em uma nova linha.</li>
                  <li>Limite de 1000 registros. Exemplo: Cadastro em Lotes (0 de 1000)</li>
                </ul>

                <form onSubmit={handleCadastrarLote} className="space-y-4">
                  <div>
                    <Textarea
                      value={loteText}
                      onChange={(e) => setLoteText(e.target.value)}
                      className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent min-h-[200px]"
                      placeholder="Cole ou digite os dispositivos aqui..."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Cadastro em Lotes ({loteText.split("\n").filter((line) => line.trim()).length} de 1000)
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setIsCadastrarModalOpen(false)}
                      className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                      disabled={isSubmitting}
                    >
                      Fechar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                        </>
                      ) : (
                        "Cadastrar Lote"
                      )}
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* Modal: Vincular Dispositivo */}
      {isVincularModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsVincularModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Vincular Dispositivo</h2>
              <button
                onClick={() => !isSubmitting && setIsVincularModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <form onSubmit={handleVincularDispositivo} className="space-y-4">
                {/* Finalidade */}
                <div>
                  <label htmlFor="finalidade" className="text-sm font-medium text-gray-700">
                    Finalidade
                  </label>
                  <Select
                    value={vincularFormData.finalidade}
                    onValueChange={(value) => setVincularFormData({ ...vincularFormData, finalidade: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {finalidades.map((finalidade) => (
                        <SelectItem key={finalidade} value={finalidade}>
                          {finalidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Captura */}
                <div>
                  <label htmlFor="captura" className="text-sm font-medium text-gray-700">
                    Captura
                  </label>
                  <Select
                    value={vincularFormData.captura}
                    onValueChange={(value) => setVincularFormData({ ...vincularFormData, captura: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCaptura.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estabelecimento */}
                <div>
                  <label htmlFor="estabelecimento" className="text-sm font-medium text-gray-700">
                    Estabelecimento
                  </label>
                  <Input
                    id="estabelecimento"
                    type="text"
                    value={vincularFormData.estabelecimento}
                    onChange={(e) => setVincularFormData({ ...vincularFormData, estabelecimento: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Nome, CNPJ, Código PayStore..."
                    required
                  />
                </div>

                {/* Departamento */}
                <div>
                  <label htmlFor="departamento" className="text-sm font-medium text-gray-700">
                    Departamento (Opcional)
                  </label>
                  <Input
                    id="departamento"
                    type="text"
                    value={vincularFormData.departamento}
                    onChange={(e) => setVincularFormData({ ...vincularFormData, departamento: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Código do departamento"
                  />
                </div>

                {/* Dispositivo */}
                <div>
                  <label htmlFor="dispositivo" className="text-sm font-medium text-gray-700">
                    Dispositivo
                  </label>
                  <Select
                    value={vincularFormData.dispositivo}
                    onValueChange={(value) => setVincularFormData({ ...vincularFormData, dispositivo: value })}
                  >
                    <SelectTrigger className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {dispositivos
                        .filter((d) => d.status === "Disponível")
                        .map((dispositivo) => (
                          <SelectItem key={dispositivo.id} value={dispositivo.id}>
                            {dispositivo.fabricante} {dispositivo.modelo} - {dispositivo.numeroSerie}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* SIM Card */}
                <div>
                  <label htmlFor="simCard" className="text-sm font-medium text-gray-700">
                    SIM Card (Opcional)
                  </label>
                  <Input
                    id="simCard"
                    type="text"
                    value={vincularFormData.simCard}
                    onChange={(e) => setVincularFormData({ ...vincularFormData, simCard: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Número do SIM Card"
                  />
                </div>

                {/* Data de Ativação */}
                <div>
                  <label htmlFor="dataAtivacao" className="text-sm font-medium text-gray-700">
                    Data de Ativação
                  </label>
                  <Input
                    id="dataAtivacao"
                    type="date"
                    value={vincularFormData.dataAtivacao}
                    onChange={(e) => setVincularFormData({ ...vincularFormData, dataAtivacao: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    required
                  />
                </div>

                {/* Taxa de Adesão */}
                <div>
                  <label htmlFor="taxaAdesao" className="text-sm font-medium text-gray-700">
                    Taxa de Adesão
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="taxaAdesao"
                      type="text"
                      value={vincularFormData.taxaAdesao}
                      onChange={(e) => setVincularFormData({ ...vincularFormData, taxaAdesao: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Valor do Aluguel */}
                <div>
                  <label htmlFor="valorAluguel" className="text-sm font-medium text-gray-700">
                    Valor do Aluguel
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                    <Input
                      id="valorAluguel"
                      type="text"
                      value={vincularFormData.valorAluguel}
                      onChange={(e) => setVincularFormData({ ...vincularFormData, valorAluguel: e.target.value })}
                      className="pl-8 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Carência */}
                <div>
                  <label htmlFor="carencia" className="text-sm font-medium text-gray-700">
                    Carência (dias)
                  </label>
                  <Input
                    id="carencia"
                    type="number"
                    value={vincularFormData.carencia}
                    onChange={(e) => setVincularFormData({ ...vincularFormData, carencia: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsVincularModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                      </>
                    ) : (
                      "Vincular Dispositivo"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Visualizar / Atualizar Dispositivo */}
      {isViewModalOpen && selectedDispositivo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Atualizar Dispositivo</h2>
              <button
                onClick={() => !isSubmitting && setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Alerta inicial */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-yellow-900 mb-1">Por que não consigo alterar o dispositivo?</h3>
                    <p className="text-sm text-yellow-800">
                      Caso tenha algum número lógico ativo vinculado ao dispositivo, não será possível realizar
                      alterações.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateDispositivo} className="space-y-4">
                {/* Estabelecimento */}
                {selectedDispositivo.estabelecimento && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Estabelecimento</label>
                    <div className="mt-1 w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm text-gray-900">
                      [{selectedDispositivo.estabelecimento.codigo}] {selectedDispositivo.estabelecimento.nome}
                    </div>
                  </div>
                )}

                {/* Fabricante */}
                <div>
                  <label htmlFor="viewFabricante" className="text-sm font-medium text-gray-700">
                    Fabricante
                  </label>
                  <Input
                    id="viewFabricante"
                    type="text"
                    value={formData.fabricante}
                    onChange={(e) => setFormData({ ...formData, fabricante: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    disabled={selectedDispositivo.status === "Em uso"}
                  />
                </div>

                {/* Número de Série */}
                <div>
                  <label htmlFor="viewNumeroSerie" className="text-sm font-medium text-gray-700">
                    Número de Série
                  </label>
                  <Input
                    id="viewNumeroSerie"
                    type="text"
                    value={formData.numeroSerie}
                    onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    disabled={selectedDispositivo.status === "Em uso"}
                  />
                </div>

                {/* Tecnologia */}
                <div>
                  <label htmlFor="viewTecnologia" className="text-sm font-medium text-gray-700">
                    Tecnologia
                  </label>
                  <Input
                    id="viewTecnologia"
                    type="text"
                    value={formData.tecnologia}
                    onChange={(e) => setFormData({ ...formData, tecnologia: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    disabled={selectedDispositivo.status === "Em uso"}
                  />
                </div>

                {/* Modelo */}
                <div>
                  <label htmlFor="viewModelo" className="text-sm font-medium text-gray-700">
                    Modelo
                  </label>
                  <Input
                    id="viewModelo"
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    disabled={selectedDispositivo.status === "Em uso"}
                  />
                </div>

                {/* Habilitar Dispositivo */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="habilitado"
                    checked={formData.habilitado}
                    onCheckedChange={(checked) => setFormData({ ...formData, habilitado: checked === true })}
                    disabled={selectedDispositivo.status === "Em uso"}
                  />
                  <Label htmlFor="habilitado" className="text-sm font-medium text-gray-700">
                    Habilitar Dispositivo
                  </Label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => !isSubmitting && setIsViewModalOpen(false)}
                    className="px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-xs sm:text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2 flex items-center justify-center ${
                      selectedDispositivo.status === "Em uso" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting || selectedDispositivo.status === "Em uso"}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processando...
                      </>
                    ) : (
                      "Atualizar Dados"
                    )}
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
