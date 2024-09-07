const express=require("express");
const app=express();

PORT=3000

app.get('/',(req,res)=>{
  res.send("haii")
})

app.listen(PORT,()=>{
  console.log(`Post listening at ${PORT}`)
})