"use client"

import { useState, useEffect } from "react"
import { Download, X, Plus, Copy, Check } from "lucide-react"
import { Input } from "@/components/ui/input"

const tokensMock = [
  {
    id: 1,
    descricao: "TESTE POSTBACK",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJjdXN0b21lcnNfaWQiOiIyIiwiaGFzaCI6IjlhZWNmMjJhLWI3MTQtNGMwMC1iMGVkLWRiYjRmYmZmNDQxYiIsImlhdCI6MTY2MzcxMDEwOCwiZXhwIjozMTcyMDgxNTI1MDh9.fdjMYpfuJIP7gWuTumMIwmZ0MwU5g3p5uUWBIaHRrBM",
    produto: "CONSOLE MVPAY",
    emitidoPor: "396.192.748-06",
    cadastro: "20/09/2022 18:41:48",
    situacao: "Revogado",
  },
  {
    id: 2,
    descricao: "POSTBACK",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1LCJjdXN0b21lcnNfaWQiOiIyIiwiaGFzaCI6IjgyMzk3MzYwLTM0MGMtNDJlMi05YmI5LTc5NTY3NWIwMGE0ZSIsImlhdCI6MTY2NDY1ODY5NCwiZXhwIjozMTcyMDkxMDEwOTR9.jmXZyJmyHDVYqFQajujzuoLT5w01YD3Rvqi7v1T5jnU",
    produto: "GATEWAY MVPAY",
    emitidoPor: "396.192.748-06",
    cadastro: "01/10/2022 18:11:34",
    situacao: "Habilitado",
  },
]

const produtos = ["CONSOLE MVPAY", "GATEWAY MVPAY", "API PAGAMENTOS", "API CONSULTAS", "WEBHOOK NOTIFICATIONS"]

