import React from 'react'
//import Slider from "react-slick";
//import Mo from '../../Json/movie3.json'
//import{NavLink} from 'react-router-dom'
import './Style.css'



function HomeScreen2() {
  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         initialSlide: 0
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1
  //       }
  //     }
  //   ]
  // };
  return (
    <>
      <div className='show1'>
       {/* <h4 className="h41">Recommended Movies</h4>
          <p className='p3'>
          <NavLink to={'/explore/home/:city'} style={{textDecoration:"none"}}>
             See All&#8594;
          </NavLink>  
            </p>
        <div className='F1'>
          <Slider {...settings} >
            {
              Mo.map((item) => {
                return (
                  <div key={item.id}>
                    <img src={item.Images} alt="" style={{ cursor: "pointer" }} />
                    <p style={{wordSpacing:"12px",paddingLeft:"43px"}}>{item.Rating}/10 {item.Votes}Votes</p>
                    <p style={{paddingLeft:"33px",fontSize:"17.5px",marginTop:"-2px"}}>{item.name}</p>
                    <p style={{paddingLeft:"33px",fontSize:"15.5px",marginTop:"-11px"}}>{item.Genre}</p>
                  </div>
                );
              })}

          </Slider>
            </div> */}
      </div> 
    </>
  )
}

export default HomeScreen2;
