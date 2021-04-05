const   express       =   require('express'),
        app           =   new express(),
        mongoose      =   require('mongoose'),
        passport      =   require('passport'),
        localStrategy =   require('passport-local'),
        user          =   require('./userAuthDemo/userModel'),
        passportLocalMongoose   =   require('passport-local-mongoose'),
        bodyParser    =   require('body-parser');
        


//Dababase URI (URL)
const dbURI = "mongodb+srv://Zubair-bangash:zubair123@blogsappproject.xnctj.mongodb.net/userAuthDemo?retryWrites=true&w=majority";

//Connect to database...
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
.then((results) => {
    console.log('Database Connected');
    }).catch(error=>
    {
        console.log(error);
    })


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Passport Configuration...
app.use(require('express-session')({
    secret:'My name is muhammad zubair',
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//Listen for landing page or / request
app.get('/',(req,res)=>{
    res.render('./userAuthDemoEjsFiles/index.ejs');
})

//Listen for secret page request
app.get('/secret',isLoggedIn,(req,res)=>{
    res.render('./userAuthDemoEjsFiles/secret.ejs');
})

//Listen for register page request
app.get('/register',(req,res)=>{
    res.render('./userAuthDemoEjsFiles/register');
})

//Listen for register page post request
app.post('/register',(req,res)=>{
     
    user.register(new user({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('./userAuthDemoEjsFiles/register');
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/secret');
        })
    })
})

//Listen for login page request
app.get('/login',(req,res)=>{
    res.render('./userAuthDemoEjsFiles/login');
})

//Listen for login page post request
app.post('/login',passport.authenticate('local',{
    successRedirect:'/secret',
    failureRedirect:'/login'
}),(req,res)=>{
    
})

//Listen for logout request
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})

//Middle ware function for checking user is logged in or not.
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

app.listen(3000,()=>{
    console.log('Server started and listening on port 3000');
})