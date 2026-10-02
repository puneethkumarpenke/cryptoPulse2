"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Link from "next/link";
import { Wallet, Trash2 } from "lucide-react";

export default function Portfolio(){
 const [data,setData]=useState(null); const [err,setErr]=useState("");
 const load=async()=>{try{const {data}=await api.get("/portfolio",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});setData(data)}catch(e){setErr(e.response?.data?.message||"Please login to view your portfolio")}};
 useEffect(()=>{load()},[]);
 const del=async id=>{await api.delete(`/portfolio/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});load()};
 if(err)return <div className="mx-auto max-w-5xl px-5 py-12"><div className="card p-10 text-center"><Wallet className="mx-auto mb-4 text-blue-400"/><p className="text-slate-400">{err}</p><Link href="/login" className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-2">Login</Link></div></div>;
 return <div className="mx-auto max-w-7xl px-5 py-8"><h1 className="text-3xl font-black">My Portfolio</h1><p className="mt-2 text-slate-400">Your saved crypto holdings.</p><div className="mt-7 grid gap-4 md:grid-cols-2"><div className="card p-5"><p className="text-sm text-slate-500">Total investment</p><p className="mt-2 text-3xl font-black">${Number(data?.totalInvestment||0).toLocaleString()}</p></div><div className="card p-5"><p className="text-sm text-slate-500">Assets</p><p className="mt-2 text-3xl font-black">{data?.assetCount||0}</p></div></div><div className="mt-6 card overflow-hidden"><div className="border-b border-slate-800 p-5 font-bold">Holdings</div>{!data?.assets?.length?<div className="p-10 text-center text-slate-500">No holdings yet. Add assets through the API or your portfolio form.</div>:data.assets.map(a=><div key={a.id} className="flex items-center justify-between border-b border-slate-800 p-5 last:border-0"><div><b>{a.name}</b><span className="ml-2 text-xs uppercase text-slate-500">{a.symbol}</span><p className="mt-1 text-sm text-slate-500">{a.quantity} units × ${a.buyPrice}</p></div><button onClick={()=>del(a.id)} className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10"><Trash2 size={17}/></button></div>)}</div></div>
}
