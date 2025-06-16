"use client"
import { useState, useEffect } from "react"

import { RefreshCw, Bell, BookOpen, BookMarked, TrendingUp, BarChart3, AlertTriangle, CreditCard } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Componente de Skeleton para cards
function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

// Componente de Skeleton para gráficos
function ChartSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para card de valor
function ValueCard({
  title,
  value,
  subtitle,
  color = "text-gray-900",
}: {
  title: string
  value: number
  subtitle: string
  color?: string
}) {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="text-xs text-gray-500 mb-1">{subtitle}</div>
      <div className={`text-lg font-semibold ${color}`}>
        R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </div>
      <div className="text-xs text-gray-400 mt-1">{title}</div>
    </div>
  )
}

// Componente para gráfico placeholder
function ChartPlaceholder({
  title,
  description,
  height = "h-32",
}: {
  title: string
  description: string
  height?: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`${height} bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200`}
        >
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simular carregamento
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  // Dados das contas a receber
  const contasReceber = {
    paraHoje: 0.0,
    saldoFuturo: 0.0,
    cancelamentos: 0.0,
    chargebacks: 0.0,
    credito: 0.0,
    debito: 0.0,
  }

  // Dados das contas a pagar
  const contasPagar = {
    paraHoje: 58781.43,
    saldoFuturo: 1300267.42,
    cancelamentos: 24567.43,
    chargebacks: 492.88,
    credito: 24373.89,
    debito: 2254.82,
  }

  // Função para atualizar dados
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-1">Dashboard Financeiro</h2>
        <p className="text-xs text-gray-500">Tela Inicial</p>
      </div>

      {/* Botão de atualizar */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Atualizar
        </button>
      </div>

      {/* Informação Importante */}
      <Alert className="border-blue-200 bg-blue-50 mb-6">
        <Bell className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Informação Importante:</strong> Os estabelecimentos comerciais bloqueados para pagamento fazem parte
          da consulta exposta nos dashboards abaixo.
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="space-y-6">
          {/* Skeleton para cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>

          {/* Skeleton para gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton title="Volume (TPV) no Período" />
            <ChartSkeleton title="Pagamentos vs Recebimentos" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Contas a Receber */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Contas a Receber</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-2">Meus Recebimentos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard title="Para Hoje" value={contasReceber.paraHoje} subtitle="→" color="text-blue-600" />
                  <ValueCard
                    title="Saldo Futuro (Previsto)"
                    value={contasReceber.saldoFuturo}
                    subtitle="→"
                    color="text-blue-600"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-2">Cancelamentos / Chargebacks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard
                    title="Cancelamentos"
                    value={contasReceber.cancelamentos}
                    subtitle="→"
                    color="text-red-600"
                  />
                  <ValueCard title="Chargebacks" value={contasReceber.chargebacks} subtitle="→" color="text-red-600" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-2">Lançamentos Gerais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard title="Crédito" value={contasReceber.credito} subtitle="→" color="text-green-600" />
                  <ValueCard title="Débito" value={contasReceber.debito} subtitle="→" color="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Contas a Pagar */}
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <BookMarked className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Contas a Pagar</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-2">Meus Compromissos</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard title="Para Hoje" value={contasPagar.paraHoje} subtitle="→" color="text-red-600" />
                  <ValueCard
                    title="Saldo Futuro (Previsto)"
                    value={contasPagar.saldoFuturo}
                    subtitle="→"
                    color="text-red-600"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-red-800 mb-2">Cancelamentos / Chargebacks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard
                    title="Cancelamentos"
                    value={contasPagar.cancelamentos}
                    subtitle="→"
                    color="text-orange-600"
                  />
                  <ValueCard title="Chargebacks" value={contasPagar.chargebacks} subtitle="→" color="text-orange-600" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-red-800 mb-2">Lançamentos Gerais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ValueCard title="Crédito" value={contasPagar.credito} subtitle="→" color="text-green-600" />
                  <ValueCard title="Débito" value={contasPagar.debito} subtitle="→" color="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Gráficos</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartPlaceholder
                title="Volume (TPV) no Período"
                description="TPV Aprovado, Negado e Desfeito - Pico: 07/05 (~R$ 400.000)"
              />

              <ChartPlaceholder
                title="Pagamentos vs Recebimentos"
                description="Pagamentos, Recebimentos e Antecipado EC - Destaque: 27/05"
              />

              <ChartPlaceholder
                title="Percentual Médio de MDR"
                description="MDR EC e Adquirência - Oscilações entre 1% e 6%"
              />

              <ChartPlaceholder
                title="Overview de Antecipação"
                description="Receita e Despesa RAV - Maiores valores: 07/05 e 27/05"
              />
            </div>
          </div>

          {/* Percentuais de Crédito Parcelado */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Percentuais de Crédito Parcelado</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartPlaceholder
                title="Crédito 2x Até 6x"
                description="MDR EC: 1% - 5% | MDR Adquirência: ~0%"
                height="h-24"
              />

              <ChartPlaceholder
                title="Crédito 7x Até 12x"
                description="MDR EC: 2% - 8% | MDR Adquirência: ~0%"
                height="h-24"
              />

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Crédito 13x Até 21x
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-orange-50 rounded-lg flex items-center justify-center border-2 border-dashed border-orange-200">
                    <div className="text-center">
                      <AlertTriangle className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                      <p className="text-xs text-orange-600">Nenhuma informação disponível</p>
                      <p className="text-xs text-orange-500">Tente novamente mais tarde</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
