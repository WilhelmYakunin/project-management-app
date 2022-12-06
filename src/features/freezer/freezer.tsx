import React, { useRef, useEffect } from "react"
import { cn as bem } from "@bem-react/classname"
import "./default.css"

const WindowFreezer = ({ children } : { children: React.ReactNode}) => {
    const cn = bem('Window-freezer')

    const frame = useRef<any>()

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'auto'
        }
      })
    
      return (
        <div className={cn()} ref={frame}>
            {children}
        </div>
      )
}

export default WindowFreezer