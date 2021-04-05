const   mongoose    =   require('mongoose');

//Post schema
const postsSchema = new mongoose.Schema({
    title:String,
    content:String,
})

//Post schema model
const posts = mongoose.model('posts',postsSchema);

module.exports = posts ;