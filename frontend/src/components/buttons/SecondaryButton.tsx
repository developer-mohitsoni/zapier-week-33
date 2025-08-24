import { ReactNode } from "react"

export const SecondaryButton = ({children, onClick, size = "small"}: {children: ReactNode, onClick: ()=>void, size?: "big" | "small"})=>{
  return (
    <div className={`px-10 py-2 cursor-pointer bg-[#e0dbca] border-1 rounded-3xl hover:shadow-md ${size === "big" ? "text-lg" : "text-sm"}`} onClick={onClick}>
      {children}
    </div>
  )
}