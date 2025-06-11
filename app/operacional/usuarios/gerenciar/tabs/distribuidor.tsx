"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Eye, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import MovingPay from "@/public/paymoving.png"

const distribuidoresMock = [
  {
    id: 24979,
    nome: "Pedro Vendedor",
    cpf: "315.933.299-38",
    celular: "27983755711",
    situacao: "Habilitado",
  },
  {
    id: 23502,
    nome: "Marco Antonio",
    cpf: "237.879.640-45",
    celular: "14992503333",
    situacao: "Habilitado",
  },
  {
    id: 22485,
    nome: "Teste Teste",
    cpf: "29.278.364/0001-10",
    celular: "14998656565",
    situacao: "Habilitado",
  },
  {
    id: 22179,
    nome: "Marcos Vinicius Vinicius",
    cpf: "539.767.168-12",
    celular: "14997115213",
    situacao: "Habilitado",
  },
  {
    id: 21841,
    nome: "Testes 2025 2025",
    cpf: "222.164.478-09",
    celular: "14981535064",
    situacao: "Habilitado",
  },
  {
    id: 21837,
    nome: "Carneiro Carneiro",
    cpf: "222.163.478-09",
    celular: "14981535064",
    situacao: "Habilitado",
  },
  {
    id: 18357,
    nome: "Gustavo B B",
    cpf: "473.734.540-70",
    celular: "1465465465",
    situacao: "Habilitado",
  },
  {
    id: 17731,
    nome: "Pedro Pedro",
    cpf: "754.201.818-80",
    celular: "12345678900",
    situacao: "Habilitado",
  },
  {
    id: 14922,
    nome: "Fabi Teste Scalisse",
    cpf: "441.350.004-75",
    celular: "14981535064",
    situacao: "Habilitado",
  },
]

interface DistribuidorTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function DistribuidorTab({ activeTab, menuItems }: DistribuidorTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const itemsPerPage = 8

  const filteredUsers = distribuidoresMock.filter((user) => {
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

  const handleExportExcel = () => {
    console.log("Exportando distribuidores para Excel...")
    setShowExportDropdown(false)
  }

  const handleExportCSV = () => {
    console.log("Exportando distribuidores para CSV...")
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
        <h2 className="text-base font-semibold text-gray-800">Usuários Distribuidor</h2>
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
                Nome
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                CPF
              </th>
              <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                Celular
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
                <td colSpan={6} className="px-2 py-3 text-center text-sm text-gray-500">
                  Nenhum distribuidor encontrado.
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

      <div className="lg:hidden mt-4">
        <div className="relative w-full h-[120px] rounded-lg overflow-hidden flex items-center justify-center shadow">
          <Image
            src={MovingPay}
            alt="Distribuidores Preview"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-50"
          />
          {/* <p className="relative z-10 text-white text-base font-bold">Gerenciamento de Distribuidores</p> */}
        </div>
      </div>
    </div>
  )
}
