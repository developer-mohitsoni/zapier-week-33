import { ReactNode } from "react"

export const PrimaryButton = ({children, onClick, size = "small"}: {children: ReactNode, onClick: ()=>void, size?: "big" | "small"})=>{
  return (
    <div className={`px-10 py-2 cursor-pointer text-center bg-amber-500 text-white rounded-3xl hover:shadow-md ${size === "big" ? "text-lg" : "text-sm"} flex justify-center flex-col`} onClick={onClick}>
      {children}
    </div>
  )
}