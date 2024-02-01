/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiSolidStar } from 'react-icons/bi';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from 'axios'
import './Style.css'


function CommandDis({movieId}) {
  const [comm, setComm] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = (await axios.post('/api/movies/getMovieById', { movieId: movieId })).data;
        setComm(data.reviews); 
        console.log(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <>
    <div className='eve'>
        {comm.map((com) => (
          <div className="recieve" key={com.id}>
            <p id="rec1"> <AccountCircleIcon id="i9" /><i>{com.user}</i></p>
            <p id="rec2"><BiSolidStar className="i10" style={{ color: "red", fontSize: "19px" }} />{com.range}/10</p>
            <b id="rec3">#{com.selectedOptions.join('#')}</b>
            <h6 id="rec4">{com.command}</h6>
            <p id="rec5"><ThumbUpOffAltIcon/>{com.voting}<ThumbDownOffAltIcon/></p>
            <p id="rec6">{com.uploadTime}</p>
         </div>
        ))}
      </div> 
    </>
  );
}

export default CommandDis;
