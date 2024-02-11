'use client'

import { useThemeStore } from "@/store"
import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
   const [isHydrated, setIsHydrated] = useState(false)
   const themeStore = useThemeStore()
   // Wait till NextJs has hydrated the app
   useEffect(() => {
      setIsHydrated(true)
   }, [])

   return (
      <>
         {isHydrated ? <body className="px-4 lg:px-48" data-theme={themeStore.mode}> {children}</body> : <body></body>}
      </>
   )
}