"use client"

import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function(){
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <Input label={"Name"} onChange={e => {
              setName(e.target.value)
            }} type="text" placeholder="Your Name" minLength={3}></Input>
            <Input label={"Email"} onChange={e => {
              setEmail(e.target.value)
            }} type="email" placeholder="Your email" minLength={5}></Input>
            <Input label={"Password"} onChange={e => {
              setPassword(e.target.value)
            }} type="password" placeholder="Password" minLength={6}></Input>
            <div className="pt-4">
              <PrimaryButton onClick={async()=>{
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/user/signup`, {
                  name,
                  username: email,
                  password
                })
                router.push("/login")
              }} size="big">Get started free</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
