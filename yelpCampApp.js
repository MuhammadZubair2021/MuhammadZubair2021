const   express         = require('express'),
        app             = new express(),
        path            = require('path'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        localStrategy   = require('passport-local'),
        user            = require('./yelpCamps/yelpCampsModel/users'),
        rout            = require('./yelpCamps/routes/routes');
        

//Dababase URI (URL)
const dbURI = "mongodb+srv://Zubair-bangash:zubair123@blogsappproject.xnctj.mongodb.net/campsApp?retryWrites=true&w=majority";

//Connect to database...
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
.then((results) => {
    console.log('Database Connected');
    }).catch(error=>
    {
        console.log(error);
    })

// Set view engine to view for ejs files
app.set('view engine','ejs') ;
app.use('/public',express.static(path.join(__dirname,'/static')));

//Passport Configuration....
app.use(require('express-session')({
    secret:'I am Muhammad Zubair',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//Parse the form data using body-parser module.
app.use(bodyParser.urlencoded({extended:false}));

//A middle ware to pass detail of current user to every page...
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

// All the routes are present in rout variable..
app.use(rout);

app.listen(3000);


//Some Campgrounds with comments 
// const c = new yelpCampSchema({
//     campgroundName:'Hangu',
//     imgUrl : 'https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',    
    
// })
// .save()
// .then((campground)=>{
//     console.log('campground created');        
// })
// .catch((err)=>{
//     console.log(err);
// })


//Showing campgrounds with comments
// yelpCampSchema.find().populate('comments').exec()
// .then((campgrounds)=>{
//     campgrounds.forEach((campground)=>{
//         console.log(campground);
//     })
// })
// .catch((error)=>{
//     console.log('last line : ' + error);
// })

