"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function Register(){
 const router=useRouter(); const [form,setForm]=useState({name:"",email:"",password:""}); const [err,setErr]=useState(""); const [busy,setBusy]=useState(false);
 const submit=async e=>{e.preventDefault();setBusy(true);setErr("");try{const {data}=await api.post("/auth/register",form);localStorage.setItem("token",data.token);localStorage.setItem("user",JSON.stringify(data.user));router.push("/dashboard")}catch(x){setErr(x.response?.data?.message||"Registration failed")}finally{setBusy(false)}};
 return <div className="grid min-h-[calc(100vh-73px)] place-items-center px-5 py-12"><div className="card w-full max-w-md p-7"><div className="mb-7 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 font-black">C</div><h1 className="text-2xl font-black">Create your account</h1><p className="mt-2 text-sm text-slate-500">Start tracking your crypto portfolio.</p></div><form onSubmit={submit} className="space-y-4">{err&&<div className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-300">{err}</div>}<F l="Full name" k="name" f={form} set={setForm}/><F l="Email" k="email" type="email" f={form} set={setForm}/><F l="Password" k="password" type="password" f={form} set={setForm}/><button disabled={busy} className="w-full rounded-xl bg-blue-600 py-3 font-semibold">{busy?"Creating...":"Create Account"}</button></form><p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link href="/login" className="text-blue-400">Sign in</Link></p></div></div>
}
function F({l,k,type="text",f,set}){return <label className="block text-sm"><span className="mb-2 block text-slate-400">{l}</span><input required minLength={k==="password"?6:2} type={type} value={f[k]} onChange={e=>set({...f,[k]:e.target.value})} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"/></label>}
