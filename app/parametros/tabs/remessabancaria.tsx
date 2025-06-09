"use client"

import { useState } from "react"
import { Home, CreditCard, Plus, Edit, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Define props interface
interface RemessaBancariaTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

// Mock data para a tabela
const remessasMock = [
  {
    id: 1,
    codigo: "218",
    instituicao: "BANCO BS2",
    ip: "200.0.1.8",
    agencia: "888",
    conta: "",
    situacao: "Habilitado",
    padrao: "Desativado",
    atualizacao: "30/05/2025 15:50:52"
  },
  {
    id: 2,
    codigo: "218",
    instituicao: "BANCO BS2 S/A",
    ip: "200.0.1.9",
    agencia: "999",
    conta: "",
    situacao: "Habilitado",
    padrao: "Habilitado",
    atualizacao: "30/05/2025 16:10:40"
  },
  {
    id: 3,
    codigo: "756",
    instituicao: "BANCO SICOOB",
    ip: "200.0.1.1",
    agencia: "111",
    conta: "",
    situacao: "Habilitado",
    padrao: "Desativado",
    atualizacao: "30/05/2025 15:49:28"
  }
]

export default function RemessaBancariaTab({ activeTab, menuItems = [] }: RemessaBancariaTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    codigo: '',
    instituicao: '',
    ip: '',
    agencia: '',
    conta: '',
    situacao: 'Habilitado',
    padrao: 'Desativado'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Dados do formulário:', formData)
    setIsModalOpen(false)
    // Reset form
    setFormData({
      codigo: '',
      instituicao: '',
      ip: '',
      agencia: '',
      conta: '',
      situacao: 'Habilitado',
      padrao: 'Desativado'
    })
  }

  return (
    <>
      {/* Header mobile com título da aba ativa */}
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
                  <h1 className="text-lg font-bold text-gray-900">{activeItem?.label || 'Remessa Bancária'}</h1>
                  {activeItem?.sublabel && <p className="text-xs text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      {/* Remessa Bancária (CNAB) */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-base font-semibold text-gray-900">Remessa Bancária (CNAB)</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#169BFF] text-white text-sm font-medium rounded-md shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>

        {/* Tabela Desktop */}
        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Cód.
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Instituição / IP
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Agência
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Conta
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Padrão
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Atualização
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {remessasMock.map((remessa) => (
                  <tr key={remessa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                      {remessa.codigo}
                    </td>
                    <td className="px-2 py-2">
                      <div className="max-w-[140px]">
                        <div className="text-xs font-medium text-gray-900 truncate">{remessa.instituicao}</div>
                        <div className="text-xs text-gray-500">{remessa.ip}</div>
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {remessa.agencia}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                      {remessa.conta || "-"}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                        remessa.situacao === 'Habilitado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {remessa.situacao}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                        remessa.padrao === 'Habilitado' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {remessa.padrao}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-xs text-gray-900">
                      <div className="max-w-[90px]">
                        <div className="text-xs">{remessa.atualizacao.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{remessa.atualizacao.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center gap-1">
                        <button className="text-red-600 hover:text-red-900 px-1.5 py-1 text-xs bg-red-50 rounded transition-colors">
                          Excluir
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900 px-1.5 py-1 text-xs bg-indigo-50 rounded transition-colors">
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-3">
          {remessasMock.map((remessa) => (
            <div key={remessa.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">Código: {remessa.codigo}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{remessa.instituicao}</div>
                  <div className="text-xs text-gray-500 mb-2">{remessa.ip}</div>
                  <div className="flex gap-2 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      remessa.situacao === 'Habilitado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {remessa.situacao}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      remessa.padrao === 'Habilitado' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      Padrão: {remessa.padrao}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span className="text-gray-500">Agência:</span>
                  <div className="font-medium text-gray-900">{remessa.agencia}</div>
                </div>
                <div>
                  <span className="text-gray-500">Conta:</span>
                  <div className="font-medium text-gray-900">{remessa.conta || "-"}</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-3">
                Atualização: {remessa.atualizacao}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 text-red-600 hover:text-red-900 px-3 py-2 text-xs bg-red-50 rounded transition-colors">
                  Excluir
                </button>
                <button className="flex-1 text-indigo-600 hover:text-indigo-900 px-3 py-2 text-xs bg-indigo-50 rounded transition-colors">
                  Alterar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Adicionar Remessa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop com blur */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Adicionar Remessa Bancária</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Código */}
              <div>
                <Label htmlFor="codigo" className="text-sm font-medium text-gray-700">
                  Código
                </Label>
                <Input
                  id="codigo"
                  type="text"
                  value={formData.codigo}
                  onChange={(e) => handleInputChange('codigo', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Ex: 218"
                />
              </div>

              {/* Instituição Financeira */}
              <div>
                <Label htmlFor="instituicao" className="text-sm font-medium text-gray-700">
                  Instituição Financeira
                </Label>
                <Input
                  id="instituicao"
                  type="text"
                  value={formData.instituicao}
                  onChange={(e) => handleInputChange('instituicao', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Ex: BANCO BS2"
                />
              </div>

              {/* IP */}
              <div>
                <Label htmlFor="ip" className="text-sm font-medium text-gray-700">
                  IP
                </Label>
                <Input
                  id="ip"
                  type="text"
                  value={formData.ip}
                  onChange={(e) => handleInputChange('ip', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Ex: 200.0.1.8"
                />
              </div>

              {/* Agência */}
              <div>
                <Label htmlFor="agencia" className="text-sm font-medium text-gray-700">
                  Agência
                </Label>
                <Input
                  id="agencia"
                  type="text"
                  value={formData.agencia}
                  onChange={(e) => handleInputChange('agencia', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Ex: 888"
                />
              </div>

              {/* Conta */}
              <div>
                <Label htmlFor="conta" className="text-sm font-medium text-gray-700">
                  Conta
                </Label>
                <Input
                  id="conta"
                  type="text"
                  value={formData.conta}
                  onChange={(e) => handleInputChange('conta', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Número da conta"
                />
              </div>

              {/* Situação */}
              <div>
                <Label htmlFor="situacao" className="text-sm font-medium text-gray-700">
                  Situação
                </Label>
                <select
                  id="situacao"
                  value={formData.situacao}
                  onChange={(e) => handleInputChange('situacao', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="Habilitado">Habilitado</option>
                  <option value="Desabilitado">Desabilitado</option>
                </select>
              </div>

              {/* Padrão */}
              <div>
                <Label htmlFor="padrao" className="text-sm font-medium text-gray-700">
                  Padrão
                </Label>
                <select
                  id="padrao"
                  value={formData.padrao}
                  onChange={(e) => handleInputChange('padrao', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="Desativado">Desativado</option>
                  <option value="Habilitado">Habilitado</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#169BFF] border border-transparent rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Imagem mobile */}
      <div className="lg:hidden mt-8 mb-6">
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src="/paymoving.png"
            alt="Dashboard Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  )
}