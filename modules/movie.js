const mongoose=require('mongoose');

const movieSchema=mongoose.Schema({
name:{
        type:String,
        required:true
    },
    Genre: {
        type:String,
        required:true
      },
      Genre2: {
        type:String,
        required:true
      },
      Certificate:{
        type:String,
        required:true
      },
    Language: {
        type:String,
        required:true
      },
      Video: {
        type:String,
        required:true
      },
      Response:{
        type:String,
        required:true
      },
      currentbookings:[],
      Images:[],
},{
  timestamps:true
})

const movieModel=mongoose.model('movies',movieSchema)
module.exports=movieModel;

