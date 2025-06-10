import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import MainLayout from "@/components/main-layout"
// import MovingPayIco from "@/public/paymoving.ico"

export const metadata: Metadata = {
  title: "Console - MovingPay",
  description: "Sistema de gestão MovingPay",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Favicon */}
        <link rel="icon" href="../../../paymoving.ico" />
      </head>
      <body className="bg-[#f4f5fa] font-['Montserrat']">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
