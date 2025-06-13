"use client"

import { Eye, Trash2, Tag, Calendar, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface DispositivoCardProps {
  id: string
  tecnologia: string
  numeroSerie: string
  fabricante: string
  modelo: string
  dataCadastro: string
  status: "Disponível" | "Bloqueado" | "Em uso"
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function DispositivoCard({
  id,
  tecnologia,
  numeroSerie,
  fabricante,
  modelo,
  dataCadastro,
  status,
  onView,
  onDelete,
}: DispositivoCardProps) {
  // Determinar cores baseadas no status
  const statusColors = {
    Disponível: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: "text-emerald-500",
    },
    Bloqueado: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      icon: "text-red-500",
    },
    "Em uso": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "text-blue-500",
    },
  }

  const statusColor = statusColors[status]

  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
      {/* Status badge */}
      <div
        className={cn(
          "absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg",
          statusColor.bg,
          statusColor.text,
          statusColor.border,
        )}
      >
        {status}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-700">{tecnologia}</h3>
          <div className="bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium rounded-md ml-auto">EC #{id}</div>
        </div>

        {/* Serial Number */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-gray-900 tracking-tight break-all">{numeroSerie}</div>
          <div className="flex items-center gap-1.5 mt-1">
            <Tag className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {fabricante} - {modelo}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3"></div>

        {/* Footer - Modificado para resolver o problema em telas pequenas */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">{dataCadastro}</span>
          </div>

          <div className="flex flex-col xs:flex-row gap-2">
            <button
              onClick={() => onView(id)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 py-0 bg-white text-blue-600 shadow-sm border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors w-full xs:w-auto"
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Visualizar
            </button>
            <button
              onClick={() => onDelete(id)}
              disabled={status === "Em uso"}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3 py-0 shadow-sm border transition-colors w-full xs:w-auto",
                status === "Em uso"
                  ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white text-red-600 border-gray-200 hover:bg-red-50 hover:border-red-200",
              )}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Excluir
            </button>
          </div>
        </div>
      </div>

      {/* Hover effect - left border accent */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 opacity-0 group-hover:opacity-100",
          statusColor.bg,
          statusColor.border,
        )}
      ></div>
    </div>
  )
}
