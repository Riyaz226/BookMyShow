const express=require("express")
const bodyParser = require('body-parser');
const router=express.Router()
const User=require("../modules/user")
const nodemailer = require('nodemailer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cpassword: req.body.cpassword,
  });

  try {
    const user = await newUser.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Change 'email' to 'user'
        pass: process.env.PASSWORD // Change 'password' to 'pass'
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "BookMyShow Authentication",
      html: '<h2>Congratulations! You have successfully registered.</h2>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        res.status(500).json({ status: 500, error: 'Email could not be sent' });
      } else {
        console.log("Email sent:", info.response);
        res.send('User Registered Successfully and Email Sent');
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email,password:password})
        if(user){
            const temp={
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                _id:user._id
            }
            res.send(temp)
        }else{
            return res.status(400).json({message:"Login Failed"})
        }
    }catch(error){
        console.log(error)
        return res.status(400).json({error})
    }
});

router.get('/getallUsers',async(req,res)=>{
 try{
    const users=await User.find({})
    res.send(users)
 }
 catch(error){
    return res.status(400).json({error}) 
}
});


module.exports=router;