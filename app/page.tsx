"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      console.log("🔍 Verificando autenticação na página inicial...")

      // Verificar se o usuário está logado
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      console.log(`🔑 Token encontrado: ${token ? "SIM" : "NÃO"}`)

      if (token) {
        console.log("✅ Usuário logado, redirecionando para dashboard")
        router.push("/dashboard")
      } else {
        console.log("❌ Usuário não logado, redirecionando para login")
        router.push("/login")
      }

      setIsChecking(false)
    }

    // Pequeno delay para garantir que o middleware executou
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#f4f5fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-['Montserrat']">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return null
}
