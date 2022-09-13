const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {type: String , required: true },
    title_img:{type:String, require:true}
  });

  const Posts = mongoose.model('Posts', postSchema)
  module.exports = Posts