const mongoose=require("mongoose")
PORT=5000
var mongoURL='mongodb+srv://riyaz:riyazapp@cluster0.a8akqze.mongodb.net/BookMyShow?retryWrites=true'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var connection=mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB Connection Falied')
})

connection.on('connected',()=>{
    console.log('Mongo DB Connection SucessFull')
})

module.exports=mongoose