const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");


const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res)
{
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  var data={
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/1790791bae"

const options={
  method:"POST",
  auth:"Asutosh:869ad686fb4d665908d1a3c334154066-us5"
}
const request= https.request(url,options,function(response){
  if(response.statusCode==200)
  {
    res.sendFile(__dirname +"/succes.html");
  }
  else{
      res.sendFile(__dirname +"/failure.html");
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
})
  })
  request.write(jsondata);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000 ,function()
{
  console.log("server is running on port 3000");
});

// 869ad686fb4d665908d1a3c334154066-us5
// API KEY
// process.env.PORT || 3000

// list // IDEA: 1790791bae.
