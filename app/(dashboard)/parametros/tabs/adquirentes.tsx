"use client"

import { useState } from "react"
import { Home, CreditCard, Plus, Eye, Edit, Trash2, X, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

interface AdquirentesTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

const adquirentesMock = [
  {
    id: 1,
    idAdquirente: "9",
    nome: "GETNET S/A",
    bandeiras: ["Visa", "Mastercard", "Elo"],
    situacao: "Habilitada",
    dataCadastro: "23/05/2025 14:23:37"
  },
  {
    id: 2,
    idAdquirente: "12",
    nome: "STONE PAGAMENTOS S.A.",
    bandeiras: ["Visa", "Mastercard"],
    situacao: "Desabilitada",
    dataCadastro: "15/04/2025 10:15:22"
  },
  {
    id: 3,
    idAdquirente: "7",
    nome: "CIELO S.A.",
    bandeiras: ["Visa", "Mastercard", "Elo", "Amex"],
    situacao: "Habilitada",
    dataCadastro: "02/03/2025 16:45:10"
  }
]

export default function AdquirentesTab({ activeTab, menuItems = [] }: AdquirentesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAdquirente, setSelectedAdquirente] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: '',
    situacao: 'Habilitada',
    bandeiras: [] as string[],
    adquirente: '',
    intervaloSincronizacao: '',
    horarioPagamentos: ''
  })
  const [showBandeiras, setShowBandeiras] = useState(false)

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleBandeiraToggle = (bandeira: string) => {
    setFormData(prev => ({
      ...prev,
      bandeiras: prev.bandeiras.includes(bandeira)
        ? prev.bandeiras.filter(b => b !== bandeira)
        : [...prev.bandeiras, bandeira]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    setIsModalOpen(false)
    setFormData({
      nome: '',
      situacao: 'Habilitada',
      bandeiras: [],
      adquirente: '',
      intervaloSincronizacao: '',
      horarioPagamentos: ''
    })
    setShowBandeiras(false)
  }

  const handleDelete = (adquirente: any) => {
    setSelectedAdquirente(adquirente)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    console.log('Excluindo adquirente:', selectedAdquirente)
    setIsDeleteModalOpen(false)
    setSelectedAdquirente(null)
  }

  const handleVisualizarBandeiras = (adquirente: any) => {
    window.location.href = `/bandeiras/${adquirente.idAdquirente}`
  }

  const bandeiraColors: { [key: string]: string } = {
    'Visa': 'bg-blue-100 text-blue-800',
    'Mastercard': 'bg-red-100 text-red-800',
    'Elo': 'bg-yellow-100 text-yellow-800',
    'Amex': 'bg-green-100 text-green-800'
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
                  <h1 className="text-lg font-bold text-gray-900">{activeItem?.label || 'Adquirentes'}</h1>
                  {activeItem?.sublabel && <p className="text-xs text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-1">Informação importante</h3>
            <p className="text-sm text-amber-700">
              Não é possível excluir uma adquirente caso tenha transações conciliadas.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-sm font-semibold text-gray-900">Adquirentes</h3>
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
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adquirente
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bandeiras
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data cadastro
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gerenciar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adquirentesMock.map((adquirente) => (
                  <tr key={adquirente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                      {adquirente.idAdquirente}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                      {adquirente.nome}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button 
                        onClick={() => handleVisualizarBandeiras(adquirente)}
                        className="px-2 py-1 text-sm font-medium text-white bg-[#169BFF] rounded-lg hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors"
                      >
                        Visualizar
                      </button>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                        adquirente.situacao === 'Habilitada' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {adquirente.situacao}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                      {adquirente.dataCadastro}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center gap-1">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(adquirente)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                        >
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
          {adquirentesMock.map((adquirente) => (
            <div key={adquirente.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">ID: {adquirente.idAdquirente}</span>
                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                      adquirente.situacao === 'Habilitada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {adquirente.situacao}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-900 mb-2">{adquirente.nome}</div>
                  <div className="mb-2">
                    <button 
                      onClick={() => handleVisualizarBandeiras(adquirente)}
                      className="px-2 py-1 text-xs font-medium text-[#169BFF] bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#169BFF]"
                    >
                      Visualizar Bandeiras
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(adquirente)}
                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Cadastro:</span>
                <div className="font-medium text-gray-900">{adquirente.dataCadastro}</div>
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
              <h2 className="text-xl font-bold text-gray-900">Adicionar Adquirente</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Gateway de Pagamentos</h3>
                <p className="text-sm text-gray-600">Suas transações serão sincronizadas em intervalos pré-definidos.</p>
              </div>

              <div>
                <Label htmlFor="adquirente" className="text-sm font-medium text-gray-700">
                  Selecione a Adquirente
                </Label>
                <select
                  id="adquirente"
                  value={formData.adquirente}
                  onChange={(e) => handleInputChange('adquirente', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl block w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="getnet">GETNET S/A</option>
                  <option value="stone">STONE PAGAMENTOS S.A.</option>
                  <option value="cielo">CIELO S.A.</option>
                </select>
              </div>

              <div>
                <Label htmlFor="intervaloSincronizacao" className="text-sm font-medium text-gray-700">
                  Intervalo de sincronização
                </Label>
                <select
                  id="intervaloSincronizacao"
                  value={formData.intervaloSincronizacao}
                  onChange={(e) => handleInputChange('intervaloSincronizacao', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="1h">A cada 1 hora</option>
                  <option value="6h">A cada 6 horas</option>
                  <option value="12h">A cada 12 horas</option>
                  <option value="24h">A cada 24 horas</option>
                </select>
              </div>

              <div>
                <Label htmlFor="horarioPagamentos" className="text-sm font-medium text-gray-700">
                  Horário dos pagamentos
                </Label>
                <select
                  id="horarioPagamentos"
                  value={formData.horarioPagamentos}
                  onChange={(e) => handleInputChange('horarioPagamentos', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="08:00">08:00</option>
                  <option value="12:00">12:00</option>
                  <option value="16:00">16:00</option>
                  <option value="20:00">20:00</option>
                </select>
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
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Confirmar Exclusão</h2>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4">
                Tem certeza que deseja excluir a adquirente <strong>{selectedAdquirente?.nome}</strong>?
              </p>
              <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                <strong>Lembrete:</strong> Não é possível excluir uma adquirente caso tenha transações conciliadas.
              </p>
            </div>

            <div className="flex gap-3 p-6 pt-0">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                Excluir
              </button>
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