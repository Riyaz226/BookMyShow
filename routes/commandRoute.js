const express=require("express")
const router=express.Router()
const bodyParser = require('body-parser');
const Command=require('../modules/command')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/addCommand",async(req,res)=>{
    const newCommand = new Command({
        command: req.body.command,
        range: req.body.range,
        selectedOption:req.body.selectedOption
    });
   
    try {
      const com=await newCommand.save()
      res.send('User Command Registered SucessFully')  
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(600).json({ error: 'Internal Server Error' });
      }
    
});


module.exports=router;