import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import {Grid,Paper} from '@mui/material'

import one from '../../Images/Agra.jpg'
import two from '../../Images/qrcode.jpg'

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
   <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="Profile" style={{border:"1px solid whitesmoke"}}/>
          <Tab label="Tickets" style={{border:"1px solid whitesmoke",}} />
        </Tabs>
       <TabPanel value={value} index={0} >
        <User/>
       </TabPanel>
       <TabPanel value={value} index={1} >
        <Ticket/>
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
      window.location.href = '/Lo';
    }
  }, [user]);
  if (!user) {
    return null; 
  }
const paperStyle={
  padding:20,height:'38vh',width:"58vh"
}
  return (
    <>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
      <div className='' style={{paddingLeft:"18px",fontSize:"15px !important"}}>
       <AccountCircleIcon style={{fontSize:"50px"}}/>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>isAdmin:</b> {user.isAdmin ? 'Yes' : 'No'}</p>
        <div className='text-right'>
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
    padding: 20, height: '114vh', width: "58vh",borderRadious:"22px"
  }
  return (
<>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <div className='tic' style={{ marginLeft:"-4px", fontSize: "15px !important" }}>
          <img src={one} alt="" id="booo"/>
          <div className='tic2'>
            <b style={{fontSize:"18px"}}>Salaar: Cease Fire-Part <br/>1(Tamil)</b>
            <p>Tamil,2D</p>
            <p style={{marginTop:"-16px",fontSize:"14px",wordSpacing:"2px"}}>Sat,23 Dec | 10:50 AM</p>
            <p style={{marginTop:"-16px",fontSize:"14px",wordSpacing:"1px"}}>Megaster Cinemas:Premium Large <br/>Format (PLF) ATMOS</p>
            <p id="full">Tap to hide details</p>  
            <br/>
         </div>
        </div>
       <div className="re"> 
        <p style={{marginLeft:"46px",fontSize:"15px"}}>10Ticket(s)</p>
            <h3 style={{marginLeft:"-7px",fontSize:"18px",marginTop:"-7px"}}>MEGASTAR CINEMAS</h3>
            <p style={{marginLeft:"21px",fontSize:"14px"}}>SOFA-C10,C11,C12</p>
            <img src={two} alt=''/>
            <p id="i12"><AddIcCallIcon/>contact support</p>
            <p id="full2">cancellation not available for this venue</p>  
            <hr/>

            <b style={{marginLeft:"-63px",fontSize:"16px"}}>Total Amount </b>
            <p  style={{marginLeft:"-62px"}}>Ticket Price()</p>
            <p  style={{marginLeft:"-62px"}}>Convenices fees</p>
            <p  style={{marginLeft:"-62px"}}>Discount</p>
       </div>  
      </Paper>
    </Grid>
    </>
  )
}
