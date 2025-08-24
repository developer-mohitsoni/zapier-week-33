"use client"

import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function(){
  return (
    <div>
      <AppBar/>
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
              Joins millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label={"Easy setup, no coding required"}/>
            </div>
            <div className="pb-6">
              <CheckFeature label={"Free forever for core features"}/>
            </div>
              <CheckFeature label={"14-day trial of premium features & apps"}/>
          </div>
          <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
            <div></div>
            <Input label={"Name"} onChange={e => {}} type="text" placeholder="Your Name"></Input>
            <Input label={"Email"} onChange={e => {}} type="email" placeholder="Your email"></Input>
            <Input label={"Password"} onChange={e => {}} type="password" placeholder="Password"></Input>
            <div className="pt-4">
              <PrimaryButton onClick={()=>{}} size="big">Get started free</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}