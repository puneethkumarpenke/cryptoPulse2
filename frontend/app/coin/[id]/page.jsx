"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";
import Loading from "../../../components/Loading";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function CoinPage(){
 const {id}=useParams(); const [coin,setCoin]=useState(null); const [chart,setChart]=useState([]); const [err,setErr]=useState("");
 useEffect(()=>{if(!id)return;Promise.all([api.get(`/crypto/coin/${id}`),api.get(`/crypto/coin/${id}/chart`)]).then(([a,b])=>{setCoin(a.data.data);setChart(b.data.data||[])}).catch(e=>setErr(e.response?.data?.message||"Unable to load coin"))},[id]);
 if(err)return <div className="mx-auto max-w-5xl px-5 py-12"><div className="card p-8 text-rose-300">{err}</div></div>;
 if(!coin)return <Loading/>;
 const up=coin.market_data?.price_change_percentage_24h>=0;
 return <div className="mx-auto max-w-7xl px-5 py-8"><Link href="/dashboard" className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16}/> Back to market</Link><div className="grid gap-5 lg:grid-cols-[1.5fr_.7fr]"><section className="card p-6"><div className="flex items-center gap-4"><img src={coin.image?.large} className="h-14 w-14" alt=""/><div><h1 className="text-3xl font-black">{coin.name}</h1><p className="uppercase text-slate-500">{coin.symbol}</p></div></div><div className="mt-8"><div className="text-4xl font-black">${Number(coin.market_data?.current_price?.usd||0).toLocaleString()}</div><div className={`mt-2 flex items-center gap-2 ${up?"text-emerald-400":"text-rose-400"}`}>{up?<TrendingUp size={18}/>:<TrendingDown size={18}/>} {Number(coin.market_data?.price_change_percentage_24h||0).toFixed(2)}% 24h</div></div><div className="mt-8 h-80">{chart.length?<ResponsiveContainer width="100%" height="100%"><LineChart data={chart}><XAxis dataKey="time" hide/><Tooltip contentStyle={{background:"#0c1220",border:"1px solid #26314d"}}/><Line type="monotone" dataKey="price" dot={false} strokeWidth={2}/></LineChart></ResponsiveContainer>:<Loading text="Loading chart..."/>}</div></section><aside className="card p-6"><h2 className="font-bold">Market statistics</h2><Rows data={[["Market Cap",coin.market_data?.market_cap?.usd],["24h High",coin.market_data?.high_24h?.usd],["24h Low",coin.market_data?.low_24h?.usd],["24h Volume",coin.market_data?.total_volume?.usd]]}/></aside></div></div>
}
function Rows({data}){return <div className="mt-5 divide-y divide-slate-800">{data.map(([k,v])=><div key={k} className="flex justify-between py-4 text-sm"><span className="text-slate-500">{k}</span><b>${Number(v||0).toLocaleString(undefined,{maximumFractionDigits:2})}</b></div>)}</div>}
