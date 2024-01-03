/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';
import ShareIcon from '@mui/icons-material/Share';
import FestivalIcon from '@mui/icons-material/Festival';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import './Style.css';

import Review from '../Screens/CommandDis'
import axios from 'axios'
import Load from '../Loader/load'

function BookTab() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [backgroundImage, setBackgroundImage] = useState('');
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = (await axios.post('http://localhost:5000/api/movies/getMovieById', { movieId: movieId })).data;
        setLoading(true);
        setMovie(data);
        console.log(data);
        setLoading(false);
        setBackgroundImage(data.MovieIcon[1]);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
fetchMovie();
  }, [movieId]);

  const handleMovieClick = (movie) => {
    if (movie.Certificate && movie.Certificate === 'A') {
      const proceed = window.confirm(
        'This movie is rated A and is only for viewers above 18.Please carry a vaild ID/Age Proof to the theatre.if you are denied entry due to age or ID issues,you will not get a refund.'
      );
      if (proceed) {
        window.location.href = '/buytickets/name/movie-tric-ET00337321-MT/20231231';
        console.log('Redirecting to the next page...');
      }
    } else {
      window.location.href = '/buytickets/name/movie-tric-ET00337321-MT/20231231';
      console.log('You can proceed with this movie.');
    }
  };
  
