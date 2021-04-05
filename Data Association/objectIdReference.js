const   express     =   require('express'),
        mongoose    =   require('mongoose'),

//Database url for datbase connection
dataBaseURL = 'mongodb+srv://Muhammad-zubair:zubair123@blogsappproject.xnctj.mongodb.net/blogsApp?retryWrites=true&w=majority';

//Connect to data base
mongoose.connect(dataBaseURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then((results)=>{
    console.log('Database Connected');
})
.catch((error)=>{
    console.log('DataBase error   ' + error);
})

//Post schema
const postsSchema = new mongoose.Schema({
    title:String,
    content:String,
})

//Post schema model
const posts = mongoose.model('posts',postsSchema);

//Create a user schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    //user can have many posts...
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }]
})

//Model User schema
const users = mongoose.model('users',userSchema);

// const user = new users({
//         name:'Muhammad Safi',
//         email:'safi@hangu.com'
//     })
//     .save()
//     .then((user)=>{
//         console.log('Safi added to database')
//         user.posts.push({
//             title:'Za hm juice khwakhawm',
//             content:'Safi waye matha hm juice p garmi ki khwand rakawe'
//         })
//         .save()
//         .then((user)=>{
//             console.log(user);
//         })
//         .catch((error)=>{
//             console.log(error);
//         })
//     })
//     .catch((error)=>{
//         console.log(error);
//     })

//Create a post
const post = new posts({
    title:'Mangos are yellow',
    content:'All the mangos are not Yellow, but some of them are...'
})
    .save()
    .then((post)=>{
     users.findOne({name:'Muhammad Safi'}).populate('posts').exec()  
    .then((user)=>{
      console.log('Safi melawsho');      
      user.posts.push(post);
      console.log('safi details' + user);
    })
    .catch((error)=>{
        console.log('safi Nashtha.');
        console.log(error);
    })
})
    .catch((error)=>{
        console.log(error);
    })

// Find user then populate (fill) Posts collection and then start execution...
users.findOne({name:'Muhammad Safi'})
    .then((safi)=>{
        console.log('Safi Details 2 : ')
        console.log(safi);
    })
    .catch((error)=>{
        console.log('Safi nashtha ' + error);
})
