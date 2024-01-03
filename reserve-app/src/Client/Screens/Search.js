import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import one from '../../Images/Agra.jpg'
import two from '../../Images/Bangolure.jpg'
import three from '../../Images/delhi.jpg'
import four from '../../Images/Goa.jpg'
import five from '../../Images/kolkatha.jpg'
import six from '../../Images/Mumbai.jpg'
import seven from '../../Images/Nodia.jpg'
import eight from '../../Images/Punjab.jpg'
import nine from '../../Images/Mysore.jpg'
import ten from '../../Images/Andhra.jpg'

import data from '../../Json/States.json'

function Search({ show, handleClose }) {
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
    };
    const handleShow2 = () => {
        setShow2(true);
    };

    const [selectedState, setSelectedState] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    
    const handleStateSelect = (event) => {
        const stateName = event.target.value;
        setSelectedState(stateName);

        const selected = data.states.find((state) => state.state === stateName);
        setSelectedDistricts(selected ? selected.districts : []);
    };

    return (
        <>
            {show && (

                <div className='search'>
                    <CloseIcon style={{ color: "brown", float: "right", fontSize: "0.85em", marginRight: "10px", cursor: "pointer" }} onClick={handleClose} className="er" />
                    <select value={selectedState} onChange={handleStateSelect} >
                        <option value="">Select a State</option>
                        {data.states.map((state, index) => (
                            <option key={index} value={state.state}>
                                {state.state}
                            </option>
                        ))}
                    </select>
                    <p style={{ color: "#7b7b7b", fontSize: "0.6em", paddingLeft: '15px', paddingTop: "7.5px", cursor: "pointer" }}><MyLocationIcon style={{ fontSize: "1.5em", paddingTop: "5.5px", cursor: "pointer" }} />Detect my location</p>
                    <hr />
                    <p style={{ color: "#7b7b7b", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.61em", marginTop: "-9px" }}>Popular Cities</p>

                    <div className='collect'>
                        <img src={one} alt='' title='Agra' />
                        <img src={two} alt='' title='Bangolure' />
                        <img src={three} alt='' title='delhi' />
                        <img src={four} alt='' title='Goa' />
                        <img src={five} alt='' title='kolkatha' />
                        <img src={six} alt='' title='Mumbai' />
                        <img src={seven} alt='' title='Nodia' />
                        <img src={eight} alt='' title='Punjab' />
                        <img src={nine} alt='' title='Mysore'/>
                        <img src={ten} alt='' title='Andhra'/>

                    </div>
                    <br />
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '0.60em',
                            marginTop: '-9px',
                            color: '#dc3558',
                            cursor: 'pointer',
                        }}
                        onClick={handleShow2}
                    >
                        View All Cities
                    </p>
                    <div className='close' style={{ display: show2 ? 'block' : 'none' }}>
                        {selectedState && (
                            <div>
                                <ul id="dis">
              {selectedDistricts.map((district, index) => (
                <li key={index}>
                  <NavLink to={`/explore/home/${district.district_name}`}>
                    {district.district_name}
                  </NavLink>
                </li>
              ))}
            </ul>
                            </div>
                        )}
                        <p
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '0.60em',
                                marginTop: '-6px',
                                color: '#dc3558',
                                cursor: 'pointer',
                            }}
                            onClick={handleClose2}>
                            Close
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Search