import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile from '../Screens/Profile'
import Bookings from '../Screens/Bookings'

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

export default function History() {
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
          <Tab label="Bookings" style={{border:"1px solid whitesmoke",}} />
        </Tabs>
       <TabPanel value={value} index={0} >
        <Profile/>
       </TabPanel>
       <TabPanel value={value} index={1} >
        <Bookings/>
        </TabPanel>
</Box>
 </>
  );
}