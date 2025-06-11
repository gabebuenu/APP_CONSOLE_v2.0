"use client"

import { CheckCircle, Edit } from "lucide-react"

interface ConfirmarProps {
  formData: {
    empresa: {
      refExterna: string
      tipoCadastro: string
      cpf: string
      tipoNegocio: string
      dataNascimento: string
      nomeCompleto: string
      nomeFantasia: string
      celular: string
      email: string
      url: string
      horarioFuncionamento: string
      shopping: string
      faturamentoMensal: string
      valorPatrimonio: string
      plano: string
      sincronizacao: string
      sincronizarAPartirDe: string
      vendedor: string
      registrarRecebiveis: string
      analistaRelacionamento: string
      unidadesNegocio: never[]
    }
    representante: {
      nacionalidade: string
      cpf: string
      cargo: string
      site: string
      nomeCompleto: string
      dataNascimento: string
      rg: string
      nomeMae: string
      celular: string
      email: string
    }
    endereco: {
      cep: string
      rua: string
      numero: string
      bairro: string
      cidade: string
      codigoMunicipio: string
      estado: string
      complemento: string
    }
    documentos: {
      arquivos: any[]
    }
    juridico: {
      contratos: any[]
    }
    recebimentos: {
      transferenciaAutomatica: string
      periodicidade: string
      valorMinimo: string
      antecipacao: string
      formaRecebimento: string
      tipoDocumento: string
      cpf: string
      banco: string
      tipoConta: string
      agencia: string
      digitoAgencia: string
      conta: string
      digitoConta: string
      contaVerificada: boolean
    }
  }
  onPrev: () => void
}

