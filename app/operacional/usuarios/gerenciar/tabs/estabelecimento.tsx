// app/operacional/usuarios/gerenciar/tabs/estabelecimento.tsx
"use client"

import Image from "next/image"

interface EstabelecimentoTabProps {
  activeTab?: string
  menuItems?: Array<{
    id: string
    label: string
    sublabel?: string
    icon: React.ComponentType<any>
  }>
}

export default function EstabelecimentoTab({ activeTab, menuItems }: EstabelecimentoTabProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Usuários Estabelecimento</h2>
      <p className="text-gray-600 mb-6">
        Este é o conteúdo da aba "Estabelecimento". Adicione sua tabela e funcionalidades aqui.
      </p>

      {/* Exemplo de imagem para consistência */}
      <div className="mt-8 mb-6">
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
          <Image
            src="/paymoving.png" // Ajuste o caminho da imagem
            alt="Estabelecimento Preview"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <p className="relative z-10 text-white text-lg font-bold">Gerenciamento de Estabelecimentos</p>
        </div>
      </div>
    </div>
  )
}