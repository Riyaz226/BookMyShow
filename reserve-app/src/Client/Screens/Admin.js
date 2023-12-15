import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Add from '../AdminPanel/Create'
import Show from '../AdminPanel/show'
import Users from '../AdminPanel/Allusers'
import Booking from '../AdminPanel/BoHis'

import './Style.css'
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

export default function Admin() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
  <>
  <h1 style={{textAlign:"center"}} className='anim'><i>Admin Panel</i></h1> 
    <Box sx={{ bgcolor: 'background.paper', width: 500,border:"none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="Users" style={{border:"1px solid white"}}/>
          <Tab label="Items" style={{border:"1px solid white"}} />
          <Tab label="Add" style={{border:"1px solid white"}}/>
          <Tab label="His" style={{border:"1px solid white"}}/>
        </Tabs>
        <TabPanel value={value} index={0} >
        <Users/>
        </TabPanel>
        <TabPanel value={value} index={1} >
         <Show/>
        </TabPanel>
        <TabPanel value={value} index={2} >
        <Add/>
       </TabPanel>
       <TabPanel value={value} index={3} >
        <Booking/>
       </TabPanel>
</Box>
 </>
  );
}