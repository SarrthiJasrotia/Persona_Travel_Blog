const { Router } = require('express')
const express = require('express');
const { appendFile } = require('fs');
const blogRouter = express.Router()
const Posts = require('../models/blogPost')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticateUser = require('../middleware/authenticate')
///////////MAIN PAGE ROUTES/////////////

//Index
blogRouter.get('/',(req, res) => {
    Posts.find({}, (error, blogPosts) => {
        res.render('home/index.ejs', {
            postsIndex: blogPosts,
        });
    });
});

//login
blogRouter.get('/login', (req, res) => {
    User.find({}, (error, blogPosts) => {
        res.render('login/login.ejs', {
            postsIndex: blogPosts,
        });
    });
});

//register
blogRouter.get('/register', (req, res) => {
    res.render('login/register.ejs')
})

//New
blogRouter.get("/new", (req, res) => {
    res.render('home/new.ejs')
});

//Delete
blogRouter.delete('/:id',authenticateUser, (req, res) => {
    Posts.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect('/')
    });
});

//Update
blogRouter.put('/:id/',authenticateUser, (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect(`/${req.params.id}`)
    });
});

//Create
blogRouter.post("/", (req, res) => {
    Posts.create(req.body, (error, createdPost) => {
        res.redirect('/')
    });
});

//////////////AUTH CODE FOR REGISTERING////////////

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })
        user.save()
            .then(user => {
                
                    res.redirect('/login')
                
            })
            .catch(error => {
                res.json({
                    message: "error occured"
                })

            })
    })


};
blogRouter.post('/register', register)


//////////////////CODE FOR LOGIN////////////

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({email: username })
        .then(user => {
            if (user){
                bcrypt.compare(password, user.password, (err, result)=>{
                    if (err) {
                        res.json({
                            error: err
                        })
                    };
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'GLhou%)h', { expiresIn: "1h" })
                    //    console.log("Login successfull", token)
                        console.log(
                            "Login Successfull",
                            token
                
                        ) 
                        res.setHeader({'Authorization':`Bearer ${token}`})
                        res.redirect('/new');
                        // res.redirect('/new')
                    } else {
                        res.json({
                            message: 'Wrong Password'
                        })
                    }
                });
            } else {
                res.json({
                    message: "No User Found"
                })
            }
        });

 
    //Edit
    blogRouter.get('/:id/edit', (req, res) => {
        Posts.findById(req.params.id, (error, blogPosts) => {
            res.render('home/edit.ejs', {
                postsEdit: blogPosts
            });
        });
    });

    //Show
    blogRouter.get('/:id', (req, res) => {
        Posts.findById(req.params.id, (error, blogPosts) => {
            res.render('home/show.ejs', {
                postsShow: blogPosts,
            })
        })
    })
}
blogRouter.post('/login', login)   
 //Edit
 blogRouter.get('/:id/edit', (req, res) => {
    Posts.findById(req.params.id, (error, blogPosts) => {
        res.render('home/edit.ejs', {
            postsEdit: blogPosts
        });
    });
});

//Show
blogRouter.get('/:id', (req, res) => {
    Posts.findById(req.params.id, (error, blogPosts) => {
        res.render('home/show.ejs', {
            postsShow: blogPosts,
        })
    })
})








module.exports = blogRouter