"use client"

import { ReactNode } from "react"

export const LinkButton = ({children, onClick}: {children: ReactNode, onClick: ()=>void})=>{
  return(
    <div className="px-4 py-2 cursor-pointer hover:bg-[#e0dbca] rounded-3xl" onClick={onClick}>{children}</div>
  )
}