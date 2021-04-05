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
    console.log('DataBase error');
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
    posts : [postsSchema]
})

//Model User schema
const users = mongoose.model('users',userSchema);

// const user2 = new users({
//         name:'Muhammad Ilyas ',
//         email:'ilyas@kohat.com'
//     })

users.findOne({name:'Muhammad Zulfiqar'})
  .then((user)=>{
      console.log('Zulfiqar melawsho');
    user.posts.push({
        title:'Banana juice and summer',
        content:'Banana juice is also great at summer'
    })
    user.save()
    .then((user)=>{
        console.log(user);
    })
    .catch((error)=>{
        console.log(error);
    })
    })
.catch((error)=>{
    console.log(error);
})
