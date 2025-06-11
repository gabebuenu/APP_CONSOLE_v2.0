"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hook para detectar se estamos em desktop ou mobile
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Estado para controlar a sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Estado para rastrear se o componente foi montado
  const [mounted, setMounted] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  // Efeito para definir estado inicial baseado no dispositivo
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      // Desktop: SEMPRE inicia aberto
      // Mobile: SEMPRE inicia fechado
      setSidebarOpen(isDesktop)
    }
  }, [mounted, isDesktop])

  // Efeito separado para lidar com mudanças de tamanho de tela
  useEffect(() => {
    if (mounted) {
      // Se mudou de mobile para desktop, abrir sidebar
      if (isDesktop && !sidebarOpen) {
        setSidebarOpen(true)
      }
      // Se mudou de desktop para mobile, fechar sidebar
      if (!isDesktop && sidebarOpen) {
        setSidebarOpen(false)
      }
    }
  }, [isDesktop, mounted])

  return (
    <div className="flex min-h-screen bg-[#efefef]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden fixed top-0 left-0 z-50 h-full">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <main className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div className="p-2 flex-1">
          <div className="bg-white rounded-[25px] w-full min-h-[calc(100vh-137px)] p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
