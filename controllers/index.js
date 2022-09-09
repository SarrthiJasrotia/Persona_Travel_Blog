const { Router } = require('express')
const express = require('express')
const blogRouter = express.Router()
const Post = require('../models/blogPost')


//Index
blogRouter.get('/', (req, res) => {
    Post.find({}, (error, blogPosts) => {
        res.render('index.ejs', {
            posts: blogPosts,
        });
    });
});
//New

//Delete

//Update

//Create

//Edit

//Show
module.exports = blogRouter