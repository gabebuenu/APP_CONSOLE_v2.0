"use client"

import { Home, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

interface DecredIofTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function DecredIofTab({ activeTab, menuItems = [] }: DecredIofTabProps) {
  return (
    <>
      <div className="lg:hidden mb-8">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || FileText
            return (
              <>
                <div className="bg-[#169BFF] p-3 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{activeItem?.label || 'Decred / IOF'}</h1>
                  {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Configuração de emissão do DECRED</h3>
        <p className="text-sm text-gray-600 mb-6">É necessário informar os dados abaixo para gerar o DECRED.</p>

        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-5">Responsável Legal pela Empresa</h4>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-3">
                <Label htmlFor="nome-responsavel-legal" className="text-sm font-medium text-gray-700">
                  Nome completo
                </Label>
                <Input
                  id="nome-responsavel-legal"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="cpf-responsavel-legal" className="text-sm font-medium text-gray-700">
                  CPF
                </Label>
                <Input
                  id="cpf-responsavel-legal"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-3">
                <Label htmlFor="telefone-responsavel-legal" className="text-sm font-medium text-gray-700">
                  Telefone com DDD
                </Label>
                <Input
                  id="telefone-responsavel-legal"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email-responsavel-legal" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  id="email-responsavel-legal"
                  type="email"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-5">Responsável pelos dados do arquivo</h4>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-3">
                <Label htmlFor="nome-responsavel-arquivo" className="text-sm font-medium text-gray-700">
                  Nome completo
                </Label>
                <Input
                  id="nome-responsavel-arquivo"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="Digite o nome completo"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="cpf-responsavel-arquivo" className="text-sm font-medium text-gray-700">
                  CPF
                </Label>
                <Input
                  id="cpf-responsavel-arquivo"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-3">
                <Label htmlFor="telefone-responsavel-arquivo" className="text-sm font-medium text-gray-700">
                  Telefone com DDD
                </Label>
                <Input
                  id="telefone-responsavel-arquivo"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email-responsavel-arquivo" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  id="email-responsavel-arquivo"
                  type="email"
                  className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-10 mb-6">
        <div className="relative w-full h-[280px] rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src={MovingPay}
            alt="Dashboard Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="px-6 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
        >
          Salvar
        </button>
      </div>
    </>
  )
}