const express = require('express')
const app = express()
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config();



const mongoose = require("mongoose")
const methodOverride = require("method-override")


//Database config
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useUnifiedTopology: true,
});

const store= new MongoDBSession({
	uri:process.env.DATABASE_URL,
	collection:'sessions',
})

app.use(session({
	secret: "veryHardPass",
	resave: false,
	saveUninitialized: false,
	store:store,
}))



// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(methodOverride("_method"))


// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static('css'))


const postController = require('./controllers/index.js');
app.use('/', postController);




//listening
app.listen(8080, () => {
    console.log("its working")
})