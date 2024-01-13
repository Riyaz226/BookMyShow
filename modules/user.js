const mongoose=require('mongoose');

const userSchema=mongoose.Schema({ 
    name:{
      type:String, required : [true,'A tour must have a name'],
      unique:true
    },
    email: {
      type: String,
      required: [true, 'A tour must have a name'],
      validate: {
          validator: function (value) {
              return value.toLowerCase().endsWith('@gmail.com');
          },
          message: 'Email must end with @gmail.com',
      },
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Password must be either a number or a string'],
    validate: {
      validator: function (value) {
        return typeof value === 'number' || typeof value === 'string';
      },
      message: 'Password must be either a number or a string',
    },
  },
  cpassword: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Confirm Password must be either a number or a string'],
    validate: {
      validator: function (value) {
        return typeof value === 'number' || typeof value === 'string';
      },
      message: 'Confirm Password must be either a number or a string',
    },
  },
   
isAdmin:{
        type:Boolean, default :false
    }
},{
  timestamps:true
})

const userModel=mongoose.model('users',userSchema)
module.exports=userModel;

