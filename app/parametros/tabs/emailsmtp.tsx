import { Mail, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface EmailSMTPTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function EmailSMTPTab({ activeTab, menuItems = [] }: EmailSMTPTabProps) {
  return (
    <>
      <div className="lg:hidden mb-8">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || Mail
            return (
              <>
                <div className="bg-[#169BFF] p-3 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{activeItem?.label || 'E-mail / SMTP'}</h1>
                  {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Aviso importante!</h4>
          <p className="text-sm text-yellow-700">
            Para utilização do SMTP da Movingpay poderá haver um custo por disparo de e-mail. Os destinatários serão notificados por no-reply@movingpay.io
          </p>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Servidor de E-mail</h3>
        <div className="space-y-5">
          <div className="space-y-3">
            <Label htmlFor="servico-email" className="text-sm font-medium text-gray-700">
              Selecione o Serviço
            </Label>
            <div className="relative">
              <select
                id="servico-email"
                className="w-full h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500 px-3 appearance-none cursor-pointer touch-manipulation"
                defaultValue="smtp-personalizado"
              >
                <option value="smtp-personalizado">SMTP Personalizado</option>
                <option value="movingpay-smtp">SMTP Movingpay</option>
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="endereco-smtp" className="text-sm font-medium text-gray-700">
              Endereço SMTP
            </Label>
            <Input
              id="endereco-smtp"
              placeholder="smtp.exemplo.com"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="porta-smtp" className="text-sm font-medium text-gray-700">
              Selecione a Porta (465 SSL ou 587 TLS)
            </Label>
            <div className="relative">
              <select
                id="porta-smtp"
                className="w-full h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500 px-3 appearance-none cursor-pointer touch-manipulation"
                defaultValue="587"
              >
                <option value="587">587 (TLS)</option>
                <option value="465">465 (SSL)</option>
                <option value="25">25 (Sem criptografia)</option>
                <option value="2525">2525 (Alternativo)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <Label htmlFor="usuario-smtp" className="text-sm font-medium text-gray-700">
                Usuário
              </Label>
              <Input
                id="usuario-smtp"
                placeholder="usuario@exemplo.com"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="senha-smtp" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <Input
                id="senha-smtp"
                type="password"
                placeholder="••••••••"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="endereco-email" className="text-sm font-medium text-gray-700">
              Endereço de E-mail
            </Label>
            <Input
              id="endereco-email"
              type="email"
              placeholder="noreply@suaempresa.com"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
            />
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

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
        <button
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
        >
          Validar
        </button>
        <button
          className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
        >
          Salvar Configuração
        </button>
      </div>
    </>
  )
}