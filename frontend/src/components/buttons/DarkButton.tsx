import { ReactNode } from "react"

export const DarkButton = ({children, onClick, size = "small"}: {children: ReactNode, onClick: ()=>void, size?: "big" | "small"})=>{
  return (
    <div className={`flex flex-col justify-center px-8 py-2 cursor-pointer text-center bg-purple-800 text-white rounded-xl hover:shadow-md ${size === "big" ? "text-lg" : "text-sm"}`} onClick={onClick}>
      {children}
    </div>
  )
}