"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

interface RecebimentosProps {
  data: {
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
  updateData: (data: Partial<RecebimentosProps["data"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Recebimentos({ data, updateData, onNext, onPrev }: RecebimentosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    updateData({ [name]: checked })
  }

  return (
    <div className="w-full">
      <div className="mb-6 w-full">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Recebimentos</h3>
        <p className="text-sm text-gray-600">Configurações de contas bancárias e recebimentos</p>
      </div>

      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="transferenciaAutomatica" className="text-sm font-medium text-gray-700">
              Transferência automática
            </Label>
            <select
              id="transferenciaAutomatica"
              name="transferenciaAutomatica"
              value={data.transferenciaAutomatica}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="periodicidade" className="text-sm font-medium text-gray-700">
              Periodicidade
            </Label>
            <select
              id="periodicidade"
              name="periodicidade"
              value={data.periodicidade}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="Diária">Diária</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensal">Mensal</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="valorMinimo" className="text-sm font-medium text-gray-700">
              Valor mínimo para transferência (R$)
            </Label>
            <Input
              id="valorMinimo"
              name="valorMinimo"
              value={data.valorMinimo}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="antecipacao" className="text-sm font-medium text-gray-700">
              Antecipação de recebíveis (Automático)
            </Label>
            <select
              id="antecipacao"
              name="antecipacao"
              value={data.antecipacao}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6 w-full">
          <h4 className="text-base font-semibold text-gray-800 mb-5">Recebimento das vendas</h4>

          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="formaRecebimento" className="text-sm font-medium text-gray-700">
                Forma de Recebimento
              </Label>
              <Input
                id="formaRecebimento"
                name="formaRecebimento"
                value={data.formaRecebimento}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoDocumento" className="text-sm font-medium text-gray-700">
                Tipo de Documento
              </Label>
              <Input
                id="tipoDocumento"
                name="tipoDocumento"
                value={data.tipoDocumento}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                CPF (Somente dígitos)
              </Label>
              <Input
                id="cpf"
                name="cpf"
                value={data.cpf}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banco" className="text-sm font-medium text-gray-700">
                Banco / Instituição
              </Label>
              <Input
                id="banco"
                name="banco"
                value={data.banco}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 w-full mt-5">
            <div className="space-y-2">
              <Label htmlFor="tipoConta" className="text-sm font-medium text-gray-700">
                Tipo de Conta
              </Label>
              <Input
                id="tipoConta"
                name="tipoConta"
                value={data.tipoConta}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agencia" className="text-sm font-medium text-gray-700">
                Agência
              </Label>
              <Input
                id="agencia"
                name="agencia"
                value={data.agencia}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="digitoAgencia" className="text-sm font-medium text-gray-700">
                Dígito Agência
              </Label>
              <Input
                id="digitoAgencia"
                name="digitoAgencia"
                value={data.digitoAgencia}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conta" className="text-sm font-medium text-gray-700">
                Conta
              </Label>
              <Input
                id="conta"
                name="conta"
                value={data.conta}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="digitoConta" className="text-sm font-medium text-gray-700">
                Dígito Conta
              </Label>
              <Input
                id="digitoConta"
                name="digitoConta"
                value={data.digitoConta}
                onChange={handleChange}
                className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              />
            </div>
          </div>

          <div className="mt-5 w-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contaVerificada"
                name="contaVerificada"
                checked={data.contaVerificada}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
              />
              <label htmlFor="contaVerificada" className="ml-3 block text-sm text-gray-700">
                Habilitar esta conta para receber futuros pagamentos
              </label>
            </div>

            {data.contaVerificada && (
              <div className="mt-3 flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Esta conta foi verificada e validada</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex justify-between border-t border-gray-200 w-full">
          <button
            onClick={onPrev}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Voltar
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
