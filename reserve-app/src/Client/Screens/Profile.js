/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Paper } from '@mui/material'
import QRCode from 'react-qr-code';
import Load from '../Loader/load'
import Load2 from '../Loader/load2'
import axios from 'axios'
import HouseIcon from '@mui/icons-material/House';
import Nav from '../Navbar'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
<Nav/>    
    <a href='/home'><HouseIcon style={{fontSize:"1.8em",color:"black"}}/></a>
    
      <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="Profile" style={{ border: "1px solid whitesmoke" }} />
          <Tab label="Tickets" style={{ border: "1px solid whitesmoke", }} />
        </Tabs>
        <TabPanel value={value} index={0} >
          <User />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Ticket />
        </TabPanel>
      </Box>
    </>
  );
}

/*User Detail */
export function User() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);
  if (!user) {
    return null;
  }
  const paperStyle = {
    padding: 20, height: '100%', width: "70%"
  }
  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <div className='' style={{ paddingLeft: "18px", fontSize: "15px !important" }}>
            <AccountCircleIcon style={{ fontSize: "50px" }} />
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>isAdmin:</b> {user.isAdmin ? 'Yes' : 'No'}</p>
            <div className='text-right' style={{ cursor: "pointer" }}>
              <button class='btn btn-primary'>Admin Access</button>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );

}

/*Tickets*/
export function Ticket() {

  const paperStyle = {
    padding: 20, height: '100%', borderRadious: "22px"
  }
  const handleDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-ticket.jpg';
    link.click();
  };
  
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [bookings, setbookings] = useState([])
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', { userid: user._id });
      setbookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user._id]);

  async function cancelBooking(bookingid, movieid) {
    try {
      const result = await axios.post('http://localhost:5000/api/bookings/cancelbooking', { bookingid, movieid });
      console.log(result.data); 
      alert('Your booking is cancelled');
      window.location.href='/Profile'
     } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div style={{overflowX:"scroll"}}>
    <div id="pop">
  {loading ? (
    <div className="spinner-border" role="status">
      <span className="visually-hidden"><Load2 /></span>
    </div>
  ) : (
    bookings.map((item) => (
      <>
        <Grid>
          <Paper elevation={10} style={paperStyle} id="paper4">
            <div className='tic' style={{ marginLeft: "-4px", fontSize: "15px !important" }}>
              <img src={item.bookImg} alt="" id="booo" />
              <div className='tic2'>
                <b style={{ fontSize: "18px" }}>{item.movie}<br />({item.language})</b>
                <p style={{ color: "#b8b8b8" }}>{item.language},{item.screen}</p>
                <p style={{ marginTop: "-16px", fontSize: "14px", wordSpacing: "2px", color: "#b8b8b8" }}>{item.date}| {item.time}</p>
                <p style={{ marginTop: "-16px", fontSize: "14px", wordSpacing: "1px", color: "#b8b8b8" }}>{item.theater}</p>
                <p id="full">
                  {item.status == 'booked' ? 'CONFIRMED' : "CANCELLED"}</p>
                <br />
              </div>
            </div>
            <div className="re">
              <p style={{ marginLeft: "0px", fontSize: "16px", color: "#b8b8b8" }}>{item.selectedSeats.length}Ticket(s)</p>
              <p style={{ fontSize: "16px" }}>{item.theater}</p>
              <p style={{ marginLeft: "0px", fontSize: "17px", color: "#b8b8b8" }}>Elite-{item.selectedSeats.join(',')}</p>
              {item.status === 'booked' && (
                <>
                  <p>
                    <QRCode value={JSON.stringify({
                      bookingId: item._id,
                      date: item.date,
                      time: item.time,
                      theater: item.theater,
                      seats: item.selectedSeats,
                      language: item.language,
                      paymentAmount: item.paymentAmount,
                      status: 'booked'
                    })} />
                  </p><br /><b style={{ fontSize: "18px" }}>ID:{item._id}</b>
                </>
              )}
              <p id="i12"><AddIcCallIcon />contact support</p>
              <p id="full2" onClick={() => cancelBooking(item._id, item.movieid)}>
                Cancelation Available
              </p>
              <hr />
              <div style={{ backgroundColor: "#e5e5e5" }}>
                <p id="vb1"><b style={{ fontSize: "16px" }}> Total Amount <b id="qw">Rs.{item.paymentAmount}</b></b></p>
                <p id="vb2" style={{ color: "#b8b8b8" }}>Ticket Price({item.selectedSeats.length}) <p id="qw1">Rs.{item.seatRate * item.selectedSeats.length}</p></p>
                <p id="vb2" style={{ color: "#b8b8b8" }}>Convenices fees <p id="qw1">Rs.{item.convenienceFee}</p></p>
                <p id="vb2" style={{ color: "#b8b8b8" }}>Discount <p id="qw1">-Rs.0.00</p></p>
              </div>
            </div>
            <div style={{ display: "flex", paddingLeft: "10px", color: "red" }} id="do">
              <DeleteIcon style={{ cursor: "pointer" }} />
              <DownloadIcon onClick={() => handleDownload(item.bookImg)} style={{ color: "black", cursor: "pointer" }}>Download Ticket</DownloadIcon>
            </div>
          </Paper>
        </Grid>
      </>
    ))
  )}
</div>
</div>
    </>
  )
}