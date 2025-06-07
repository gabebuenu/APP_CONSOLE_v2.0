"use client"

import { useState } from "react"
import {
  Upload,
  Home,
  User,
  Camera,
  CreditCard,
  Monitor,
  FileText,
  DollarSign,
  Mail,
  Settings,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function ParametrosPage() {
  const [activeTab, setActiveTab] = useState("geral")

  const menuItems = [
    { id: "geral", icon: Home, label: "Geral", sublabel: "Tela Inicial" },
    { id: "minha-conta", icon: User, label: "Minha conta" },
    { id: "capturas", icon: Camera, label: "Capturas" },
    { id: "adquirentes", icon: CreditCard, label: "Adquirentes" },
    { id: "registradoras", icon: Monitor, label: "Registradoras" },
    { id: "decreet", icon: FileText, label: "Decreet / OF" },
    { id: "remessa", icon: DollarSign, label: "Remessa Bancária" },
    { id: "email", icon: Mail, label: "E-mail / SMTP" },
    { id: "rotinas", icon: Settings, label: "Rotinas" },
  ]

  const UploadArea = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="w-full h-[140px] sm:h-[120px] md:h-[140px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 active:bg-gray-100 touch-manipulation">
      <Upload className="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 text-gray-400 mb-2" />
      <p className="text-xs sm:text-[10px] md:text-xs font-medium text-gray-600 mb-1">Upload Image</p>
      <p className="text-[10px] sm:text-[8px] md:text-[10px] text-gray-500 px-2 leading-tight">{title}</p>
      <p className="text-[10px] sm:text-[8px] md:text-[10px] text-gray-400">{subtitle}</p>
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Mobile Navigation - Tabs horizontais scrolláveis otimizadas */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Parâmetros</h2>
          <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 min-w-[90px] touch-manipulation ${
                    isActive
                      ? "bg-[#169BFF] text-white shadow-lg scale-105"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <IconComponent className={`h-5 w-5 mb-2 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span className="text-[11px] font-medium text-center leading-tight">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sidebar desktop - mantém o layout original */}
      <div className="hidden lg:block w-[200px] bg-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-900 mb-1">Geral</h2>
          <p className="text-xs text-gray-500 mb-6">Tela Inicial</p>
        </div>

        <nav className="px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg mb-1 transition-all duration-300 ${
                  isActive ? "bg-blue-50 text-[#169BFF]" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <IconComponent
                    className={`h-4 w-4 mr-3 flex-shrink-0 ${isActive ? "text-[#169BFF]" : "text-gray-500"}`}
                  />
                  <span className="text-left">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-[#169BFF] transform transition-transform duration-300" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Área central do formulário - otimizada para mobile */}
      <div className="bg-white flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-5 sm:p-4 md:p-6 lg:p-8">
          {/* Header mobile com título da aba ativa - melhorado */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
              {(() => {
                const activeItem = menuItems.find((item) => item.id === activeTab)
                const IconComponent = activeItem?.icon || Home
                return (
                  <>
                    <div className="bg-[#169BFF] p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">{activeItem?.label}</h1>
                      {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                    </div>
                  </>
                )
              })()}
            </div>
          </div>

          {/* Logo das Aplicações - otimizado para mobile */}
          <div className="mb-8 md:mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Logo das Aplicações (White Label)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
              <UploadArea title="Console (W: 150px / H: 70px)" subtitle="PNG ou JPG até 2MB" />
              <UploadArea title="APP Estabelecimento (W: 200px / H: 100px)" subtitle="PNG ou JPG até 2MB" />
              <UploadArea title="APP Vendedor (W: 150px / H: 70px)" subtitle="PNG ou JPG até 2MB" />
            </div>
          </div>

          {/* Cadastro - otimizado para mobile */}
          <div className="mb-8 md:mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Cadastro</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-3">
                  <Label htmlFor="permitir-duplicar" className="text-sm font-medium text-gray-700">
                    Permitir duplicar CPF / CNPJ
                  </Label>
                  <Input
                    id="permitir-duplicar"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="envio-acesso" className="text-sm font-medium text-gray-700">
                    Envio acesso EC por e-mail após credenciamento
                  </Label>
                  <Input
                    id="envio-acesso"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-3">
                  <Label htmlFor="visualizacao-taxas-ec" className="text-sm font-medium text-gray-700">
                    Visualização de taxas do portal EC
                  </Label>
                  <Input
                    id="visualizacao-taxas-ec"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="visualizacao-taxas-dist" className="text-sm font-medium text-gray-700">
                    Visualização de taxas do portal distribuidor
                  </Label>
                  <Input
                    id="visualizacao-taxas-dist"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="credenciamento-ec" className="text-sm font-medium text-gray-700">
                  Permitir credenciamento de EC no portal distribuidor
                </Label>
                <Input
                  id="credenciamento-ec"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                />
              </div>
            </div>
          </div>

          {/* Organização/Parâmetro - otimizado para mobile */}
          <div className="mb-8 md:mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Organização/Parâmetro</h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="razao-social" className="text-sm font-medium text-gray-700 mb-2 block">
                    Razão social
                  </Label>
                  <Input
                    id="razao-social"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
                <div>
                  <Label htmlFor="documento" className="text-sm font-medium text-gray-700 mb-2 block">
                    Documento CPF ou CNPJ
                  </Label>
                  <Input
                    id="documento"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-2 block">
                    Telefone Comercial
                  </Label>
                  <Input
                    id="telefone"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
                <div>
                  <Label htmlFor="cliente-desde" className="text-sm font-medium text-gray-700 mb-2 block">
                    Cliente desde
                  </Label>
                  <Input
                    id="cliente-desde"
                    className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email-principal" className="text-sm font-medium text-gray-700 mb-2 block">
                  E-mail principal
                </Label>
                <Input
                  id="email-principal"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                />
                <p className="text-xs text-gray-500 mt-2">E-mails para comunicação</p>
              </div>
            </div>
          </div>

          {/* Contas a pagar - otimizado para mobile */}
          <div className="mb-8 md:mb-8">
            <h3 className="text-base font-semibold text-gray-900 mb-5">Contas a pagar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="pagamentos-nao-autorizados" className="text-sm font-medium text-gray-700 mb-2 block">
                  Pagamentos Não Autorizados até 20h
                </Label>
                <Input
                  id="pagamentos-nao-autorizados"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                />
              </div>
              <div>
                <Label htmlFor="documento-favorecido" className="text-sm font-medium text-gray-700 mb-2 block">
                  Documento do Favorecido da Conta Bancária igual ao Documento do Cadastro do EC
                </Label>
                <Input
                  id="documento-favorecido"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                />
              </div>
            </div>
          </div>

          {/* Imagem mobile - otimizada com melhor apresentação */}
          <div className="lg:hidden mt-10 mb-6">
            <div className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center shadow-lg">
              <Image
                src="/placeholder.svg?height=280&width=400"
                alt="Dashboard Preview"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Imagem desktop - mantém o layout original */}
      <div className="hidden lg:flex bg-white w-[542px] h-screen flex-shrink-0 items-center justify-center p-8 sticky top-0">
        <div className="relative w-full h-[773px] rounded-[25px] overflow-hidden">
          <Image
            src="/MovingBanner.png"
            alt="Dashboard Preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
