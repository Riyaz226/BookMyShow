/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu';
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action'
import { DLT } from '../redux/actions/action';

import ads from '../../Json/ads.json';
import Load from '../Loader/load'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Style.css';

function HomeMovie() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.movies);
        setLoading(false);
      });
  }, [])


  const getdata = useSelector((state) => state.cartreducer.carts)

  const dispatch = useDispatch();

  const send = (ad) => {
    dispatch(ADD(ad))
  }

  const dlt = (id) => {
    dispatch(DLT(id))
  }

  const [price, setPrice] = useState(0)
  console.log(price)

  const total = () => {
    let price = 0;
    getdata.map(function (ad) {
      price = ad.Price + price;
    });
    setPrice(price)
  }

  useEffect(() => {
    total()
  }, [total])


  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1336,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        }
      },
      {
        breakpoint: 998,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 714,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 698,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
  };
  
  return (
    <>
      <div className="roll">
        <h3 id="off" style={{ paddingLeft: "18px" }}>Movies</h3>
        <p id="off2"><a href="/explore/home/list" style={{ textDecoration: "none", color: "brown" }}>See All &#8594;</a></p>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden"><Load /></span>
          </div>
        ) : (
          <Slider {...settings} classNmae="df">
            {data.map((movie) => (
              <div key={movie._id} className='dfr'>
                <NavLink to={`/city/movies/${movie.name}/${movie._id}/ET00311489`}>
                  <img src={movie.MovieIcon[0]} alt="" className='img' />
                </NavLink>

                <div className="deta">
                  <p style={{ wordSpacing: "83px" }}>&#x2B50;</p>
                  <p style={{ marginTop: "-5px" }}>{movie.name}</p>
                  <p>{movie.Genre.join('/')}</p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className='container mt-3'>
        <h3 style={{ paddingLeft: "18px" }}><MapOutlinedIcon style={{ fontSize: "1em" }} />The Best Events This Week</h3>
        <p style={{ paddingLeft: "18px" }}>Live events for all your entertainment needs</p>

        <div className="row d-flex justify-content-center align-items-center">
          {
            ads.map((element, id) => {
              return (
                <>
                  <Card style={{ width: '22rem', border: "none" }} id="ADS" className="mx-2 mt-1 card_style">
                    <Card.Img variant="top" src={element.Image} onClick={() => send(element)} style={{ width: "18rem", height: "11rem", cursor: "pointer", borderRadious: "12px" }} className="mt-3" />
                    <Card.Body>
                      <Card.Title>{element.name}</Card.Title>
                      <Card.Text>
                        Price : ₹ {element.Price}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </>
              )
            })
          }

        </div>
      </div>

      <div className='foot'>
        <ul>
          <p>BookMyShow offers showtimes,<br /> movie tickets, reviews, trailers,<br /> concert tickets and events near <br />Mumbai.
            Also features promotional<br /> offers, coupons and mobile ...</p><br />
          <p>@2024 BookMyShow All Rights Reserved</p>
        </ul>
        <ul>
          <li style={{ fontSize: "1.2em", listStyle: "none" }}><b>Categories</b></li>
          <li>Ad's</li>
          <li>Booking Movies</li>
          <li>Telegast Festival</li>
          <li>Lanuage</li>
          <li>Area's</li>
          <li>States Varities</li>
        </ul>
        <ul>
          <li style={{ fontSize: "1.2em", listStyle: "none" }}><b>Support</b></li>
          <li>Help Center</li>
          <li>FAQ's</li>
          <li>Site Map</li>
          <li>Privacy Policy</li>
          <li>Terms of Services</li>
        </ul>
      </div>
      <div className='foot2'>
        <li>
          <a href='/' style={{ textDecoration: "none", color: "#cccccc" }}>
            <LocalFireDepartmentOutlinedIcon style={{ fontSize: '2.3em' }} />
            <br />
            Home
          </a>
        </li>
        <li>
          <Badge badgeContent={getdata.length} color="secondary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <EmojiEventsOutlinedIcon style={{ fontSize: '2.1em', cursor: "pointer" }} />
          </Badge>
          <br />
          Events</li>

        <li><a href='https://www.google.com/search?q=new+movies+all+2024&rlz=1C1CHBF_enIN1015IN1015&oq=new+movies+all+2024&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQABgNGIMBGLEDGIAEMg8IAhAAGA0YgwEYsQMYgAQyCQgDEAAYDRiABDIJCAQQABgNGIAEMgkIBRAAGA0YgAQyCQgGEAAYDRiABDIJCAcQABgNGIAEMgkICBAAGA0YgAQyCQgJEAAYDRiABNIBCDk3OTRqMWo3qAIAsAIA&sourceid=chrome&ie=UTF-8#wxpd=browse:true' style={{ textDecoration: "none", color: "#cccccc" }}>
          <OndemandVideoOutlinedIcon style={{ fontSize: '2.1em' }} />
          <br />Movies</a></li>
        <li><a href='/Profile' style={{ textDecoration: "none", color: "#cccccc" }}>

          
            {/* <Badge badgeContent={bookings.length} color="primary"> */}
              <GroupAddOutlinedIcon style={{ fontSize: '2.1em' }} />
            {/* </Badge> */}
          <br />Profile</a></li>


        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          {
            getdata.length ?
              <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getdata.map((ad) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <NavLink to={`/explore/Ads/${ad.id}`} onClick={handleClose}>
                                  <img src={ad.Image} style={{ width: "5.5rem", height: "5rem" }} alt="" />
                                </NavLink>
                              </td>
                              <td>
                                <p>{ad.name}</p>
                                <p>Price : ₹{ad.Price}</p>
                                <p>Quantity : {ad.qnty}</p>
                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(ad.id)}>
                                  <DeleteIcon id="del2" />
                                </p>
                              </td>

                              <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(ad.id)}>
                                <DeleteIcon id="del1" />
                              </td>
                            </tr>
                          </>
                        )
                      })
                    }
                    <p className='text-center'>Total :₹ {price}</p>
                  </tbody>
                </Table>
              </div> :

              <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                <CloseIcon
                  onClick={handleClose}
                  style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} />
                <p style={{ fontSize: 22 }}>Your carts is empty</p>
              </div>
          }

        </Menu>

      </div>

    </>
  );
}

export default HomeMovie;
