import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, PieChart } from "lucide-react";

export default function Home() {
  return <div className="min-h-[calc(100vh-73px)]">
    <section className="mx-auto max-w-7xl px-5 py-24 text-center">
      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300"><Activity size={14}/> REAL-TIME CRYPTO INTELLIGENCE</div>
      <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Track the market.<br/><span className="gradient-text">Own your strategy.</span></h1>
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">A professional crypto dashboard for market discovery, portfolio tracking and watchlist management—all in one clean workspace.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/dashboard" className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">Explore Market <ArrowRight size={18}/></Link><Link href="/register" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-900">Create Account</Link></div>
      <div className="mt-20 grid gap-4 text-left md:grid-cols-3">
        {[[Activity,"Live Market Data","Monitor price, volume and market-cap movements."],[ShieldCheck,"Secure Accounts","JWT authentication backed by local SQLite storage."],[PieChart,"Portfolio Insights","Track holdings and investment value in one place."]].map(([Icon,t,d])=><div className="card p-6" key={t}><Icon className="mb-5 text-blue-400"/><h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{d}</p></div>)}
      </div>
    </section>
  </div>;
}
