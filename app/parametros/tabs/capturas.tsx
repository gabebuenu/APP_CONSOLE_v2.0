"use client"

import { useState } from "react"
import { Home, Camera, Plus, Eye, Edit, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"


interface CapturaTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

const capturasMock = [
  {
    id: 1,
    codigo: "0000028",
    captura: "ADIQ",
    psp: "ADIQ WHITE LABEL",
    situacao: "Liberado",
    dataCadastro: "15/01/24",
    dataAtualizacao: "20/03/24"
  },
  {
    id: 2,
    codigo: "0000002", 
    captura: "PHOEBUS",
    psp: "PHOEBUS",
    situacao: "Bloqueado",
    dataCadastro: "22/02/24",
    dataAtualizacao: "10/04/24"
  },
  {
    id: 3,
    codigo: "0000003",
    captura: "SOFTWARE EXPRESS",
    psp: "SOFTWARE EXPRESS",
    situacao: "Liberado",
    dataCadastro: "03/03/24",
    dataAtualizacao: "15/04/24"
  }
]

export default function CapturaTab({ activeTab, menuItems = [] }: CapturaTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    captura: '',
    url: '',
    usuario: '',
    senha: '',
    token: '',
    notificacoesPush: false,
    sincronizarVendas: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    setIsModalOpen(false)
    setFormData({
      captura: '',
      url: '',
      usuario: '',
      senha: '',
      token: '',
      notificacoesPush: false,
      sincronizarVendas: false
    })
  }

  return (
    <>
      <div className="lg:hidden mb-6">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || Camera
            return (
              <>
                <div className="bg-[#169BFF] p-2 rounded-lg mr-3">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{activeItem?.label || 'Capturas'}</h1>
                  {activeItem?.sublabel && <p className="text-xs text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Sincronização com a captura</h3>
        <p className="text-xs text-gray-600 mb-4">
          Verifique sempre se o token continua Liberado com o respectivo capturador.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-sm font-semibold text-gray-900">Capturas Vinculadas</h3>
          <button 
            onClick={() => {
              console.log('Botão clicado!');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#169BFF] text-white text-sm font-medium rounded-md shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] self-start sm:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar
          </button>
        </div>

        <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cód.
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Captura / PSP
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cadastro
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Atualização
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {capturasMock.map((captura) => (
                  <tr key={captura.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                      {captura.codigo}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div>
                        <div className="text-xs font-medium text-gray-900">{captura.captura}</div>
                        <div className="text-xs text-gray-500">{captura.psp}</div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                        captura.situacao === 'Liberado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {captura.situacao}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {captura.dataCadastro}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {captura.dataAtualizacao}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center gap-1">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          {capturasMock.map((captura) => (
            <div key={captura.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-900">{captura.codigo}</span>
                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                      captura.situacao === 'Liberado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {captura.situacao}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-900">{captura.captura}</div>
                  <div className="text-xs text-gray-500">{captura.psp}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Cadastro:</span>
                  <div className="font-medium text-gray-900">{captura.dataCadastro}</div>
                </div>
                <div>
                  <span className="text-gray-500">Atualização:</span>
                  <div className="font-medium text-gray-900">{captura.dataAtualizacao}</div>
                </div>
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
              <h2 className="text-lg font-semibold text-gray-900">Adicionar Captura</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Gateway - Notificações PUSH</h3>
                <p className="text-xs text-gray-600">Verifique a disponibilidade com o provedor do capturador.</p>
              </div>

              <div>
                <Label htmlFor="captura" className="text-sm font-medium text-gray-700">
                  Captura / TEF
                </Label>
                <select
                  id="captura"
                  value={formData.captura}
                  onChange={(e) => handleInputChange('captura', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {/* <option value="stone">Stone</option>
                  <option value="pagseguro">PagSeguro</option>
                  <option value="cielo">Cielo</option>
                  <option value="rede">Rede</option> */}
                </select>
              </div>

              <div>
                <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                  URL (Endpoint API Captura)
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="https://api.exemplo.com/captura"
                />
              </div>

              <div>
                <Label htmlFor="usuario" className="text-sm font-medium text-gray-700">
                  Usuário <span className="text-xs text-gray-500">(Necessário se chave de acesso em branco)</span>
                </Label>
                <Input
                  id="usuario"
                  type="text"
                  value={formData.usuario}
                  onChange={(e) => handleInputChange('usuario', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                  Senha <span className="text-xs text-gray-500">(Necessário se chave de acesso em branco)</span>
                </Label>
                <Input
                  id="senha"
                  type="password"
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="token" className="text-sm font-medium text-gray-700">
                  Token <span className="text-xs text-gray-500">(Necessário se usuário em branco)</span>
                </Label>
                <Input
                  id="token"
                  type="text"
                  value={formData.token}
                  onChange={(e) => handleInputChange('token', e.target.value)}
                  className="mt-1 text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    id="notificacoes"
                    type="checkbox"
                    checked={formData.notificacoesPush}
                    onChange={(e) => handleInputChange('notificacoesPush', e.target.checked)}
                    className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                  />
                  <Label htmlFor="notificacoes" className="text-sm text-gray-700">
                    Quero ativar as notificações PUSH
                  </Label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    id="sincronizar"
                    type="checkbox"
                    checked={formData.sincronizarVendas}
                    onChange={(e) => handleInputChange('sincronizarVendas', e.target.checked)}
                    className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                  />
                  <Label htmlFor="sincronizar" className="text-sm text-gray-700">
                    Sincronizar as vendas a cada 1 hora
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#169BFF] border border-transparent rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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