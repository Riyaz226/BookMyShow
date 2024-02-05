/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { BiSolidStar } from 'react-icons/bi';
import ShareIcon from '@mui/icons-material/Share';
import FestivalIcon from '@mui/icons-material/Festival';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Modal from 'react-bootstrap/Modal';
import {
  FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon,
  PinterestShareButton, PinterestIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon
} from 'react-share'
import './Style.css';

import Review from '../Screens/CommandDis'
import Nav from '../Navbar'
import axios from 'axios'
import Load from '../Loader/load'
import HouseIcon from '@mui/icons-material/House';

function BookTab() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isInCinemas, setIsInCinemas] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = (await axios.post(' https://bookmyshow2-cr8a.onrender.com/api/movies/getMovieById', { movieId: movieId })).data;
        setLoading(true);
        setMovie(data);
        console.log(data);
        setLoading(false);
        setBackgroundImage(data.MovieIcon[1]);
        const today = new Date();
        const movieReleaseDate = new Date(data.Released);

        const daysToShowButtonFor = 10;

        const isInCinemas = (releaseDate) => {
          const differenceInDays = Math.floor((today - releaseDate) / (1000 * 60 * 60 * 24));
          return differenceInDays >= 0 && differenceInDays <= daysToShowButtonFor;
        };

        setIsInCinemas(isInCinemas(movieReleaseDate));

      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]);


  const handleMovieClick = (movie) => {
    const movieName = encodeURIComponent(movie.name);
    const movieId = encodeURIComponent(movie._id);

    if (movie.Certificate && movie.Certificate === 'A') {
      const proceed = window.confirm(
        'This movie is rated A and is only for viewers above 18. Please carry a valid ID/Age Proof to the theatre. If you are denied entry due to age or ID issues, you will not get a refund.'
      );

      if (proceed) {
        window.location.href = `/buytickets/${movieName}/movie-tric-ET00337321-MT/${movieId}`;
        console.log('Redirecting to the next page...');
      }
    } else {
      window.location.href = `/buytickets/${movieName}/movie-tric-ET00337321-MT/${movieId}`;
      console.log('You can proceed with this movie.');
    }
  };

  const [data2, setData] = useState([]);
  useEffect(() => {
    fetch('https://bookmyshow2-cr8a.onrender.com/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
      });
  }, [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const shareUrl = "https://www.facebook.com/"
  const shareUrl2 = "https://mail.google.com/"
  const shareUrl3 = "https://www.facebook.com/"
  const shareUrl4 = "https://in.pinterest.com/login/"
  const shareUrl5 = "https://web.telegram.org/"
  const shareUrl6 = "https://twitter.com/i/flow/login"
  const shareUrl7 = "https://web.whatsapp.com/"

  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ) : (
        <>
          <Nav />
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
                <a href='/home'><HouseIcon style={{ fontSize: "1.8em", color: "blue" }} /></a>
                <iframe
                  title={movie?.name}
                  width="265"
                  height="423"
                  src={`https://www.youtube.com/embed/${movie.Video}`}
                  allowFullScreen
                ></iframe>
                <div className="box-2">
                  <h2 className="d-n">{movie.name}</h2>
                  <p class="d-r"><BiSolidStar class="i3" /><i><a href={`/city/movie/${movie._id}/user-reviews`} style={{ textDecoration: "none", color: "white" }}>KVotes&#8594;</a></i></p>
                  <div className="b2">
                    <h3>Add your rating & review <br /><p>Your ratings matter</p> </h3>
                    <p className='p'><a href={`/city/${movie.name}/${movie._id}/user-reviews`} style={{ textDecoration: "none", color: "#ae8166" }}>Rate now</a></p>
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
                  <p style={{ marginTop: "-15.5px", paddingLeft: "14.5px", color: "white", fontSize: "18px", wordSpacing: "3px" }}>{isInCinemas ? 'In cinemas' : 'Not in cinemas'}</p>

                  {isInCinemas && (
                    <button className="bt-1" onClick={() => handleMovieClick(movie)} style={{ color: 'white' }}>
                      Book tickets
                    </button>
                  )}
                </div>
                <div className='box-3'>
                  <div class="b3">
                    <p><BiSolidStar class="i4" style={{ color: "red", fontSize: "26px" }} /><i style={{ color: "white" }}>KVotes&#8594;</i></p>
                    <p className='pe' style={{ color: "white" }}>Your rating</p>
                    <ShareIcon className='i10' style={{ color: "white", cursor: "pointer", fontSize: "2em", marginLeft: "34px" }} onClick={handleShow} />
                  </div>
                  <div class="genre">
                    <p class="category" style={{ display: 'flex' }} id="cate">
                      {movie.Screen.map((scr, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {scr}
                        </span>
                      ))}
                    </p>
                    <p class="category -2" style={{ display: 'flex' }} id="cate2">
                      {movie.Language.map((Lan, index) => (
                        <span key={index} style={{ marginRight: '6px' }}>
                          {Lan}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div class="p4">
                    <p style={{ wordSpacing: "3px", color: "white" }}>{movie.Runtime}</p>
                    <p style={{ marginTop: "-4px", color: "white" }}>.</p>
                    <p style={{ marginInline: "21px", color: "white" }}>{movie.Genre.join(',')}</p>
                    <p style={{ marginTop: "-4px", color: "white" }}>.</p>
                    <p style={{ marginInline: "10px", color: "white" }}>{movie.Certificate}</p>
                    <p style={{ marginTop: "-4px", color: "white" }}>.</p>
                    <p style={{ wordSpacing: "3px", color: "white" }}>{movie.Released}</p>
                    <p style={{ marginTop: "-15.5px", paddingLeft: "14.5px", color: "white", fontSize: "18px", wordSpacing: "3px" }}>{isInCinemas ? 'In cinemas' : 'Not in cinemas'}</p>
                  </div>
                </div>
                <ShareIcon className='i1' style={{ color: "white", cursor: "pointer" }} onClick={handleShow} />
                <p className='i2' style={{ color: "white", cursor: "pointer" }} onClick={handleShow}>Share</p>
              </div>

              {/* Actors and booking */}

              <div className='inf'>
                <div className="sto">
                  <h3>About the movie</h3>
                  <p id="des1">{movie.Description}.</p>

                  <div className="b4">
                    <h3>Add your rating & review <br /><p>Your ratings matter</p> </h3>
                    <p className='p'><a href={`/city/movie/${movie._id}/user-reviews`} style={{ textDecoration: "none", color: "#ae8166" }}>Rate now</a></p>
                  </div>

                  <p id="des2">{movie.Description}.</p>
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
                      <span key={index} >
                        {ca}
                      </span>
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
                      <span key={index} >
                        {ca}
                      </span>
                    ))}
                  </p>
                </div>
                <hr />

                <div className="review">
                  <h3>Top reviews</h3>
                  <Review movieId={movieId} />
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
                        <NavLink to={`/city/movies/${movie.name}/${movie._id}/ET00311489`}>
                          <img src={movie.MovieIcon[0]} alt="" className='img' />
                        </NavLink>
                        <div className="deta">
                          <p style={{ wordSpacing: "83px" }}>&#x2B50;votes</p>
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
              {isInCinemas && (
                <button className="bt-2" onClick={() => handleMovieClick(movie)} style={{ color: 'white' }}>
                  Book tickets
                </button>
              )}
            </>
          )}
        </>
      )}
      <Modal show={show} onHide={handleClose} id="mo5">
        <Modal.Body>
          <h5>Share via</h5>
          <div id="icons">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} />
              <br />
              <span>FaceBook</span>
            </FacebookShareButton>

            <EmailShareButton url={shareUrl2}>
              <EmailIcon size={40} />
              <br />
              <span>Gmail</span>
            </EmailShareButton>

            <LinkedinShareButton url={shareUrl3}>
              <LinkedinIcon size={40} />
              <br />
              <span>message</span>
            </LinkedinShareButton>

            < PinterestShareButton url={shareUrl4}>
              <PinterestIcon size={40} />
              <br />
              <span>Share</span>
            </PinterestShareButton>

            <TelegramShareButton url={shareUrl5}>
              <TelegramIcon size={40} />
              <br />
              <span>Telegram</span>
            </TelegramShareButton>

            < TwitterShareButton url={shareUrl6}>
              <TwitterIcon size={40} />
              <br />
              <span>Twitter</span>
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl7}>
              <WhatsappIcon size={40} />
              <br />
              <span>WhatsApp</span>
            </WhatsappShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default BookTab;
