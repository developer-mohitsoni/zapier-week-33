"use client"

import { AppBar } from "@/components/AppBar";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function(){
  const [selectedTrigger, seSelectedTrigger] = useState("");
  const [selectedActions, setSelectedActions] = useState<{
    availableActionId: string;
    availableActionName: string;
  }[]>([]);

  return(
    <div>
      <AppBar/>
      <div className="w-full min-h-screen bg-[#d5d4ce] flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}/>
        </div>
        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action, index) => <div className="pt-2 flex justify-center"><ZapCell name={action.availableActionName ? action.availableActionName : "Action"} index={2 + index}/></div>)}
        </div>
        <div className="flex justify-center">
          <div>
            <PrimaryButton onClick={()=>{
              setSelectedActions(a=> [...a, {
                availableActionId: "",
                availableActionName: ""
              }])
            }}>
              <div className="text-2xl">
                +
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}