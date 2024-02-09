'use client'

import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
   const [isHydrated, setIsHydrated] = useState(false)

   // Wait till NextJs has hydrated the app
   useEffect(() => {
      setIsHydrated(true)
   }, [])

   return (
      <>
         {isHydrated ? children : <div>Loading...</div>}
      </>
   )
}