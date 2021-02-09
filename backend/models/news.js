const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
  //id: String,
  title:String,
  description:String,
  imagePath:String
});

module.exports=mongoose.model('News', newsSchema);
