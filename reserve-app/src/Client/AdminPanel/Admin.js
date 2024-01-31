/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Load from '../Loader/load'
import Load2 from '../Loader/load2'
import Table from 'react-bootstrap/Table'
import HouseIcon from '@mui/icons-material/House';
import './Style.css'

import Add from '../AdminPanel/Create'
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    {/* <Nav/> */}
    <a href='/home'><HouseIcon style={{fontSize:"1.8em"}}/></a>
      <h1 style={{ textAlign: "center" }} className='anim'><i>Admin Panel</i></h1>
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: '100%',
          border: 'none', 
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
          <Tab label="Users" style={{ border: "1px solid white" }} />
          <Tab label="Items" style={{ border: "1px solid white" }} />
          <Tab label="Add" style={{ border: "1px solid white" }} />
          <Tab label="His" style={{ border: "1px solid white" }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AllUsers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Show />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Add />
        </TabPanel>
        <TabPanel value={value} index={3}>
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
      alert("Remove Sucessfully😎")
      window.location.href='/admin'
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
              <th>bookCount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <Link to={`/cart/update/${item._id}`} className='btn btn-success'>
                    Edit
                  </Link>
                  <Link to="#" onClick={() => handleDelete(item._id)} className='btn btn-danger'>
                    Remove
                  </Link>
                  <Link to={`/city/movies/${item.name}/${item._id}`} className='btn btn-primary'>
                    Details
                  </Link>
                </td>
                <td>{item.currentbookings.length}</td>
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
          <span className="visually-hidden"><Load2 /></span>
        </div>
      ) : error ? (
        <h5>Error: {error.message}</h5>
      ) : (
        <div className='row' style={{backgroundColor:"rose"}}>
          <div className="col-md-12">
            <Table className='table table-dark table-bordered' id="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th><VisibilityIcon/></th>
                </tr>
              </thead>
              <tbody style={{ color: "black" }}>
                {users && Array.isArray(users) && users.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                   <td>{item.email}</td>
                    <td>{item.isAdmin ? 'Yes' : 'No'}</td>
                    <td>{item.visitCount}</td>
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
// BoHis.jsx
export function BoHis() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Id</th>
              <th>Date</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.date}</td>
                <td>{booking.movie}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

