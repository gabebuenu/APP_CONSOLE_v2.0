import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  console.log(`🔍 Middleware executado para: ${pathname}`)
  console.log(`🔑 Token encontrado: ${token ? "SIM" : "NÃO"}`)

  // Rotas públicas que NÃO precisam de autenticação
  const publicRoutes = ["/login"]

  // Se é rota pública
  if (publicRoutes.includes(pathname)) {
    console.log(`✅ Rota pública: ${pathname}`)

    // Se está logado e tenta acessar login, redireciona para dashboard
    if (pathname === "/login" && token) {
      console.log(`🔄 Redirecionando usuário logado para dashboard`)
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // TODAS as outras rotas são protegidas (incluindo as do grupo dashboard)
  console.log(`🔒 Rota protegida: ${pathname}`)

  // Se não tem token, redireciona para login
  if (!token) {
    console.log(`❌ Sem token, redirecionando para login`)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  console.log(`✅ Token válido, permitindo acesso`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
}