const [data2, setData] = useState([]);
 useEffect(() => {
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.movies);
      });
  }, [])

  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ) : (
        <>
          {movie && (
            <>
              <div className='book'
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  minHeight: '55vh',
                }}>
                <iframe
                  title={movie?.name}
                  width="265"
                  height="423"
                  src={`https://www.youtube.com/embed/${movie.Video}`}
                  allowFullScreen
                ></iframe>
                <div className="box-2">
                  <h2 className="d-n">{movie.name}</h2>
                  <p class="d-r"><BiSolidStar class="i3" /><i>Votes&#8594;</i></p>
                  <div className="b2">
                    <h3>Add your rating & review <br /><p>Your ratings matter</p> </h3>
                    <p className='p'><a href={`/city/movie/${movie._id}/user-reviews`} style={{ textDecoration: "none", color: "#ae8166" }}>Rate now</a></p>
                  </div>
                  <p class="genre">
                    <p class="category " style={{ display: 'flex' }}>
                      {movie.Screen.map((scr, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {scr}
                        </span>
                      ))}
                    </p>
                    <p class="category -2" style={{ display: 'flex' }}>
                      {movie.Language.map((lang, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {lang}
                        </span>
                      ))}
                    </p>
                  </p>
                  <p class="p4">
                    <p style={{ wordSpacing: "3px" }}>{movie.Runtime}</p>
                    <p style={{ marginTop: "-5px" }}>.</p>
                    <p style={{ marginInline: "21px" }}>{movie.Genre.map((gen, index) => (
                      <span key={index} style={{ marginRight: '5px' }}>
                        {gen}
                      </span>
                    ))}</p>
                    <p style={{ marginTop: "-5px" }}>.</p>
                    <p style={{ marginInline: "10px" }}>{movie.Certificate}</p>
                    <p style={{ marginTop: "-5px" }}>.</p>
                    <p style={{ wordSpacing: "3px" }}>{movie.Released}</p>
                  </p>
                  <button class="bt-1" onClick={() => handleMovieClick(movie)} style={{color:"white"}}>Book tickets</button>
                </div>
                <div className='box-3'>
                  <div class="b3">
                    <p><BiSolidStar class="i4" style={{ color: "red", fontSize: "26px" }} /><i>Votes&#8594;</i></p>
                    <p className='pe'>Your rating</p>
                  </div>
                  <div class="genre">
                    <p class="category" style={{ display: 'flex' }}>
                      {movie.Screen.map((scr, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {scr}
                        </span>
                      ))}
                    </p>
                    <p class="category -2" style={{ display: 'flex' }}>
                      {movie.Genre.map((gen, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {gen}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div class="p4">
                    <p style={{ wordSpacing: "3px" }}>{movie.Runtime}</p>
                    <p style={{ marginTop: "-4px" }}>.</p>
                    <p style={{ marginInline: "21px" }}>{movie.Genre.join(',')}</p>
                    <p style={{ marginTop: "-4px" }}>.</p>
                    <p style={{ marginInline: "10px" }}>{movie.Certificate}</p>
                    <p style={{ marginTop: "-4px" }}>.</p>
                    <p style={{ wordSpacing: "3px" }}>{movie.Released}</p>
                  </div>
                </div>
                <ShareIcon className='i1' style={{ color: "white" }} />
                <p className='i2' style={{ color: "white" }}>Share</p>
              </div>

              {/* Actors and booking */}

              <div className='inf'>
                <div className="sto">
                  <h3>About the movie</h3>
                  <p id="des1">Brace yourself for an extraordinary tale of rebellion filled with power-packed action.</p>

                  <div className="b4">
                    <h3>Add your rating & review <br /><p>Your ratings matter</p> </h3>
                    <p className='p'><a href={`/city/movie/${movie._id}/user-reviews`} style={{ textDecoration: "none", color: "#ae8166" }}>Rate now</a></p>
                  </div>

                  <p id="des2">Brace yourself for an extraordinary tale of rebellion filled with power-packed action.</p>
                </div>
                <hr />

                <div className="cast">
                  <h3>Cast</h3>
                  <p className="ca">
                    {movie.CastImages.map((cr, index) => (
                      <span key={index} style={{ marginRight: '6px' }}>
                        <img src={cr} alt="" />
                      </span>
                    ))}
                  </p>
                  <p className="caname">
                    {movie.Cast.map((ca, index) => (
                      <span key={index} >{ca}</span>
                    ))}
                  </p>
                </div>
                <hr />
                <div className="cast">
                  <h3>Crew</h3>
                  <p className="ca">
                    {movie.CrewImages.map((cr, index) => (
                      <span key={index} style={{ marginRight: '6px' }}>
                        <img src={cr} alt="" />
                      </span>
                    ))}
                  </p>
                  <p className="caname">
                    {movie.Crew.map((ca, index) => (
                      <span key={index} >{ca}</span>
                    ))}
                  </p>
                </div>
                <hr />

                <div className="review">
                  <h3>Top reviews</h3>
                  <Review />
                  <hr />
                  <h3>Critic reviews</h3>
                </div>
                <hr />

                <div className="movies">
                <h3>You might also like</h3>
                  <p style={{ float: "right", marginTop: "-28px", textDecoration: "none" }}><a href="/explore/home/:districtName">See All &#8594;</a></p>
                   
              <div className='df'>
                      {data2.map((movie) => (
                      <div key={movie._id} className='dfr'>
                        <NavLink to={`/city/movies/${movie._id}`}>
                          <img src={movie.MovieIcon[0]} alt="" className='img' />
                        </NavLink>
                        <div className="deta">
                          <p style={{ wordSpacing: "83px" }}>&#x2B50;{movie.Rating} {movie.Votes}votes</p>
                          <p style={{ marginTop: "-7px" }}>{movie.name}</p>
                          <p >{movie.Genre.join('/')}</p>
                        </div>
                      </div>
                    ))}
              </div>
                </div>

</div>

              <div className="en">
                <p style={{ color: "#666b74", fontSize: "15px" }}>Report Content &#187;</p>
                <p style={{ color: "#aaabac", fontSize: "15px" }}>Online tickets &#8594; Movie tickets &#8594; Latest Movies &#8594;{movie.name}</p>
              </div>

              <div className="footer">
                <div className="b5">
                  <FestivalIcon id="i6" style={{ fontSize: "24px", color: "white" }} />
                  <h3> List your Show <p>Got a show,activity or a great experience? Partner with us &get listed on BookMyShow</p> </h3>
                  <p className='p'>Contact today!</p>
                </div>
                <div className="b6">
                  <SupportAgentIcon style={{ color: "#838385", fontSize: "3.5em" }} id="i7" />
                  <ConfirmationNumberIcon style={{ color: "#838385", fontSize: "3.5em" }} id="i7" />
                  <ContactMailIcon style={{ color: "#838385", fontSize: "3.5em" }} id="i7" />
                </div>
              </div>

              <button class="bt-2" onClick={()=>handleMovieClick(movie)} style={{color:"white"}}>Book tickets</button>
            </>
          )}
        </>
      )}

    </>
  );
}
export default BookTab;
