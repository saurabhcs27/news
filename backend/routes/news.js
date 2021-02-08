const express=require('express');
const router=express.Router();
const News=require('../models/news');


///////////////////////////////////////////
router.post("",(req,res,next)=>{

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

 router.get("",(req,res,next)=>{
  News.find().then((fetchedNewsList)=>{
                               res.status(200).json({
                                 message:'Post fetched From server',
                                 fetchedNewsList:fetchedNewsList
                              });
 });




});
/////////////////////////////////////////////

router.get("/:id",(req,res,next)=>{
   News.findById(req.params.id).then((fetchedNews)=>{
                               if(fetchedNews){
                                res.status(200).json(fetchedNews);
                               }
                               else{
                                res.status(404).json({
                                  message:'News not found'

                                });
                               }

 });

});

 ////////////////////////////////////////////

 router.delete("/:id",(req,res,next)=>{
  News.deleteOne({_id:req.params.id}).then(result=>{
     res.status(200).json({
       message:'News Deleted'

     })
  });



})
///////////////////////////////////////////////

router.put("/:id",(req,res,next)=>{
  console.log("back edit Mode");
  const news=new News({
    _id:req.body.id,
    title:req.body.title,
    description:req.body.description
  })
  News.updateOne({_id:req.params.id},news).then(result=>{
    console.log("back edit Mode 2");
     res.status(200).json({
       message:'News updated'

     })
  });



})

//////////////////////////////////////////////

module.exports=router;
