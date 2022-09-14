
const express = require('express');
const Router = express.Router()
const User = require('../models/user.js')

Router.get('/login', (req, res) => {
    User.find({}, (error, blogPosts) => {
        res.render('login/index.ejs', {
            postsIndex: blogPosts,
        });
    });
});

module.exports = Router