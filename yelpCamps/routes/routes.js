const       express         =    require('express'),
            rout            =    new express.Router(),                       
            passport        =    require('passport'),           
            collection      =    require('../collections/collection');


//listen for / request...
rout.get('/', collection.showIndex);

//listen for /index request...
rout.get('/index',collection.showIndex2);


//listen for /CampGround page request...
rout.get('/campgrounds',collection.campgrounds);


//listen for /CampGround:id (individual) CampGround request...
rout.get('/campgrounds/:id',collection.campgroundWithId)

//listen for /new Campground Page request...
rout.get('/newCampground',isLoggedIn,collection.newCampgroundGet);

//listen for /new Campground Post request...
rout.post('/newCampground',isLoggedIn,collection.newCampgroundPost);


// Comment routes 
rout.get('/campgrounds/:id/newComment',isLoggedIn,collection.commentGet);

//Comment page Post request...
rout.post('/campgrounds/:id/comment',isLoggedIn,collection.commentPost);

// Authentication Process is below this...
// User registration page request
rout.get('/register',collection.registrationGet);

rout.post('/register',collection.registrationPost);

//User Login page request
rout.get('/login',collection.loginGet);

//User Login page post request
rout.post('/login',passport.authenticate('local',
    {        
        successRedirect:'/campgrounds',
        failureRedirect:'/login'
    }),(req,res)=>{

})

rout.get('/logout',collection.logOut);

//Listen for page not found request
rout.use(collection.pageNotFound);


//MiddleWare function for checking user is logged in or not.
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

//Finally export all the routes
module.exports = rout;