"use client"

import { useState } from "react"
import {
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
import GeralTab from "./tabs/geral"

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

export default function ParametrosPage() {
  const [activeTab, setActiveTab] = useState("geral")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "geral":
        return <GeralTab activeTab={activeTab} menuItems={menuItems} />
      default:
        return <div className="text-gray-500">Conteúdo indisponível.</div>
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Mobile Navigation */}
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

      {/* Desktop Sidebar */}
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

      {/* Conteúdo da Tab Ativa */}
      <div className="bg-white flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-4 md:p-6 lg:p-8">
        {renderActiveComponent()}
      </div>

      {/* Imagem Desktop */}
      <div className="hidden lg:flex bg-white w-[542px] h-screen flex-shrink-0 items-center justify-center p-8 sticky top-0">
        <div className="relative w-full h-[773px] rounded-[25px] overflow-hidden">
          <img
            src="/MovingBanner.png"
            alt="Dashboard Preview"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}