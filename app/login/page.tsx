"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Mail, Shield, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)

    // Simular envio de código
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep("otp")

    toast({
      title: "Código enviado!",
      description: `Enviamos um código de verificação para ${email}`,
    })
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular verificação do código
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (otp === "000000") {
      // Simular criação de token/cookie
      document.cookie = "token=mock-jwt-token; path=/; max-age=86400"

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      })

      // Redirecionar para dashboard após 1 segundo
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } else {
      toast({
        title: "Código inválido",
        description: "Use o código 000000 para fazer login.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleBack = () => {
    setStep("email")
    setOtp("")
  }

  return (
    <div className="min-h-screen bg-[#f4f5fa] flex items-center justify-center p-4 font-['Montserrat']">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[25px] shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-white p-6 sm:p-8 text-center border-b border-gray-100">
            <div className="mx-auto w-16 h-16 bg-[#F2F2F2] rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-[#169BFF]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {step === "email" ? "Bem-vindo de volta!" : "Verificação de código"}
            </h1>
            <p className="text-sm text-gray-600">
              {step === "email" ? "Digite seu email para continuar" : `Enviamos um código para ${email}`}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Seu email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[#F2F2F2] border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#169BFF] focus:border-transparent h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#169BFF] text-white hover:bg-[#169affb2] font-medium h-12 rounded-xl text-sm"
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando código...
                    </>
                  ) : (
                    "Continuar"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {/* Back button */}
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center text-[#169BFF] hover:text-[#169affb2] text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </button>

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Se você tem uma conta, enviamos um código para{" "}
                      <span className="font-medium text-gray-900">{email}</span>. Digite abaixo.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} className="gap-2">
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-12 bg-[#F2F2F2] border-0 rounded-xl text-lg font-mono focus:ring-2 focus:ring-[#169BFF] transition-all duration-200 focus:scale-105 focus:bg-white data-[active=true]:scale-105 data-[active=true]:bg-white"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {/* {otp.length === 6 && (
                    <div className="text-center">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium animate-pulse">
                        ✓ Código completo
                      </div>
                    </div>
                  )} */}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#169BFF] text-white hover:bg-[#169affb2] font-medium h-12 rounded-xl text-sm"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email")
                      toast({
                        title: "Código reenviado!",
                        description: `Novo código enviado para ${email}`,
                      })
                    }}
                    className="text-sm text-[#169BFF] hover:text-[#169affb2] font-medium transition-colors"
                  >
                    Não recebeu o código? Reenviar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#F2F2F2] px-6 sm:px-8 py-4 text-center">
            <p className="text-xs text-gray-500">
              Ao continuar, você concorda com nossos{" "}
              <button className="text-[#169BFF] hover:text-[#169affb2] font-medium">Termos de Serviço</button> e{" "}
              <button className="text-[#169BFF] hover:text-[#169affb2] font-medium">Política de Privacidade</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
