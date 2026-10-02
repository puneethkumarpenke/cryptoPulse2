import Link from "next/link";
export default function CryptoTable({ coins=[] }) {
  return <div className="card overflow-hidden">
    <div className="overflow-x-auto"><table className="w-full text-left text-sm">
      <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">#</th><th>Asset</th><th>Price</th><th>24h</th><th>Market Cap</th><th>Volume</th></tr></thead>
      <tbody>{coins.map((c,i)=><tr key={c.id} className="border-b border-slate-800/70 last:border-0 hover:bg-slate-900/70">
        <td className="px-5 py-4 text-slate-500">{i+1}</td>
        <td className="py-4"><Link href={`/coin/${c.id}`} className="flex items-center gap-3"><img src={c.image} className="h-9 w-9 rounded-full" alt=""/><div><div className="font-semibold">{c.name}</div><div className="text-xs uppercase text-slate-500">{c.symbol}</div></div></Link></td>
        <td className="font-semibold">${Number(c.current_price||0).toLocaleString(undefined,{maximumFractionDigits:6})}</td>
        <td className={c.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-rose-400"}>{c.price_change_percentage_24h >= 0 ? "+" : ""}{Number(c.price_change_percentage_24h||0).toFixed(2)}%</td>
        <td>${Number(c.market_cap||0).toLocaleString(undefined,{notation:"compact",maximumFractionDigits:2})}</td>
        <td className="pr-5">${Number(c.total_volume||0).toLocaleString(undefined,{notation:"compact",maximumFractionDigits:2})}</td>
      </tr>)}</tbody>
    </table></div>
  </div>;
}
