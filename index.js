
const express = require("express")
const app = express()
const port = 8080


app.get("/", (req,res) =>{
  res.sendFile(__dirname+"/index.html")
});

app.get("/meter", (req,res)=>{
  res.sendFile(__dirname+"/cooked.json");
})
app.get("/cooked", (req,res)=>{
  res.sendFile(__dirname+"/cooked.js");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})