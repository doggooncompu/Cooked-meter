
const express = require("express")
const fs = require("fs");
const file = require(__dirname+"/cooked.json");
const bodyParser = require('body-parser');

const app = express()
const port = 8080
const session = require('express-session');


app.use(session({
  secret: 'your_secret_key', // A secret key to sign the session ID cookie. Replace with a strong, unique value.
    resave: false, // Don't save session if unmodified
      saveUninitialized: true, // Save uninitialized sessions
      cookie: { secure: true } // Set to true if using HTTPS
    }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req,res) =>{
  res.sendFile(__dirname+"/index.html")
});


app.get("/login", (req,res)=>{
  res.sendFile(__dirname+"/login.html");
})

app.get("/meter", (req,res)=>{
  res.contentType("json");
  res.sendFile(__dirname+"/cooked.json");
})

app.get("/submit", (req,res)=>{
  res.sendFile(__dirname+"/submit.html");
})

app.post("/login", (req,res)=>{
  console.log(req.body);
  console.log(req.body.password);

  if(req.body.password == 'password'){
    req.session.password = 'password';
    console.log(req.session);
    console.log("Usr authenticated!");
    res.send("authenticated");
  }
  else{
    res.send("wrong password");
  }

})

app.post("/submit", (req,res)=>{
  if(req.session.cookie == 'password'){
    const subject = req.body.subject;
    const level = req.body.level;
    var content = {"subject": subject, "cooked_level": level};

    console.log("authenticated user submitted a change");

    fs.writeFile(__dirname+"/cooked.json",content, (err) =>{

      if(err){
        console.log(err);
      }
      console.log("sucessfully written!");

    })
    res.send("change submitted");
  }
  else{
    res.send("not authenticated!");
  }
})

app.get("/cooked.js", (req,res)=>{
  res.sendFile(__dirname+"/cooked.js");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})