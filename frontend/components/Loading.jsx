export default function Loading({ text="Loading market data..." }) {
  return <div className="grid min-h-[280px] place-items-center"><div className="text-center"><div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400"/><p className="text-sm text-slate-400">{text}</p></div></div>;
}
