import React, { useState, useEffect } from 'react';
import { BiSolidStar } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

function CommandSec() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [command, setCommand] = useState('');
  const [range, setRating] = useState(0);
  const [voting, setVoting] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = (await axios.post(' http://localhost:5000/api/movies/getMovieById', { movieId })).data;
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleOptionClick = (value) => {
    if (selectedOptions.length < 5) {
      setSelectedOptions(prevOptions => [...prevOptions, value]);
    } else {
      console.log('Reached maximum limit');
    }
  };
  const handleIncrement = () => {
    setVoting(voting + 1);
  };

  const handleDecrement = () => {
    if (voting > 0) {
      setVoting(voting - 1);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('currentUser'));


    if (user && user.name) {
      const { name } = user;

      const addCommandData = {
        movie,
        user: name,
        command,
        range,
        voting,
        selectedOptions,
      };

      try {
        const result = await axios.post(" http://localhost:5000/api/command/addCommand", addCommandData);
        console.log(result.data);
        alert(result.data);
        window.location.href=`/city/movies/${movie.name}/${movie._id}`
       }catch (error) {
        console.log(error);
        alert("Error occurred while adding command. Please try again.");
      }
    } else {
      console.log('User data not found in localStorage');
      alert("User data not found. Please log in.");
    }
  };



  return (
    <>
      <div className='command'>
        <h2>REVIEWS</h2>
        <p className="d-r"><BiSolidStar className="i8" />{range}/10<b style={{ paddingLeft: "20px" }}>{voting}Votes&#8594;</b></p>
        <p>{movie?.name}</p>
      </div>
      <hr />
      <div className='command2'>
        <p>User reviews({voting})</p>
        <div className="b7">
          <h3>Add your rating & review <br /><p>Your ratings matter</p> </h3>
          <p className='p'>Rate now</p>
        </div>
        <form>
          <h5 style={{ marginTop: "7px" }}>Summary of reviews.</h5><br />
          <div className="val">
           <p id="click" onClick={() => handleOptionClick("Blockbuster")}>Blockbuster</p>
           <p id="click" onClick={() => handleOptionClick("SuperDirection")}>SuperDirection</p>
            <p id="click" onClick={() => handleOptionClick("GreatActing")}>GreatActing</p>
            <p id="click" onClick={() => handleOptionClick("Rocking")}>Rocking</p>
            <p id="click" onClick={() => handleOptionClick("Awesome")}>Awesome</p>
            <p id="click" onClick={() => handleOptionClick("Verypoor")}>Verypoor</p>
            <p id="click" onClick={() => handleOptionClick("Unbelievable")}>Unbelievable</p>
            <p id="click" onClick={() => handleOptionClick("OneTimeWatch")}>OneTimeWatch</p>
          </div>
          <div className="val2">
            <h6>Votes:</h6>
            <p id="click" onClick={handleIncrement}>Increment</p>
            <p id="click" onClick={handleDecrement}>Decrement</p>
          </div>
          <h5 style={{ marginTop: "9px" }}>Most helpful reviews</h5>
          <h6>Range:</h6>
          <input
            type="range"
            min="0"
            max="10"
            value={range}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <br />
          <textarea
            type="text"
            rows={7}
            cols={43}
            style={{ borderRadius: "12px" }}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Write your review..."
          /><br />
          <button className='btn landingbtn' onClick={handleSubmit} style={{fontSize:"15px", width: "156px", cursor: "pointer", borderRadius: "2px",border:"none",fontFamily:"Raleway"}}>Submit Reviews</button>
      </form>
      </div>
    </>
  );
}

export default CommandSec;