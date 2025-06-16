"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LogoutButton() {
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

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="sm"
      className="text-[#b0b0b0] hover:text-[#999999] hover:bg-[#d1d1d147]"
    >
      <LogOut size={16} className="mr-2" />
      Sair
    </Button>
  )
}
