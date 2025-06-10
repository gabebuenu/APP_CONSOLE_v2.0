"use client"

import { useState } from "react"
import { Bell, ChevronDown, Grid2x2, PanelRightOpen, Settings, Check } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import MovingPay from "@/public/paymoving.png"
import MovingPayIco from "@/public/favicon.png"

type HeaderProps = {
  toggleSidebar: () => void
  sidebarOpen: boolean
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState("002 | [39275231000143] MOVINGPAY")

  const companies = [
    { id: 1, code: "002", cnpj: "39275231000143", name: "MOVINGPAY" },
    { id: 2, code: "003", cnpj: "12345678000100", name: "OUTRA EMPRESA" },
    { id: 3, code: "004", cnpj: "98765432000111", name: "CEOPAG" },
    { id: 4, code: "005", cnpj: "11223344000155", name: "DELTAPAG" },
  ]

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(`${company.code} | [${company.cnpj}] ${company.name}`)
    setIsDropdownOpen(false)
  }

  return (
    <div className="h-[80px] bg-[#efefef] flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center space-x-4">
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#d1d1d147] rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <PanelRightOpen size={21} className="text-[#b0b0b0]" />
          </button>
        )}
        <button className="p-2 hover:bg-[#d1d1d147] rounded-lg flex items-center justify-center transition-all duration-200">
          <Settings size={21} className="text-[#b0b0b0] cursor-pointer hover:text-[#999999]" />
        </button>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="hidden sm:flex items-center space-x-2">
          <img
            src="/image-1.png"
            alt="English"
            className="w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
          />
          <img
            src="/image-2.png"
            alt="Português"
            className="w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
          />
        </div>

        <div className="hidden md:flex relative">
          <div
            className={`
              relative w-[280px] lg:w-[344px] h-10 bg-white rounded-lg border border-gray-200
              flex items-center px-4 cursor-pointer
              transition-all duration-300 ease-in-out
              ${
                isDropdownOpen
                  ? "shadow-lg ring-2 ring-[#169BFF]/20 bg-gradient-to-r from-white to-blue-50"
                  : "shadow-sm hover:shadow-md"
              }
            `}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Grid2x2
              className={`mr-2 transition-all duration-300 ${isDropdownOpen ? "text-[#169BFF]" : "text-[#b0b0b0]"}`}
              size={21}
            />
            <span className="text-[#666] text-sm font-['Montserrat'] truncate flex-1">{selectedCompany}</span>
            <ChevronDown
              className={`transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "rotate-180 text-[#169BFF] scale-110" : "rotate-0 text-[#b0b0b0]"
              }`}
              size={21}
            />
          </div>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />

              <div className="absolute top-12 left-0 right-0 z-20 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                <div className="py-2 max-h-64 overflow-y-auto">
                  {companies.map((company, index) => {
                    const companyString = `${company.code} | [${company.cnpj}] ${company.name}`
                    const isSelected = selectedCompany === companyString

                    return (
                      <div
                        key={company.id}
                        className={`
                          px-4 py-3 cursor-pointer transition-all duration-200
                          flex items-center justify-between group
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-[#169BFF]/10 to-blue-50 text-[#169BFF]"
                              : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 text-[#666]"
                          }
                          ${index !== companies.length - 1 ? "border-b border-gray-50" : ""}
                        `}
                        onClick={() => handleCompanySelect(company)}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`
                            w-2 h-2 rounded-full transition-all duration-300
                            ${isSelected ? "bg-[#169BFF] scale-125" : "bg-gray-300 group-hover:bg-[#169BFF]/50"}
                          `}
                          />
                          <div className="flex flex-col">
                            <span className="font-['Montserrat'] font-medium text-sm">
                              {company.code} | {company.name}
                            </span>
                            <span className="font-['Montserrat'] text-xs text-gray-400">CNPJ: {company.cnpj}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <Check size={16} className="text-[#169BFF] animate-in zoom-in-50 duration-200" />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-gray-100 px-4 py-2 bg-gray-50/50">
                  <span className="text-xs text-gray-500 font-['Montserrat']">{companies.length} subs disponíveis</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <Bell
            size={21}
            className="text-[#b0b0b0] cursor-pointer hover:text-[#999999] transition-colors duration-200"
          />
          <Badge className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c00000] rounded-[5px] flex items-center justify-center p-0 animate-pulse">
            <span className="font-['Poppins'] font-bold text-white text-[5px]">1</span>
          </Badge>
        </div>

        <Avatar className="w-[50px] h-[50px] bg-white rounded-full border-[0.5px] border-[#cacaca] cursor-pointer hover:border-[#999999] transition-all duration-200 hover:scale-105">
          <AvatarImage src={MovingPayIco.src} alt="MovingPay Logo" className="object-contain p-2" />
        </Avatar>
      </div>
    </div>
  )
}

export default Header
