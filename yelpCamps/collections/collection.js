const yelpCampSchema    =   require('../yelpCampsModel/yelpCampModel'),
      user              =   require('../yelpCampsModel/users'),
      passport          =   require('passport'),
      comments          =   require('../yelpCampsModel/comments');

//  For / request 
const showIndex = (req,res)=>
{
    res.redirect('/index');
}

// For /index request
const showIndex2 = (req,res)=>
{           
    res.render('../views/yelpCampEjsFiles/index',{pageTitle : " Home"});   
}

//for /CampGround page request...
const campgrounds =   (req,res)=>
{
    yelpCampSchema.find()
    .then(results=>{
        res.render('../views/yelpCampEjsFiles/campGround',{pageTitle : " Campgrounds" ,
        campgroundArray : results}); 
    })    
    .catch(error=>{
        res.render('../views/yelpCampEjsFiles/errorPage',{pageTitle : " Error Page"});
     })    
     
}

// for /CampGround:id (individual) CampGround request...
const campgroundWithId = (req,res)=>
{
    const campGroundId = req.params.id;
    yelpCampSchema.findById(campGroundId).populate('comments').exec()
    .then(results=>{
        res.render('../views/yelpCampEjsFiles/showOne',{pageTitle : results.campgroundName ,
                                                    campground : results});
    })    
    .catch(error=>{
        res.render('../views/yelpCampEjsFiles/errorPage',{pageTitle : " Error Page"});
     })    
     
}

//] for /new Campground Page request...
const newCampgroundGet = (req,res)=>
{   
    res.render('../views/yelpCampEjsFiles/newCampGround',{pageTitle : "Add New Campground"});   
}

// for /new Campground Post request...
const newCampgroundPost = (req,res)=>
{
    const formData = {
                    campgroundName : req.body.campgroundName,
                    imgUrl : req.body.imgUrl,
                    author : {
                            id:req.user._id,
                            username:req.user.username,
                            }   
                    }        
    const yelpCamps = new yelpCampSchema(formData);
    yelpCamps.save()
    .then(results=>{
        res.redirect('/campgrounds');
    })
    .catch(error=>{
        res.render('../views/yelpCampEjsFiles/errorPage',{pageTitle : " Error Page"});
     })     
}

// Comment routes 
// for comment page get request
const commentGet = (req,res)=>
{
    const campgroundId = req.params.id;
    yelpCampSchema.findById(campgroundId).populate('comments').exec()
    .then(results=>{
        res.render('../views/yelpCampEjsFiles/newComment',{pageTitle : results.campgroundName ,
                                                    campground : results});
    })    
    .catch(error=>{
        res.render('../views/yelpCampEjsFiles/errorPage',{pageTitle : " Error Page"});
     })    
     
}

//for Comment page Post request...
const commentPost = (req,res)=>{
    const campgroundId = req.params.id;
    const author = {
        id:req.user._id,
        username:req.user.username
    }
    const commentText = req.body.commentText;    

    const comment = new comments({
            author:author,
            text:commentText
        })
        .save()
        .then((comment)=>{
            yelpCampSchema.findById(campgroundId).populate('comments').exec()
            .then((campground)=>{                       
                campground.comments.push(comment);
                campground.save()
                .then((savedCampground)=>{
                    console.log('Comment add sho'); 
                    res.redirect('/campgrounds/' + campgroundId);
                })
                .catch((err)=>{
                    console.log('Error saving campground after comment' + err);
                })        
            })
            .catch((error)=>{
                console.log('Campground not found ' + error);        
            })
        })
        .catch((err)=>{
            console.log('Comment not added ' + err)
        })

}
//End of comment routes



// Authentication Process is below this...
// User registration page get request
const registrationGet = (req,res)=>{
    res.render('../views/yelpCampEjsFiles/register',{pageTitle : "Sign Up"});   
}

// User registration page Post request
const registrationPost = (req,res)=>{
    user.register(new user({username:req.body.username}),req.body.password,(error,user)=>{
        if(error){
            console.log(error);
            return res.render('../views/yelpCampEjsFiles/register',{pageTitle : "Sign Up"});
        }
        passport.authenticate('local'),(req,res,function(){
            res.redirect('/');
        })
    })
}


//User Login page get request
const loginGet = (req,res)=>{
    res.render('../views/yelpCampEjsFiles/login',{pageTitle : "Sign In"});   
}

//User Login Post request working is done in routes file.

//user logging out..
const logOut = (req,res)=>{
    req.logout();
    res.redirect('/campgrounds');
}

// for page not found request
const pageNotFound = (req,res)=>
{
    res.render('../views/yelpCampEjsFiles/errorPage',{pageTitle : " Page Not Found"});   
}


module.exports = {
    showIndex,
    showIndex2,
    campgrounds,
    campgroundWithId,
    newCampgroundGet,
    newCampgroundPost,
    commentGet,
    commentPost,
    registrationGet,
    registrationPost,
    loginGet,
    logOut,
    pageNotFound
}