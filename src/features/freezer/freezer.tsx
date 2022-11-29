import React, { useRef, useEffect } from "react"
import { cn as bem } from "@bem-react/classname"
import "./default.css"

const WindowFreezer = ({ children } : { children: React.ReactNode}) => {
    const cn = bem('Window-freezer')

    const frame = useRef<any>()

    useEffect(() => {
        let top = 0;
        if (window.innerWidth > frame.current.clientHeight) {
          top = Math.max(top, (window.innerHeight - frame.current.clientHeight) - top)
        }
        frame.current.style.marginTop = `${top}px`
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