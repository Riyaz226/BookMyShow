import React,{useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import Badge from '@mui/material/Badge'

import ads from '../../Json/ads.json';
import Load from '../Loader/load'

import './Style.css';

function HomeMovie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.movies);
        setLoading(false);
  });
  }, [])


  return (
    <>
<div className="roll">
        <h3>Recommended Movies</h3>
        <p style={{ float: "right", marginTop: "-28px", textDecoration: "none" }}><a href="/explore/home/:districtName">See All &#8594;</a></p>
        {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ):(
       <div className='df'>
          {data.map((movie) => (
            <>
            <div key={movie._id} className='dfr'>
              <NavLink to={`/city/movies/${movie._id}`}>
                <img src={movie.MovieIcon[0]} alt="" className='img' />
              </NavLink>
            
            <div className="deta">
                <p style={{ wordSpacing: "83px" }}>&#x2B50;{movie.Rating} {movie.Votes}votes</p>
                <p style={{ marginTop: "-5px" }}>{movie.name}</p>
                <p >{movie.Genre.join('/')}</p>
            </div>
            </div>
              </>
))}
</div>
)}
</div>
      <div className="ADS" >
        <h3 style={{ paddingLeft: "18px" }}><MapOutlinedIcon style={{fontSize:"1em"}}/>The Best Events This Week</h3>
        <p style={{ paddingLeft: "18px" }}>Live events for all your entertainment needs</p>
        <div className="ADS2">
          {ads.map((ad) => (
            // <NavLink to={`/explore/Ads/${ad.id}`}>
                <img src={ad.Image} alt='' title={ad.name} />
                // </NavLink>
          ))}
        </div>
        <p style={{ color: "brown", textAlign: "center",cursor:"pointer" }}>All details &#8650;</p>
      </div>

      <div className='foot'>
        <ul>
          <p>BookMyShow offers showtimes,<br /> movie tickets, reviews, trailers,<br /> concert tickets and events near <br />Mumbai.
            Also features promotional<br /> offers, coupons and mobile ...</p><br />
          <p>@2024 BookMyShow All Rights Reserved</p>
      </ul>
        <ul>
          <li style={{ fontSize: "1.2em",listStyle:"none" }}><b>Categories</b></li>
          <li>Ad's</li>
          <li>Booking Movies</li>
          <li>Telegast Festival</li>
          <li>Lanuage</li>
          <li>Area's</li>
          <li>States Varities</li>
        </ul>
        <ul>
          <li style={{ fontSize: "1.2em",listStyle:"none"}}><b>Support</b></li>
          <li>Help Center</li>
          <li>FAQ's</li>
          <li>Site Map</li>
          <li>Privacy Policy</li>
          <li>Terms of Services</li>
        </ul>
      </div>
      <div className='foot2'>
        <li><LocalFireDepartmentOutlinedIcon style={{ fontSize: '2.3em' }} /><br />Home</li>
        <li><OndemandVideoOutlinedIcon style={{ fontSize: '2.1em' }} /><br />Movies</li>
        <li><EmojiEventsOutlinedIcon style={{ fontSize: '2.1em' }} /><br />Events</li>
        <li><a href='/Profile' style={{textDecoration:"none",color:"#cccccc"}}>
          <Badge badgeContent={4} color="primary">
          <GroupAddOutlinedIcon style={{ fontSize: '2.1em' }} />
          </Badge>
          <br />Profile</a></li>
      </div>

    </>
  );
}

export default HomeMovie;
