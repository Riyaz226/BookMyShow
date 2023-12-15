/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,useEffect } from 'react';
import { Link} from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';
import ShareIcon from '@mui/icons-material/Share';
import './Style.css';

function BookTab({id}) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/movies/getallMovies'); // Replace with your API endpoint
            if (response.ok) {
              const data = await response.json();
              setMovie(data); 
            } else {
              throw new Error('Failed to fetch data');
            }
          } catch (error) {
            console.error('Error fetching movie details:', error);
          }
        };
    
        fetchMovieData();
      }, [id]);
return (
    
<>
{movie && (
          <div className='book'>
                <iframe
                title={movie?.name}
                width="265"
                height="430"
                src={`https://www.youtube.com/embed/${movie.Video}`}
                allowFullScreen
              ></iframe>
             <div className="box-2">
                <h2 className="d-n">{movie.name}</h2>
                <p class="d-r"><BiSolidStar class="i3"/>{movie.Rating}<i>{movie.Votes}Votes&#8594;</i></p>
                 <div className="b2">
                   <h3>Add your rating & review <br/><p>Your ratings matter</p> </h3>
                    <p className='p'>Rate now </p>
                 </div>
                 <p class="genre">
                  <p class="category">{movie.Screen}</p>
                 <p class="category -2" ><span>{movie.Language}</span></p>
               </p>
                 <p class="p4">
                  <p style={{wordSpacing:"3px"}}>{movie.Runtime}</p>
                  <p>.</p>
                  <p style={{marginInline:"21px"}}>{movie.Genre2}</p>
                  <p>.</p>
                  <p style={{marginInline:"10px"}}>{movie.Certificate}</p>
                  <p>.</p>
                  <p style={{wordSpacing:"3px"}}>{movie.Released}</p>
                  </p>
                 <button class="bt-1"><Link to={`/cart/book/${movie.id}`}>Book tickets</Link></button>          
           </div>     
           <div className='box-3'>
              <div class="b3">
                <p><BiSolidStar class="i4" style={{color:"red"}}/>{movie.Rating}<i>{movie?.Votes}Votes&#8594;</i></p>
                <p className='pe'>Your rating</p>
              </div>
              <div class="genre">
                  <p class="category">{movie.Screen}</p>
                 <p class="category -2" ><span>{movie.Language}</span></p>
               </div> 
               <div class="p4">
                  <p style={{wordSpacing:"3px"}}>{movie.Runtime}</p>
                  <p>.</p>
                  <p style={{marginInline:"21px"}}>{movie.Genre2}</p>
                  <p>.</p>
                  <p style={{marginInline:"10px"}}>{movie.Certificate}</p>
                  <p>.</p>
                  <p style={{wordSpacing:"3px"}}>{movie.Released}</p>
                </div>  
           </div>
           <ShareIcon className='i1' style={{color:"white"}}/>
           <p className='i2' style={{color:"white"}}>Share</p>
           </div>
    )}
     </>
  );
}
export default BookTab;
