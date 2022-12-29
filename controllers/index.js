const { Router } = require('express')
const express = require('express');
const { appendFile } = require('fs');
const blogRouter = express.Router()
const Posts = require('../models/blogPost')
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
//testing
// const jwt = require('jsonwebtoken')
// const authenticateUser = require('../middleware/authenticate')

///////////MAIN PAGE ROUTES/////////////

const isAuth =(req,res,next)=>{
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/login')
    }
}
//Index
blogRouter.get('/', (req, res) => {
    Posts.find({}, (error, blogPosts) => {
        res.render('home/index.ejs', {
            postsIndex: blogPosts,
        });
    });
});

//login
blogRouter.get('/login', (req, res) => {
   
        res.render('login/login.ejs',);
    });


//register
blogRouter.get('/register',isAuth, (req, res) => {
    res.render('login/register.ejs')
})

//New
blogRouter.get("/new",isAuth, (req, res) => {
    res.render('home/new.ejs')
});

//Delete
blogRouter.delete('/:id',isAuth, (req, res) => {
    Posts.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect('/')
    });
});

//Update
blogRouter.put('/:id/',isAuth, (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect(`/${req.params.id}`)
    });
});

//Create
blogRouter.post("/",isAuth, (req, res) => {
    Posts.create(req.body, (error, createdPost) => {
        res.redirect('/')
    });
});

//////////////AUTH CODE FOR REGISTERING////////////


// const register = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
//         if (err) {
//             res.json({
//                 error: err
//             })
//         }

//         let user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPass,
//         })
//         user.save()
//             .then(user => {

//                 res.redirect('/login')

//             })
//             .catch(error => {
//                 res.json({
//                     message: "error occured"
//                 })

//             })
//     })


// };
// blogRouter.post('/register', register)


//////////////////CODE FOR LOGIN////////////

// const login = (req, res, next) => {
//     let username = req.body.username
//     let password = req.body.password

//     User.findOne({ email: username })
//         .then(user => {
//             if (user) {
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) {
//                         res.json({
//                             error: err
//                         })
//                     };
//                     if (result) {
//                         let token = jwt.sign({ name: user.name }, 'GLhou%)h', { expiresIn: "1h" })
//                         console.log("Login successfull", token)
//                         res.send(token)


//                     } else {
//                         res.json({
//                             message: 'Wrong Password'
//                         })
//                     }
//                 });
//             } else {
//                 res.json({
//                     message: "No User Found"
//                 })
//             }
//         });
//     blogRouter.post('/login', login)


//login logic
blogRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.redirect('/ses');

    }

    const authenticate = await bcrypt.compare(password, user.password);
    if (!authenticate) {
        return redirect('/register')
    }
    req.session.isAuth = true
    res.redirect('/new')
});
//register logic
blogRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
        return res.redirect('/register')
    }

    const hashedPass = await bcrypt.hash(password, 10)
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
    })
    await user.save();
    res.redirect('/login')
})
//logout
blogRouter.post('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/')
    }
    )
})

//edit
blogRouter.get('/:id/edit',isAuth, (req, res) => {
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