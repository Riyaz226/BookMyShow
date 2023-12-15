/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {BiStar,BiSolidStar,BiSolidStarHalf} from 'react-icons/bi'
import {FiVideo} from 'react-icons/fi'
import Slider from "react-slick";
import {Link} from 'react-router-dom'

import one from '../../Images/background.jpg'
import two from '../../Images/background_2.jpg'
import three from '../../Images/background_1.jpg'
import four from '../../Images/Cricket.jpg'
import five from '../../Images/Cartoon.jpg'
import six from '../../Images/Events.jpg'

import Home from './HomeScreen'
import Home2 from './HomeScreen2'
import './Style.css'

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color:"white",marginRight:"46px"}}
      onClick={onClick}
    />
  );
}

function HomeScroll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.movies);
      });
  }, [])

  var settings = {
    infinite: true,
    autoplay:true,
    autoplaySpeed:2800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover:true,
    nextArrow:<Arrow/>,
    prevArrow:<Arrow/>,
  };
 return (
    <>
       <Slider {...settings}>
          <div className='card'>
            <img src={one} alt="" class='w-100' id='img'/>
<div class='black'>
      <h1>Death on the Nile</h1>
            <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStarHalf/></i>
                <i><BiStar/></i>
            </div>
            <p>
            Death on the Nile is a work of detective fiction by British writer Agatha Christie,
            published in the UK by the Collins Crime Club on 1 November 1937 and in the US by Dodd,
            </p> 
        <div class="genre">
          <Link to="#" class="category">Action</Link>
           <Link to="#" class="category">Drama</Link>
           <Link to="#" class="category"><span>4K</span></Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p>watch the trailer</p>
      </div>
</div>
</div>
   <div className='card'>
          <img src={four} alt="" class='w-100' id='img'/> 
          <div class='black'>
      <h1>Death on the Nile</h1>
            <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
            </div>
            <p style={{color:"black"}}>
            The ICC ODI World Cup 2023 Men's Cricket World Cup will be held in India from 5 October to 19 November.
           It will be the 13th edition of the tournament and the fourth time India has hosted the event.
            </p> 
        <div class="genre">
          <Link to="#" class="category">Sports</Link>
           <Link to="#" class="category"><span>4K</span></Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p style={{color:"black"}}>watch the trailer</p>
      </div>
</div>
   </div>
          <div className='card'>
            <img src={three} alt="" class='w-100' id='img'/> 
            <div class='black'>
      <h1>Uncharted4</h1>
            <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
            </div>
            <p>
            Uncharted 4: A Thief's End is a 2016 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. 
            It is the fourth main entry in the Uncharted series
            </p> 
        <div class="genre">
          <Link to="#" class="category">Action</Link>
           <Link to="#" class="category">Thriller</Link>
           <Link to="#" class="category"><span>4K</span></Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p>watch the trailer</p>
      </div>
</div>
          </div>
          <div className='card'>
             <img src={six} alt="" class='w-100' id='img'/> 
             <div class='black'>
      <h1>Show</h1>
            <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStarHalf/></i>
                <i><BiSolidStarHalf/></i>
                <i><BiStar/></i>
            </div>
            <p>
            Many festivals and holidays in Britain are centuries old. Every town, village and hamlet in Britain has its own traditions, 
            some involving months of careful planning and preparations of costumes and choreography, 
             </p> 
        <div class="genre">
           <Link to="#" class="category">Drama</Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p>watch the trailer</p>
      </div>
</div>
          </div>
          <div className='card'>
             <img src={two} alt="" class='w-100' id='img'/> 
             <div class='black'>
      <h1>Avengers</h1>
        <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStarHalf/></i>
        </div>
            <p>
            The film's development began when Marvel Studios received a loan from Merrill Lynch in April 2005. After the success of the film Iron Man in May 2008.
            </p> 
        <div class="genre">
          <Link to="#" class="category">Action</Link>
           <Link to="#" class="category"><span>4K</span></Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p>watch the trailer</p>
      </div>
</div>
          </div>
          <div className='card'>
             <img src={five} alt="" class='w-100' id='img'/> 
             <div class='black'>
      <h1>Ferdinand</h1>
            <div class="star">
                <i><BiSolidStar/></i>
                <i><BiSolidStar/></i>
                <i><BiSolidStarHalf/></i>
                <i><BiSolidStarHalf/></i>
                <i><BiStar/></i>
            </div>
            <p>
            What most people don't know is that Munro Leaf's 1936 story was based on true events. The real-life Ferdinand was a handsome jet-black bull named Civilón, born in the cork-oak pastures around Salamanca.
            </p> 
        <div class="genre">
          <Link to="#" class="category">Anim</Link>
           <Link to="#" class="category"><span>4K</span></Link>
        </div>
         <div class="watch">
             <i><FiVideo/></i>
             <p>watch the trailer</p>
      </div>
</div>
          </div>
        </Slider>
<div>
    {data.map((movie) => {
          return <Home movie={movie} />
        })} 
</div>

<div><Home2/></div>
 
  
    </>
  )
}
export default HomeScroll
