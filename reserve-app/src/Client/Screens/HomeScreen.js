import React from 'react'
import {NavLink} from 'react-router-dom'
import './Style.css'


function HomeScreen({movie}) {
return (
    <> 
  <div>
           <div className='dfr'>
           <NavLink to={`/movie/:${movie.id}`}>
            <img src={movie.Images}  alt="" className='img'/>
           </NavLink>
            </div>
          <div class="deta">
            <p style={{wordSpacing:"83px"}}>{movie.Rating} {movie.Votes}</p>
            <p>{movie.name}</p>
            <p style={{}}>{movie.Genre}</p>
        </div>
  </div>
  
   </>
  )
}

export default HomeScreen