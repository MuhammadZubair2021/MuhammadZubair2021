const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogShema = new Schema(
   { title:
    {
        type:String,
        required:true
    },
    snippet:
    {
        type:String,
        required:true
    },
    body:
    {
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const Blogs = mongoose.model('Blog', blogShema);
module.exports = Blogs ;