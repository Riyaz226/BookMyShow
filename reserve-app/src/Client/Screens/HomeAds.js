import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import './Style.css';

function HomeScreen2() {
  const paperStyle = {
    padding: 20,
    height: '54vh',
    width: '94vh',
    borderRadius: '22px',
   marginLeft:'362px',
   marginTop:'14px'
  };

  const { id } = useParams();

  function handleClick() {
    alert('Your Event Received');
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className='tic6' style={{ paddingLeft: '2px', fontSize: '15px !important'}}>
          <div className='tic7'>
            <p>Name: {id}</p>
            <p>Place</p>
            <p>Total:</p>
            <p>Place:</p>
            <p>Information:</p>
            <p>Rating:</p>
            <p>Quantity:</p>
            <button onClick={handleClick} style={{width:"137px",marginLeft:"38px",cursor:"pointer"}}>Click Me</button>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default HomeScreen2;
