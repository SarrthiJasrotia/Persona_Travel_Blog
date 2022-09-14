const express = require('express')
const app = express()

require('dotenv').config();

// const blogRouter = require("./controllers")
// app.use("/blogPost", blogRouter) 



const mongoose = require("mongoose")
const methodOverride = require("method-override")


//Database config
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride("_method"))
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.static('css'))


const postController = require('./controllers/index.js');
app.use('/', postController);


// const loginController = require('./controllers/login.js');
// app.use('/',loginController)




//listening
app.listen(3000, () => {
    console.log("its working")
})