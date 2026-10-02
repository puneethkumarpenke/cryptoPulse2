"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function Login(){
 const router=useRouter(); const [form,setForm]=useState({email:"",password:""}); const [err,setErr]=useState(""); const [busy,setBusy]=useState(false);
 const submit=async e=>{e.preventDefault();setBusy(true);setErr("");try{const {data}=await api.post("/auth/login",form);localStorage.setItem("token",data.token);localStorage.setItem("user",JSON.stringify(data.user));router.push("/dashboard")}catch(x){setErr(x.response?.data?.message||"Login failed")}finally{setBusy(false)}};
 return <Auth title="Welcome back" subtitle="Sign in to continue to CryptoPulse"><form onSubmit={submit} className="space-y-4">{err&&<div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{err}</div>}<Field label="Email" type="email" value={form.email} onChange={v=>setForm({...form,email:v})}/><Field label="Password" type="password" value={form.password} onChange={v=>setForm({...form,password:v})}/><button disabled={busy} className="w-full rounded-xl bg-blue-600 py-3 font-semibold disabled:opacity-50">{busy?"Signing in...":"Sign In"}</button></form><p className="mt-5 text-center text-sm text-slate-500">No account? <Link className="text-blue-400" href="/register">Create one</Link></p></Auth>
}
function Field({label,type,value,onChange}){return <label className="block text-sm"><span className="mb-2 block text-slate-400">{label}</span><input required type={type} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"/></label>}
function Auth({title,subtitle,children}){return <div className="grid min-h-[calc(100vh-73px)] place-items-center px-5 py-12"><div className="card w-full max-w-md p-7"><div className="mb-7 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-600 font-black">C</div><h1 className="text-2xl font-black">{title}</h1><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>{children}</div></div>}
