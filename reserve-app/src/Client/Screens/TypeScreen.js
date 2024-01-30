import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Load from '../Loader/load'
import { useParams } from 'react-router-dom';
import theaterData from '../../Json/States.json';
import soo from '../../Json/Coming.json';
import page from '../../Images/page.jpg'
import HouseIcon from '@mui/icons-material/House';
import Nav from '../Navbar';
import './Style.css';

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
    <Nav/>
    <a href='/home'><HouseIcon style={{fontSize:"1.8em"}}/></a>
    
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="MOVIES" />
          <Tab label="CINEMAS" />
          <Tab label="COMING🎬" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Movie />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Cinema />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Soon />
        </TabPanel>
      </Box>
    </>
  );
}

/*Movie See*/
export function Movie() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredMovies = selectedLanguage === 'All' ? data : data.filter(item => item.Language.includes(selectedLanguage));

  return (
    <>
      <div className="select">
        <p>Filter:</p>
        <select onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="All">All</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Telghu">Telghu</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ) : (
        <div className="select2">
          {filteredMovies.map((item, index) => (
            <ul key={index}>
              <li style={{ listStyle: "circle" }}>
                <p>{item.name}({item.Certificate})😊{item.Rating}%</p>
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}

/* Cinema*/
export function Cinema() {
  const { district_name } = useParams();

  // Assuming theaterData is imported correctly
  const district = theaterData && theaterData.states
    ? theaterData.states.find(
        (state) =>
          state.districts &&
          state.districts.some(
            (district) => district.district_name === district_name
          )
      )
    : undefined;

  console.log('District:', district);

  return (
    <div>
      <h3 style={{textAlign:"center"}}>Theaters in {district_name}</h3>
      <br/>
      {district ? (
        <ul style={{listStyleType:"upper-roman"}}>
          {district.districts.map((district) =>
            district.district_name === district_name ? (
              district.theaters.map((theater, index) => (
                <li key={index}>
                  <h5>{theater.theater_name}</h5>
                  <p>Location: <a href={`https://www.${theater.theater_name}${theater.location}.com`}>{theater.location}</a></p>
                  <p>Screens: {theater.screens}</p>
                </li>
              ))
            ) : null
          )}
        </ul>
      ) : (
        <p>No theaters found for {district_name}</p>
      )}
    </div>
  );
}

/*Soon*/
export function Soon() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    const filteredData = soo.filter(item => item.Language.includes(language));
    setFilteredItems(filteredData);
  };


  return (
    <>
      <div>
        {soo.reduce((acc, curr) => {
          curr.Language.forEach(lang => {
            if (!acc.includes(lang)) {
              acc.push(lang);
            }
          });
          return acc;
        }, []).map((language, index) => (
          <button key={index} onClick={() => handleLanguageClick(language)} id="fi2">{language}</button>

        ))}
      </div>

      <div className="s1" style={{ marginTop: "14px", backgroundColor: "rose" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index}>
          <a href={`http://www.${item.name}.com`} target="_blank" style={{cursor:"pointer"}}><img src={item.image} alt="" /></a>
              <p style={{ wordSpacing: "5px", paddingLeft: "35px", marginTop: "10px", backgroundColor: "#e5e5e5", color: "Black", borderRadius: "11px" }}>
                &#x1F44D;{item.like}<i style={{ paddingLeft: "28px" }}>{item.Release}</i>
              </p>
              <p style={{ fontSize: "18px", marginTop: "-6px" }}>{item.name}</p>
              <p style={{ fontSize: "15px", marginTop: "-13px" }}>{item.Genre}</p>
            </div>
          ))
        ) : (
          <>
            <img src={page} alt='' id="fi3" />
          </>
        )}
      </div>
    </>
  );

}
