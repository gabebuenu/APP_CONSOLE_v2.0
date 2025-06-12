"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EmpresaProps {
  data: {
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
  updateData: (data: Partial<EmpresaProps["data"]>) => void
  onNext: () => void
}

export default function Empresa({ data, updateData, onNext }: EmpresaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  return (
    <div className="w-full">
      <div className="mb-6 w-full">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Empresa</h3>
        <p className="text-sm text-gray-600">Dados comerciais da empresa</p>
      </div>

      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="refExterna" className="text-sm font-medium text-gray-700">
              Ref. Externa
            </Label>
            <Input
              id="refExterna"
              name="refExterna"
              value={data.refExterna}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoCadastro" className="text-sm font-medium text-gray-700">
              Tipo de cadastro
            </Label>
            <Input
              id="tipoCadastro"
              name="tipoCadastro"
              value={data.tipoCadastro}
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
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="tipoNegocio" className="text-sm font-medium text-gray-700">
              Tipo de negócio
            </Label>
            <Input
              id="tipoNegocio"
              name="tipoNegocio"
              value={data.tipoNegocio}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
              Data Nascimento
            </Label>
            <Input
              id="dataNascimento"
              name="dataNascimento"
              value={data.dataNascimento}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
              Nome Completo
            </Label>
            <Input
              id="nomeCompleto"
              name="nomeCompleto"
              value={data.nomeCompleto}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="nomeFantasia" className="text-sm font-medium text-gray-700">
              Nome fantasia
            </Label>
            <Input
              id="nomeFantasia"
              name="nomeFantasia"
              value={data.nomeFantasia}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
              Contato Principal (Celular)
            </Label>
            <Input
              id="celular"
              name="celular"
              value={data.celular}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Endereço de e-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-gray-700">
              URL / E-commerce
            </Label>
            <Input
              id="url"
              name="url"
              value={data.url}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="horarioFuncionamento" className="text-sm font-medium text-gray-700">
              Horário funcionamento
            </Label>
            <Input
              id="horarioFuncionamento"
              name="horarioFuncionamento"
              value={data.horarioFuncionamento}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shopping" className="text-sm font-medium text-gray-700">
              Localizado em Shopping?
            </Label>
            <Input
              id="shopping"
              name="shopping"
              value={data.shopping}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="faturamentoMensal" className="text-sm font-medium text-gray-700">
              Faturamento Mensal (R$)
            </Label>
            <Input
              id="faturamentoMensal"
              name="faturamentoMensal"
              value={data.faturamentoMensal}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valorPatrimonio" className="text-sm font-medium text-gray-700">
              Valor do patrimônio (R$)
            </Label>
            <Input
              id="valorPatrimonio"
              name="valorPatrimonio"
              value={data.valorPatrimonio}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plano" className="text-sm font-medium text-gray-700">
              Selecione o Plano
            </Label>
            <select
              id="plano"
              name="plano"
              value={data.plano}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="plano1">Plano 1</option>
              <option value="plano2">Plano 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="sincronizacao" className="text-sm font-medium text-gray-700">
              Selecione a Sincronização
            </Label>
            <select
              id="sincronizacao"
              name="sincronizacao"
              value={data.sincronizacao}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="sinc1">Sincronização 1</option>
              <option value="sinc2">Sincronização 2</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sincronizarAPartirDe" className="text-sm font-medium text-gray-700">
              Sincronizar à partir de
            </Label>
            <Input
              id="sincronizarAPartirDe"
              name="sincronizarAPartirDe"
              value={data.sincronizarAPartirDe}
              onChange={handleChange}
              placeholder="DD/MM/AAAA"
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendedor" className="text-sm font-medium text-gray-700">
              Selecione o vendedor
            </Label>
            <select
              id="vendedor"
              name="vendedor"
              value={data.vendedor}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="vendedor1">Vendedor 1</option>
              <option value="vendedor2">Vendedor 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="registrarRecebiveis" className="text-sm font-medium text-gray-700">
              Registrar recebíveis junto a Registradora
            </Label>
            <Input
              id="registrarRecebiveis"
              name="registrarRecebiveis"
              value={data.registrarRecebiveis}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analistaRelacionamento" className="text-sm font-medium text-gray-700">
              Analista de Relacionamento
            </Label>
            <select
              id="analistaRelacionamento"
              name="analistaRelacionamento"
              value={data.analistaRelacionamento}
              onChange={handleChange}
              className="w-full h-12 md:h-10 bg-[#F2F2F2] border-0 rounded-xl px-3 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
            >
              <option value="">Selecione...</option>
              <option value="analista1">Analista 1</option>
              <option value="analista2">Analista 2</option>
            </select>
          </div>
        </div>

        <div className="pt-6 flex justify-end border-t border-gray-200 w-full">
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
