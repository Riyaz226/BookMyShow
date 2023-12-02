const mongoose=require('mongoose');

const commandSchema=mongoose.Schema({
command:{
    type:String, required : [true,'A tour must have a name'],
    unique:true
  },
range:{
    type:Number, default :[true,'1 tour must have  10 number']
},
selectedOption:{
  type:String, required : [true,'A tour must have a name'],
  }
})

const commandModel=mongoose.model('comments',commandSchema)
module.exports=commandModel;

