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
      <input type="text" placeholder="Search.." id="la" />
      <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
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
        <TabPanel value={value} index={0} >
          <Movie />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Cinema />
        </TabPanel>
        <TabPanel value={value} index={2} >
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

  const district = theaterData && theaterData.districts
    ? theaterData.districts.find(
      (district) => district.district_name === district_name
    )
    : undefined;

  return (
    <div>
      <h2>Theaters in {district_name}</h2>
      {district ? (
        <ul>
          {district.theaters.map((theater, index) => (
            <li key={index}>
              <h3>{theater.theater_name}</h3>
              <p>Location: {theater.location}</p>
              <p>Screens: {theater.screens}</p>
            </li>
          ))}
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

      <div className="s1" style={{ marginTop: "14px" }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt="" />
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
