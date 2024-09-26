const express = require("express")
const mongoose = require("mongoose")
const user=require("./model/user")
const crud=require("./routes/crud")

const app = express()
const port = 3000
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pig')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


app.use('/',crud)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
