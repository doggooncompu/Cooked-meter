
const express = require("express")
const app = express()
const port = 8080


app.get("/", (req,res) =>{
  res.sendFile(__dirname+"/index.html")
});

app.get("/Cooked-meter/meter", (req,res)=>{
  res.sendFile(__dirname+"/cooked.json");
})
app.get("/Cooked-meter/test", (req,res)=>{
  res.send("<h1>hello</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})