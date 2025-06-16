"use client"

import { useState } from "react"
import { Home, CreditCard, Plus, Edit, Trash2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

interface RemessaBancariaTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

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

const bancos = [
  "BANCO BS2",
  "BANCO BS2 S/A",
  "BANCO SICOOB",
  "BANCO DO BRASIL",
  "CAIXA ECONÔMICA FEDERAL",
  "ITAÚ UNIBANCO",
  "BRADESCO",
  "SANTANDER"
]

export default function RemessaBancariaTab({ activeTab, menuItems = [] }: RemessaBancariaTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    banco: '',
    sequenciaAtual: '',
    razaoSocial: '',
    cpfCnpj: '',
    convenio: '',
    agencia: '',
    digitoAgencia: '',
    conta: '',
    digitoConta: '',
    descricaoExtrato: '',
    zerarSequenciaDiariamente: false,
    utilizarComoPadrao: false,
    habilitarAposCadastro: true
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
      banco: '',
      sequenciaAtual: '',
      razaoSocial: '',
      cpfCnpj: '',
      convenio: '',
      agencia: '',
      digitoAgencia: '',
      conta: '',
      digitoConta: '',
      descricaoExtrato: '',
      zerarSequenciaDiariamente: false,
      utilizarComoPadrao: false,
      habilitarAposCadastro: true
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
                  <h1 className="text-lg font-bold text-gray-900">{activeItem?.label || 'Remessa Bancária'}</h1>
                  {activeItem?.sublabel && <p className="text-xs text-gray-600 mt-1">{activeItem.sublabel}</p>}
                </div>
              </>
            )
          })()}
        </div>
      </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Cadastrar Remessa</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Aviso importante: Número sequencial!</h3>
                <p className="text-sm text-yellow-700">
                  Caso você já utilize a remessa bancária, é necessário informar o número sequencial atual.
                </p>
              </div>

              <div>
                <Label htmlFor="banco" className="text-sm font-medium text-gray-700">
                  Banco <span className="text-red-500">*</span>
                </Label>
                <select
                  id="banco"
                  value={formData.banco}
                  onChange={(e) => handleInputChange('banco', e.target.value)}
                  className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {bancos.map((banco) => (
                    <option key={banco} value={banco}>{banco}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="sequenciaAtual" className="text-sm font-medium text-gray-700">
                  Sequência Atual
                </Label>
                <Input
                  id="sequenciaAtual"
                  type="text"
                  value={formData.sequenciaAtual}
                  onChange={(e) => handleInputChange('sequenciaAtual', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Número da sequência"
                />
              </div>

              <div>
                <Label htmlFor="razaoSocial" className="text-sm font-medium text-gray-700">
                  Razão Social <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="razaoSocial"
                  type="text"
                  value={formData.razaoSocial}
                  onChange={(e) => handleInputChange('razaoSocial', e.target.value)}
                  className="mt-1 text-sm bg-[#F2F2F2] border-0 rounded-xl focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <Label htmlFor="cpfCnpj" className="text-sm font-medium text-gray-700">
                  CPF / CNPJ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cpfCnpj"
                  type="text"
                  value={formData.cpfCnpj}
                  onChange={(e) => handleInputChange('cpfCnpj', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                />
              </div>

              <div>
                <Label htmlFor="convenio" className="text-sm font-medium text-gray-700">
                  Convênio
                </Label>
                <Input
                  id="convenio"
                  type="text"
                  value={formData.convenio}
                  onChange={(e) => handleInputChange('convenio', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Número do convênio"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="agencia" className="text-sm font-medium text-gray-700">
                    Agência <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="agencia"
                    type="text"
                    value={formData.agencia}
                    onChange={(e) => handleInputChange('agencia', e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0000"
                  />
                </div>
                <div>
                  <Label htmlFor="digitoAgencia" className="text-sm font-medium text-gray-700">
                    Dígito Agência
                  </Label>
                  <Input
                    id="digitoAgencia"
                    type="text"
                    value={formData.digitoAgencia}
                    onChange={(e) => handleInputChange('digitoAgencia', e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    maxLength={1}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="conta" className="text-sm font-medium text-gray-700">
                    Conta <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="conta"
                    type="text"
                    value={formData.conta}
                    onChange={(e) => handleInputChange('conta', e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="00000000"
                  />
                </div>
                <div>
                  <Label htmlFor="digitoConta" className="text-sm font-medium text-gray-700">
                    Dígito da Conta <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="digitoConta"
                    type="text"
                    value={formData.digitoConta}
                    onChange={(e) => handleInputChange('digitoConta', e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="0"
                    maxLength={1}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descricaoExtrato" className="text-sm font-medium text-gray-700">
                  Descrição no Extrato <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="descricaoExtrato"
                  type="text"
                  value={formData.descricaoExtrato}
                  onChange={(e) => handleInputChange('descricaoExtrato', e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Descrição que aparecerá no extrato"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center">
                  <input
                    id="zerarSequencia"
                    type="checkbox"
                    checked={formData.zerarSequenciaDiariamente}
                    onChange={(e) => handleInputChange('zerarSequenciaDiariamente', e.target.checked)}
                    className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                  />
                  <Label htmlFor="zerarSequencia" className="ml-2 text-sm text-gray-700">
                    Zerar sequência diariamente.
                  </Label>
                </div>

                <div className="flex items-center">
                  <input
                    id="utilizarPadrao"
                    type="checkbox"
                    checked={formData.utilizarComoPadrao}
                    onChange={(e) => handleInputChange('utilizarComoPadrao', e.target.checked)}
                    className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                  />
                  <Label htmlFor="utilizarPadrao" className="ml-2 text-sm text-gray-700">
                    Utilizar essa remessa como padrão se necessário.
                  </Label>
                </div>

                <div className="flex items-center">
                  <input
                    id="habilitarRemessa"
                    type="checkbox"
                    checked={formData.habilitarAposCadastro}
                    onChange={(e) => handleInputChange('habilitarAposCadastro', e.target.checked)}
                    className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                  />
                  <Label htmlFor="habilitarRemessa" className="ml-2 text-sm text-gray-700">
                    Habilitar remessa após o cadastro.
                  </Label>
                </div>
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
                  Cadastrar
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