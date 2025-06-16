"use client"

import { useState, useEffect } from "react"
import { Download, RefreshCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const filesMock = [
  {
    id: 1,
    nome: "relatorio_vendas_2024.pdf",
    tipo: "PDF",
    tamanho: "2.5 MB",
    dataSolicitacao: "15/01/2024 14:30:22",
    dataConclusao: "15/01/2024 14:32:15",
    situacao: "Concluído",
  },
  {
    id: 2,
    nome: "dados_clientes_janeiro.xlsx",
    tipo: "Excel",
    tamanho: "8.7 MB",
    dataSolicitacao: "16/01/2024 09:15:45",
    dataConclusao: "",
    situacao: "Em processamento",
  },
  {
    id: 3,
    nome: "backup_sistema_completo.zip",
    tipo: "ZIP",
    tamanho: "156.2 MB",
    dataSolicitacao: "16/01/2024 10:22:10",
    dataConclusao: "16/01/2024 10:45:33",
    situacao: "Concluído",
  },
  {
    id: 4,
    nome: "log_transacoes_dezembro.txt",
    tipo: "TXT",
    tamanho: "12.1 MB",
    dataSolicitacao: "17/01/2024 08:45:12",
    dataConclusao: "",
    situacao: "Em processamento",
  },
]

export default function FileProcessingPage() {
  const [filterStatus, setFilterStatus] = useState("todos")
  const [recordsPerPage, setRecordsPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showExportDropdown, setShowExportDropdown] = useState(false)

  const filteredFiles = filesMock.filter((file) => {
    const matchesStatus =
      filterStatus === "todos" ||
      (filterStatus === "processamento" && file.situacao === "Em processamento") ||
      (filterStatus === "concluido" && file.situacao === "Concluído")

    const matchesSearch = file.nome.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const handleExportCSV = () => {
    console.log("Exportando arquivos para CSV...")
    setShowExportDropdown(false)
  }

  const handleRefresh = () => {
    console.log("Atualizando lista de arquivos...")
  }

  const handleDownload = (fileId: number) => {
    console.log("Baixando arquivo:", fileId)
  }

  useEffect(() => {
    const handleClickOutside = () => setShowExportDropdown(false)
    if (showExportDropdown) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showExportDropdown])

  return (
    <div className="p-4">
      {/* Cabeçalho da Página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Processamento de arquivos</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Container Principal */}
      <div className="bg-white">
        {/* Aviso Informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Processamento de arquivos</h3>
          <p className="text-sm text-blue-700">
            Solicitações em processamento significa que estamos preparando seu arquivo. Ele será disponibilizado assim
            que concluído.
          </p>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Primeira linha - Filtros principais */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
              >
                <option value="todos">Exibir todos</option>
                <option value="processamento">Em processamento</option>
                <option value="concluido">Concluído</option>
              </select>

              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(e.target.value)}
                className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
              >
                <option value="10">10 registros</option>
                <option value="50">50 registros</option>
                <option value="100">100 registros</option>
                <option value="250">250 registros</option>
                <option value="500">500 registros</option>
              </select>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowExportDropdown(!showExportDropdown)
                  }}
                  className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
                >
                  <Download className="h-3 w-3 mr-1" /> Exportar
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
                onClick={handleRefresh}
                className="flex items-center justify-center px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors h-8"
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Atualizar
              </button>
            </div>
          </div>

          {/* Segunda linha - Pesquisa e filtros de data */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar arquivo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8"
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data inicial"
              />

              <span className="text-sm text-gray-500">até</span>

              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 h-8 w-36"
                placeholder="Data final"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Arquivos */}
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">
                  <div className="flex items-center justify-center gap-1">
                    <Download className="h-3 w-3" />
                    Baixar
                  </div>
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Nome
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Tamanho
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Solicitação
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Data Conclusão
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Situação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5 whitespace-nowrap text-center">
                    {file.situacao === "Concluído" ? (
                      <button
                        onClick={() => handleDownload(file.id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Baixar arquivo"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        <Download className="h-4 w-4" />
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-1.5 text-sm text-gray-900 max-w-[200px] truncate" title={file.nome}>
                    {file.nome}
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{file.tipo}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{file.tamanho}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{file.dataSolicitacao}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{file.dataConclusao || "-"}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
                        file.situacao === "Concluído" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {file.situacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Informações de paginação */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span>
            Mostrando {filteredFiles.length} de {filesMock.length} registros
          </span>
          <span>Página 1 de 1</span>
        </div>
      </div>
    </div>
  )
}
