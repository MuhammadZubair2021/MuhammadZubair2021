const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersAppSchema = new Schema(
   {
       name:{
           type : String,
           required:true
       },
       email: {
            type : String,
            required:true
    },  
    message:{
        type : String,
        required:true
    },
},{timestamps:true});

const usersSchema = mongoose.model('userApp',usersAppSchema);
module.exports = usersSchema ;