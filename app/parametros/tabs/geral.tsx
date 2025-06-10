"use client"

import { Upload, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

const UploadArea = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="w-full h-[140px] sm:h-[120px] md:h-[140px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 active:bg-gray-100 touch-manipulation">
    <Upload className="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 text-gray-400 mb-2" />
    <p className="text-xs sm:text-[10px] md:text-xs font-medium text-gray-600 mb-1">Upload Image</p>
    <p className="text-[10px] sm:text-[8px] md:text-[10px] text-gray-500 px-2 leading-tight">{title}</p>
    <p className="text-[10px] sm:text-[8px] md:text-[10px] text-gray-400">{subtitle}</p>
  </div>
)

interface GeralTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function GeralTab({ activeTab, menuItems = [] }: GeralTabProps) {
  return (
    <>
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
                  <h1 className="text-xl font-bold text-gray-900">{activeItem?.label || 'Geral'}</h1>
                  {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Logo das Aplicações (White Label)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
          <UploadArea title="Console (W: 150px / H: 70px)" subtitle="PNG ou JPG até 2MB" />
          <UploadArea title="APP Estabelecimento (W: 200px / H: 100px)" subtitle="PNG ou JPG até 2MB" />
          <UploadArea title="APP Vendedor (W: 150px / H: 70px)" subtitle="PNG ou JPG até 2MB" />
        </div>
      </div>

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

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Contas à pagar</h3>
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

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Antecipação</h3>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="automacao_aut" className="text-sm font-medium text-gray-700 mb-2 block">
                Antecipação Automática
              </Label>
              <Input
                id="automacao_aut"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="hours-corte" className="text-sm font-medium text-gray-700 mb-2 block">
                Horário do Corte
              </Label>
              <Input
                id="hours-corte"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="aprovacao_aut" className="text-sm font-medium text-gray-700 mb-2 block">
              Aprovação Automática
            </Label>
            <Input
              id="aprovacao_aut"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Parâmetros da ELO</h3>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="cod_facilitador_elo" className="text-sm font-medium text-gray-700 mb-2 block">
                Código Facilitador ELO
              </Label>
              <Input
                id="cod_facilitador_elo"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Mensalidade POS</h3>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="mensalidade_pos" className="text-sm font-medium text-gray-700 mb-2 block">
                Mensalidade POS
              </Label>
              <Input
                id="mensalidade_pos"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="dia_desconto" className="text-sm font-medium text-gray-700 mb-2 block">
                Dia do desconto
              </Label>
              <Input
                id="dia_desconto"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5">Lançamentos</h3>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="desconto_chargeback" className="text-sm font-medium text-gray-700 mb-2 block">
                Desconto Automático de Chargeback
              </Label>
              <Input
                id="desconto_chargeback"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
            </div>
            <div>
              <Label htmlFor="desconto_cancelamento" className="text-sm font-medium text-gray-700 mb-2 block">
                Desconto Automático de Cancelamento
              </Label>
              <Input
                id="desconto_cancelamento"
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] rounded-xl border-0 focus-visible:ring-2 focus-visible:ring-blue-500 touch-manipulation"
              />
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
          className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
        >
          Atualizar Parâmetros
        </button>
      </div>
    </>
  )
}