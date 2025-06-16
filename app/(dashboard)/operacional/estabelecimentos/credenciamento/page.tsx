import { Suspense } from "react"
import CredenciamentoContent from "./credenciamento-content"

function CredenciamentoFallback() {
  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 w-full">
        <div className="w-full">
          <h2 className="text-sm font-medium text-gray-900 mb-1">Dados Comerciais</h2>
          <p className="text-xs text-gray-500">Tela Inicial</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-6">
        <div className="bg-white rounded-xl overflow-hidden w-full">
          {/* Loading Progress Indicator */}
          <div className="bg-[#efefef] px-6 py-6 w-full">
            <div className="animate-pulse">
              <div className="flex items-center justify-between w-full">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Form Content */}
          <div className="px-6 py-8 w-full">
            <div className="animate-pulse space-y-6">
              <div className="mb-6">
                <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-10 bg-gray-300 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CredenciamentoPage() {
  return (
    <Suspense fallback={<CredenciamentoFallback />}>
      <CredenciamentoContent />
    </Suspense>
  )
}
