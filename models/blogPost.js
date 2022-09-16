const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
      
    title:{type: String , required: true },
    title_img:{type:String, require:true},
    
    Date:{type: String , required: false},
    Paragraph1_title:{type: String , required: true },
    Paragraph1:{type: String , required: true },
    Paragraph2_title:{type: String , required:false },
    Paragraph2: {type: String , required: false},
    Paragraph3_title:{type: String , required: false },
    Paragraph3:{type: String , required: false},
    galleryImg1:{type:String, require:false},
    galleryImg2:{type:String, require:false},
    galleryImg3:{type:String, require:false},
    galleryImg4:{type:String, require:false},
    galleryImg5:{type:String, require:false},
    galleryImg6:{type:String, require:false},
    galleryImg7:{type:String, require:false},
    galleryImg8:{type:String, require:false},
    galleryImg9:{type:String, require:false},
    galleryImg10:{type:String, require:false},
   

  });

  const Posts = mongoose.model('Posts', postSchema)
  module.exports = Posts