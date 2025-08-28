"use client"

import { AppBar } from "@/components/AppBar";
import { DarkButton } from "@/components/buttons/DarkButton";
import { LinkButton } from "@/components/buttons/LinkButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name

interface Zap{
  id: string,
  triggerId: string,
  userId: number,
  actions:{
    id: string,
    zapId: string,
    actionId: string,
    sortingOrder: number,
    type:{
      id: string,
      name: string
    }
  }[],
  Trigger:{
    id: string,
    zapId: string,
    triggerId: string,
    type:{
      id: string,
      name: string
    }
  }
}

function useZaps(){
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/zap`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setZaps(response.data.zaps);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching zaps:", error);
        setLoading(false);
      });
  },[])

  return { loading, zaps };
}

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function(){

  const { loading, zaps } = useZaps();
  return (
    <div>
      <AppBar/>
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">
              My Zaps
            </div>
            <DarkButton onClick={()=>{}}>{
              <div className="flex gap-2 justify-center items-center">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
                <span className="text-[17px]">Create</span>
              </div>
            }</DarkButton>
          </div>
        </div>
      </div>
      {loading? "Loading...": <div className="flex justify-center w-full"><ZapTable zaps={zaps}/></div>}
    </div>
  )
}

function ZapTable({zaps}: {zaps: Zap[]}){
  const router = useRouter();
  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">Last Edit</div>
        <div className="flex-1">Running</div>
        <div className="flex-1">Go</div>
      </div>
      {zaps.map(z => (
        <div className="flex border-b border-t border-gray-600 py-4" key={z.id}>
          <div className="flex-1">{z.Trigger.type.name} {z.actions.map(x => x.type.name + " ")}</div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Aug 28, 2025</div>
          <div className="flex-1">
            <LinkButton onClick={() => {
              router.push("/zap/" + z.id)
            }}>Go</LinkButton>
          </div>
        </div>
      ))}
  </div>
  )
}