export default function Confirmar({ formData, onPrev }: ConfirmarProps) {
  const handleSubmit = () => {
    // Aqui você implementaria a lógica para enviar os dados para o servidor
    console.log("Formulário enviado:", formData)
    alert("Cadastro finalizado com sucesso!")
  }

  return (
    <div className="w-full">
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmar</h3>
        <p className="text-gray-600">Revisão e confirmação dos dados inseridos</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 w-full">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Revisão e confirmação dos dados</h4>
        <p className="text-blue-700 leading-relaxed">Verifique todos os dados antes de finalizar o cadastro.</p>
      </div>

      <div className="space-y-8 w-full">
        {/* Dados Comerciais */}
        <div className="border border-gray-200 rounded-xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">Dados comerciais</h4>
            <button className="text-[#169BFF] hover:text-blue-700 flex items-center text-sm font-medium">
              <Edit className="h-4 w-4 mr-1" /> EDITAR DADOS
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">CPF</span>
              <span className="text-sm font-medium">{formData.empresa.cpf}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Data Nasc</span>
              <span className="text-sm font-medium">{formData.empresa.dataNascimento}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Tipo de Empresa</span>
              <span className="text-sm font-medium">{formData.empresa.tipoNegocio}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Registrar recebíveis junto a Registradora</span>
              <span className="text-sm font-medium">{formData.empresa.registrarRecebiveis}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Nome Completo</span>
              <span className="text-sm font-medium">{formData.empresa.nomeCompleto}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Nome comercial</span>
              <span className="text-sm font-medium">{formData.empresa.nomeFantasia}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Contato Principal (Celular)</span>
              <span className="text-sm font-medium">{formData.empresa.celular}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Endereço de e-mail</span>
              <span className="text-sm font-medium">{formData.empresa.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Site</span>
              <span className="text-sm font-medium">{formData.empresa.url}</span>
            </div>
          </div>
        </div>

        {/* Representante Comercial */}
        <div className="border border-gray-200 rounded-xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">Representante Comercial</h4>
            <button className="text-[#169BFF] hover:text-blue-700 flex items-center text-sm font-medium">
              <Edit className="h-4 w-4 mr-1" /> EDITAR DADOS
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Nome Completo</span>
              <span className="text-sm font-medium">{formData.representante.nomeCompleto}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">CPF</span>
              <span className="text-sm font-medium">{formData.representante.cpf}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">RG</span>
              <span className="text-sm font-medium">{formData.representante.rg}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Data de Nasc</span>
              <span className="text-sm font-medium">{formData.representante.dataNascimento}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Nome da Mãe</span>
              <span className="text-sm font-medium">{formData.representante.nomeMae}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Celular</span>
              <span className="text-sm font-medium">{formData.representante.celular}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">email</span>
              <span className="text-sm font-medium">{formData.representante.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Nacionalidade</span>
              <span className="text-sm font-medium">{formData.representante.nacionalidade}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Cargo / Função</span>
              <span className="text-sm font-medium">{formData.representante.cargo}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Site / Rede Social</span>
              <span className="text-sm font-medium">{formData.representante.site}</span>
            </div>
          </div>
        </div>

        {/* Endereço Comercial */}
        <div className="border border-gray-200 rounded-xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">Endereço Comercial</h4>
            <button className="text-[#169BFF] hover:text-blue-700 flex items-center text-sm font-medium">
              <Edit className="h-4 w-4 mr-1" /> EDITAR DADOS
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Rua / Avenida</span>
              <span className="text-sm font-medium">{formData.endereco.rua}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Número</span>
              <span className="text-sm font-medium">{formData.endereco.numero}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Complemento</span>
              <span className="text-sm font-medium">{formData.endereco.complemento}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Bairro</span>
              <span className="text-sm font-medium">{formData.endereco.bairro}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Cidade</span>
              <span className="text-sm font-medium">{formData.endereco.cidade}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Código IBGE</span>
              <span className="text-sm font-medium">{formData.endereco.codigoMunicipio}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Estado (UF)</span>
              <span className="text-sm font-medium">{formData.endereco.estado}</span>
            </div>
          </div>
        </div>

        {/* Recebimento das Vendas */}
        <div className="border border-gray-200 rounded-xl p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-gray-800">Recebimento das Vendas</h4>
            <button className="text-[#169BFF] hover:text-blue-700 flex items-center text-sm font-medium">
              <Edit className="h-4 w-4 mr-1" /> EDITAR DADOS
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Transferência Automática</span>
              <span className="text-sm font-medium">{formData.recebimentos.transferenciaAutomatica}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Valor Mínimo Transferência</span>
              <span className="text-sm font-medium">{formData.recebimentos.valorMinimo}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Periodicidade</span>
              <span className="text-sm font-medium">{formData.recebimentos.periodicidade}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Antecipação de Recebíveis</span>
              <span className="text-sm font-medium">{formData.recebimentos.antecipacao}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">CPF/CNPJ Recebedor</span>
              <span className="text-sm font-medium">{formData.recebimentos.cpf}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Banco</span>
              <span className="text-sm font-medium">{formData.recebimentos.banco}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Tipo Conta</span>
              <span className="text-sm font-medium">{formData.recebimentos.tipoConta}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Agência (Com o dígito)</span>
              <span className="text-sm font-medium">{formData.recebimentos.agencia}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Conta (Com o dígito)</span>
              <span className="text-sm font-medium">
                {formData.recebimentos.conta}-{formData.recebimentos.digitoConta}
              </span>
            </div>
          </div>
        </div>

        {/* Acordo Comercial */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 w-full">
          <h4 className="text-lg font-semibold text-yellow-800 mb-3">Cadastro do Acordo Comercial</h4>
          <p className="text-yellow-700 leading-relaxed">
            Você poderá definir as taxas e bandeiras após a aprovação do cadastro. É possível vincular um
            Estabelecimento em mais de uma adquirente.
          </p>
        </div>

        <div className="pt-8 flex justify-between border-t border-gray-200 w-full">
          <button
            onClick={onPrev}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
          >
            Voltar
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Finalizar Cadastro
          </button>
        </div>
      </div>
    </div>
  )
}
