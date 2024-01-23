const express=require("express")
const cors = require('cors');
const app=express()

app.use(cors());
app.use(express.json())

const dbConfig=require('./db')
const userRoute=require('./routes/userRoute')
const movieRoute=require('./routes/movieRoute')
const bookingRoute=require('./routes/bookingRoute')
const commandRoute=require('./routes/commandRoute')


app.use('/api/users',userRoute)
app.use('/api/movies',movieRoute)
app.use('/api/bookings',bookingRoute)
app.use('/api/command',commandRoute)

const port=process.env.port || 5000;

app.listen(port,() =>console.log(`Node Server Start using nodemon `));

