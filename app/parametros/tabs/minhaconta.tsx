"use client"

import { Home, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface MinhaContaTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function MinhaContaTab({ activeTab, menuItems = [] }: MinhaContaTabProps) {
  return (
    <>
      <div className="lg:hidden mb-8">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || User
            return (
              <>
                <div className="bg-[#169BFF] p-3 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{activeItem?.label || 'Minha Conta'}</h1>
                  {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Minha Conta</h3>
        <div className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="fuso-horario" className="text-sm font-medium text-gray-700">
              Fuso Horário
            </Label>
            <Select>
              <SelectTrigger className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Selecione o fuso horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-sao_paulo">América/São Paulo (GMT-3)</SelectItem>
                <SelectItem value="america-manaus">América/Manaus (GMT-4)</SelectItem>
                <SelectItem value="america-rio_branco">América/Rio Branco (GMT-5)</SelectItem>
                <SelectItem value="america-noronha">América/Noronha (GMT-2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-3">
              <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Digite seu nome"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="sobrenome" className="text-sm font-medium text-gray-700">
                Sobrenome
              </Label>
              <Input
                id="sobrenome"
                placeholder="Digite seu sobrenome"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-3">
              <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="data-nascimento" className="text-sm font-medium text-gray-700">
                Data de Nascimento
              </Label>
              <Input
                id="data-nascimento"
                type="date"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
              Celular
            </Label>
            <Input
              id="celular"
              placeholder="(00) 00000-0000"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Meus dados de acesso</h3>
        <div className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="space-y-3">
              <Label htmlFor="nova-senha" className="text-sm font-medium text-gray-700">
                Nova Senha
              </Label>
              <Input
                id="nova-senha"
                type="password"
                placeholder="Digite sua nova senha"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirmar-senha" className="text-sm font-medium text-gray-700">
                Confirmar Senha
              </Label>
              <Input
                id="confirmar-senha"
                type="password"
                placeholder="Confirme sua nova senha"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-10 mb-6">
        <div className="relative w-full h-[280px] rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src="/paymoving.png"
            alt="Dashboard Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">     
        <button
            className="px-6 py-2 bg-[#169BFF] text-white text-sm font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
            >
            Salvar / Atualizar
            </button>
      </div>
    </>
  )
}