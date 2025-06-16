import { Suspense } from "react"
import GerenciarUsuariosContent from "./components/gerenciar-usuarios-content"

function GerenciarUsuariosPageFallback() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="lg:hidden bg-white sticky top-0 z-10">
        <div className="px-4 py-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Gerenciar Usuários</h2>
          <div className="flex space-x-3 pb-3">
            <div className="flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl bg-gray-200 animate-pulse min-w-[90px]">
              <div className="h-5 w-5 mb-2 bg-gray-300 rounded"></div>
              <div className="h-3 w-12 bg-gray-300 rounded"></div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl bg-gray-200 animate-pulse min-w-[90px]">
              <div className="h-5 w-5 mb-2 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl bg-gray-200 animate-pulse min-w-[90px]">
              <div className="h-5 w-5 mb-2 bg-gray-300 rounded"></div>
              <div className="h-3 w-14 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-[200px] bg-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Gerenciar Usuários</h2>
        </div>
        <nav className="px-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full flex items-center px-3 py-2.5 mb-1">
              <div className="h-4 w-4 mr-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </nav>
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-5 sm:p-4 md:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="hidden lg:flex w-[542px] h-screen flex-shrink-0 items-center justify-center p-8 sticky top-0">
        <div className="relative w-full h-[773px] rounded-[25px] overflow-hidden bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  )
}

export default function GerenciarUsuariosPage() {
  return (
    <Suspense fallback={<GerenciarUsuariosPageFallback />}>
      <GerenciarUsuariosContent />
    </Suspense>
  )
}
