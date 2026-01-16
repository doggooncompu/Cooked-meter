
const express = require("express")
const fs = require("fs");
const file = require(__dirname+"/cooked.json");
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");


const app = express()
const port = 8080
const session = require('express-session');
app.set('trust proxy', 1);

var cooked = {"subject" : "PLACEHOLDER", "cooked_level": "0.5"};


// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://Vercel-Admin-cooked_meter:4tX7Qwktg1EEh1BE@cooked-meter.wflutuh.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

const DB = client.db("myDB");
const collection = DB.collection("data");


async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.use(session({
  secret: 'wefwehfwefwefefwrehrgwefiwuierf', // A secret key to sign the session ID cookie. Replace with a strong, unique value.
    resave: false, // Don't save session if unmodified
      saveUninitialized: false, // Save uninitialized sessions
      cookie: { secure: true }, // Set to true if using HTTPS
      sameSite:'none',
    }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.get("/", (req,res) =>{
  res.sendFile(__dirname+"/index.html")
});





app.get("/login", (req,res)=>{
  res.sendFile(__dirname+"/login.html");
})





app.get("/meter", (req,res)=>{
  res.contentType("json");
  res.send(cooked);
})





app.get("/submit", (req,res)=>{
  res.sendFile(__dirname+"/submit.html");
})





app.post("/login", (req,res)=>{
  console.log(req.body);
  console.log(req.body.password);
  const password = req.body.password;

  if(!password){
    res.send("no password provided");
    return;
  }

  if(password == "password"){
    req.session.authenticated = true;
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

  console.log("req.session:"+ req.session.authenticated);

  console.log("session password:" + req.session.password);


  if(req.session.authenticated == true){
    const subject = req.body.subject;
    const level = req.body.level;
    var content = {"subject": subject, "cooked_level": level};

    console.log("authenticated user submitted a change");
    update(content.subject, content.level);
    res.send("change submitted");

  }
  else{
    res.send("not authenticated!");
  }
})



async function update(subject, level) {
    var data = {"subject": subject, "cooked_level":level};

    var result = await collection.insertOne(data);
    var update = {$set:{"cooked": "indicator", "lastid": result.lastId}};
    var query = {"cooked": "indicator"};

    var updated = await collection.updateOne(query, update);
}




app.get("/cooked.js", (req,res)=>{
  res.sendFile(__dirname+"/cooked.js");
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})