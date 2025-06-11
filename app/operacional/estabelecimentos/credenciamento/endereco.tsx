"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EnderecoProps {
  data: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    codigoMunicipio: string
    estado: string
    complemento: string
  }
  updateData: (data: Partial<EnderecoProps["data"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Endereco({ data, updateData, onNext, onPrev }: EnderecoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  return (
    <div className="w-full">
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Endereço</h3>
        <p className="text-gray-600">Endereço comercial da empresa</p>
      </div>

      <div className="space-y-8 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="cep" className="text-sm font-medium text-gray-700">
              CEP
            </Label>
            <Input
              id="cep"
              name="cep"
              value={data.cep}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2 xl:col-span-2 lg:col-span-2">
            <Label htmlFor="rua" className="text-sm font-medium text-gray-700">
              Rua / Avenida
            </Label>
            <Input
              id="rua"
              name="rua"
              value={data.rua}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero" className="text-sm font-medium text-gray-700">
              Número
            </Label>
            <Input
              id="numero"
              name="numero"
              value={data.numero}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="bairro" className="text-sm font-medium text-gray-700">
              Bairro
            </Label>
            <Input
              id="bairro"
              name="bairro"
              value={data.bairro}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade" className="text-sm font-medium text-gray-700">
              Cidade
            </Label>
            <Input
              id="cidade"
              name="cidade"
              value={data.cidade}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codigoMunicipio" className="text-sm font-medium text-gray-700">
              Código Município (IBGE)
            </Label>
            <Input
              id="codigoMunicipio"
              name="codigoMunicipio"
              value={data.codigoMunicipio}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado" className="text-sm font-medium text-gray-700">
              Estado (UF)
            </Label>
            <Input
              id="estado"
              name="estado"
              value={data.estado}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="complemento" className="text-sm font-medium text-gray-700">
              Complemento
            </Label>
            <Input
              id="complemento"
              name="complemento"
              value={data.complemento}
              onChange={handleChange}
              className="h-11 bg-[#F2F2F2] border-0 rounded-lg focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="pt-8 flex justify-between border-t border-gray-200 w-full">
          <button
            onClick={onPrev}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
          >
            Voltar
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
