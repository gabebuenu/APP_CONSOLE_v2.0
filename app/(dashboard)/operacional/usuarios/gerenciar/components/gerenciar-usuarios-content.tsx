"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Monitor, Building2, Truck } from "lucide-react"

import ConsoleTab from "../tabs/console"
import EstabelecimentoTab from "../tabs/estabelecimento"
import DistribuidorTab from "../tabs/distribuidor"

const menuItems = [
  { id: "console", icon: Monitor, label: "Console" },
  { id: "estabelecimento", icon: Building2, label: "Estabelecimento" },
  { id: "distribuidor", icon: Truck, label: "Distribuidor" },
]

export default function GerenciarUsuariosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab")
    const validTabs = menuItems.map((item) => item.id)
    return tabFromUrl && validTabs.includes(tabFromUrl) ? tabFromUrl : "console"
  })

  // Função para atualizar a tab e a URL
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set("tab", tabId)
    router.replace(newUrl.pathname + newUrl.search, { scroll: false })
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollArrows()
    const handleResize = () => checkScrollArrows()
    const currentRef = scrollContainerRef.current

    currentRef?.addEventListener("scroll", checkScrollArrows)
    window.addEventListener("resize", handleResize)

    setTimeout(() => {
      const activeTabElement = scrollContainerRef.current?.querySelector(`[data-tab-id="${activeTab}"]`)
      activeTabElement?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }, 0)

    return () => {
      currentRef?.removeEventListener("scroll", checkScrollArrows)
      window.removeEventListener("resize", handleResize)
    }
  }, [activeTab])

  const navigateTab = (direction: "prev" | "next") => {
    const currentIndex = menuItems.findIndex((item) => item.id === activeTab)
    if (currentIndex === -1) return

    let nextIndex
    if (direction === "next") {
      nextIndex = (currentIndex + 1) % menuItems.length
    } else {
      nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
    }
    const newActiveTabId = menuItems[nextIndex].id
    handleTabChange(newActiveTabId)

    setTimeout(() => {
      const activeTabElement = scrollContainerRef.current?.querySelector(`[data-tab-id="${newActiveTabId}"]`)
      activeTabElement?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }, 100)
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "console":
        return <ConsoleTab activeTab={activeTab} menuItems={menuItems} />
      case "estabelecimento":
        return <EstabelecimentoTab activeTab={activeTab} menuItems={menuItems} />
      case "distribuidor":
        return <DistribuidorTab activeTab={activeTab} menuItems={menuItems} />
      default:
        return <div className="text-gray-500">Conteúdo indisponível.</div>
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="lg:hidden bg-white sticky top-0 z-10">
        <div className="px-4 py-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Gerenciar Usuários</h2>
          <div className="relative">
            {showLeftArrow && (
              <button
                onClick={() => navigateTab("prev")}
                className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-transform duration-200"
                aria-label="Previous tab"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScrollArrows}
              className="flex overflow-x-auto scrollbar-hide space-x-3 pb-3"
            >
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    data-tab-id={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 min-w-[90px] touch-manipulation ${
                      isActive
                        ? "bg-[#169BFF] text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 mb-2 ${isActive ? "text-white" : "text-gray-500"}`} />
                    <span className="text-[11px] font-medium text-center leading-tight">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {showRightArrow && (
              <button
                onClick={() => navigateTab("next")}
                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-transform duration-200"
                aria-label="Next tab"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-[200px] bg-white flex-shrink-0">
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-900 mb-1">Gerenciar Usuários</h2>
          <p className="text-xs text-gray-500 mb-6">Tela Inicial</p>
        </div>
        <nav className="px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg mb-1 transition-all duration-300 ${
                  isActive ? "bg-blue-50 text-[#169BFF]" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  <IconComponent
                    className={`h-4 w-4 mr-3 flex-shrink-0 ${isActive ? "text-[#169BFF]" : "text-gray-500"}`}
                  />
                  <span className="text-left">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-[#169BFF] transform transition-transform duration-300" />
                )}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="bg-white flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-4 md:p-6 lg:p-8 mt-0 md:mt-[40px]">
        {renderActiveComponent()}
      </div>

      <div className="hidden lg:flex w-[542px] h-screen flex-shrink-0 items-center justify-center p-8 sticky top-0">
        <div className="relative w-full h-[773px] rounded-[25px] overflow-hidden">
          <img src="/MovingBanner.png" alt="Dashboard Preview" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  )
}
