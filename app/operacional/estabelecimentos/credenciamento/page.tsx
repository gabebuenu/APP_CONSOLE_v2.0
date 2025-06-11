"use client"

import { useState } from "react"
import { Building2, User, MapPin, FileText, Scale, Wallet, CheckCircle } from "lucide-react"
import Empresa from "./empresa"
import Representante from "./representante"
import Endereco from "./endereco"
import Documentos from "./documentos"
import Juridico from "./juridico"
import Recebimentos from "./recebimentos"
import Confirmar from "./confirmar"

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
  const [currentStep, setCurrentStep] = useState("empresa")
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

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
      window.scrollTo(0, 0)
    }
  }

  const handlePrev = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
      window.scrollTo(0, 0)
    }
  }

  const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case "empresa":
        return (
          <Empresa data={formData.empresa} updateData={(data) => updateFormData("empresa", data)} onNext={handleNext} />
        )
      case "representante":
        return (
          <Representante
            data={formData.representante}
            updateData={(data) => updateFormData("representante", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "endereco":
        return (
          <Endereco
            data={formData.endereco}
            updateData={(data) => updateFormData("endereco", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "documentos":
        return (
          <Documentos
            data={formData.documentos}
            updateData={(data) => updateFormData("documentos", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "juridico":
        return (
          <Juridico
            data={formData.juridico}
            updateData={(data) => updateFormData("juridico", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "recebimentos":
        return (
          <Recebimentos
            data={formData.recebimentos}
            updateData={(data) => updateFormData("recebimentos", data)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case "confirmar":
        return <Confirmar formData={formData} onPrev={handlePrev} />
      default:
        return null
    }
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
          {/* Progress Indicator */}
          <div className="bg-[#efefef] px-4 py-4 w-full">
            <div className="flex items-center justify-between relative w-full">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                      currentStep === step.id
                        ? "bg-[#169BFF] text-white shadow-lg"
                        : steps.findIndex((s) => s.id === currentStep) > index
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-400 border-2 border-gray-300"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-medium text-center ${currentStep === step.id ? "text-[#169BFF]" : "text-gray-500"}`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}

              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 -z-0">
                <div
                  className="h-full bg-[#169BFF] transition-all duration-300"
                  style={{
                    width: `${(steps.findIndex((s) => s.id === currentStep) / (steps.length - 1)) * 100}%`,
                  }}
                />
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
