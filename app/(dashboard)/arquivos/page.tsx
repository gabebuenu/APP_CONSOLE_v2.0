"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Search, Download, Edit, Trash2, X, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/skeleton"
import { toast } from "@/hooks/use-toast"

const arquivosData = [
  {
    id: 6718817,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.143147",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.143147.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "46.7 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:31:47",
    solicitacao: "16/06/2025 14:31:47",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718816,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.143105",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.143105.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "146.5 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:31:05",
    solicitacao: "16/06/2025 14:31:05",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718815,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142953",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142953.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "6.8 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:29:53",
    solicitacao: "16/06/2025 14:29:53",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718814,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142942",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142942.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "6.3 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:29:42",
    solicitacao: "16/06/2025 14:29:42",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718813,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142920",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142920.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "6.5 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:29:20",
    solicitacao: "16/06/2025 14:29:20",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718812,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142916",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142916.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "6.3 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:29:16",
    solicitacao: "16/06/2025 14:29:16",
    situacao: "Concluído",
    descricao: "",
  },
  {
    id: 6718811,
    nome: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142838",
    arquivo: "CONTABIL_C2_MOVINGPAY_01.05.2025A01.06.2025_gen16.06.2025.142838.tar.gz",
    extensao: "TAR.GZ",
    tamanho: "6.8 KB",
    referencia: "RELATORIOS",
    dataEDI: "-",
    dataRecebimento: "16/06/2025 14:28:38",
    solicitacao: "16/06/2025 14:28:38",
    situacao: "Concluído",
    descricao: "",
  },
]

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Baixar</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Nome do arquivo</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Extensão</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Referência</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Data EDI</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Data Recebimento</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Solicitação</th>
            <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">Situação</th>
            <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-500 uppercase">Gerenciamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-2 py-3">
                <Skeleton className="h-6 w-6 rounded" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-48" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-2 py-3">
                <Skeleton className="h-6 w-20 rounded-full" />
              </td>
              <td className="px-2 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ArmazenamentoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [isLoading, setIsLoading] = useState(true)

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedArquivo, setSelectedArquivo] = useState<any>(null)

  // Upload form
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Edit form
  const [editForm, setEditForm] = useState({
    estabelecimento: "",
    nome: "",
    arquivo: "",
    referencia: "",
    descricao: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const filteredArquivos = arquivosData.filter((arquivo) => {
    const matchesSearch = arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredArquivos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArquivos = filteredArquivos.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024 * 1024) {
        // 1GB limit
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 1GB.",
          variant: "destructive",
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          toast({
            title: "Upload concluído!",
            description: "Arquivo enviado com sucesso.",
          })
          setIsUploadModalOpen(false)
          setSelectedFile(null)
          setUploadProgress(0)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDownload = (arquivo: any) => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${arquivo.nome}...`,
    })
  }

  const handleEdit = (arquivo: any) => {
    setSelectedArquivo(arquivo)
    setEditForm({
      estabelecimento: "",
      nome: arquivo.nome,
      arquivo: arquivo.arquivo,
      referencia: arquivo.referencia,
      descricao: arquivo.descricao,
    })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    toast({
      title: "Arquivo atualizado!",
      description: "As informações do arquivo foram atualizadas.",
    })
    setIsEditModalOpen(false)
  }

  const handleDelete = (arquivo: any) => {
    if (confirm(`Tem certeza que deseja excluir o arquivo "${arquivo.nome}"?`)) {
      toast({
        title: "Arquivo excluído",
        description: "O arquivo foi removido com sucesso.",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-medium text-gray-900 mb-1">Moving Pay - Serviço de Armazenamento</h1>
        <p className="text-xs text-gray-500 mb-6">
          Todos os seus arquivos são disponibilizados nessa tela.
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Processamento de arquivos</h3>
            <p className="text-sm text-blue-800">
              Solicitações em processamento significa que estamos preparando seu arquivo. Ele será disponibilizado assim
              que concluído.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar por Nome"
              className="pl-10 bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat'] min-w-[150px]">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="relatorios">Relatórios</SelectItem>
              <SelectItem value="documentos">Documentos</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
            />
            <span className="text-gray-500 font-['Montserrat']">até</span>
            <Input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
            />
          </div>
        </div>

        <Button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
        >
          <Upload className="h-4 w-4 mr-2" />
          Enviar Arquivo(s)
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Baixar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Nome do arquivo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Extensão
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Tamanho
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Referência
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Data EDI
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Data Recebimento
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Solicitação
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Situação
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase font-['Montserrat']">
                    Gerenciamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentArquivos.length > 0 ? (
                  currentArquivos.map((arquivo) => (
                    <tr key={arquivo.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDownload(arquivo)}
                          className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-1 rounded transition-colors"
                          title="Baixar arquivo"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-['Montserrat'] max-w-[300px] truncate">
                        {arquivo.nome}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.extensao}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.tamanho}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.referencia}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.dataEDI}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.dataRecebimento}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-['Montserrat']">{arquivo.solicitacao}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-green-100 text-green-800 font-['Montserrat']">
                          {arquivo.situacao}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(arquivo)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-1 rounded transition-colors"
                            title="Alterar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(arquivo)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1 rounded transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-6 text-center text-sm text-gray-500 font-['Montserrat']">
                      Nenhum arquivo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <nav className="flex items-center justify-between" aria-label="Pagination">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="font-['Montserrat']"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="font-['Montserrat']"
            >
              Próximo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="text-sm text-gray-700 font-['Montserrat']">
            Página <span className="font-medium">{currentPage}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </div>
        </nav>
      )}

      {/* Modal Upload */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsUploadModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">Upload de Arquivos</h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 font-['Montserrat']">O arquivo deverá ter no máximo 1GB.</p>

              <div>
                <Label className="font-['Montserrat'] mb-2 block">Selecione o arquivo para envio</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".png,.gif,.jpg,.jpeg,.pdf,.txt,.rar,.zip,.csv,.xlsx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-['Montserrat']">
                      Clique para selecionar ou arraste o arquivo
                    </span>
                  </label>
                </div>

                <p className="text-xs text-gray-500 mt-2 font-['Montserrat']">
                  Extensão permitida: PNG, GIF, JPG, JPEG, PDF, TXT, RAR, ZIP, CSV, XLSX
                </p>

                {selectedFile ? (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 font-['Montserrat']">{selectedFile.name}</span>
                      <span className="text-sm text-gray-500 font-['Montserrat']">
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </div>
                    {uploadProgress > 0 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#169BFF] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-['Montserrat']">{uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500 font-['Montserrat']">Nenhum arquivo escolhido</span>
                    <br />
                    <span className="text-xs text-gray-400 font-['Montserrat']">0 B</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button onClick={() => setIsUploadModalOpen(false)} variant="outline" className="font-['Montserrat']">
                Fechar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadProgress > 0}
                className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
              >
                {uploadProgress > 0 ? "Enviando..." : "Enviar / Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && selectedArquivo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 font-['Montserrat']">
                Informações sobre o arquivo: #{selectedArquivo.id}
              </h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <Label className="font-['Montserrat']">Vincular no Estabelecimento</Label>
                <Input
                  placeholder="Nome / Razão social..."
                  value={editForm.estabelecimento}
                  onChange={(e) => setEditForm({ ...editForm, estabelecimento: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label className="font-['Montserrat']">Nome / Identificação</Label>
                <Input
                  value={editForm.nome}
                  onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label className="font-['Montserrat']">Arquivo</Label>
                <Input
                  value={editForm.arquivo}
                  onChange={(e) => setEditForm({ ...editForm, arquivo: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label className="font-['Montserrat']">Disco / Referência</Label>
                <Input
                  value={editForm.referencia}
                  onChange={(e) => setEditForm({ ...editForm, referencia: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>

              <div>
                <Label className="font-['Montserrat']">Descrição</Label>
                <Input
                  value={editForm.descricao}
                  onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
                  className="bg-[#F2F2F2] border-0 rounded-xl font-['Montserrat']"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="font-['Montserrat']">
                Fechar
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-[#169BFF] text-white hover:bg-[#169affb2] font-['Montserrat']"
              >
                Alterar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
