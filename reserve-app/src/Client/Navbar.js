/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { HiBars3, HiMagnifyingGlass } from 'react-icons/hi2';
import { GoBell } from 'react-icons/go'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { SiCodestream, SiTaxbuzz } from 'react-icons/si'
import { TfiCup } from 'react-icons/tfi'
import { BsMusicNoteList } from 'react-icons/bs'
import { FcSportsMode } from 'react-icons/fc'
import { VscLayoutActivitybarLeft } from 'react-icons/vsc'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch';

import {NavLink } from 'react-router-dom'
import one from '../Images/logo.png'

import '../index.css'
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import Search from './Screens/Search'

function Navbar() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  const user = JSON.parse(localStorage.getItem('currentUser'));
  function Logout() {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }

  return (
    <>
      <nav class="navbar">
        <div class="left">
          <img src={one} alt="" />
          <NavLink to={'/explore/home/:city'}>
            <input type="text" placeholder='Search For Movies Events Plays Sports and Activities' />
          </NavLink>
        </div>
        <div class='right'>
          <p onClick={handleShow2} style={{ cursor: "pointer" }}>Location</p>
          <button variant="primary">
            {
              user ? (
                <>
               <div class="dropdown show">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"white",textDecoration:"None"}}>
                    {user.name}
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                      <a class="dropdown-item" href="/profile">Profile</a>
                      <a class="dropdown-item" href="/" onClick={Logout}>Logout</a>
                    </div>
                  </div>
                </>
              ) : (
                <div onClick={handleShow}>
                  Sign In
                </div>
              )}

          </button>
          <HiBars3 class='i' />
        </div>

      <div class="left2">
          <h4>It All Starts Here!</h4>
          <p style={{ cursor: "pointer" }} onClick={handleShow2}>Location</p>
        </div>
        <div class="right2">
        <a href="/explore/home/:city" style={{textDecoration:"None",color:"#cccccc"}}><HiMagnifyingGlass class='gl' /></a>
            <p style={{ fontSize: "14px" }}>
          {
              user ? (
                <>
               <div class="dropdown show">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"white",textDecoration:"None"}}>
                    &#x1F600;{user.name}
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="/profile">Profile</a>
                      <a class="dropdown-item" href="/" onClick={Logout}>Logout</a>
                    </div>
                  </div>
                </>
              ) : (
                <div onClick={handleShow} style={{cursor:"pointer"}}>
                  Profile
                </div>
              )}

            </p>
          <GoBell class='gl2' />

        </div>
      </nav>
      <nav class="d-flex justify-content-around" id="sec-nav" style={{ paddingRight: "39px", cursor: "pointer", backgroundColor: "#222539", color: "white", paddingTop: "10px" }}>
        <div class="d-flex flex-row" style={{ color: "#cccccc", paddingRight: "23px" }}>
          <MdOutlineLocalMovies class="ad" /><p>
            <a href="/explore/home/:city" style={{textDecoration:"None",color:"#cccccc"}}>Movies</a>
            </p>
          <SiCodestream style={{ fontSize: "21px" }} class="ad" /><p>Stream</p>
          <TfiCup style={{ fontSize: "21px" }} class="ad" /><p>Events</p>
          <BsMusicNoteList style={{ fontSize: "21px" }} class="ad" /> <p>Plays</p>
          <FcSportsMode style={{ fontSize: "21px" }} class="ad" /> <p>Sports</p>
          <VscLayoutActivitybarLeft style={{ fontSize: "21px" }} class="ad" id="on" /><p>Activaties</p>
          <SiTaxbuzz style={{ fontSize: "21px" }} class="ad" id="on" /><p>Buzz</p>
          <HiBars3 style={{ fontSize: "25px" }} class="ad" />
          <p class="bo1" style={{ fontSize: "12px", color: "white" }}><i>*ICC MENS'S CRICKET WORLD CUP INDIA 2023</i></p>
        </div>

        <div class="d-flex flex-row" id="tw" style={{ paddingLeft: "52px" }}>
          <p>ListYourShow</p>
          <p>Corporate</p>
          <p>Offer</p>
          <p class="bo1">Gift Cards</p>
        </div>

      </nav>
      <Modal show={show} onHide={handleClose} className='Modal'>
        <Modal.Title>
          {checked ? (
            <Chip icon={<FaceIcon />} label="SignIn" color="primary" variant="outlined" style={{ marginLeft: "202px" }} />
          ) : (
            <Chip icon={<LockIcon />} label="Login" color="primary" variant="outlined" style={{ marginLeft: "202px" }} />
          )}
          <br />
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <br />
          {checked ? (
            <RegisterScreen />
          ) : (
            <LoginScreen />
          )}
        </Modal.Title>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2}>
        <Modal.Title>
          <Search show={show2} handleClose={handleClose2} />
        </Modal.Title>
      </Modal>
    </>
  )
}

export default Navbar