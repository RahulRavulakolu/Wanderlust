if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DB_url = process.env.ATLAS_DB_URL;
const MongoStore = require('connect-mongo');
const methodover = require('method-override');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const LocalStratergy = require('passport-local');
const User =  require('./models/user.js');

//routers
const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

const ejsmate = require("ejs-mate")
app.set('view engine', 'ejs');
app.engine('ejs', ejsmate);
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(methodover('_method'));
app.use(express.static(path.join(__dirname, 'public')));


main().then((res)=>{
  console.log("database connected successfully");
}).catch((err)=>{
  console.log(err, "error occured")
});

async function main() { 
 await mongoose.connect(DB_url);
};

app.get('/', (req, res) => {
  res.redirect('/listings');  
});

const store = MongoStore.create({
  mongoUrl: DB_url,
  touchAfter: 24 * 3600, // time in seconds after which session will be updated
  crypto: {
    secret: process.env.SECRET, // secret key for encrypting session data
  }
});

store.on("error", function(e){
  console.log("session store error", e);
});

const sessionOptions = {
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // for 1 week
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly:true  //for security purpose
  }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());  //initializing the passport 
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {                            
  res.locals.success = req.flash("success");  //it sends success value 
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; //it sends current user value
  next();
});


app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews", reviewsRouter);

app.use("/",userRouter);

// // for all the routes which undefined and user trying to access
// Handle undefined routes
// app.all('*', (req, res, next) => {
//   next(new ExpressError(404, 'Page Not Found'));
// });


// // error handlind middleware
app.use((err,req,res,next)=>{
  let{statuscode = 500 , message="something went wrong!"} = err;
  res.status(statuscode).render("error.ejs", {message});
 
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});