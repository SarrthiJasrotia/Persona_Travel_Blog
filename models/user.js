const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    title: {type: String , required: true },
    title_img:{type:String, require:true}

    
  });

  