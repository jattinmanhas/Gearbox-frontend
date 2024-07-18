"use client";
import { useEffect, useState, ReactNode, FC } from "react"

interface HydrationZustandProps {
    children: ReactNode;
}
  
const HydrationZustand : FC<HydrationZustandProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <>{isHydrated ? <div>{children}</div> : null}</>
}

export default HydrationZustand
