import { ReactNode } from "react"

export const PrimaryButton = ({children, onClick, size = "small"}: {children: ReactNode, onClick: ()=>void, size?: "big" | "small"})=>{
  return (
    <div className={`px-4 py-2 cursor-pointer bg-amber-500 text-white rounded-3xl hover:shadow-md ${size === "big" ? "text-lg" : "text-sm"}`} onClick={onClick}>
      {children}
    </div>
  )
}