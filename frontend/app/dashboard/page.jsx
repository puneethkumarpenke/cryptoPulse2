"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarkets } from "../../store/cryptoSlice";
import CryptoTable from "../../components/CryptoTable";
import Loading from "../../components/Loading";
import { Search, TrendingUp, DollarSign, BarChart3, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { coins, loading, error } = useSelector(s=>s.crypto);
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("all");
  useEffect(()=>{ dispatch(fetchMarkets()); },[dispatch]);
  const filtered=useMemo(()=>coins.filter(c=>(c.name+" "+c.symbol).toLowerCase().includes(query.toLowerCase())).filter(c=>filter==="gainers"?c.price_change_percentage_24h>=0:filter==="losers"?c.price_change_percentage_24h<0:true),[coins,query,filter]);
  const marketCap=coins.reduce((a,c)=>a+(c.market_cap||0),0);
  const volume=coins.reduce((a,c)=>a+(c.total_volume||0),0);
  return <div className="mx-auto max-w-7xl px-5 py-8">
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-semibold text-blue-400">MARKET OVERVIEW</p><h1 className="mt-1 text-3xl font-black md:text-4xl">Crypto Dashboard</h1><p className="mt-2 text-slate-400">Real-time market prices and performance.</p></div><button onClick={()=>dispatch(fetchMarkets())} className="flex items-center gap-2 self-start rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-900"><RefreshCw size={16}/> Refresh</button></div>
    <div className="grid gap-4 md:grid-cols-3">
      <Stat icon={DollarSign} title="Tracked Assets" value={coins.length||"—"} sub="Top market assets"/>
      <Stat icon={BarChart3} title="Market Cap" value={marketCap?fmt(marketCap):"—"} sub="Across tracked assets"/>
      <Stat icon={TrendingUp} title="24h Volume" value={volume?fmt(volume):"—"} sub="Total trading volume"/>
    </div>
    <div className="mt-8 card p-4"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-500" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Bitcoin, Ethereum..." className="w-full rounded-xl border border-slate-700 bg-slate-950 px-10 py-2.5 outline-none focus:border-blue-500"/></div><div className="flex gap-2">{["all","gainers","losers"].map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-xl px-4 py-2 text-sm capitalize ${filter===x?"bg-blue-600":"bg-slate-800 text-slate-300"}`}>{x}</button>)}</div></div></div>
    <div className="mt-5">{loading && !coins.length?<Loading/>:error?<div className="card p-8 text-center text-rose-300">Unable to load market data. Please check the backend/API and refresh.</div>:<CryptoTable coins={filtered}/>}</div>
  </div>;
}
function Stat({icon:Icon,title,value,sub}){return <div className="card p-5"><Icon className="mb-4 text-blue-400" size={20}/><p className="text-sm text-slate-500">{title}</p><p className="mt-1 text-2xl font-black">{value}</p><p className="mt-1 text-xs text-slate-500">{sub}</p></div>}
function fmt(n){return "$"+Number(n).toLocaleString(undefined,{notation:"compact",maximumFractionDigits:2})}
