"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Camera, Save, User, Mail, Phone, Calendar, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import MovingPayIco from "@/public/favicon.png"

export default function PerfilPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fusoHorario: "America/Sao_Paulo",
    nome: "Gabriel",
    sobrenome: "Bueno",
    cpf: "123.456.789-00",
    dataNascimento: "1990-01-15",
    celular: "(11) 99999-9999",
    email: "gabriel.bueno@movingpay.com.br",
    senha: "",
    confirmarSenha: "",
  })

  const fusoHorarios = [
    { value: "America/Sao_Paulo", label: "(UTC-03:00) Brasília" },
    { value: "America/Manaus", label: "(UTC-04:00) Manaus" },
    { value: "America/Rio_Branco", label: "(UTC-05:00) Rio Branco" },
    { value: "America/Noronha", label: "(UTC-02:00) Fernando de Noronha" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    })

    setIsLoading(false)
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-medium text-gray-900 mb-1">Editar Perfil</h1>
        <p className="text-xs text-gray-500">Gerencie suas informações pessoais</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Foto do Perfil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User size={20} />
              <span className="text-xl" >Foto do Perfil</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24 bg-white rounded-full border-2 border-gray-200">
                  <AvatarImage
                    src={MovingPayIco.src || "/placeholder.svg"}
                    alt="Foto do perfil"
                    className="object-contain p-4"
                  />
                </Avatar>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-[#169BFF] rounded-full flex items-center justify-center hover:bg-[#169affb2] transition-colors duration-200"
                  onClick={() => {
                    toast({
                      title: "Em desenvolvimento",
                      description: "Upload de foto estará disponível em breve.",
                    })
                  }}
                >
                  <Camera size={16} className="text-white" />
                </button>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 ">Alterar foto</h3>
                <p className="text-sm text-gray-500 ">
                  Recomendamos uma imagem de pelo menos 400x400px
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 "
                  onClick={() => {
                    toast({
                      title: "Em desenvolvimento",
                      description: "Upload de foto estará disponível em breve.",
                    })
                  }}
                >
                  Escolher arquivo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 ">
              <User size={20} />
              <span>Informações Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fuso Horário */}
            <div className="space-y-2">
              <Label htmlFor="fusoHorario" className="flex items-center space-x-2 ">
                <Clock size={16} />
                <span>Fuso Horário</span>
              </Label>
              <Select value={formData.fusoHorario} onValueChange={(value) => handleInputChange("fusoHorario", value)}>
                <SelectTrigger className="bg-[#F2F2F2] border-0 rounded-xl h-12 ">
                  <SelectValue placeholder="Selecione o fuso horário" />
                </SelectTrigger>
                <SelectContent>
                  {fusoHorarios.map((fuso) => (
                    <SelectItem key={fuso.value} value={fuso.value} className="">
                      {fuso.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="">
                  Nome
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobrenome" className="">
                  Sobrenome
                </Label>
                <Input
                  id="sobrenome"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                  className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
                />
              </div>
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Label htmlFor="cpf" className="">
                CPF
              </Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                maxLength={14}
                className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
              />
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-2">
              <Label htmlFor="dataNascimento" className="flex items-center space-x-2 ">
                <Calendar size={16} />
                <span>Data de Nascimento</span>
              </Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
              />
            </div>

            {/* Celular */}
            <div className="space-y-2">
              <Label htmlFor="celular" className="flex items-center space-x-2 ">
                <Phone size={16} />
                <span>Celular</span>
              </Label>
              <Input
                id="celular"
                type="text"
                placeholder="(00) 00000-0000"
                value={formData.celular}
                onChange={(e) => handleInputChange("celular", formatPhone(e.target.value))}
                maxLength={15}
                className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
              />
            </div>
          </CardContent>
        </Card>

        {/* Dados de Acesso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 ">
              <Mail size={20} />
              <span>Meus dados de acesso</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* E-mail */}
            <div className="space-y-2">
              <Label htmlFor="email" className="">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
              />
            </div>

            <Separator />

            {/* Alterar Senha */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 ">Alterar Senha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senha" className="">
                    Nova Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha" className="">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    value={formData.confirmarSenha}
                    onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                    className="bg-[#F2F2F2] border-0 rounded-xl h-12 "
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            className=""
            onClick={() => {
              toast({
                title: "Alterações descartadas",
                description: "As alterações não foram salvas.",
              })
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-[#169BFF] text-white hover:bg-[#169affb2] "
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
