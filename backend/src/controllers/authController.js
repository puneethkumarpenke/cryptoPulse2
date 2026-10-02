const db=require("../config/database");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const tokenFor=u=>jwt.sign({id:u.id,email:u.email},process.env.JWT_SECRET,{expiresIn:"7d"});

exports.register=async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password)return res.status(400).json({success:false,message:"Name, email and password are required"});
  if(password.length<6)return res.status(400).json({success:false,message:"Password must be at least 6 characters"});
  const normalized=email.trim().toLowerCase();
  if(db.prepare("SELECT id FROM users WHERE email=?").get(normalized))return res.status(409).json({success:false,message:"Email already registered"});
  const hash=await bcrypt.hash(password,10);
  const result=db.prepare("INSERT INTO users(name,email,password) VALUES(?,?,?)").run(name.trim(),normalized,hash);
  const user={id:Number(result.lastInsertRowid),name:name.trim(),email:normalized};
  res.status(201).json({success:true,message:"Registration successful",user,token:tokenFor(user)});
 }catch(e){console.error(e);res.status(500).json({success:false,message:"Registration failed"});}
};

exports.login=async(req,res)=>{
 try{
  const {email,password}=req.body;
  const user=db.prepare("SELECT * FROM users WHERE email=?").get((email||"").trim().toLowerCase());
  if(!user||!(await bcrypt.compare(password||"",user.password)))return res.status(401).json({success:false,message:"Invalid email or password"});
  const safe={id:user.id,name:user.name,email:user.email};
  res.json({success:true,message:"Login successful",user:safe,token:tokenFor(safe)});
 }catch(e){console.error(e);res.status(500).json({success:false,message:"Login failed"});}
};