export default function TokensPage() {
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showExportDropdown, setShowExportDropdown] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState<any>(null)
  const [showTokenGenerated, setShowTokenGenerated] = useState(false)
  const [generatedToken, setGeneratedToken] = useState("")
  const [copiedToken, setCopiedToken] = useState("")
  const [formData, setFormData] = useState({
    produto: "",
    descricao: "",
    vencimento: "indeterminado",
  })
  const [editFormData, setEditFormData] = useState({
    produto: "",
    descricao: "",
    vencimento: "indeterminado",
  })

  const filteredTokens = tokensMock.filter((token) => {
    return filterStatus === "todos" || token.situacao.toLowerCase() === filterStatus.toLowerCase()
  })

  const handleExportCSV = () => {
    console.log("Exportando tokens para CSV...")
    setShowExportDropdown(false)
  }

  const handleEditToken = (token: any) => {
    setSelectedToken(token)
    setEditFormData({
      produto: token.produto,
      descricao: token.descricao,
      vencimento: "indeterminado",
    })
    setIsEditModalOpen(true)
  }

  const handleRevokeToken = (tokenId: number) => {
    console.log("Revogando token:", tokenId)
    // Aqui você implementaria a lógica para revogar o token
  }

  const handleAddSubmit = () => {
    // Simula a geração de um novo token
    const newToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQyLCJjdXN0b21lcnNfaWQiOiIzIiwiaGFzaCI6IjEyMzQ1Njc4LTkwYWItY2RlZi0xMjM0LTU2Nzg5MGFiY2RlZiIsImlhdCI6MTcwNDY3MjAwMCwiZXhwIjozMTcyMDkxMDEwOTR9.newTokenHashExample123456789"

    setGeneratedToken(newToken)
    setShowTokenGenerated(true)

    console.log("Adicionando token:", formData)

    // Reset form
    setFormData({
      produto: "",
      descricao: "",
      vencimento: "indeterminado",
    })
  }

  const handleEditSubmit = () => {
    console.log("Editando token:", editFormData)
    setIsEditModalOpen(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedToken(text)
      setTimeout(() => setCopiedToken(""), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setShowTokenGenerated(false)
    setGeneratedToken("")
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
        <h2 className="text-sm font-medium text-gray-900 mb-1">Tokens de Acesso</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Container Principal */}
      <div className="bg-white">
        {/* Controles e Filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
          <div></div> {/* Div vazia para manter o justify-between funcionando */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1 text-sm bg-[#F2F2F2] border-0 rounded-md focus:ring-blue-500 focus:border-blue-500 h-8"
            >
              <option value="todos">Todos</option>
              <option value="habilitado">Habilitado</option>
              <option value="revogado">Revogado</option>
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
              <Plus className="h-3 w-3 mr-1" /> Novo Token
            </button>
          </div>
        </div>

        {/* Aviso Informativo */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Informação Importante!</h3>
          <p className="text-sm text-blue-700">
            Para utilizar qualquer serviço de integração via API, é necessário que você utilize um token de segurança
            para garantir a integridade dos dados trocados entre sua aplicação e a Movingpay.
          </p>
        </div>

        {/* Tabela de Tokens */}
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Descrição
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Token
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Produto
                </th>
                <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 uppercase">
                  Emitido por
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
              {filteredTokens.map((token) => (
                <tr key={token.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-900">{token.descricao}</td>
                  <td className="px-2 py-1.5 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs max-w-[200px] truncate" title={token.token}>
                        {token.token}
                      </span>
                      <button
                        onClick={() => copyToClipboard(token.token)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Copiar token"
                      >
                        {copiedToken === token.token ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{token.produto}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{token.emitidoPor}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-sm text-gray-500">{token.cadastro}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 inline-flex text-xs leading-3 font-medium rounded-full ${
                        token.situacao === "Habilitado" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {token.situacao}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleRevokeToken(token.id)}
                        className="text-red-600 hover:text-red-900 px-1.5 py-1 text-xs bg-red-50 rounded transition-colors"
                      >
                        Revogar
                      </button>
                      <button
                        onClick={() => handleEditToken(token)}
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

        {/* Modal Novo Token */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeAddModal}></div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Novo Token</h2>
                <button
                  onClick={closeAddModal}
                  className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {!showTokenGenerated ? (
                  <>
                    <div>
                      <label htmlFor="produto" className="text-sm font-medium text-gray-700">
                        Produto <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="produto"
                        value={formData.produto}
                        onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                        className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      >
                        <option value="">Selecione...</option>
                        {produtos.map((produto) => (
                          <option key={produto} value={produto}>
                            {produto}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                        Descrição Token <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="descricao"
                        type="text"
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                        placeholder="Descrição do token"
                      />
                    </div>

                    <div>
                      <label htmlFor="vencimento" className="text-sm font-medium text-gray-700">
                        Vencimento
                      </label>
                      <select
                        id="vencimento"
                        value={formData.vencimento}
                        onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                        className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                      >
                        <option value="indeterminado">Indeterminado</option>
                        <option value="30dias">30 dias</option>
                        <option value="90dias">90 dias</option>
                        <option value="1ano">1 ano</option>
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeAddModal}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
                      >
                        Fechar
                      </button>
                      <button
                        type="button"
                        onClick={handleAddSubmit}
                        className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
                      >
                        Cadastrar
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-green-800 mb-2">Token Gerado com Sucesso!</h3>
                      <p className="text-sm text-green-700">
                        Seu token foi criado. Copie e guarde em local seguro, pois não será possível visualizá-lo
                        novamente.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="tokenGerado" className="text-sm font-medium text-gray-700">
                        Token de Segurança
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <Input
                          id="tokenGerado"
                          type="text"
                          value={generatedToken}
                          readOnly
                          className="bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent font-mono"
                          placeholder="Token gerado aparecerá aqui"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedToken)}
                          className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#169BFF] rounded-lg"
                          title="Copiar token"
                        >
                          {copiedToken === generatedToken ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeAddModal}
                        className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2]"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Alterar Token */}
        {isEditModalOpen && selectedToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Alterar Token</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="produtoEdit" className="text-sm font-medium text-gray-700">
                    Produto <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="produtoEdit"
                    value={editFormData.produto}
                    onChange={(e) => setEditFormData({ ...editFormData, produto: e.target.value })}
                    className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {produtos.map((produto) => (
                      <option key={produto} value={produto}>
                        {produto}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="descricaoEdit" className="text-sm font-medium text-gray-700">
                    Descrição Token <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="descricaoEdit"
                    type="text"
                    value={editFormData.descricao}
                    onChange={(e) => setEditFormData({ ...editFormData, descricao: e.target.value })}
                    className="mt-1 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="vencimentoEdit" className="text-sm font-medium text-gray-700">
                    Vencimento
                  </label>
                  <select
                    id="vencimentoEdit"
                    value={editFormData.vencimento}
                    onChange={(e) => setEditFormData({ ...editFormData, vencimento: e.target.value })}
                    className="mt-1 block w-full bg-[#F2F2F2] px-3 py-2 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#169BFF] focus:border-transparent"
                  >
                    <option value="indeterminado">Indeterminado</option>
                    <option value="30dias">30 dias</option>
                    <option value="90dias">90 dias</option>
                    <option value="1ano">1 ano</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tokenSeguranca" className="text-sm font-medium text-gray-700">
                    Token de Segurança
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="tokenSeguranca"
                      type="text"
                      value={selectedToken.token}
                      readOnly
                      className="bg-gray-100 border-0 rounded-xl text-sm font-mono text-gray-600"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedToken.token)}
                      className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#169BFF] rounded-lg"
                      title="Copiar token"
                    >
                      {copiedToken === selectedToken.token ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <p>
                    <strong>Gerado pelo usuário:</strong> {selectedToken.emitidoPor}
                  </p>
                  <p>
                    <strong>Cadastrado em:</strong> {selectedToken.cadastro}
                  </p>
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
      </div>
    </div>
  )
}
