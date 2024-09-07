const express=require("express");
const mongoose=require("mongoose");
const Brandname=require("./model/brandname");

PORT=3000
const app=express();
app.use(express.json())

mongoose.connect("mongodb+srv://kumar:kumar@cluster0.k7r7k.mongodb.net/brands").then(()=>{
  console.log("connected")
}).catch(err=>{console.log(err)});

app.get('/', async(req,res)=>{
  res.send(`<h1>hii prends</h1>`)
})
app.get('/brands', async(req,res)=>{
  res.json(await Brandname.find())
})
app.get('/brands/:id', async(req,res)=>{
  const id=req.params.id;
  res.json(await Brandname.findById(id))
})

app.delete('/deletebrand/:id', async(req,res)=>{
  const id=req.params.id;
  await Brandname.findByIdAndDelete(id)
  return res.json(await Brandname.find())
})

app.post('/addbrand', async (req,res)=>{
  const {brandname}=req.body;
  try{
    const newData=new Brandname({brandname});
    await newData.save();
    return res.json( await Brandname.find())
  }
  catch(err){
    console.log(err);

  }
})

app.listen(PORT,()=>{
  console.log(`serve running at ${PORT}`)
})