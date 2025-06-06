"use client"

import { useState } from "react"
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

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const toggleSubMenu = (subMenuId: string) => {
    setExpandedSubMenus((prev) =>
      prev.includes(subMenuId) ? prev.filter((id) => id !== subMenuId) : [...prev, subMenuId],
    )
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const navItems = [
    // {
    //   id: "home",
    //   icon: Home,
    //   text: "Tela inicial",
    //   active: pathname === "/",
    //   path: "/",
    // },
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
                  onClick={() => {
                    if (subItem.hasSubSubmenu) {
                      toggleSubMenu(subMenuId)
                    } else if (subItem.path) {
                      handleNavigation(subItem.path)
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
                            onClick={() => subSubItem.path && handleNavigation(subSubItem.path)}
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
      {/* Overlay apenas para mobile - com opacidade reduzida */}
      {isOpen && <div className="fixed inset-0 z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        className={`
        h-screen bg-[#efefef] overflow-hidden
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "w-[260px]" : "w-0"}
      `}
      >
        {/* Conteúdo da sidebar - só aparece quando aberta */}
        <div className={`${isOpen ? "block" : "hidden"} h-full flex flex-col`}>
          {/* Header da sidebar */}
          <div className="flex items-center justify-between h-[80px] px-6 sticky top-0 bg-[#efefef] z-10">
            <Link href="/" className="font-['Montserrat'] font-bold text-[#333333] text-base">
              CONSOLE
            </Link>
            {/* Ícone de fechar */}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-[#d1d1d147] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <PanelLeftClose size={20} className="text-[#b0b0b0]" />
            </button>
          </div>

          {/* Campo de pesquisa - ajustado para ficar mais alinhado com o topo */}
          <div className="px-4 py-2 sticky top-[80px] bg-[#efefef] z-10">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
              <Input
                className="pl-10 h-[40px] bg-white border-none shadow-none font-['Montserrat'] text-sm text-[#b0b0b0] focus-visible:ring-0 rounded-[20px] transition-all duration-300 hover:shadow-sm focus:shadow-md"
                placeholder="Pesquisar"
              />
            </div>
          </div>

          {/* Menu de navegação */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="space-y-1">
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                const isExpanded = expandedMenus.includes(item.id)

                return (
                  <div key={index} className="transition-all duration-300">
                    <div
                      className={`flex items-center h-[45px] px-4 rounded-[22px] cursor-pointer 
                        transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                        ${item.hasSubmenu ? "hover:bg-[#d1d1d147]" : "hover:bg-[#d1d1d147]"} 
                        ${item.active ? "bg-[#169BFF] shadow-md" : ""}`}
                      onClick={() => {
                        if (item.hasSubmenu) {
                          toggleMenu(item.id)
                        } else if (item.path) {
                          handleNavigation(item.path)
                        }
                      }}
                    >
                      <IconComponent
                        size={18}
                        className={`${item.active ? "text-white" : "text-[#333333]"} transition-all duration-300`}
                      />
                      <span
                        className={`ml-3 font-['Montserrat'] font-medium text-sm 
                          ${item.active ? "text-white" : "text-[#333333]"}
                          transition-all duration-300`}
                      >
                        {item.text}
                      </span>
                      {item.hasSubmenu && (
                        <ChevronDown
                          size={18}
                          className={`ml-auto transition-all duration-500 ease-in-out
                            ${isExpanded ? "rotate-180 scale-110" : "rotate-0"}
                            ${item.active ? "text-white" : "text-[#333333]"}`}
                        />
                      )}
                    </div>

                    {/* Submenu */}
                    {item.hasSubmenu && item.submenu && renderSubMenu(item.submenu, item.id)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
