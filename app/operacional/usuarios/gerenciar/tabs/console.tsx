"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Search, Eye, ChevronLeft, ChevronRight, X, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import MovingPay from "@/public/paymoving.png"

const fusosHorarios = [
  "UTC-12:00 - Linha Internacional de Data",
  "UTC-11:00 - Samoa",
  "UTC-10:00 - Havaí",
  "UTC-09:00 - Alasca",
  "UTC-08:00 - Pacífico (Los Angeles)",
  "UTC-07:00 - Montanha (Denver)",
  "UTC-06:00 - Central (Chicago)",
  "UTC-05:00 - Oriental (Nova York)",
  "UTC-04:00 - Atlântico",
  "UTC-03:00 - Brasília",
  "UTC-02:00 - Atlântico Sul",
  "UTC-01:00 - Açores",
  "UTC+00:00 - Greenwich (Londres)",
  "UTC+01:00 - Europa Central",
  "UTC+02:00 - Europa Oriental",
  "UTC+03:00 - Moscou",
  "UTC+04:00 - Golfo",
  "UTC+05:00 - Paquistão",
  "UTC+05:30 - Índia",
  "UTC+06:00 - Bangladesh",
  "UTC+07:00 - Tailândia",
  "UTC+08:00 - China",
  "UTC+09:00 - Japão",
  "UTC+10:00 - Austrália Oriental",
  "UTC+11:00 - Ilhas Salomão",
  "UTC+12:00 - Nova Zelândia",
]

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
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const filteredUsers = usuariosConsoleMock.filter((user) => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cpf.includes(searchTerm) ||
      user.celular.includes(searchTerm) ||
      user.id.toString().includes(searchTerm)

    const matchesStatus = filterStatus === "todos" || user.situacao.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

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

  const [formData, setFormData] = useState({
    cpf: "",
    dataNascimento: "",
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    limiteLancamento: "",
    limiteAprovacao: "",
    fusoHorario: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    console.log("Dados do usuário:", formData)
    setIsModalOpen(false)
    setFormData({
      cpf: "",
      dataNascimento: "",
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
      limiteLancamento: "",
      limiteAprovacao: "",
      fusoHorario: "",
    })
  }

  const handleAddUser = () => {
    setIsModalOpen(true)
    console.log("Abrir modal/tela para adicionar novo usuário")
  }

  const handleExportExcel = () => {
    console.log("Exportando para Excel...")
    setShowExportDropdown(false)
  }

  const handleExportCSV = () => {
    console.log("Exportando para CSV...")
    setShowExportDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = () => setShowExportDropdown(false)
    if (showExportDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown])

  return (
    <div className="bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-base font-semibold text-gray-800">Usuários Console</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-7 pr-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md w-full sm:min-w-[180px] focus:ring-blue-500 focus:border-blue-500 h-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
          >
            <option value="todos">Todos</option>
            <option value="habilitado">Habilitado</option>
            <option value="desabilitado">Desabilitado</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors w-full sm:w-auto h-8"
            >
              <Download className="h-3 w-3 mr-1" /> Export
            </button>

            {showExportDropdown && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                  onClick={handleExportExcel}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-md"
                >
                  Excel
                </button>
                <button
                  onClick={handleExportCSV}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-md"
                >
                  CSV
                </button>
              </div>
            )}
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
                  <td
                    className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-900 max-w-[120px] truncate"
                    title={user.nome}
                  >
                    {user.nome}
                  </td>
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
              Página <span className="font-medium">{currentPage}</span> de{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
        </nav>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Cadastro de Usuário</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                  CPF <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="Informe o CPF"
                />
              </div>

              <div>
                <Label htmlFor="dataNascimento" className="text-sm font-medium text-gray-700">
                  Data de Nascimento <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="nome" className="text-sm font-medium text-gray-700">
                    Nome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <Label htmlFor="sobrenome" className="text-sm font-medium text-gray-700">
                    Sobrenome <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sobrenome"
                    type="text"
                    value={formData.sobrenome}
                    onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="Sobrenome"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                  Telefone Celular <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  placeholder="(__) _____-____"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="limiteLancamento" className="text-sm font-medium text-gray-700">
                    Limite de Lançamento
                  </Label>
                  <Input
                    id="limiteLancamento"
                    type="text"
                    value={formData.limiteLancamento}
                    onChange={(e) => handleInputChange("limiteLancamento", e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="R$ 0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="limiteAprovacao" className="text-sm font-medium text-gray-700">
                    Limite para Aprovação
                  </Label>
                  <Input
                    id="limiteAprovacao"
                    type="text"
                    value={formData.limiteAprovacao}
                    onChange={(e) => handleInputChange("limiteAprovacao", e.target.value)}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="fusoHorario" className="text-sm font-medium text-gray-700">
                  Fuso horário <span className="text-red-500">*</span>
                </Label>
                <select
                  id="fusoHorario"
                  value={formData.fusoHorario}
                  onChange={(e) => handleInputChange("fusoHorario", e.target.value)}
                  className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                >
                  <option value="">Selecione uma opção...</option>
                  {fusosHorarios.map((fuso) => (
                    <option key={fuso} value={fuso}>
                      {fuso}
                    </option>
                  ))}
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

      <div className="lg:hidden mt-4">
        <div className="relative w-full h-[120px] rounded-lg overflow-hidden flex items-center justify-center shadow">
          <Image
            src={MovingPay}
            alt="Usuários Console Preview"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-50"
          />
          {/* <p className="relative z-10 text-white text-base font-bold">Gerenciamento de Usuários</p> */}
        </div>
      </div>
    </div>
  )
}
