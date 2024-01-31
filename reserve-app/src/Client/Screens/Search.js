import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import './Style.css'
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
                    <select value={selectedState} onChange={handleStateSelect} id="sea" >
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
                        <a href='https://www.google.com/search?gs_ssp=eJzj4tTP1TcwrKqosDRg9GJJTC9KBAAsJgT9&q=agra&oq=agra&gs_lcrp=EgZjaHJvbWUqDwgBEC4YQxixAxiABBiKBTIHCAAQABiPAjIPCAEQLhhDGLEDGIAEGIoFMg8IAhAAGEMYsQMYgAQYigUyDwgDEAAYQxixAxiABBiKBTIPCAQQABhDGLEDGIAEGIoFMgwIBRAAGEMYgAQYigUyDAgGEAAYQxiABBiKBTIMCAcQABhDGIAEGIoFMhAICBAAGIMBGLEDGIAEGIoFMgoICRAAGLEDGIAE0gEIMjM2NmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8'><img src={one} alt='' title='Agra' /></a>
                        <a href='https://www.google.com/search?q=bangalore&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn08inzp4_sLuZdLRQGe-oUaZQ5p1AQ%3A1706502798643&ei=jiq3ZcyfJruXseMPt4WNoAI&gs_ssp=eJzj4tDP1TewTDY0N2D04kxKzEtPzMkvSgUAPNgGQQ&oq=ban&gs_lp=Egxnd3Mtd2l6LXNlcnAiA2JhbioCCAEyChAAGIAEGIoFGEMyEBAuGIAEGIoFGEMYsQMYgwEyChAAGIAEGIoFGEMyChAAGIAEGIoFGEMyChAAGIAEGIoFGEMyDRAAGIAEGIoFGEMYsQMyChAAGIAEGIoFGEMyDxAuGIAEGIoFGEMYsQMYCjIKEAAYgAQYigUYQzIOEAAYgAQYigUYsQMYgwEyHxAuGIAEGIoFGEMYsQMYgwEYlwUY3AQY3gQY4ATYAQNI6yFQzwNYuBRwAngBkAECmAGqA6AB1w2qAQkwLjEuMi4xLjK4AQPIAQD4AQGoAgrCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICDhAAGOQCGNYEGLAD2AEBwgITEC4YgAQYigUYQxjIAxiwA9gBAsICGRAuGIAEGIoFGEMYxwEYrwEYyAMYsAPYAQLCAhMQLhhDGIAEGIoFGMgDGLAD2AECwgIKEC4YgAQYigUYJ8ICCBAAGIAEGLEDwgITEC4YgAQYigUYQxixAxjHARivAcICBRAAGIAEwgIREC4YgAQYsQMYgwEYxwEYrwHCAg4QLhiABBixAxjHARivAcICCxAAGIAEGIoFGLEDwgIXEC4YgAQYigUYlwUY3AQY3gQY4ATYAQPCAgcQLhjqAhgnwgIHECMY6gIYJ8ICExAAGIAEGIoFGEMY6gIYtALYAQTCAg4QLhiABBiKBRixAxiDAcICChAuGIAEGIoFGEPCAgsQABiABBixAxiDAcICCBAuGIAEGLEDwgILEC4YgAQYsQMYgwHCAh0QLhiABBiKBRixAxiDARiXBRjcBBjeBBjgBNgBA8ICDBAuGIAEGIoFGEMYCuIDBBgAIEGIBgGQBhO6BgYIARABGAm6BgYIAhABGAi6BgYIAxABGBS6BgQIBBgB&sclient=gws-wiz-serp'><img src={two} alt='' title='Bangolure' /></a>
                        <a href='https://www.google.com/search?q=delhi&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0_A3O7mlvcMTW7WbVQbyUqnL-uM_A%3A1706502937374&ei=GSu3ZaW4FtmeseMPsb6gmAs&gs_ssp=eJzj4tDP1TewTDMwN2D0Yk1JzcnIBAAmdQSa&oq=de&gs_lp=Egxnd3Mtd2l6LXNlcnAiAmRlKgIIADIQEC4YgAQYigUYQxixAxiDATINEC4YgAQYigUYQxixAzIQEAAYgAQYigUYQxixAxiDATIQEAAYgAQYigUYQxixAxiDATIQEC4YgAQYigUYQxjHARjRAzIQEC4YgAQYigUYQxixAxiDATIKEC4YgAQYigUYQzIWEC4YgAQYigUYQxixAxiDARjHARjRAzIKEAAYgAQYigUYQzIKEAAYgAQYigUYQzIfEC4YgAQYigUYQxixAxiDARiXBRjcBBjeBBjgBNgBBEigG1DVAliiEHACeAGQAQSYAckDoAH8D6oBBzAuMi40LTS4AQPIAQD4AQGoAgrCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICDhAAGOQCGNYEGLAD2AEBwgITEC4YgAQYigUYQxjIAxiwA9gBAsICExAuGEMYgAQYigUYyAMYsAPYAQLCAgcQLhjqAhgnwgIHECMY6gIYJ8ICFhAAGAMYjwEY5QIY6gIYtAIYjAPYAQPCAgsQABiABBixAxiDAcICCBAuGIAEGLEDwgIIEAAYgAQYsQPCAg4QLhiABBiKBRixAxiDAcICBRAAGIAEwgIOEC4YgAQYsQMYxwEY0QPCAhkQLhiABBiKBRhDGJcFGNwEGN4EGOAE2AEE4gMEGAAgQYgGAZAGE7oGBggBEAEYCboGBggCEAEYCLoGBAgDGAu6BgYIBBABGBQ&sclient=gws-wiz-serp'><img src={three} alt='' title='delhi' /></a>
                        <a href='https://www.google.com/search?q=goa&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0-atpTRVPnBJ1aOypONzlv-BCsoow%3A1706502960493&ei=MCu3ZeHZHdXkseMPu-qDwA8&ved=0ahUKEwjhsZL24oGEAxVVcmwGHTv1APgQ4dUDCBA&uact=5&oq=goa&gs_lp=Egxnd3Mtd2l6LXNlcnAiA2dvYTIQEAAYgAQYigUYQxixAxiDATIQEAAYgAQYigUYQxixAxiDATIQEC4YgAQYigUYQxixAxiDATIKEAAYgAQYigUYQzINEAAYgAQYigUYQxixAzIQEAAYgAQYigUYQxixAxiDATIQEAAYgAQYigUYQxixAxiDATINEAAYgAQYigUYQxixAzIKEC4YgAQYigUYQzINEAAYgAQYigUYQxixA0jaM1CdAliCMXACeAGQAQOYAZ0CoAHkCqoBBTAuMi40uAEDyAEA-AEBqAIQwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICExAuGIAEGIoFGEMYyAMYsAPYAQLCAgoQLhiABBiKBRgnwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICCxAuGIAEGMcBGK8BwgIFEAAYgATCAhcQLhiABBiKBRiXBRjcBBjeBBjgBNgBA8ICBxAuGOoCGCfCAgcQIxjqAhgnwgIWEC4YgAQYigUYQxjIAxjqAhi0AtgBAsICChAjGIAEGIoFGCfCAhEQLhiABBixAxiDARjHARjRA-IDBBgAIEGIBgGQBhO6BgYIARABGAm6BgYIAhABGAi6BgYIAxABGBQ&sclient=gws-wiz-serp'><img src={four} alt='' title='Goa' /></a>
                        <a href='https://www.google.com/search?q=kolkatha&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0_EpuQ5VNkDtufO7DjWff4pMZrC3g%3A1706502993244&ei=USu3ZaTPDqDUseMPjJuJ8Aw&ved=0ahUKEwjku-GF44GEAxUgamwGHYxNAs4Q4dUDCBA&uact=5&oq=kolkatha&gs_lp=Egxnd3Mtd2l6LXNlcnAiCGtvbGthdGhhMg0QLhhDGLEDGIAEGIoFMgoQABiABBiKBRhDMhMQLhiABBiKBRhDGLEDGMcBGNEDMgoQABiABBiKBRhDMgoQABiABBiKBRhDMgoQABiABBiKBRhDMg0QABiABBiKBRhDGLEDMg0QLhiABBiKBRhDGLEDMg0QABiABBgKGLEDGIMBMhAQABiABBiKBRhDGLEDGIMBMhwQLhhDGLEDGIAEGIoFGJcFGNwEGN4EGOAE2AEDSJ8LUNYHWNYHcAF4AZABAJgBrwKgAa8CqgEDMy0xuAEDyAEA-AEC-AEBwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICExAuGIAEGIoFGEMYyAMYsAPYAQLCAhkQLhiABBiKBRhDGMcBGK8BGMgDGLAD2AEC4gMEGAAgQYgGAZAGE7oGBggBEAEYCboGBggCEAEYCLoGBggDEAEYFA&sclient=gws-wiz-serp'><img src={five} alt='' title='kolkatha' /></a>
                        <a href='https://www.google.com/search?q=Mumbai&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn09EppPvnzk84F620jOfeFDXSUjGlg%3A1706503017031&ei=aSu3Ze20AdGcseMP-8uvqAk&ved=0ahUKEwitjY2R44GEAxVRTmwGHfvlC5UQ4dUDCBA&uact=5&oq=Mumbai&gs_lp=Egxnd3Mtd2l6LXNlcnAiBk11bWJhaTIREC4YgAQYigUYkQIYsQMYgwEyDhAAGIAEGIoFGJECGLEDMggQLhiABBixAzIKEAAYgAQYFBiHAjIFEAAYgAQyChAAGIAEGBQYhwIyCBAuGIAEGLEDMg4QABiABBiKBRixAxiDATIFEAAYgAQyCBAuGIAEGLEDMiAQLhiABBiKBRiRAhixAxiDARiXBRjcBBjeBBjgBNgBAUi9C1DxCFjxCHABeAGQAQCYAewBoAHsAaoBAzItMbgBA8gBAPgBAvgBAcICChAAGEcY1gQYsAPiAwQYACBBiAYBkAYIugYGCAEQARgU&sclient=gws-wiz-serp'><img src={six} alt='' title='Mumbai' /></a>
                        <a href='https://www.google.com/search?q=noida+state&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0_YB1iiTEcJkDkLbaFyaUS253JQjQ%3A1706503060172&ei=lCu3ZZ-JCrCNseMP3vitEA&gs_ssp=eJzj4tTP1TcwLi-pMjBg9OLOy89MSVQoLkksSQUAWSoHqQ&oq=Nodia+st&gs_lp=Egxnd3Mtd2l6LXNlcnAiCE5vZGlhIHN0KgIIATILEAAYgAQYigUYkQIyCxAuGJECGIAEGIoFMgsQABiABBiKBRiRAjILEAAYgAQYigUYkQIyChAAGIAEGBQYhwIyCxAAGIAEGIoFGJECMgoQABiABBgUGIcCMgoQABiABBgKGLEDMg0QLhiABBgKGMcBGK8BMgcQABiABBgKMhoQLhiRAhiABBiKBRiXBRjcBBjeBBjgBNgBA0iJMFDVA1j2FXABeAGQAQCYAeABoAGOBqoBBTAuMi4yuAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICDRAAGIAEGIoFGEMYsAPCAg4QABjkAhjWBBiwA9gBAcICExAuGEMYgAQYigUYyAMYsAPYAQLCAgsQABiABBixAxiDAcICEBAAGIAEGBQYhwIYsQMYgwHCAgUQABiABMICDRAuGIAEGMcBGK8BGAriAwQYACBBiAYBkAYRugYGCAEQARgJugYGCAIQARgIugYGCAMQARgU&sclient=gws-wiz-serp'><img src={seven} alt='' title='Nodia' /></a>
                        <a href='https://www.google.com/search?q=Punjab&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0_BR5yfU3LGqg9d7AB3J-2end7EyQ%3A1706503077818&ei=pSu3ZaTFMY-QseMP0v2c0Aw&ved=0ahUKEwjkq4uu44GEAxUPSGwGHdI-B8oQ4dUDCBA&uact=5&oq=Punjab&gs_lp=Egxnd3Mtd2l6LXNlcnAiBlB1bmphYjIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzINEAAYgAQYigUYQxiwAzINEAAYgAQYigUYQxiwAzINEAAYgAQYigUYQxiwAzINEAAYgAQYigUYQxiwAzIOEAAY5AIY1gQYsAPYAQEyDhAAGOQCGNYEGLAD2AEBMg4QABjkAhjWBBiwA9gBATITEC4YQxiABBiKBRjIAxiwA9gBAjITEC4YgAQYigUYQxjIAxiwA9gBAjITEC4YgAQYigUYQxjIAxiwA9gBAjITEC4YgAQYigUYQxjIAxiwA9gBAkjBC1DrB1jrB3ABeAGQAQCYAQCgAQCqAQC4AQPIAQD4AQL4AQHiAwQYACBBiAYBkAYTugYGCAEQARgJugYGCAIQARgI&sclient=gws-wiz-serp'><img src={eight} alt='' title='Punjab' /></a>
                        <a href='https://www.google.com/search?q=Mysore&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0_jZUZb-L5QHNDdX8Kv0BcOMdGIVw%3A1706503102651&ei=viu3Zd2pJ-2fseMP67mRwAs&ved=0ahUKEwjdgPe544GEAxXtT2wGHetcBLgQ4dUDCBA&uact=5&oq=Mysore&gs_lp=Egxnd3Mtd2l6LXNlcnAiBk15c29yZTIREC4YgAQYigUYkQIYsQMYgwEyDRAuGIAEGIoFGEMYsQMyChAAGIAEGBQYhwIyCxAAGIAEGIoFGJECMgUQABiABDIUEC4YgAQYigUYsQMYgwEYxwEYrwEyFBAuGIAEGLEDGIMBGMcBGK8BGI4FMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMiAQLhiABBiKBRiRAhixAxiDARiXBRjcBBjeBBjgBNgBA0iKEVDUCFjUCHABeAGQAQCYAcIDoAHCA6oBAzQtMbgBA8gBAPgBAvgBAcICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIOEAAY5AIY1gQYsAPYAQHCAhMQLhiABBiKBRhDGMgDGLAD2AECwgIZEC4YgAQYigUYQxjHARjRAxjIAxiwA9gBAuIDBBgAIEGIBgGQBhO6BgYIARABGAm6BgYIAhABGAi6BgYIAxABGBQ&sclient=gws-wiz-serp'><img src={nine} alt='' title='Mysore' /></a>
                        <a href='https://www.google.com/search?q=Andhra&sca_esv=a25c15acbc52d6d7&sxsrf=ACQVn0-tYYdxyTGMnlmfaxHEi-7pAM443w%3A1706503122563&ei=0iu3ZYT-IdKTseMP-8iByAM&ved=0ahUKEwiEr7bD44GEAxXSSWwGHXtkADkQ4dUDCBA&uact=5&oq=Andhra&gs_lp=Egxnd3Mtd2l6LXNlcnAiBkFuZGhyYTINEC4YQxixAxiABBiKBTIQEC4YQxiDARixAxiABBiKBTILEC4YgAQYsQMYgwEyExAuGIAEGIoFGEMYxwEYrwEYjgUyBRAAGIAEMggQABiABBixAzIKEAAYgAQYigUYQzIIEAAYgAQYsQMyBRAAGIAEMgUQLhiABDIcEC4YQxixAxiABBiKBRiXBRjcBBjeBBjgBNgBAkiND1CkClikCnABeAGQAQCYAZ0BoAGdAaoBAzAuMbgBA8gBAPgBAvgBAcICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIPEAAYgAQYigUYQxiwAxgKwgITEC4YgAQYigUYQxjIAxiwA9gBAcICHBAuGIAEGIoFGEMYxwEYrwEYyAMYsAMYjgXYAQHCAhUQLhiABBiKBRhDGMgDGLADGArYAQHiAwQYACBBiAYBkAYSugYGCAEQARgIugYGCAIQARgU&sclient=gws-wiz-serp'><img src={ten} alt='' title='Andhra' /></a>

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