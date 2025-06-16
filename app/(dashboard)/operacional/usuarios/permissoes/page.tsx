"use client"

import { useState, useEffect } from "react"
import { Eye, Download, X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

const gruposMock = [
  {
    id: 5,
    nome: "Administrador",
    usuarios: 15,
    cadastro: "10/09/2021 00:00:00",
    situacao: "Habilitado",
  },
  {
    id: 4,
    nome: "Financeiro",
    usuarios: 8,
    cadastro: "15/10/2021 00:00:00",
    situacao: "Habilitado",
  },
  {
    id: 3,
    nome: "Comercial",
    usuarios: 12,
    cadastro: "22/11/2021 00:00:00",
    situacao: "Habilitado",
  },
  {
    id: 2,
    nome: "Suporte",
    usuarios: 6,
    cadastro: "05/01/2022 00:00:00",
    situacao: "Habilitado",
  },
  {
    id: 1,
    nome: "Operacional",
    usuarios: 10,
    cadastro: "18/02/2022 00:00:00",
    situacao: "Desabilitado",
  },
]

const usuariosGrupoMock = [
  {
    id: 24831,
    nome: "Gabriel Bueno",
    cpf: "45701076806",
    email: "gabriel.bueno@movingpay.com.br",
  },
  {
    id: 23528,
    nome: "Yasmin Lopes",
    cpf: "12517522766",
    email: "yasmin.lopes@movingpay.com.br",
  },
  {
    id: 23502,
    nome: "Marco Antonio",
    cpf: "23787964045",
    email: "marco.antonio@movingpay.com.br",
  },
  {
    id: 23501,
    nome: "Pedro Miguel Bonini De Cerqueira",
    cpf: "45702191870",
    email: "pedro.cerqueira@movingpay.com.br",
  },
  {
    id: 23500,
    nome: "Ana Silva",
    cpf: "11122233344",
    email: "ana.silva@movingpay.com.br",
  },
  {
    id: 23499,
    nome: "Bruno Costa",
    cpf: "55566677788",
    email: "bruno.costa@movingpay.com.br",
  },
  {
    id: 23498,
    nome: "Carla Souza",
    cpf: "99988877766",
    email: "carla.souza@movingpay.com.br",
  },
  {
    id: 23497,
    nome: "Daniel Lima",
    cpf: "44433322211",
    email: "daniel.lima@movingpay.com.br",
  },
  {
    id: 23496,
    nome: "Eduardo Santos",
    cpf: "12345678900",
    email: "eduardo.santos@movingpay.com.br",
  },
  {
    id: 23495,
    nome: "Fernanda Oliveira",
    cpf: "09876543211",
    email: "fernanda.oliveira@movingpay.com.br",
  },
  {
    id: 23494,
    nome: "Gustavo Pereira",
    cpf: "11223344556",
    email: "gustavo.pereira@movingpay.com.br",
  },
  {
    id: 23493,
    nome: "Helena Martins",
    cpf: "66778899001",
    email: "helena.martins@movingpay.com.br",
  },
  {
    id: 23492,
    nome: "Igor Almeida",
    cpf: "22334455667",
    email: "igor.almeida@movingpay.com.br",
  },
  {
    id: 23491,
    nome: "Julia Ferreira",
    cpf: "88990011223",
    email: "julia.ferreira@movingpay.com.br",
  },
  {
    id: 23490,
    nome: "Kaique Rodrigues",
    cpf: "33445566778",
    email: "kaique.rodrigues@movingpay.com.br",
  },
]

const permissoesModulos = [
  {
    nome: "Parâmetros",
    itens: ["Notificações", "Minha Conta", "Capturas", "Adquirentes", "DECRED / IOF", "Remessas", "Interface Contábil"],
  },
  {
    nome: "Segurança",
    itens: ["Usuários", "Grupos / Perfil", "Permissão de Acesso", "Tokens de Integração"],
  },
  {
    nome: "Dashboard",
    itens: [
      "Dashboard Inicial",
      "Overview de Transações",
      "Overview do Período",
      "Overview por Bandeira",
      "Saldo à receber (Adquirente)",
    ],
  },
  {
    nome: "Migração de Dados",
    itens: ["Importação", "Exportação"],
  },
  {
    nome: "Bancos",
    itens: ["Gerenciamento"],
  },
  {
    nome: "Cessionários",
    itens: ["Gerenciamento"],
  },
  {
    nome: "Estabelecimentos",
    itens: [
      "Credenciamento",
      "Consulta",
      "Tabela CNAE / MCC",
      "Taxas Comerciais",
      "Plano Comercial",
      "Split de Pagamentos",
      "Grupos Econômicos",
      "Unidade de Negócios",
    ],
  },
  {
    nome: "Distribuidores",
    itens: ["Gerenciamento"],
  },
  {
    nome: "Vendedores",
    itens: ["Gerenciamento"],
  },
  {
    nome: "Logística / Dispositivos",
    itens: ["POS / Mobile", "Fabricantes", "Modelos", "SIM Cards", "Planos"],
  },
  {
    nome: "Conciliação",
    itens: [
      "Dashboard / Overview",
      "Lançamentos Adquirentes",
      "Conciliação Bancária",
      "Divergência de Taxas",
      "Relatório Analítico",
    ],
  },
  {
    nome: "Relatórios (Excel / PDF)",
    itens: [
      "Lote de Pagamento (Domicílio)",
      "Lotes de Pagamento (Conta Pagto)",
      "Relatório Contábil",
      "Contas à Pagar (Sintético)",
      "Contas à Pagar (Analítico)",
      "Relatórios D1",
      "Relatórios D2",
    ],
  },
  {
    nome: "Relatórios",
    itens: [
      "Informe de Rendimentos",
      "Cessão de Recebíveis",
      "Antecipações",
      "Notificações PUSH",
      "Vendas / Transações",
      "Transações Pendentes",
      "Pré Autorização",
      "Transações Internacionais",
      "Faturamento EC",
      "Transferências EC",
      "Relatório ELO",
      "Consulta PEP",
      "Consulta OFAC",
      "Aluguel / Mensalidades",
      "Cancelamentos",
      "Chargebacks",
      "Boleto / Detran",
      "Não Conciliadas",
    ],
  },
  {
    nome: "Financeiro",
    itens: [
      "Contas à Pagar (Detalhado)",
      "Contas à Pagar (Consolidado)",
      "Transferências",
      "Remessas (CNAB e CIP)",
      "Antecipações",
      "Solicitação de Antecipações",
      "Fluxo de Caixa",
      "Lançamentos",
      "Nota Fiscal (RPS)",
    ],
  },
  {
    nome: "Contabilidade",
    itens: ["Plano de Contas", "Eventos", "Roteiros"],
  },
  {
    nome: "Gerenciador de Arquivos",
    itens: ["Gerenciamento", "Download de Arquivos"],
  },
  {
    nome: "Regulatórios",
    itens: ["DIMP", "DECRED", "DIRF", "DOC-SP", "DEBAN"],
  },
  {
    nome: "Registradoras",
    itens: [
      "Contratos",
      "Opt-In / Opt-Out",
      "Conciliação de Agendas",
      "Conciliação de ECs",
      "Unidade de Recebíveis",
      "Antecipações",
      "Transmissões",
    ],
  },
]

export default function GruposPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  const [searchUsuarios, setSearchUsuarios] = useState("")
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    habilitado: true,
  })
  const [editFormData, setEditFormData] = useState({
    nome: "",
    descricao: "",
    habilitado: true,
  })
  type Permission = {
    visualizar: boolean
    cadastrar: boolean
    alterar: boolean
    excluir: boolean
  }
  const [permissionsData, setPermissionsData] = useState<Record<string, Record<string, Permission>>>({})

  useEffect(() => {
    const initialPermissions: Record<string, Record<string, Permission>> = {}
    permissoesModulos.forEach((modulo) => {
      initialPermissions[modulo.nome] = {}
      modulo.itens.forEach((item) => {
        initialPermissions[modulo.nome][item] = {
          visualizar: false,
          cadastrar: false,
          alterar: false,
          excluir: false,
        }
      })
    })
    setPermissionsData(initialPermissions)
  }, [])

  const filteredGroups = gruposMock.filter((group) => {
    return filterStatus === "todos" || group.situacao.toLowerCase() === filterStatus.toLowerCase()
  })

  const filteredUsuarios = usuariosGrupoMock.filter((user) => {
    return (
      user.nome.toLowerCase().includes(searchUsuarios.toLowerCase()) ||
      user.cpf.includes(searchUsuarios) ||
      user.email.toLowerCase().includes(searchUsuarios.toLowerCase()) ||
      user.id.toString().includes(searchUsuarios)
    )
  })

  const handleExportCSV = () => {
    console.log("Exportando grupos para CSV...")
    setShowExportDropdown(false)
  }

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group)
    setIsViewModalOpen(true)
    setSearchUsuarios("")
  }

  const handleEditGroup = (group: any) => {
    setSelectedGroup(group)
    setEditFormData({
      nome: group.nome,
      descricao: "Grupo de Administradores",
      habilitado: group.situacao === "Habilitado",
    })
    setIsEditModalOpen(true)
  }

  const handleViewPermissions = () => {
    setIsPermissionsModalOpen(true)
  }

  const handleAddSubmit = () => {
    console.log("Adicionando grupo:", formData)
    setIsAddModalOpen(false)
    setFormData({
      nome: "",
      descricao: "",
      habilitado: true,
    })
  }

  const handleEditSubmit = () => {
    console.log("Editando grupo:", editFormData)
    setIsEditModalOpen(false)
  }

  const handlePermissionChange = (modulo: string, item: string, tipo: string, value: boolean) => {
    setPermissionsData((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [item]: {
          ...(prev[modulo][item] as any),
          [tipo]: value,
        },
      },
    }))
  }

  useEffect(() => {
    const handleClickOutside = () => setShowExportDropdown(false)
    if (showExportDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown])

  return (
    
    <div className="bg-white ">
        <div className="p-4">
                <h2 className="text-sm font-medium text-gray-900 mb-1">Permissões</h2>
                <p className="text-xs text-gray-500 mb-6">Tela Inicial</p>
        </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-base font-semibold text-gray-800">Grupos de Permissões</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
          >
            <option value="todos">Todos</option>
            <option value="habilitado">Habilitado</option>
            <option value="desabilitado">Desabilitado</option>
          </select>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowExportDropdown(!showExportDropdown)
              }}
              className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors w-full sm:w-auto h-8"
            >
              <Download className="h-3 w-3 mr-1" /> Export
            </button>

            {showExportDropdown && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleExportCSV}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  CSV
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2] focus:outline-none focus:ring-2 focus:ring-[#169BFF] transition-colors w-full sm:w-auto h-8"
          >
            <Plus className="h-3 w-3 mr-1" /> Adicionar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                #
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Nome do Grupo
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Usuários
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Cadastro
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Situação
              </th>
              <th scope="col" className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGroups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-2 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900">{group.id}</td>
                <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-900">{group.nome}</td>
                <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleViewGroup(group)}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                  >
                    {group.usuarios} usuário(s)
                  </button>
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{group.cadastro}</td>
                <td className="px-2 py-1.5 whitespace-nowrap">
                  <span
                    className={`px-1.5 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
                      group.situacao === "Habilitado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {group.situacao}
                  </span>
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleViewGroup(group)}
                      className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5"
                      title="Visualizar"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditGroup(group)}
                      className="text-indigo-600 hover:text-indigo-900 px-1.5 py-1 text-xs bg-indigo-50 rounded transition-colors"
                    >
                      Alterar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Adicionar Grupo */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Adicionar Grupo</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Aviso Importante!</h3>
                <p className="text-sm text-yellow-700">
                  Você poderá configurar as permissões de acesso após cadastrar o grupo.
                </p>
              </div>

              <div>
                <label htmlFor="nomeGrupo" className="text-sm font-medium text-gray-700">
                  Nome do Grupo <span className="text-red-500">*</span>
                </label>
                <Input
                  id="nomeGrupo"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Nome do grupo"
                />
              </div>

              <div>
                <label htmlFor="descricaoGrupo" className="text-sm font-medium text-gray-700">
                  Descrição do Grupo
                </label>
                <Input
                  id="descricaoGrupo"
                  type="text"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Descrição do grupo"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddSubmit}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Visualizar Usuários */}
      {isViewModalOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsViewModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Usuários do Grupo: {selectedGroup.nome}</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">{selectedGroup.usuarios} Usuário(s) vinculado(s)</p>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar usuário..."
                    className="pl-2 pr-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md w-full sm:min-w-[180px] focus:ring-blue-500 focus:border-blue-500 h-8"
                    value={searchUsuarios}
                    onChange={(e) => setSearchUsuarios(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredUsuarios.map((user) => (
                  <div key={user.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="font-medium text-gray-900">
                      [{user.id}] {user.nome}
                    </div>
                    <div className="text-sm text-gray-600">
                      CPF: {user.cpf} | E-mail: {user.email}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={handleViewPermissions}
                  className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Ver Permissões
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alterar Grupo */}
      {isEditModalOpen && selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Alterar Grupo</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Aviso Importante!</h3>
                <p className="text-sm text-yellow-700">
                  Você poderá configurar as permissões de acesso após cadastrar o grupo.
                </p>
              </div>

              <div>
                <label htmlFor="nomeGrupoEdit" className="text-sm font-medium text-gray-700">
                  Nome do Grupo <span className="text-red-500">*</span>
                </label>
                <Input
                  id="nomeGrupoEdit"
                  type="text"
                  value={editFormData.nome}
                  onChange={(e) => setEditFormData({ ...editFormData, nome: e.target.value })}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="descricaoGrupoEdit" className="text-sm font-medium text-gray-700">
                  Descrição do Grupo
                </label>
                <Input
                  id="descricaoGrupoEdit"
                  type="text"
                  value={editFormData.descricao}
                  onChange={(e) => setEditFormData({ ...editFormData, descricao: e.target.value })}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div className="flex items-center mt-2">
                <input
                  id="habilitarPerfilEdit"
                  type="checkbox"
                  checked={editFormData.habilitado}
                  onChange={(e) => setEditFormData({ ...editFormData, habilitado: e.target.checked })}
                  className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                />
                <label htmlFor="habilitarPerfilEdit" className="ml-2 text-sm text-gray-700">
                  Habilitar Perfil de Acesso
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                >
                  Alterar Dados
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Permissões */}
      {isPermissionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsPermissionsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Permissões: Grupo {selectedGroup?.nome}</h2>
              <button
                onClick={() => setIsPermissionsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">Aviso Importante!</h3>
                <p className="text-sm text-yellow-700">
                  As alterações somente terão validades no próximo login. (V: Visualizar | C: Cadastrar | A: Alterar |
                  E: Excluir)
                </p>
              </div>


              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    const newPermissions = { ...permissionsData }
                    permissoesModulos.forEach((modulo) => {
                      newPermissions[modulo.nome] = {}
                      modulo.itens.forEach((item) => {
                        newPermissions[modulo.nome][item] = {
                          visualizar: true,
                          cadastrar: true,
                          alterar: true,
                          excluir: true,
                        }
                      })
                    })
                    setPermissionsData(newPermissions)
                  }}
                  className="px-4 py-2 text-sm bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Selecionar Todas as Permissões
                </button>
              </div>

              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {permissoesModulos.map((modulo) => (
                  <div key={modulo.nome} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700">{modulo.nome}</div>
                    <div className="divide-y divide-gray-200">
                      {modulo.itens.map((item) => (
                        <div key={item} className="px-4 py-2 flex items-center">
                          <div className="flex-1 text-sm">{item}</div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${modulo.nome}-${item}-visualizar`}
                                checked={(permissionsData[modulo.nome]?.[item] as any)?.visualizar || false}
                                onChange={(e) =>
                                  handlePermissionChange(modulo.nome, item, "visualizar", e.target.checked)
                                }
                                className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                              />
                              <label
                                htmlFor={`${modulo.nome}-${item}-visualizar`}
                                className="ml-1 text-xs text-gray-600"
                              >
                                V
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${modulo.nome}-${item}-cadastrar`}
                                checked={(permissionsData[modulo.nome]?.[item] as any)?.cadastrar || false}
                                onChange={(e) =>
                                  handlePermissionChange(modulo.nome, item, "cadastrar", e.target.checked)
                                }
                                className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                              />
                              <label
                                htmlFor={`${modulo.nome}-${item}-cadastrar`}
                                className="ml-1 text-xs text-gray-600"
                              >
                                C
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${modulo.nome}-${item}-alterar`}
                                checked={(permissionsData[modulo.nome]?.[item] as any)?.alterar || false}
                                onChange={(e) => handlePermissionChange(modulo.nome, item, "alterar", e.target.checked)}
                                className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                              />
                              <label htmlFor={`${modulo.nome}-${item}-alterar`} className="ml-1 text-xs text-gray-600">
                                A
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`${modulo.nome}-${item}-excluir`}
                                checked={(permissionsData[modulo.nome]?.[item] as any)?.excluir || false}
                                onChange={(e) => handlePermissionChange(modulo.nome, item, "excluir", e.target.checked)}
                                className="h-4 w-4 text-[#169BFF] focus:ring-[#169BFF] border-gray-300 rounded"
                              />
                              <label htmlFor={`${modulo.nome}-${item}-excluir`} className="ml-1 text-xs text-gray-600">
                                E
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsPermissionsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
                >
                  Salvar Permissões
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
