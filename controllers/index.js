const { Router } = require('express')
const express = require('express');
const { appendFile } = require('fs');
const blogRouter = express.Router()
const Posts = require('../models/blogPost')


//Index
blogRouter.get('/', (req, res) => {
    Posts.find({}, (error, blogPosts) => {
        res.render('home/index.ejs', {
            postsIndex: blogPosts,
        });
    });
});
//New
blogRouter.get("/new",(req,res)=>{
    res.render('home/new.ejs')
});
//Delete
blogRouter.delete('/:id',(req,res)=>{
    Posts.findByIdAndDelete(req.params.id, (error,data)=>{
        res.redirect('/blogPost')
    });
});

//Update
blogRouter.put('/:id/',(req,res)=>{
    Posts.findByIdAndUpdate(req.params.id, req.body,()=>{
        res.redirect(`/posts/${req.params.id}`)
    });
});

//Create
blogRouter.post("/",(req,res)=>{
    Posts.create(req.body, (error, createdPost)=>{
        res.redirect('/blogPost')
    });
});

//Edit
blogRouter.get('/:id/edit',(req,res)=>{
    Posts.findById(req.params.id, (error,blogPosts)=>{
        res.render('home/edit.ejs',{
            postsEdit:blogPosts
        });
    });
});

//Show
blogRouter.get('/:id',(req,res)=>{
    Posts.findById(req.params.id,(error,blogPosts)=>{
        res.render('home/show.ejs',{
            postsShow:blogPosts,
        });
    });
});
module.exports = blogRouter