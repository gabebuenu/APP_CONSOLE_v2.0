"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Building2, User, MapPin, FileText, Scale, Wallet, CheckCircle } from "lucide-react"
import { Skeleton } from "@/components/skeleton"
import EmpresaStep from "../steps/empresa"
import RepresentanteStep from "../steps/representante"
import EnderecoStep from "../steps/endereco"
import DocumentosStep from "../steps/documentos"
import JuridicoStep from "../steps/juridico"
import RecebimentosStep from "../steps/recebimentos"
import ConfirmarStep from "../steps/confirmar"

interface FormData {
  empresa: {
    refExterna: string
    tipoCadastro: string
    cpf: string
    tipoNegocio: string
    dataNascimento: string
    nomeCompleto: string
    nomeFantasia: string
    celular: string
    email: string
    url: string
    horarioFuncionamento: string
    shopping: string
    faturamentoMensal: string
    valorPatrimonio: string
    plano: string
    sincronizacao: string
    sincronizarAPartirDe: string
    vendedor: string
    registrarRecebiveis: string
    analistaRelacionamento: string
    unidadesNegocio: never[]
  }
  representante: {
    nacionalidade: string
    cpf: string
    cargo: string
    site: string
    nomeCompleto: string
    dataNascimento: string
    rg: string
    nomeMae: string
    celular: string
    email: string
  }
  endereco: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    codigoMunicipio: string
    estado: string
    complemento: string
  }
  documentos: {
    arquivos: any[]
  }
  juridico: {
    contratos: any[]
  }
  recebimentos: {
    transferenciaAutomatica: string
    periodicidade: string
    valorMinimo: string
    antecipacao: string
    formaRecebimento: string
    tipoDocumento: string
    cpf: string
    banco: string
    tipoConta: string
    agencia: string
    digitoAgencia: string
    conta: string
    digitoConta: string
    contaVerificada: boolean
  }
}

const steps = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "representante", label: "Representante", icon: User },
  { id: "endereco", label: "Endereço", icon: MapPin },
  { id: "documentos", label: "Documentos", icon: FileText },
  { id: "juridico", label: "Jurídico", icon: Scale },
  { id: "recebimentos", label: "Recebimentos", icon: Wallet },
  { id: "confirmar", label: "Confirmar", icon: CheckCircle },
]

