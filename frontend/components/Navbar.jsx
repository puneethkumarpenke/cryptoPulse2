"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3, Wallet, Star, LogIn, LogOut, Menu, X, Home } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sync = () => setUser(JSON.parse(localStorage.getItem("user") || "null"));
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const logout = () => { localStorage.clear(); setUser(null); location.href = "/"; };
  const links = [
    ["/dashboard", "Dashboard", BarChart3],
    ["/portfolio", "Portfolio", Wallet],
    ["/watchlist", "Watchlist", Star]
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#070a12]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-black">C</div>
          <div><div className="text-lg font-black">Crypto<span className="text-blue-400">Pulse</span></div><div className="text-[10px] uppercase tracking-[.25em] text-slate-500">Market Intelligence</div></div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white" href="/">Home</Link>
          {links.map(([href, label, Icon]) => <Link key={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white" href={href}><Icon size={16}/>{label}</Link>)}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {user ? <><span className="max-w-28 truncate text-sm text-slate-400">{user.name}</span><button onClick={logout} className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"><LogOut size={16}/></button></> :
          <><Link href="/login" className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm"><LogIn size={16}/>Login</Link><Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500">Get Started</Link></>}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <div className="border-t border-slate-800 px-5 pb-5 md:hidden"><div className="flex flex-col gap-2 pt-3"><Link href="/" className="p-3">Home</Link>{links.map(([h,l])=><Link key={h} href={h} className="p-3">{l}</Link>)}{user ? <button onClick={logout} className="p-3 text-left">Logout</button> : <Link href="/login" className="p-3">Login</Link>}</div></div>}
    </header>
  );
}
