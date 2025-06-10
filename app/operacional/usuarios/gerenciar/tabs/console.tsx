"use client"

import { useState } from "react"
import { Plus, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

const usuariosConsoleMock = [
  {
    id: 25213,
    nome: "Moab Santos",
    cpf: "787.878.787-87",
    celular: "4996685648",
    permissoes: "Individual",
    situacao: "Habilitado",
  },
  {
    id: 24831,
    nome: "Gabriel Bueno",
    cpf: "457.010.768-06",
    celular: "14998147567",
    permissoes: "Grupo 5",
    situacao: "Habilitado",
  },
  {
    id: 23628,
    nome: "Teste Dev Teste Dev",
    cpf: "857.234.654-65",
    celular: "14998987864",
    permissoes: "Sem permissões",
    situacao: "Habilitado",
  },
  {
    id: 23528,
    nome: "Yasmin Lopes",
    cpf: "125.175.227-66",
    celular: "00000000000",
    permissoes: "Grupo 5",
    situacao: "Habilitado",
  },
  {
    id: 23502,
    nome: "Marco Antonio",
    cpf: "237.879.640-45",
    celular: "14992503333",
    permissoes: "Grupo 5",
    situacao: "Habilitado",
  },
  {
    id: 23501,
    nome: "Pedro Miguel Bonini De Cerqueira",
    cpf: "457.021.918-70",
    celular: "14998634261",
    permissoes: "Grupo 5",
    situacao: "Habilitado",
  },

  {
    id: 23500,
    nome: "Ana Silva",
    cpf: "111.222.333-44",
    celular: "11987654321",
    permissoes: "Individual",
    situacao: "Habilitado",
  },
  {
    id: 23499,
    nome: "Bruno Costa",
    cpf: "555.666.777-88",
    celular: "21912345678",
    permissoes: "Grupo 5",
    situacao: "Desabilitado",
  },
  {
    id: 23498,
    nome: "Carla Souza",
    cpf: "999.888.777-66",
    celular: "31998765432",
    permissoes: "Sem permissões",
    situacao: "Habilitado",
  },
  {
    id: 23497,
    nome: "Daniel Lima",
    cpf: "444.333.222-11",
    celular: "41911223344",
    permissoes: "Individual",
    situacao: "Habilitado",
  },
]


interface ConsoleTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function ConsoleTab({ activeTab, menuItems }: ConsoleTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 

  const filteredUsers = usuariosConsoleMock.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cpf.includes(searchTerm) ||
    user.celular.includes(searchTerm) ||
    user.id.toString().includes(searchTerm)
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddUser = () => {
    setIsModalOpen(true)
    console.log("Abrir modal/tela para adicionar novo usuário")
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-base font-semibold text-gray-800">Usuários Console</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-7 pr-2 py-1 text-sm rounded-md w-full sm:min-w-[180px] focus:ring-blue-500 focus:border-blue-500 h-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
          </div>
          <button
            onClick={handleAddUser}
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
                ID
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                CPF
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Celular
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Permissões
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-900 max-w-[120px] truncate" title={user.nome}>{user.nome}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{user.cpf}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{user.celular}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{user.permissoes}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
                        user.situacao === "Habilitado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.situacao}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => console.log("Visualizar", user.id)}
                      className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5"
                      title="Visualizar"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-2 py-3 text-center text-sm text-gray-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-between pt-2" aria-label="Pagination">
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3 w-3 mr-1" /> Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-2 relative inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <p className="text-xs text-gray-700">
              Página <span className="font-medium">{currentPage}</span> de <span className="font-medium">{totalPages}</span>
            </p>
          </div>
        </nav>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Adicionar Novo Usuário</h3>
            <p className="text-gray-600 mb-6">Formulário de adição de usuário aqui...</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert("Usuário adicionado! (lógica real seria aqui)")
                  setIsModalOpen(false)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#169BFF] rounded-md hover:bg-[#169affb2]"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden mt-4">
        <div className="relative w-full h-[120px] rounded-lg overflow-hidden flex items-center justify-center shadow">
          <Image
            src={MovingPay}
            alt="Usuários Console Preview"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
          <p className="relative z-10 text-white text-base font-bold">Gerenciamento de Usuários</p>
        </div>
      </div>
    </div>
  )
}