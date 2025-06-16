"use client"

import { useState } from "react"
import { Home, CreditCard, Plus, Edit, Trash2, X, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

interface RegistradoraTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

const registradorasMock = [
  {
    id: 1,
    codigo: "432",
    nome: "TAG",
    ambiente: "Produção",
    situacao: "Habilitada",
    dataCriacao: "09/12/2024 15:19:14",
    dataAtualizacao: "09/12/2024 15:19:14"
  },
  {
    id: 2,
    codigo: "421",
    nome: "CERC",
    ambiente: "Produção",
    situacao: "Habilitada",
    dataCriacao: "09/12/2024 15:17:32",
    dataAtualizacao: "09/12/2024 15:17:32"
  },
  {
    id: 3,
    codigo: "352",
    nome: "TAG",
    ambiente: "Homologação",
    situacao: "Habilitada",
    dataCriacao: "11/06/2024 13:52:00",
    dataAtualizacao: "11/06/2024 13:52:00"
  },
  {
    id: 4,
    codigo: "11",
    nome: "CERC",
    ambiente: "Homologação",
    situacao: "Habilitada",
    dataCriacao: "21/12/2020 00:00:00",
    dataAtualizacao: "09/12/2024 15:18:25"
  }
]

const registradorasDisponiveis = [
  { codigo: "432", nome: "TAG" },
  { codigo: "421", nome: "CERC" },
  { codigo: "352", nome: "TAG" },
  { codigo: "11", nome: "CERC" }
]

export default function RegistradoraTab({ activeTab, menuItems = [] }: RegistradoraTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    registradora: '',
    registroRecebiveis: 'REGISTRAR TODAS...',
    tipoAmbiente: '',
    usuario: '',
    senha: '',
    habilitada: true
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData)
    setIsModalOpen(false)
    setFormData({
      registradora: '',
      registroRecebiveis: 'REGISTRAR TODAS...',
      tipoAmbiente: '',
      usuario: '',
      senha: '',
      habilitada: true
    })
  }

  return (
    <>
      <div className="lg:hidden mb-6">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || CreditCard
            return (
              <>
                <div className="bg-[#169BFF] p-2 rounded-lg mr-3">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{activeItem?.label || 'Registradoras'}</h1>
                  {activeItem?.sublabel && <p className="text-xs text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Informação importante</h4>
            <p className="text-sm text-blue-700">
              Não é possível excluir uma registradora, apenas modificá-la.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-base font-semibold text-gray-900">Registradoras</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#169BFF] text-white text-sm font-medium rounded-md shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    #
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Registradora
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Ambiente
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Situação
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Data Criação
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Data Atualização
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Gerenciar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registradorasMock.map((registradora) => (
                  <tr key={registradora.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap text-xs font-medium text-gray-900"> 
                      {registradora.codigo} - {registradora.nome}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900"> 
                      {registradora.nome}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-900"> 
                      {registradora.ambiente}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap"> 
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registradora.situacao === 'Habilitada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {registradora.situacao}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-900"> 
                      <div className="max-w-[100px]"> 
                        <div className="text-xs">{registradora.dataCriacao.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{registradora.dataCriacao.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-900"> 
                      <div className="max-w-[100px]"> 
                        <div className="text-xs">{registradora.dataAtualizacao.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{registradora.dataAtualizacao.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs font-medium"> 
                      <button className="text-indigo-600 hover:text-indigo-900 px-2 py-1 text-xs bg-indigo-50 rounded transition-colors">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {registradorasMock.map((registradora) => (
            <div key={registradora.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {registradora.codigo} - {registradora.nome}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{registradora.ambiente}</div>
                  <div className="flex gap-2 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      registradora.situacao === 'Habilitada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {registradora.situacao}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-500">Data Criação:</span>
                  <div className="font-medium text-gray-900">{registradora.dataCriacao}</div>
                </div>
                <div>
                  <span className="text-gray-500">Data Atualização:</span>
                  <div className="font-medium text-gray-900">{registradora.dataAtualizacao}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-indigo-600 hover:text-indigo-900 px-3 py-2 text-xs bg-indigo-50 rounded transition-colors">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Adicionar Registradora</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-900 mb-1">Aviso</h4>
                    <p className="text-sm text-yellow-700">
                      Após o cadastro, todas as transmissões serão realizadas no horário de janela da registradora selecionada.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="registradora" className="text-sm font-medium text-gray-700">
                  Registradora
                </Label>
                <select
                  id="registradora"
                  value={formData.registradora}
                  onChange={(e) => handleInputChange('registradora', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {registradorasDisponiveis.map((reg) => (
                    <option key={`${reg.codigo}-${reg.nome}`} value={`${reg.codigo}-${reg.nome}`}>
                      {reg.codigo} - {reg.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="registroRecebiveis" className="text-sm font-medium text-gray-700">
                  Registro de recebíveis
                </Label>
                <select
                  id="registroRecebiveis"
                  value={formData.registroRecebiveis}
                  onChange={(e) => handleInputChange('registroRecebiveis', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="REGISTRAR TODAS...">REGISTRAR TODAS...</option>
                </select>
              </div>

              <div>
                <Label htmlFor="tipoAmbiente" className="text-sm font-medium text-gray-700">
                  Tipo de Ambiente
                </Label>
                <select
                  id="tipoAmbiente"
                  value={formData.tipoAmbiente}
                  onChange={(e) => handleInputChange('tipoAmbiente', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Produção">Produção</option>
                  <option value="Homologação">Homologação</option>
                </select>
              </div>

              <div>
                <Label htmlFor="usuario" className="text-sm font-medium text-gray-700">
                  Usuário (client_id)
                </Label>
                <Input
                  id="usuario"
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => handleInputChange('usuario', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Digite o client_id"
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                  Senha (client_secret)
                </Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Digite o client_secret"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="habilitada"
                  type="checkbox"
                  checked={formData.habilitada}
                  onChange={(e) => handleInputChange('habilitada', e.target.checked)}
                  className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                />
                <Label htmlFor="habilitada" className="ml-2 text-sm font-medium text-gray-700">
                  Quero habilitar a registradora
                </Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden mt-8 mb-6">
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src={MovingPay}
            alt="Dashboard Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  )
}