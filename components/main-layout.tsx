"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-[#efefef]">
      {/* Sidebar desktop - parte do fluxo normal */}
      <div className="hidden lg:block h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Sidebar mobile - posicionada por cima */}
      <div className="lg:hidden fixed top-0 left-0 z-50 h-full">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Área de conteúdo principal - sem margem extra */}
      <main className="flex-1 flex flex-col w-full">
        {/* Header que rola com o conteúdo */}
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Conteúdo da página */}
        <div className="p-2 flex-1">
          <div className="bg-white rounded-[25px] w-full min-h-[calc(100vh-137px)] p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </main>
    </div>
  )
}
