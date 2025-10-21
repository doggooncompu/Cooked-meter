
const express = require("express")
const { readFile } = require("fs")
const { getSystemErrorMap } = require("util")
const app = express()
const port = 8080

const fs = require("fs").promises

async function readFile(){
  fs.readFile("cooked.txt","utf-8", (err, data) =>{
    if(err){
      console.log(err)
    }

    var json_data = data.parse()
    return json_data
  })
}

app.get("/", (req,res) =>{
  res.sendFile(__dirname+"/index.html")
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})