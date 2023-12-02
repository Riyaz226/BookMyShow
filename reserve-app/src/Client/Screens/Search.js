import React from 'react'
import one from '../../Images/Agra.jpg'
import two from '../../Images/Bangolure.jpg'
import three from '../../Images/delhi.jpg'
import four from '../../Images/Goa.jpg'
import five from '../../Images/kolkatha.jpg'
import six from '../../Images/Mumbai.jpg'
import seven from '../../Images/Nodia.jpg'
import eight from '../../Images/Punjab.jpg'

function Search() {
    return (
        <>
            <div className='search'>
                <input type='text' placeholder='Search for your city' />
                <p style={{ color:"#7b7b7b",fontSize: "0.6em", paddingLeft: '32px', paddingTop: "7.5px" }}>Detect my location</p>
                <hr />
                <p style={{ color:"#7b7b7b",display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.61em", marginTop: "-9px" }}>Popular Cities</p>

                <div className='collect'>
                    <img src={one} alt='' title='Agra'/>
                    <img src={two} alt='' title='Bangolure'/>
                    <img src={three} alt='' title='delhi'/>
                    <img src={four} alt='' title='Goa'/>
                    <img src={five} alt='' title='kolkatha'/>
                    <img src={six} alt='' title='Mumbai'/>
                    <img src={seven} alt='' title='Nodia'/>
                    <img src={eight} alt='' title='Punjab'/>
                </div>
                  <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.60em", marginTop: "-9px",color:"#dc3558"}}>View All Cites</p>
                <div className='close'>
                  
                  <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.60em", marginTop: "-9px",color:"#dc3558"}}>Close</p>
                </div>
 
            </div>

        </>
    )
}

export default Search