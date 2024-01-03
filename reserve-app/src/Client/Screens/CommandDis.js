/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiSolidStar } from 'react-icons/bi';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import axios from 'axios'
import './Style.css'


function CommandDis() {
  const [comm, setCommand] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/command/getAllCommands');
        const data = response.data;
        console.log(data);
        setCommand(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className='eve'>
      {comm.map((com) => (
        <div className="recieve">
          <p id="rec1"> <AccountCircleIcon id="i9" /><i>{com.user}</i></p>
          <p id="rec2"><BiSolidStar className="i10" style={{ color: "red", fontSize: "19px" }} />{com.range}/10</p>
          <b id="rec3">#{com.selectedOption}</b>
          <h6 id="rec4">{com.command}</h6>
          <p id="rec5"><ThumbUpOffAltIcon/>{com.voting}<ThumbDownOffAltIcon/></p>
        </div>
      ))}
     </div> 
    </>
  );
}

export default CommandDis;
