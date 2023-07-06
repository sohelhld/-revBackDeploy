const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Title:{type:String,require:true},
    Author :{type:String,require:true},
    Genre :{type:String,require:true},
    Description :{type:String,require:true},
    Price:{type:Number,require:true},

}) 

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}