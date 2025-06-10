"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Estado inicial é undefined (não sabemos ainda)
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Criar media query
    const media = window.matchMedia(query)

    // Definir o estado inicial
    setMatches(media.matches)

    // Callback para quando o media query mudar
    const listener = () => setMatches(media.matches)

    // Adicionar listener
    media.addEventListener("change", listener)

    // Cleanup
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
