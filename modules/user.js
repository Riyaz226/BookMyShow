const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
      type:String, required : [true,'A tour must have a name'],
      unique:true
    },
    email:{
        type:String, required : [true,'A tour must have a name']
    },
    password:{
        type:Number, default :[true,'1 tour must have  10 number']
    },
    cpassword:{
      type:Number, default :[true,'1 tour must have  10 number']
   },
   
isAdmin:{
        type:Boolean, default :false
    }
},{
  timestamps:true
})

const userModel=mongoose.model('users',userSchema)
module.exports=userModel;

