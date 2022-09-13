const { Router } = require('express')
const express = require('express');
const { appendFile } = require('fs');
const blogRouter = express.Router()
const Posts = require('../models/blogPost')


//Index
blogRouter.get('/', (req, res) => {
    Posts.find({}, (error, blogPosts) => {
        res.render('index.ejs', {
            postsIndex: blogPosts,
        });
    });
});
//New
blogRouter.get("/new",(req,res)=>{
    res.render('new.ejs')
})
//Delete

//Update

//Create
blogRouter.post("/",(req,res)=>{
    Posts.create(req.body, (error, createdPost)=>{
        res.redirect('/blogPost')
    });
});
//Edit

//Show
blogRouter.get('/:id',(req,res)=>{
    Posts.findById(req.params.id,(error,blogPosts)=>{
        res.render('show.ejs',{
            postsShow:blogPosts,
        });
    });  
});
module.exports = blogRouter