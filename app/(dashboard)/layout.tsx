import type React from "react"
import MainLayout from "@/components/main-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Não fazemos verificação de auth aqui, deixamos o middleware cuidar disso
  return <MainLayout>{children}</MainLayout>
}
