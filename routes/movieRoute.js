const express=require("express")
const router=express.Router()
const bodyParser = require('body-parser');
const Movie=require('../modules/movie')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/getallMovies",async(req,res)=>{
    try{
        const movies=await Movie.find({})
        return res.json({movies})
    }catch(error){
          return res.status(400).json({message:error})
    }
})

router.post("/getMovieById", async (req, res) => {
  const movieId = req.body.movieId;

  try {
    const movie = await Movie.findOne({_id:movieId});
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addMovies",async(req,res)=>{
    try{
        const newMovie=new Movie(req.body)
        await newMovie.save()

        res.send("New Movie SucessFully")
    }catch (error) {
       return res.status(400).json({ error: 'Internal Server Error' });
      }
    
});


// router.post("/updateMovies", async (req, res) => {
//     try {
//       const movieId = req.params.movieId;
//       const updateFields = req.body; // Fields to update
  
//       const updatedMovie = await Movie.findByIdAndUpdate(
//         _id,
//         { $set: updateFields },
//         { new: true }
//       );
  
//       if (!updatedMovie) {
//         return res.status(404).json({ error: 'Movie not found' });
//       }
  
//       res.json({ message: 'Movie updated successfully', updatedMovie });
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
module.exports=router;