const BASE=process.env.CRYPTO_API_URL||"https://api.coingecko.com/api/v3";
async function get(path){
 const r=await fetch(BASE+path,{headers:{"accept":"application/json"}});
 if(!r.ok)throw new Error(`CoinGecko request failed: ${r.status}`);
 return r.json();
}
exports.markets=()=>get("/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h");
exports.coin=id=>get(`/coins/${encodeURIComponent(id)}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`);
exports.chart=id=>get(`/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=7&interval=daily`);
