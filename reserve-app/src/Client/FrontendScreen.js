import React from 'react'
import {Link} from 'react-router-dom'
import '../index.css'

function FrontendScreen() {
  return (
    <>
    <div className='landing'>
        <div className='text-center' style={{borderRight:"5px solid white"}}>
            <h2 id="h21" className='typewriter'>
              book<i style={{borderRadius:"17px",border:"1px solid red",width:"123px",height:"13px",backgroundColor:"white",color:"red"}}>my</i>show
              </h2>
         <h5 id="h22">"it All Starts Here</h5>
            <Link to='/home'>
                <button className='btn landingbtn' style={{color:"black"}}>Get Started</button>
            </Link>
        </div>
    </div>
    </>
  )
}

export default FrontendScreen;