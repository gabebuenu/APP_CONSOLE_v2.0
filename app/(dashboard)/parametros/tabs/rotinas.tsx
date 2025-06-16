import { Settings, Home, Plus, Trash2, Power, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import MovingPay from "@/public/paymoving.png"

interface RotinasTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

const rotinasData = [
  {
    id: 25,
    tipo: "RELATÓRIOS",
    descricao: "TESTE RELATORIO EXTRATO TRANSAÇÕES MENSALMENTE TODAS SITUAÇÕES",
    horario: "05:00:00",
    periodicidade: "TODO DIA 01, REFERENTE AO MÊS ANTERIOR",
    dataCadastro: "22/05/2024 07:17:25",
    dataAtualizacao: "22/05/2024 07:17:25",
    situacao: "Ativo"
  },
  {
    id: 26,
    tipo: "RELATÓRIOS",
    descricao: "TESTE ERRO ROTINA",
    horario: "15:02:00",
    periodicidade: "DIA 01 ATÉ O DIA ANTERIOR AO ATUAL",
    dataCadastro: "22/05/2024 10:10:52",
    dataAtualizacao: "22/05/2024 10:10:52",
    situacao: "Inativo"
  }
]

export default function RotinasTab({ activeTab, menuItems = [] }: RotinasTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden mb-8">
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          {(() => {
            const activeItem = menuItems.find((item) => item.id === activeTab)
            const IconComponent = activeItem?.icon || Settings
            return (
              <>
                <div className="bg-[#169BFF] p-3 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{activeItem?.label || 'Rotinas'}</h1>
                  {activeItem?.sublabel && <p className="text-sm text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">Gerenciamento das Rotinas</h4>
          <p className="text-sm text-blue-700">
            Atenção ao período de vigência das rotinas cadastradas.
          </p>
        </div>
      </div>

      <div className="mb-8 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900 mb-3 sm:mb-0">Gerenciamento das Rotinas</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] w-fit"
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
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    #
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Descrição
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Horário
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Periodicidade
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Cadastro
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Status
                  </th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"> 
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rotinasData.map((rotina) => (
                  <tr key={rotina.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-1 py-2 whitespace-nowrap text-xs font-medium text-gray-900"> 
                      {rotina.id}
                    </td>
                    <td className="px-1 py-2"> 
                      <div className="max-w-[180px] truncate text-xs text-gray-900" title={rotina.descricao}> 
                        {rotina.descricao}
                      </div>
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-xs text-gray-900"> 
                      {rotina.horario}
                    </td>
                    <td className="px-1 py-2"> 
                      <div className="max-w-[140px] truncate text-xs text-gray-900" title={rotina.periodicidade}> 
                        {rotina.periodicidade}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-xs text-gray-900"> 
                      <div className="max-w-[90px]"> 
                        <div className="text-xs">{rotina.dataCadastro.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{rotina.dataCadastro.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap"> 
                      <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                        rotina.situacao === 'Ativo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {rotina.situacao}
                      </span>
                    </td>
                    <td className="px-1 py-2 whitespace-nowrap text-xs font-medium"> 
                      <div className="flex items-center gap-1">
                        <button className="text-red-600 hover:text-red-900 px-1.5 py-1 text-xs bg-red-50 rounded transition-colors" title="Excluir">
                          Excluir
                        </button>
                        <button className={`px-1.5 py-1 text-xs rounded transition-colors ${
                          rotina.situacao === 'Ativo'
                            ? 'text-orange-600 hover:text-orange-900 bg-orange-50'
                            : 'text-green-600 hover:text-green-900 bg-green-50'
                        }`} title={rotina.situacao === 'Ativo' ? 'Inativar' : 'Ativar'}>
                          {rotina.situacao === 'Ativo' ? 'Inativar' : 'Ativar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {rotinasData.map((rotina) => (
            <div key={rotina.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">#{rotina.id}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rotina.situacao === 'Ativo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rotina.situacao}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Rotina</p>
                  <p className="text-sm text-gray-900">{rotina.tipo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Descrição</p>
                  <p className="text-sm text-gray-700">{rotina.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Horário</p>
                    <p className="text-sm text-gray-700">{rotina.horario}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Cadastro</p>
                    <p className="text-sm text-gray-700">{rotina.dataCadastro}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Periodicidade</p>
                  <p className="text-sm text-gray-700">{rotina.periodicidade}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1 px-3 py-2 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex-1 justify-center">
                  <Trash2 className="h-3 w-3" />
                  Excluir
                </button>
                <button className={`flex items-center gap-1 px-3 py-2 text-xs rounded-lg transition-colors flex-1 justify-center ${
                  rotina.situacao === 'Ativo'
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}>
                  <Power className="h-3 w-3" />
                  {rotina.situacao === 'Ativo' ? 'Inativar' : 'Ativar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Adicionar Nova Rotina</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">Informação importante!</h4>
                  <p className="text-sm text-yellow-700">
                    Antes de adicionar uma nova rotina, verifique se uma semelhante já existe, podendo inativar/ativar e excluir a mesma. É necessário definir a periodicidade desejada, que determina com que frequência ela será iniciada e seu período.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="select-rotina" className="text-sm font-medium text-gray-700">
                    Selecione uma rotina
                  </Label>
                  <div className="relative">
                    <select
                      id="select-rotina"
                      className="w-full h-12 text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500 px-3 appearance-none cursor-pointer touch-manipulation"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="relatorios">Relatórios</option>
                      <option value="backup">Backup</option>
                      <option value="limpeza">Limpeza de Dados</option>
                      <option value="sincronizacao">Sincronização</option>
                      <option value="notificacao">Notificações</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="descricao-rotina" className="text-sm font-medium text-gray-700">
                    Descrição (Informação chave para identificação da rotina programada)
                  </Label>
                  <textarea
                    id="descricao-rotina"
                    rows={3}
                    placeholder="Digite a descrição da rotina..."
                    className="w-full text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500 p-3 resize-none touch-manipulation"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="horario-execucao" className="text-sm font-medium text-gray-700">
                    Selecione o horário de execução da rotina
                  </Label>
                  <div className="relative">
                    <select
                      id="horario-execucao"
                      className="w-full h-12 text-sm bg-[#F2F2F2] rounded-xl border-0 focus:ring-2 focus:ring-blue-500 px-3 appearance-none cursor-pointer touch-manipulation"
                      defaultValue=""
                    >
                      <option value="" disabled>Selecione...</option>
                      <option value="00:00">00:00</option>
                      <option value="01:00">01:00</option>
                      <option value="02:00">02:00</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                      <option value="05:00">05:00</option>
                      <option value="06:00">06:00</option>
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                      <option value="22:00">22:00</option>
                      <option value="23:00">23:00</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                >
                  Adicionar Rotina
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  )
}