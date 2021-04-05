const express = require('express');
const app = new express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersSchema = require('./usersAppModels/model');

//Dababase URI (URL)
const dbURI = "mongodb+srv://Zubair-bangash:zubair123@blogsappproject.xnctj.mongodb.net/usersApp?retryWrites=true&w=majority";

//Connect to database...
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
.then((results) => {
    console.log('Database Connected');
    }).catch(error=>
    {
        console.log(error);
    })
    
// Set the view engine to directly look for ejs.
app.set('view engine','ejs') ;
app.use('/public',express.static(path.join(__dirname,'static')));

//Create a request for / and redirect index page 
app.get('/',(req,res)=>{    
  res.redirect('/index');
})

//Create a request for index page 
app.get('/index',(req,res)=>{
    res.render('./usersApp/index.ejs', {sentTitle:'Users Page'});
})


//Parse the form data using body-parser module.
app.use(bodyParser.urlencoded({extended:false}));


app.get('/registration',(req,res)=>{
        res.render('./usersApp/registration.ejs', {sentTitle:'Registration Page'});
})

// Listen for a Registration page request
app.post('/register_user',(req,res)=>{
    const users = new usersSchema(req.body);
    users.save()
    .then((results)=>{        
        res.redirect('/users');
    })
    .catch((error)=>{        
        res.redirect('/register_user');
    })     
})

//Listen for Sgin In Page request
app.get('/signInPage',(req,res)=>{
    res.render('./usersApp/signIn.ejs', {sentTitle:'Sign In Page'});
})

// Listen for a Checking User in database request
app.post('/checkUser',(req,res)=>{
    const userEmail = req.body.email ;
    
    var flag = 0 ;
    usersSchema.find()
    .then(results =>{        
        results.forEach(storedUsers=>
            {
                if(userEmail === storedUsers.email )
            {
                  flag = 1 ;               
            }   
            })            
            if(flag == 1){
                res.render('./usersApp/users.ejs', {sentTitle:'Index Page',
                usersArray : results});
            }
            else{
                res.render('./usersApp/userNotFound.ejs', {sentTitle:'Sign Page',
                errorText : 'Sorry Email not found in database'});                
            }            
    }).catch(error=>{        
        res.render('./usersApp/errorPage.ejs', {sentTitle:'Page not found'});
    })       
})

// Listen for a Users page request
app.get('/users',(req,res)=>{
    usersSchema.find().
    then(results =>{
        res.render('./usersApp/users.ejs', {sentTitle:'Index Page',
                                            usersArray : results});
    }).catch(error=>{
        res.render('./usersApp/errorPage.ejs', {sentTitle:'Page not found'});
    })    
})

//Redirect error page when no rout meet.
app.use((req,res)=>{
    res.render('./usersApp/errorPage.ejs', {sentTitle:'Page not found'});
})
app.listen(3000);
