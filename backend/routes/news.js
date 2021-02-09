const express=require('express');
const router=express.Router();
const News=require('../models/news');
const multer = require("multer");
//////////////////////////////////////////

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

///////////////////////////////////////////
router.post("",
multer({ storage: storage }).single("image"),
(req,res,next)=>{
  const url = req.protocol + "://" + req.get("host");
  const news=new News({
    title:req.body.title,
    description:req.body.description,
    imagePath: url + "/images/" + req.file.filename
  })
  news.save().then((newlyPublishedNews)=>{
    //console.log("newlyPublishedNews");
    //console.log(newlyPublishedNews);
    res.status(201).json({
      message:'news added to node server',
      news:{
             ...newlyPublishedNews,
             id:newlyPublishedNews._id}
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

router.put("/:id",
multer({ storage: storage }).single("image"),
(req,res,next)=>{
  console.log(req.file);
  let imagePath = req.body.imagePath;
  console.log("imagePath");
  console.log(imagePath);
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const news=new News({
    _id:req.body.id,
    title:req.body.title,
    description:req.body.description,
    imagePath:imagePath
  })
  console.log(news);
  console.log("imagePath 2");
  console.log(imagePath);
  News.updateOne({_id:req.params.id},news).then(result=>{
    console.log("back edit Mode 2");
     res.status(200).json({
       message:'News updated'

     })
  });



})

//////////////////////////////////////////////

module.exports=router;
