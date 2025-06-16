"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { User, FileText, LogOut, ChevronDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import MovingPayIco from "@/public/favicon.png"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Limpar cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    })

    // Redirecionar para login
    router.push("/login")
  }

  const menuItems = [
    {
      icon: User,
      label: "Editar perfil",
      onClick: () => {
        router.push("/perfil")
        setIsOpen(false)
      },
    },
    {
      icon: FileText,
      label: "Meus documentos",
      onClick: () => {
        toast({
          title: "Em desenvolvimento",
          description: "Esta funcionalidade estará disponível em breve.",
        })
        setIsOpen(false)
      },
    },
    {
      icon: LogOut,
      label: "Sair",
      onClick: handleLogout,
      className: "text-red-600 hover:text-red-700 hover:bg-red-50",
    },
  ]

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-2 cursor-pointer hover:bg-[#d1d1d147] rounded-lg p-2 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="w-[50px] h-[50px] bg-white rounded-full border-[0.5px] border-[#cacaca] hover:border-[#999999] transition-all duration-200 hover:scale-105">
          <AvatarImage
            src={MovingPayIco.src || "/placeholder.svg"}
            alt="MovingPay Logo"
            className="object-contain p-2"
          />
        </Avatar>
        <ChevronDown
          size={16}
          className={`text-[#b0b0b0] transition-all duration-300 ${isOpen ? "rotate-180 text-[#169BFF]" : ""}`}
        />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          <div className="absolute top-16 right-0 z-20 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-300 min-w-[200px]">
            <div className="py-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`
                      w-full px-4 py-3 text-left flex items-center space-x-3 
                      hover:bg-gray-50 transition-all duration-200 group
                      ${item.className || "text-gray-700 hover:text-gray-900"}
                      ${index !== menuItems.length - 1 ? "border-b border-gray-50" : ""}
                    `}
                  >
                    <IconComponent size={18} className="transition-all duration-200" />
                    <span className="font-['Montserrat'] text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
