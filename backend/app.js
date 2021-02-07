const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');

const News=require('./models/news')
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
///////////////////////////////////////////
app.post("/api/news",(req,res,next)=>{

  //const news = req.body;
  const news=new News({
    title:req.body.title,
    description:req.body.description
  })
  news.save().then((newlyPublishedNews)=>{
    //console.log("newlyPublishedNews");
    //console.log(newlyPublishedNews);
    res.status(201).json({
      message:'news added to node server',
      id:newlyPublishedNews._id
    });

  })

 })
 /////////////////////////////////////////////

 app.get("/api/newsList",(req,res,next)=>{
  News.find().then((fetchedNewsList)=>{
                               //console.log("fetchedPosts");
                               //console.log(fetchedPosts);
                               res.status(200).json({
                                 message:'Post fetched From server',
                                 fetchedNewsList:fetchedNewsList
                              });
 });




});

 ////////////////////////////////////////////

 app.delete("/api/news/:id",(req,res,next)=>{
  News.deleteOne({_id:req.params.id}).then(result=>{
     res.status(200).json({
       message:'News Deleted'

     })
  });



})

module.exports=app;
