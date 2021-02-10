const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
  //id: String,
  title:{ type: String, required: true },
  description:{ type: String, required: true },
  imagePath:{type:String},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports=mongoose.model('News', newsSchema);

