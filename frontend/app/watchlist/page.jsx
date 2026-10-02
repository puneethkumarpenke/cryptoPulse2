"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Link from "next/link";
import { Star, Trash2 } from "lucide-react";

export default function Watchlist(){
 const [items,setItems]=useState([]); const [err,setErr]=useState("");
 const load=async()=>{try{const {data}=await api.get("/portfolio/watchlist",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});setItems(data.watchlist||[])}catch(e){setErr(e.response?.data?.message||"Please login to view your watchlist")}};
 useEffect(()=>{load()},[]);
 const del=async id=>{await api.delete(`/portfolio/watchlist/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});load()};
 return <div className="mx-auto max-w-7xl px-5 py-8"><div className="flex items-center gap-3"><Star className="text-yellow-400"/><div><h1 className="text-3xl font-black">Watchlist</h1><p className="mt-1 text-slate-400">Coins you want to keep an eye on.</p></div></div>{err?<div className="mt-7 card p-8 text-center text-slate-400">{err}<div><Link href="/login" className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-2">Login</Link></div></div>:<div className="mt-7 grid gap-3">{!items.length?<div className="card p-10 text-center text-slate-500">Your watchlist is empty.</div>:items.map(x=><div key={x.id} className="card flex items-center justify-between p-5"><Link href={`/coin/${x.coinId}`}><b>{x.name}</b><span className="ml-2 text-xs uppercase text-slate-500">{x.symbol}</span></Link><button onClick={()=>del(x.id)} className="text-rose-400"><Trash2 size={17}/></button></div>)}</div>}</div>
}
