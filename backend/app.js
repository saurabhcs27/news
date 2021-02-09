const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const path = require("path");



const newsRoutes=require('./routes/news');
const userRoutes=require('./routes/user');

//const News=require('./models/news');

const app=express();



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images")));

//db Connection

mongoose.connect('mongodb://localhost/dbNews', {useNewUrlParser: true,
                                                useUnifiedTopology: true,
                                                useCreateIndex: true})
.then(()=>{
  console.log("connected to database");

}).catch(()=>{
  console.log("database Error");
});


app.use(
  (req,res,next)=>{
                 res.setHeader("Access-Control-Allow-Origin","*");
                 res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
                 res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
                 next();
                 }


);



app.use("/api/news",newsRoutes);
app.use("/api/user",userRoutes);
module.exports=app;