export default function CredenciamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  // Obter step atual da URL ou usar 'empresa' como padrão
  const currentStep = searchParams.get("step") || "empresa"

  const [formData, setFormData] = useState<FormData>({
    empresa: {
      refExterna: "REF-A00255",
      tipoCadastro: "Pessoa Física (PF)",
      cpf: "111.111.111-11",
      tipoNegocio: "00 - Autônomo / Prof. Liberal",
      dataNascimento: "10/01/2000",
      nomeCompleto: "GAGA",
      nomeFantasia: "GAGA",
      celular: "(10) 00000-0000",
      email: "example@example.br",
      url: "https://www.example.com.br",
      horarioFuncionamento: "7 dias p/ semana - 24 Horas",
      shopping: "Não",
      faturamentoMensal: "0,00",
      valorPatrimonio: "0,00",
      plano: "",
      sincronizacao: "",
      sincronizarAPartirDe: "",
      vendedor: "",
      registrarRecebiveis: "1 - Sim",
      analistaRelacionamento: "",
      unidadesNegocio: [],
    },
    representante: {
      nacionalidade: "Brasileira",
      cpf: "111.111.111-11",
      cargo: "Gerente",
      site: "https://www.example.com.br",
      nomeCompleto: "GAGA",
      dataNascimento: "10/01/2000",
      rg: "00.000.000-X",
      nomeMae: "Nome da mãe",
      celular: "(10) 00000-0000",
      email: "example@example.br",
    },
    endereco: {
      cep: "10000-000",
      rua: "Ruazero",
      numero: "100",
      bairro: "Bairro",
      cidade: "Marília",
      codigoMunicipio: "0",
      estado: "SP",
      complemento: "Casa",
    },
    documentos: {
      arquivos: [],
    },
    juridico: {
      contratos: [],
    },
    recebimentos: {
      transferenciaAutomatica: "Sim",
      periodicidade: "Diária",
      valorMinimo: "1,00",
      antecipacao: "Não",
      formaRecebimento: "1 - Conta Bancária",
      tipoDocumento: "CPF",
      cpf: "111.111.111-11",
      banco: "Qual o Banco?",
      tipoConta: "Conta Corrente",
      agencia: "2121",
      digitoAgencia: "",
      conta: "2121",
      digitoConta: "2221",
      contaVerificada: false,
    },
  })

  // Carregar dados salvos do localStorage na inicialização
  useEffect(() => {
    const savedFormData = localStorage.getItem("credenciamento-form-data")

    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData))
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error)
      }
    }
  }, [])

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem("credenciamento-form-data", JSON.stringify(formData))
  }, [formData])

  // Verificar se o step na URL é válido
  useEffect(() => {
    const validSteps = steps.map((step) => step.id)
    if (!validSteps.includes(currentStep)) {
      router.replace("/operacional/estabelecimentos/credenciamento?step=empresa")
    }
  }, [currentStep, router])

  const navigateToStep = (stepId: string) => {
    router.push(`/operacional/estabelecimentos/credenciamento?step=${stepId}`)
  }

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].id
      setIsLoading(true)
      setTimeout(() => {
        navigateToStep(nextStep)
        setTimeout(() => {
          setIsLoading(false)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
      }, 600)
    }
  }

  const handlePrev = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1].id
      setIsLoading(true)
      setTimeout(() => {
        navigateToStep(prevStep)
        setTimeout(() => {
          setIsLoading(false)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)
      }, 600)
    }
  }

  const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [step]: {
          ...prev[step],
          ...data,
        },
      }
      return newFormData
    })
  }

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="w-full space-y-6">
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ))}
            <div className="pt-8 flex justify-between border-t border-gray-200">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case "empresa":
        return (
          <EmpresaStep
            data={formData.empresa}
            updateData={(data) => updateFormData("empresa", data)}
            onNext={handleNext}
          />
        )
      case "representante":
        return (
          <RepresentanteStep
            data={formData.representante}
            updateData={(data) => updateFormData("representante", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "endereco":
        return (
          <EnderecoStep
            data={formData.endereco}
            updateData={(data) => updateFormData("endereco", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "documentos":
        return (
          <DocumentosStep
            data={formData.documentos}
            updateData={(data) => updateFormData("documentos", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "juridico":
        return (
          <JuridicoStep
            data={formData.juridico}
            updateData={(data) => updateFormData("juridico", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "recebimentos":
        return (
          <RecebimentosStep
            data={formData.recebimentos}
            updateData={(data) => updateFormData("recebimentos", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "confirmar":
        return <ConfirmarStep formData={formData} onPrev={handlePrev} />
      default:
        return <div className="text-gray-500">Etapa indisponível.</div>
    }
  }

  const truncateLabel = (label: string, maxLength = 8) => {
    if (label.length <= maxLength) return label
    return label.substring(0, maxLength) + "..."
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 w-full">
        <div className="w-full">
          <h2 className="text-sm font-medium text-gray-900 mb-1">Dados Comerciais</h2>
          <p className="text-xs text-gray-500">Tela Inicial</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-xl overflow-hidden w-full">
          {/* Progress Indicator - Desktop */}
          <div className="hidden md:block bg-[#efefef] px-6 py-6 w-full">
            <div className="relative w-full">
              <div className="flex items-center justify-between w-full">
                {steps.map((step, index) => {
                  const currentIndex = steps.findIndex((s) => s.id === currentStep)
                  const isActive = currentStep === step.id
                  const isCompleted = currentIndex > index

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center relative z-10 cursor-pointer"
                      onClick={() => navigateToStep(step.id)}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                          isActive
                            ? "bg-[#169BFF] text-white shadow-lg scale-110"
                            : isCompleted
                              ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                              : "bg-white text-gray-400 border-2 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-sm font-medium text-center transition-colors duration-300 ${
                          isActive ? "text-[#169BFF]" : isCompleted ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Progress Line Background */}
              <div
                className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300"
                style={{ transform: "translateY(-50%)" }}
              >
                {/* Active Progress Line */}
                <div
                  className="h-full bg-[#169BFF] transition-all duration-700 ease-out"
                  style={{
                    width: `${(steps.findIndex((s) => s.id === currentStep) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Progress Indicator - Mobile */}
          <div className="md:hidden bg-[#efefef] px-3 py-4 w-full">
            <div className="w-full">
              {/* Mobile Progress Steps */}
              <div className="flex items-start justify-between w-full mb-3">
                {steps.map((step, index) => {
                  const currentIndex = steps.findIndex((s) => s.id === currentStep)
                  const isActive = currentStep === step.id
                  const isCompleted = currentIndex > index

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center cursor-pointer"
                      style={{ width: `${100 / steps.length}%` }}
                      onClick={() => navigateToStep(step.id)}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                          isCompleted && !isActive
                            ? "bg-green-500 text-white"
                            : isActive
                              ? "bg-[#169BFF] text-white"
                              : "bg-white text-gray-400 border border-gray-300"
                        }`}
                      >
                        <step.icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-xs font-medium text-center transition-colors duration-300 leading-tight px-1 ${
                          isCompleted && !isActive ? "text-green-600" : isActive ? "text-[#169BFF]" : "text-gray-500"
                        }`}
                        style={{
                          fontSize: "10px",
                          lineHeight: "12px",
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {step.label.length > 8 ? step.label.substring(0, 8) + "..." : step.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Mobile Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-1 mb-3">
                <div
                  className="bg-[#169BFF] h-1 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${((steps.findIndex((s) => s.id === currentStep) + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              {/* Mobile Step Counter */}
              <div className="flex justify-center">
                <span className="text-xs text-gray-600 font-medium">
                  {steps.findIndex((s) => s.id === currentStep) + 1} de {steps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8 w-full">{renderStep()}</div>
        </div>
      </div>
    </div>
  )
}
