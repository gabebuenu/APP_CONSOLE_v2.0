"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"

interface RepresentanteProps {
  data: {
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
  updateData: (data: Partial<RepresentanteProps["data"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Representante({ data, updateData, onNext, onPrev }: RepresentanteProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    updateData({ [name]: value })
  }

  return (
    <div className="w-full">
      <div className="mb-6 w-full">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Representante</h3>
        <p className="text-sm text-gray-600">Dados do representante legal</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 w-full">
        <h4 className="text-sm font-semibold text-amber-800 mb-2">Responsável pelo negócio</h4>
        <p className="text-sm text-amber-700 leading-relaxed">
          Preenchimento do Responsável. É obrigatório que o Responsável pelo negócio conste no quadro societário ou o
          credenciamento poderá ser reprovado.
        </p>
      </div>

      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="nacionalidade" className="text-sm font-medium text-gray-700">
              Nacionalidade
            </Label>
            <Input
              id="nacionalidade"
              name="nacionalidade"
              value={data.nacionalidade}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
              CPF do responsável
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
            <Label htmlFor="cargo" className="text-sm font-medium text-gray-700">
              Cargo / Função
            </Label>
            <Input
              id="cargo"
              name="cargo"
              value={data.cargo}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="site" className="text-sm font-medium text-gray-700">
              Site / Rede Social
            </Label>
            <Input
              id="site"
              name="site"
              value={data.site}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeCompleto" className="text-sm font-medium text-gray-700">
              Nome completo
            </Label>
            <Input
              id="nomeCompleto"
              name="nomeCompleto"
              value={data.nomeCompleto}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
              Data de Nascimento
            </Label>
            <Input
              id="dataNascimento"
              name="dataNascimento"
              value={data.dataNascimento}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="rg" className="text-sm font-medium text-gray-700">
              RG (Troque o X por 0)
            </Label>
            <Input
              id="rg"
              name="rg"
              value={data.rg}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeMae" className="text-sm font-medium text-gray-700">
              Nome da mãe
            </Label>
            <Input
              id="nomeMae"
              name="nomeMae"
              value={data.nomeMae}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
              Celular
            </Label>
            <Input
              id="celular"
              name="celular"
              value={data.celular}
              onChange={handleChange}
              className="h-12 md:h-10 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
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
