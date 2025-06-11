"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  ChevronDown,
  ChevronRight,
  Home,
  Search,
  PanelLeftClose,
  Box,
  ClipboardList,
  DollarSign,
  Lock,
  Users,
  Building,
  Package,
  Smartphone,
  Banknote,
  UserCheck,
  FileText,
  Settings,
  Key,
  CreditCard,
  MapPin,
  Layers,
  Target,
  Zap,
  BarChart3,
  TrendingUp,
  Eye,
  Bell,
  ShoppingCart,
  Clock,
  XCircle,
  AlertTriangle,
  Globe,
  Receipt,
  Calendar,
  FileBarChart,
  Wallet,
  ArrowUpCircle,
  TrendingDown,
  Plus,
  Calculator,
  Monitor,
  Send,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export type SidebarProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [expandedSubMenus, setExpandedSubMenus] = useState<string[]>([])
  const [isNavigating, setIsNavigating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Função para expandir menus baseado na rota atual
    const expandMenusBasedOnPath = () => {
      const newExpandedMenus: string[] = []
      const newExpandedSubMenus: string[] = []

      navItems.forEach((item) => {
        if (item.hasSubmenu && item.submenu) {
          // Verifica se algum submenu está ativo
          const hasActiveSubmenu = item.submenu.some((subItem) => {
            if (subItem.path && pathname === subItem.path) {
              return true
            }
            if (subItem.hasSubSubmenu && subItem.subSubmenu) {
              return subItem.subSubmenu.some((subSubItem) => pathname === subSubItem.path)
            }
            return false
          })

          if (hasActiveSubmenu) {
            newExpandedMenus.push(item.id)
          }

          // Verifica submenus para expandir
          item.submenu.forEach((subItem, subIndex) => {
            if (subItem.hasSubSubmenu && subItem.subSubmenu) {
              const hasActiveSubSubmenu = subItem.subSubmenu.some((subSubItem) => pathname === subSubItem.path)
              if (hasActiveSubSubmenu) {
                const subMenuId = `${item.id}-${subItem.id || subIndex}`
                newExpandedSubMenus.push(subMenuId)
              }
            }
          })
        }
      })

      setExpandedMenus(newExpandedMenus)
      setExpandedSubMenus(newExpandedSubMenus)
    }

    expandMenusBasedOnPath()
    // Reset o estado de navegação quando a rota mudar
    setIsNavigating(false)
  }, [pathname])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const toggleSubMenu = (subMenuId: string) => {
    setExpandedSubMenus((prev) =>
      prev.includes(subMenuId) ? prev.filter((id) => id !== subMenuId) : [...prev, subMenuId],
    )
  }

  // Função completamente refatorada para garantir navegação
  const handleNavigation = (path: string, event: React.MouseEvent) => {
    // Previne comportamento padrão para garantir controle total
    event.preventDefault()
    event.stopPropagation()

    // Evita navegações duplicadas
    if (isNavigating || pathname === path) return

    // Marca que estamos navegando
    setIsNavigating(true)

    // Navega para a rota
    router.push(path)
  }

  const navItems = [
    {
      id: "Home",
      icon: Home,
      text: "Tela inicial",
      active: pathname === "/dashboard",
      path: "/dashboard",
    },
    {
      id: "parametros",
      icon: FileText,
      text: "Parâmetros",
      active: pathname === "/parametros",
      path: "/parametros",
    },
    {
      id: "operacional",
      icon: Box,
      text: "Operacional",
      active: pathname.startsWith("/operacional"),
      hasSubmenu: true,
      submenu: [
        {
          id: "usuarios",
          icon: Users,
          text: "Usuários",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: UserCheck, text: "Gerenciar Usuários", path: "/operacional/usuarios/gerenciar" },
            { icon: Settings, text: "Permissões", path: "/operacional/usuarios/permissoes" },
            { icon: Key, text: "Tokens de acesso", path: "/operacional/usuarios/tokens" },
          ],
        },
        {
          id: "estabelecimentos",
          icon: Building,
          text: "Estabelecimentos",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: CreditCard, text: "Credenciamento", path: "/operacional/estabelecimentos/credenciamento" },
            { icon: Eye, text: "Consultar", path: "/operacional/estabelecimentos/consultar" },
            { icon: MapPin, text: "MCC / CNAE", path: "/operacional/estabelecimentos/mcc-cnae" },
            { icon: Layers, text: "Split de pagamentos", path: "/operacional/estabelecimentos/split" },
            { icon: Target, text: "Grupos Econômicos", path: "/operacional/estabelecimentos/grupos" },
            { icon: Zap, text: "Unidade de Negócios", path: "/operacional/estabelecimentos/unidades" },
          ],
        },
        {
          id: "planos",
          icon: Package,
          text: "Planos e Pacotes",
          hasSubSubmenu: true,
          subSubmenu: [{ icon: BarChart3, text: "Planos e Taxas", path: "/operacional/planos/taxas" }],
        },
        {
          id: "dispositivos",
          icon: Smartphone,
          text: "Dispositivos",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: Settings, text: "Gerenciar", path: "/operacional/dispositivos/gerenciar" },
            { icon: Building, text: "Fabricantes", path: "/operacional/dispositivos/fabricantes" },
            { icon: Package, text: "Modelos", path: "/operacional/dispositivos/modelos" },
            { icon: Smartphone, text: "CHIP SIM", path: "/operacional/dispositivos/chip-sim" },
          ],
        },
        {
          id: "bancos",
          icon: Banknote,
          text: "Bancos",
          path: "/operacional/bancos",
        },
        {
          id: "distribuidores",
          icon: Users,
          text: "Distribuidores",
          path: "/operacional/distribuidores",
        },
      ],
    },
    {
      id: "relatorios",
      icon: ClipboardList,
      text: "Relatórios",
      active: pathname.startsWith("/relatorios"),
      hasSubmenu: true,
      submenu: [
        {
          id: "solicitar",
          icon: Plus,
          text: "Solicitar",
          path: "/relatorios/solicitar",
        },
        {
          id: "antecipacoes",
          icon: TrendingUp,
          text: "Antecipações",
          path: "/relatorios/antecipacoes",
        },
        {
          id: "conciliacao",
          icon: BarChart3,
          text: "Conciliação",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: Eye, text: "Visão geral", path: "/relatorios/conciliacao/visao-geral" },
            { icon: TrendingDown, text: "Movimento adquirente", path: "/relatorios/conciliacao/movimento" },
          ],
        },
        {
          id: "notificacoes",
          icon: Bell,
          text: "Notificações Push",
          path: "/relatorios/notificacoes",
        },
        {
          id: "vendas",
          icon: ShoppingCart,
          text: "Vendas / Transações",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: Eye, text: "Visão geral", path: "/relatorios/vendas/visao-geral" },
            { icon: Clock, text: "Pendentes", path: "/relatorios/vendas/pendentes" },
            { icon: XCircle, text: "Não integradas", path: "/relatorios/vendas/nao-integradas" },
            { icon: Key, text: "Pré autorização", path: "/relatorios/vendas/pre-autorizacao" },
            { icon: XCircle, text: "Cancelamentos", path: "/relatorios/vendas/cancelamentos" },
            { icon: AlertTriangle, text: "Chargebacks", path: "/relatorios/vendas/chargebacks" },
            { icon: Globe, text: "Cartão internacional", path: "/relatorios/vendas/internacional" },
            { icon: Receipt, text: "Boleto bancário", path: "/relatorios/vendas/boleto" },
          ],
        },
        {
          id: "estabelecimentos-rel",
          icon: Building,
          text: "Estabelecimentos",
          hasSubSubmenu: true,
          subSubmenu: [
            { icon: Calculator, text: "Faturamento", path: "/relatorios/estabelecimentos/faturamento" },
            { icon: Calendar, text: "Mensalidades", path: "/relatorios/estabelecimentos/mensalidades" },
            { icon: FileBarChart, text: "Informe de rendimento", path: "/relatorios/estabelecimentos/rendimento" },
          ],
        },
        {
          id: "compliance",
          icon: Settings,
          text: "Compliance",
          hasSubSubmenu: true,
          subSubmenu: [{ icon: CreditCard, text: "Elo", path: "/relatorios/compliance/elo" }],
        },
      ],
    },
    {
      id: "financeiro",
      icon: DollarSign,
      text: "Financeiro",
      active: pathname.startsWith("/financeiro"),
      hasSubmenu: true,
      submenu: [
        {
          id: "contas-pagar",
          icon: Wallet,
          text: "Contas à pagar",
          path: "/financeiro/contas-pagar",
        },
        {
          id: "nova-antecipacao",
          icon: ArrowUpCircle,
          text: "Nova antecipação",
          path: "/financeiro/nova-antecipacao",
        },
        {
          id: "fluxo-caixa",
          icon: TrendingUp,
          text: "Fluxo de caixa",
          path: "/financeiro/fluxo-caixa",
        },
        {
          id: "lancamentos",
          icon: Calculator,
          text: "Lançamentos",
          path: "/financeiro/lancamentos",
        },
        {
          id: "rps",
          icon: FileText,
          text: "RPS",
          path: "/financeiro/rps",
        },
      ],
    },
    {
      id: "registradoras",
      icon: Lock,
      text: "Registradoras",
      active: pathname.startsWith("/registradoras"),
      hasSubmenu: true,
      submenu: [
        {
          id: "consultar-urs",
          icon: Monitor,
          text: "Consultar URs",
          path: "/registradoras/consultar-urs",
        },
        {
          id: "transmissoes",
          icon: Send,
          text: "Transmissões",
          path: "/registradoras/transmissoes",
        },
      ],
    },
  ]

  // Função para filtrar itens baseado na pesquisa
  const filteredNavItems = useMemo(() => {
    if (!searchTerm.trim()) {
      setIsSearching(false)
      return navItems
    }

    setIsSearching(true)

    // Simular um pequeno delay para mostrar o skeleton
    const timer = setTimeout(() => setIsSearching(false), 300)

    const searchLower = searchTerm.toLowerCase()

    const filterItems = (items: any[]): any[] => {
      return items.reduce((acc, item) => {
        // Verifica se o item principal corresponde à pesquisa
        const itemMatches = item.text.toLowerCase().includes(searchLower)

        // Se tem submenu, filtra recursivamente
        if (item.hasSubmenu && item.submenu) {
          const filteredSubmenu = item.submenu.reduce((subAcc: any[], subItem: any) => {
            const subItemMatches = subItem.text.toLowerCase().includes(searchLower)

            // Se tem sub-submenu, filtra também
            if (subItem.hasSubSubmenu && subItem.subSubmenu) {
              const filteredSubSubmenu = subItem.subSubmenu.filter((subSubItem: any) =>
                subSubItem.text.toLowerCase().includes(searchLower),
              )

              // Se encontrou matches no sub-submenu ou o subitem corresponde
              if (filteredSubSubmenu.length > 0 || subItemMatches) {
                subAcc.push({
                  ...subItem,
                  subSubmenu: filteredSubSubmenu.length > 0 ? filteredSubSubmenu : subItem.subSubmenu,
                })
              }
            } else if (subItemMatches) {
              // Se não tem sub-submenu mas corresponde à pesquisa
              subAcc.push(subItem)
            }

            return subAcc
          }, [])

          // Se o item principal corresponde ou tem subitens que correspondem
          if (itemMatches || filteredSubmenu.length > 0) {
            acc.push({
              ...item,
              submenu: filteredSubmenu.length > 0 ? filteredSubmenu : item.submenu,
            })
          }
        } else if (itemMatches) {
          // Item sem submenu que corresponde à pesquisa
          acc.push(item)
        }

        return acc
      }, [])
    }

    const result = filterItems(navItems)
    clearTimeout(timer)
    setIsSearching(false)
    return result
  }, [searchTerm])

  // Expandir automaticamente menus quando há pesquisa
  useEffect(() => {
    if (searchTerm.trim()) {
      const menusToExpand: string[] = []
      const subMenusToExpand: string[] = []

      filteredNavItems.forEach((item) => {
        if (item.hasSubmenu && item.submenu && item.submenu.length > 0) {
          menusToExpand.push(item.id)

          item.submenu.forEach((subItem: any, subIndex: number) => {
            if (subItem.hasSubSubmenu && subItem.subSubmenu && subItem.subSubmenu.length > 0) {
              const subMenuId = `${item.id}-${subItem.id || subIndex}`
              subMenusToExpand.push(subMenuId)
            }
          })
        }
      })

      setExpandedMenus(menusToExpand)
      setExpandedSubMenus(subMenusToExpand)
    }
  }, [searchTerm, filteredNavItems])

  const isItemActive = (item: any) => {
    if (item.path) {
      return pathname === item.path
    }
    if (item.hasSubmenu && item.submenu) {
      return item.submenu.some((subItem: any) => {
        if (subItem.path && pathname === subItem.path) {
          return true
        }
        if (subItem.hasSubSubmenu && subItem.subSubmenu) {
          return subItem.subSubmenu.some((subSubItem: any) => pathname === subSubItem.path)
        }
        return false
      })
    }
    return false
  }

  const SearchSkeleton = () => (
    <div className="space-y-2 px-4 py-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center h-[45px] px-4 rounded-[22px] bg-gray-200">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="ml-3 h-3 bg-gray-300 rounded flex-1"></div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderSubMenu = (submenu: any[], parentId: string, _level = 1) => {
    return (
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expandedMenus.includes(parentId) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 mt-2">
          {submenu.map((subItem, subIndex) => {
            const SubIconComponent = subItem.icon
            const subMenuId = `${parentId}-${subItem.id || subIndex}`
            const isSubExpanded = expandedSubMenus.includes(subMenuId)
            const isActive = pathname === subItem.path

            return (
              <div key={subIndex} className="ml-4">
                <div
                  className={`flex items-center h-[40px] px-3 rounded-[20px] cursor-pointer 
                    hover:bg-[#d1d1d147] transition-all duration-300 ease-in-out
                    transform hover:translate-x-1 hover:scale-[1.02]
                    ${isActive ? "bg-[#169BFF]" : ""}`}
                  onClick={(e) => {
                    if (subItem.hasSubSubmenu) {
                      toggleSubMenu(subMenuId)
                    } else if (subItem.path) {
                      handleNavigation(subItem.path, e)
                    }
                  }}
                >
                  <SubIconComponent
                    size={18}
                    className={`${isActive ? "text-white" : "text-[#888888]"} 
                      transition-all duration-300`}
                  />
                  <span
                    className={`ml-3 font-['Montserrat'] font-medium text-xs 
                      ${isActive ? "text-white" : "text-[#888888]"}
                      transition-all duration-300`}
                  >
                    {subItem.text}
                  </span>
                  {subItem.hasSubSubmenu && (
                    <ChevronRight
                      size={16}
                      className={`ml-auto transition-all duration-500 ease-in-out
                        ${isSubExpanded ? "rotate-90" : "rotate-0"}
                        ${isActive ? "text-white" : "text-[#888888]"}`}
                    />
                  )}
                </div>

                {/* Sub-submenu */}
                {subItem.hasSubSubmenu && subItem.subSubmenu && (
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ml-4 ${
                      isSubExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-1 mt-1">
                      {subItem.subSubmenu.map((subSubItem: any, subSubIndex: number) => {
                        const SubSubIconComponent = subSubItem.icon
                        const isSubSubActive = pathname === subSubItem.path
                        return (
                          <div
                            key={subSubIndex}
                            className={`flex items-center h-[35px] px-3 rounded-[18px] cursor-pointer 
                              hover:bg-[#d1d1d147] transition-all duration-300 ease-in-out
                              transform hover:translate-x-2 hover:scale-[1.03]
                              ${isSubSubActive ? "bg-[#169BFF]" : ""}`}
                            onClick={(e) => subSubItem.path && handleNavigation(subSubItem.path, e)}
                          >
                            <SubSubIconComponent
                              size={16}
                              className={`${isSubSubActive ? "text-white" : "text-[#999999]"} 
                                transition-all duration-300`}
                            />
                            <span
                              className={`ml-3 font-['Montserrat'] font-medium text-xs 
                                ${isSubSubActive ? "text-white" : "text-[#999999]"}
                                transition-all duration-300`}
                            >
                              {subSubItem.text}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Overlay que não interfere com os cliques nos itens do menu */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/20" onClick={toggleSidebar} aria-hidden="true" />
      )}

      <div
        className={`
        h-screen bg-[#efefef] overflow-hidden relative z-40
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "w-[260px]" : "w-0"}
      `}
      >
        <div className={`${isOpen ? "block" : "hidden"} h-full flex flex-col relative`}>
          <div className="flex items-center justify-between h-[80px] px-6 sticky top-0 bg-[#efefef] z-20 border-b border-[#efefef]">
            <Link href="/" className="font-['Montserrat'] font-bold text-[#333333] text-base">
              CONSOLE
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-[#d1d1d147] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <PanelLeftClose size={20} className="text-[#b0b0b0]" />
            </button>
          </div>

          <div className="px-4 py-2 sticky top-[80px] bg-[#efefef] z-20 border-b border-[#efefef]">
            <div className="relative">
              <Search
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                  isSearching ? "text-[#169BFF] animate-pulse" : "text-[#b0b0b0]"
                }`}
              />
              <Input
                className={`pl-10 h-[40px] bg-white border-none shadow-none font-['Montserrat'] text-sm text-[#666] focus-visible:ring-0 rounded-[20px] transition-all duration-300 hover:shadow-sm focus:shadow-md ${
                  isSearching ? "ring-2 ring-[#169BFF]/20" : ""
                }`}
                placeholder="Pesquisar menus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#169BFF] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar-sidebar px-4 py-2 pb-8 relative z-10">
            {isSearching ? (
              <SearchSkeleton />
            ) : filteredNavItems.length === 0 && searchTerm.trim() ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Search size={48} className="text-[#b0b0b0] mb-4" />
                <p className="text-[#888888] font-['Montserrat'] text-sm">
                  Nenhum resultado encontrado para "{searchTerm}"
                </p>
                <p className="text-[#b0b0b0] font-['Montserrat'] text-xs mt-1">Tente pesquisar com outros termos</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredNavItems.map((item, index) => {
                  const IconComponent = item.icon
                  const isExpanded = expandedMenus.includes(item.id)

                  return (
                    <div key={index} className="transition-all duration-300 relative">
                      <div
                        className={`flex items-center h-[45px] px-4 rounded-[22px] cursor-pointer 
                          transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                          ${item.hasSubmenu ? "hover:bg-[#d1d1d147]" : "hover:bg-[#d1d1d147]"} 
                          ${isItemActive(item) ? "bg-[#169BFF] shadow-md" : ""} relative z-10`}
                        onClick={(e) => {
                          if (item.hasSubmenu) {
                            toggleMenu(item.id)
                          } else if (item.path) {
                            handleNavigation(item.path, e)
                          }
                        }}
                      >
                        <IconComponent
                          size={18}
                          className={`${isItemActive(item) ? "text-white" : "text-[#333333]"} transition-all duration-300`}
                        />
                        <span
                          className={`ml-3 font-['Montserrat'] font-medium text-sm 
                            ${isItemActive(item) ? "text-white" : "text-[#333333]"}
                            transition-all duration-300`}
                        >
                          {item.text}
                        </span>
                        {item.hasSubmenu && (
                          <ChevronDown
                            size={18}
                            className={`ml-auto transition-all duration-500 ease-in-out
                              ${isExpanded ? "rotate-180 scale-110" : "rotate-0"}
                              ${isItemActive(item) ? "text-white" : "text-[#333333]"}`}
                          />
                        )}
                      </div>

                      {item.hasSubmenu && item.submenu && renderSubMenu(item.submenu, item.id)}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
