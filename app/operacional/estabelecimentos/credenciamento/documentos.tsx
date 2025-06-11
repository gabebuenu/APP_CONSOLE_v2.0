"use client"
import { Upload, X } from "lucide-react"
import type React from "react"

import { useState } from "react"

interface DocumentosProps {
  data: {
    arquivos: Array<{
      name: string
      size: number
      type: string
    }>
  }
  updateData: (data: Partial<DocumentosProps["data"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function Documentos({ data, updateData, onNext, onPrev }: DocumentosProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulando upload de arquivos
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }))
      updateData({ arquivos: [...data.arquivos, ...newFiles] })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Simulando upload de arquivos
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }))
      updateData({ arquivos: [...data.arquivos, ...newFiles] })
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Documentos</h3>
        <p className="text-gray-600">Documentação necessária para o credenciamento</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 w-full">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">Onde os documentos serão armazenados?</h4>
        <p className="text-blue-700 leading-relaxed">
          Por padrão, os documentos são armazenados em um Bucket S3, um serviço de armazenamento seguro da AWS. Apenas
          arquivos JPG, PNG, GIF e PDF (Máx 100MB) são permitidos.
        </p>
      </div>

      <div className="w-full">
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center w-full transition-colors ${
            dragActive ? "border-[#169BFF] bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-16 w-16 text-gray-400 mb-6" />
            <p className="text-lg text-gray-600 mb-4">Arraste e solte arquivos aqui ou</p>
            <label className="cursor-pointer px-6 py-3 bg-[#169BFF] text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Selecionar arquivos
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif,.pdf"
              />
            </label>
          </div>
        </div>

        {data.arquivos.length > 0 ? (
          <div className="mt-8 w-full">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Arquivo(s) Enviado(s)</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
              {data.arquivos.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs text-gray-600 font-medium">
                        {file.type.split("/")[1]?.toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 p-1 ml-2 flex-shrink-0"
                    onClick={() => updateData({ arquivos: data.arquivos.filter((_, i) => i !== index) })}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center text-gray-500 w-full">
            <p className="text-lg">Nenhum arquivo enviado até o momento.</p>
          </div>
        )}

        <div className="pt-8 flex justify-between border-t border-gray-200 w-full mt-8">
          <button
            onClick={onPrev}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 order-2 sm:order-1"
          >
            Voltar
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-sm bg-[#169BFF] text-white font-bold rounded-lg shadow hover:bg-[#169affb2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#169affb2] order-1 sm:order-2"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
