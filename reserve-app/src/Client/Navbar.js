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

import { NavLink } from 'react-router-dom'
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
          <NavLink to={'/explore/home/list'}>
            <input type="text" placeholder='Search For Movies Events Plays Sports and Activities' />
          </NavLink>
        </div>
        <div class='right'>
          <p onClick={handleShow2} style={{ cursor: "pointer" }}>Location</p>
          <button variant="primary" id="sign">
            {
              user ? (
                <>
                  <div class="dropdown show">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: "white", textDecoration: "None"}}>
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
          <a href="" style={{ textDecoration: "None", color: "#cccccc" }}><HiMagnifyingGlass class='gl' /></a>
          <p style={{ fontSize: "14px" }}>
            {
              user ? (
                <>
                  <div class="dropdown show">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: "white", textDecoration: "None" }}>
                      &#x1F600;{user.name}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a class="dropdown-item" href="/profile">Profile</a>
                      <a class="dropdown-item" href="/home" onClick={Logout}>Logout</a>
                    </div>
                  </div>
                </>
              ) : (
                <div onClick={handleShow} style={{ cursor: "pointer" }}>
                  Profile
                </div>
              )}

          </p>
          <GoBell class='gl2' />

        </div>
      </nav>
      <nav class="d-flex justify-content-around" id="sec-nav" style={{ paddingRight: "39px", cursor: "pointer", backgroundColor: "#222539", color: "white", paddingTop: "10px" }}>
        <div class="d-flex flex-row" style={{ color: "#cccccc", paddingRight: "23px" }}>
        <a href='/explore/home/list' style={{ textDecoration: "None", color: "#cccccc" }}><MdOutlineLocalMovies class="ad" /></a>
          <p>
            <a href="/explore/home/list" style={{ textDecoration: "None", color: "#cccccc" }}>Movies</a>
          </p>
          <a href="https://www.google.com/search?q=new+events+2024&sca_esv=595989641&rlz=1C1CHBF_enIN1015IN1015&sxsrf=AM9HkKkI3cocKQgNkq1y3c8n5DErXM_raQ%3A1704472119404&ei=Ny6YZZGpGNKs4-EP3tuxsA8&ved=0ahUKEwjRoNO51caDAxVS1jgGHd5tDPYQ4dUDCBA&uact=5&oq=new+events+2024&gs_lp=Egxnd3Mtd2l6LXNlcnAiD25ldyBldmVudHMgMjAyNDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5I4jZQiQZY0DRwAngBkAECmAGYA6AB5SCqAQowLjExLjcuMS4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBBAjGCfCAgsQABiABBiKBRiRAsICERAAGIAEGIoFGJECGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiABBgUGIcCGLEDwgILEAAYgAQYsQMYgwHCAhAQABiABBiKBRhDGLEDGIMBwgIKEAAYgAQYigUYQ8ICExAuGIAEGIoFGEMYsQMYgwEY1ALCAg4QABiABBiKBRiRAhixA8ICChAuGIAEGIoFGEPCAhAQLhiABBiKBRhDGLEDGIMBwgINEAAYgAQYigUYQxixA8ICDRAuGIAEGIoFGEMYsQPCAg4QABiABBiKBRixAxiDAcICDhAuGIAEGMcBGK8BGJgFwgILEC4YgAQYxwEYrwHiAwQYACBBiAYBkAYI&sclient=gws-wiz-serp" style={{ textDecoration: "None", color: "#cccccc" }}><SiCodestream style={{ fontSize: "21px" }} class="ad" /></a>
          <p>Stream</p>
          <TfiCup style={{ fontSize: "21px" }} class="ad" /><p>

            <a href="https://www.google.com/search?q=new+events+2024&sca_esv=595989641&rlz=1C1CHBF_enIN1015IN1015&sxsrf=AM9HkKkI3cocKQgNkq1y3c8n5DErXM_raQ%3A1704472119404&ei=Ny6YZZGpGNKs4-EP3tuxsA8&ved=0ahUKEwjRoNO51caDAxVS1jgGHd5tDPYQ4dUDCBA&uact=5&oq=new+events+2024&gs_lp=Egxnd3Mtd2l6LXNlcnAiD25ldyBldmVudHMgMjAyNDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5I4jZQiQZY0DRwAngBkAECmAGYA6AB5SCqAQowLjExLjcuMS4xuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBBAjGCfCAgsQABiABBiKBRiRAsICERAAGIAEGIoFGJECGLEDGIMBwgIIEAAYgAQYsQPCAg0QABiABBgUGIcCGLEDwgILEAAYgAQYsQMYgwHCAhAQABiABBiKBRhDGLEDGIMBwgIKEAAYgAQYigUYQ8ICExAuGIAEGIoFGEMYsQMYgwEY1ALCAg4QABiABBiKBRiRAhixA8ICChAuGIAEGIoFGEPCAhAQLhiABBiKBRhDGLEDGIMBwgINEAAYgAQYigUYQxixA8ICDRAuGIAEGIoFGEMYsQPCAg4QABiABBiKBRixAxiDAcICDhAuGIAEGMcBGK8BGJgFwgILEC4YgAQYxwEYrwHiAwQYACBBiAYBkAYI&sclient=gws-wiz-serp" style={{ textDecoration: "None", color: "#cccccc" }}>Events</a>

          </p>
          <BsMusicNoteList style={{ fontSize: "21px" }} class="ad" /> <p>
            <a href="https://www.google.com/search?q=new+events+2024+olympics&sca_esv=595989641&rlz=1C1CHBF_enIN1015IN1015&sxsrf=AM9HkKnYdB1evSSPG7D_ogdiReQLjDCkMQ%3A1704472240633&ei=sC6YZf6gI9iu4-EP76iA8Ag&oq=new+events+2024+&gs_lp=Egxnd3Mtd2l6LXNlcnAiEG5ldyBldmVudHMgMjAyNCAqAggAMgUQABiABDIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCRAAGBYYHhjJA0i94ANQvzdY378CcAN4AZABAZgB3SSgAetnqgEDOS0zuAEDyAEA-AEBwgIKEAAYRxjWBBiwA-IDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp" style={{ textDecoration: "None", color: "#cccccc" }}>
              Plays
            </a></p>
            <a href="https://www.youtube.com/results?search_query=sports+2024" style={{ textDecoration: "None", color: "#cccccc" }}><FcSportsMode style={{ fontSize: "21px" }} class="ad" /></a><p>
            <a href="https://www.youtube.com/results?search_query=sports+2024" style={{ textDecoration: "None", color: "#cccccc" }}>
              Sports
            </a></p>
          <VscLayoutActivitybarLeft style={{ fontSize: "21px" }} class="ad" id="on" /><p>Activaties</p>
          <SiTaxbuzz style={{ fontSize: "21px" }} class="ad" id="on" /><p>Buzz</p>
          <HiBars3 style={{ fontSize: "25px" }} class="ad" />
          <p class="bo1" style={{ fontSize: "12px", color: "white" }}><i>*ICC MENS'S CRICKET WORLD CUP INDIA 2023</i></p>
        </div>

        <div class="d-flex flex-row" id="tw" style={{ paddingLeft: "52px" }}>
          <p><a href='https://www.youtube.com/results?search_query=lifeyour+show+in+2024' style={{textDecoration:"none",color:"white"}}>ListYourShow</a></p>
          <p>Corporate</p>
          <p>Offer</p>
          <p class="bo1">Gift Cards</p>
        </div>

      </nav>
      <Modal show={show} onHide={handleClose} className='Modal' id="mo">
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

      <Modal show={show2} id="mo2">
        <Modal.Title>
          <Search show={show2} handleClose={handleClose2} />
        </Modal.Title>
      </Modal>
</>
  )
}

export default Navbar