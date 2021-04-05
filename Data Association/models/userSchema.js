const   mongoose    =   require('mongoose');


//Create a user schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    //user can have many posts...
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
    }]
})

//Model User schema
const users = mongoose.model('users',userSchema);
module.exports = users ;