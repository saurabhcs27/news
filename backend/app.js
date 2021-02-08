const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');



const newsRoutes=require('./routes/news');

//const News=require('./models/news');

const app=express();



app.use(bodyParser.json());

//db Connection

mongoose.connect('mongodb://localhost/dbNews', {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
  console.log("connected to database");

}).catch(()=>{
  console.log("database Error");
});

// app.use(bodyParser.urlencoded({extended:false}));
app.use(
  (req,res,next)=>{
                 res.setHeader("Access-Control-Allow-Origin","*");
                 res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
                 res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
                 next();
                 }


);



app.use("/api/news",newsRoutes);
module.exports=app;
