import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import { Grid, Paper } from '@mui/material'
import { Link } from 'react-router-dom';
import Load from '../Loader/load'
import Table from 'react-bootstrap/Table'
import './Style.css'

import Add from '../AdminPanel/Create'
//import one from '../../Images/Agra.jpg'
import axios from 'axios'

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
      <h1 style={{ textAlign: "center" }} className='anim'><i>Admin Panel</i></h1>
      <Box sx={{ bgcolor: 'background.paper', width: 500, border: "none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="standard"
          aria-label="full width tabs example"
        >
          <Tab label="Users" style={{ border: "1px solid white" }} />
          <Tab label="Items" style={{ border: "1px solid white" }} />
          <Tab label="Add" style={{ border: "1px solid white" }} />
          <Tab label="His" style={{ border: "1px solid white" }} />
        </Tabs>
        <TabPanel value={value} index={0} >
          <AllUsers />
        </TabPanel>
        <TabPanel value={value} index={1} >
          <Show />
        </TabPanel>
        <TabPanel value={value} index={2} >
          <Add />
        </TabPanel>
        <TabPanel value={value} index={3} >
          <BoHis />
        </TabPanel>
      </Box>
    </>
  );
}

/*Show Movie Collection*/
export function Show() {
  const [data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setFilteredData(json.movies);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredData(data);
    } else {
      const filteredMovies = data.filter((item) =>
        item.Genre.includes(selectedGenre)
      );
      setFilteredData(filteredMovies);
    }
  }, [selectedGenre, data]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/movies/deleteMovieById/${movieId}`);
      console.log(response.data);
      alert(response.data)
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };
  return (
    <>
      <div className="select" id="fill">
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="crime">Crime</option>
          <option value="drama">Drama</option>
          <option value="horrer">Horrer</option>
          <option value="period">Period</option>
          <option value="romantic">Romantic</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ) : (
        <Table className='table table-dark table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Link to={`/cart/Update/${item._id}`} className='btn btn-success'>
                    Edit
                  </Link>
                  <Link to="#" onClick={() => handleDelete(item._id)} className='btn btn-danger'>
                    Remove
                  </Link>
                  <Link to={`/city/movies/${item._id}`} className='btn btn-primary'>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

/*All Users*/
export function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/users/getallUsers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setUsers(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load /></span>
        </div>
      ) : error ? (
        <h5>Error: {error.message}</h5>
      ) : (
        <div className='row'>
          <div className="col-md-12">
            <Table className='table table-dark table-bordered' id="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                </tr>
              </thead>
              <tbody style={{ color: "black" }}>
                {users && Array.isArray(users) && users.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                   <td>{item.email}</td>
                    <td>{item.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

/*Booking History*/

export function BoHis() {
  const paperStyle = {
    padding: 20, height: '45vh', width: "84vh", borderRadious: "22px"
  }
  return (
    <>
      {/* <Grid>
        <Paper elevation={10} style={paperStyle}>
          <b style={{ textAlign: "center" }}>Puspha</b>
          <div className='tic3' style={{ paddingLeft: "2px", fontSize: "15px !important" }}>
            <img src={one} alt="" id="booo" />
            <div className='tic4'>
              <p >user Id:</p>
              <p >movie Id:</p>
              <p>Date:</p>
              <p>Threater (or) Place</p>
              <p>Cost:</p>
              <p>Status:</p>
            </div>
          </div>

        </Paper>
      </Grid> */}
      <Table>
      <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Id</th>
              <th>Date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        
      </Table>
    </>
  )
}
