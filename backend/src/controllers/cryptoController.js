const service=require("../services/cryptoService");
exports.markets=async(req,res)=>{try{res.json({success:true,data:await service.markets()})}catch(e){console.error(e);res.status(502).json({success:false,message:"Market data unavailable"})}};
exports.coin=async(req,res)=>{try{res.json({success:true,data:await service.coin(req.params.id)})}catch(e){res.status(502).json({success:false,message:"Coin data unavailable"})}};
exports.chart=async(req,res)=>{try{const raw=await service.chart(req.params.id);res.json({success:true,data:(raw.prices||[]).map(([time,price])=>({time,price}))})}catch(e){res.status(502).json({success:false,message:"Chart data unavailable"})}};
