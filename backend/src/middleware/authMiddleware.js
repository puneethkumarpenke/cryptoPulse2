const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
 try{
  const header=req.headers.authorization||"";
  const token=header.startsWith("Bearer ")?header.slice(7):null;
  if(!token)return res.status(401).json({success:false,message:"Authentication required"});
  const decoded=jwt.verify(token,process.env.JWT_SECRET);
  req.user={id:decoded.id,email:decoded.email};
  next();
 }catch(e){return res.status(401).json({success:false,message:"Invalid or expired token"});}
};
