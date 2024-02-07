/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import Seat1 from '../TicketEntry/Seats1'
import Seat2 from '../TicketEntry/Seats2'
import Seat3 from '../TicketEntry/Seats3'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import One from '../../Images/Cycle.jpg'
import two from '../../Images/Bike.jpg'
import three from '../../Images/Car.png'
import four from '../../Images/Van.jpg'
import five from '../../Images/Bus.png'
import './Style.css';

import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const format = 'YYYY-MM-DD';


const Receive = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [theater, setSelectedTheater] = useState('');
  const [language, setSelectedLanguage] = useState('');
  const [screen, setSelectedScreen] = useState('');
  const [date, setformdate] = useState()
  const [time, setSelectedTime] = useState(null);
  const [ticketsToBook, setTicketsToBook] = useState(1);

  const filterBydate = (dates, dateStrings) => {
    if (dateStrings && dateStrings.length > 0) {
      setformdate(moment(dateStrings[0]).format('YYYY-MM-DD'));
    }
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };
  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const handleScreenChange = (event) => {
    setSelectedScreen(event.target.value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*Movie Part */
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = (await axios.post(' http://localhost:5000/api/movies/getMovieById', { movieId: movieId })).data;
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const getImageBasedOnSeats = () => {
    if (ticketsToBook === 1) {
      return <img src={One} alt="Cycle" style={{ width: '164px', height: '98px' }} />;
    } else if (ticketsToBook === 2) {
      return <img src={two} alt="Bike" style={{ width: '158px', height: '88px' }} />;
    } else if (ticketsToBook === 3) {
      return <img src={three} alt="Car" style={{ width: '184px', height: '106px' }} />;
    } else if (ticketsToBook === 4) {
      return <img src={three} alt="Car" style={{ width: '184px', height: '106px' }} />;
    } else if (ticketsToBook === 5) {
      return <img src={four} alt="Van" style={{ width: '164px', height: '108px' }} />;
    } else if (ticketsToBook === 6) {
      return <img src={four} alt="Van" style={{ width: '164px', height: '108px' }} />;
    } else if (ticketsToBook === 7) {
      return <img src={four} alt="Van" style={{ width: '164px', height: '108px' }} />;
    } else if (ticketsToBook === 8) {
      return <img src={five} alt="Bus" style={{ width: '164px', height: '108px' }} />;
    } else if (ticketsToBook === 9) {
      return <img src={five} alt="Bus" style={{ width: '164px', height: '108px' }} />;
    } else if (ticketsToBook === 10) {
      return <img src={five} alt="Bus" style={{ width: '164px', height: '108px' }} />;
    } else {
      return null;
    }
  };
  return (
    <>
      {movie && (
        <>
          <div className="first-row" style={{ paddingLeft: "26px" }}>
            <div>
              <p style={{ fontSize: "38px", marginTop: "-2px" }}>
                <a href={`/city/movies/${movie.name}/${movie._id}`} style={{ textDecoration: "none" }}>&lsaquo;</a>
              </p>
            </div>
            <div style={{ paddingTop: "5px" }}>
              <p style={{ fontSize: "17.3px" }}>{movie.name}</p>
              <p style={{ fontSize: "13.5px", marginTop: "-15px", color: "#66667a" }}>{theater}|{date},{time}</p>
            </div>
            <div id="Io">
              <p><b>{movie.Certificate}</b></p>
              <p>{movie.Genre[0]}</p>
              <p>{movie.Genre[1]}</p>
              <p>{movie.Genre[2]}</p>
            </div>
          </div>
          <div className="cine">
            <div id="on" style={{ height: "33px" }}>
              <select id="theaterDropdown" value={theater} onChange={handleTheaterChange}>
                <option value="">&#127958; </option>
                {movie.theater.map((theater) => (
                  <option key={theater.id} value={theater.id}>
                    {theater}
                  </option>
                ))}
              </select>
            </div>
            <div id="tw">
              <select id="theaterDropdown" value={language} onChange={handleLanguageChange}>
                <option value="">&#127470;</option>
                {movie.Language.map((lan) => (
                  <option key={lan.id} value={lan.id}>
                    {lan}
                  </option>
                ))}
              </select>
            </div>
            <div id="thr">
              <label htmlFor="theaterDropdown"></label>
              <select id="theaterDropdown" value={screen} onChange={handleScreenChange}>
                <option value="">&#128187;</option>
                {movie.Screen.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc}
                  </option>
                ))}
              </select>
            </div>

          </div>
          {/* <p style={{listStyle:"none"}}>
           <li>Amount:{movie.payment}</li>
          <li>convenienceFee:{movie.convenience}</li>
      </p> */}
          <div className="sec-row">

            <div style={{ paddingLeft: "13px" }} >
              <Space direction="vertical" size={18}>
                <RangePicker
                  defaultValue={[dayjs('2024-01-13', format), dayjs('2024-02-15', format)]}
                  disabled={[false, true]}
                  onChange={filterBydate}
                />
              </Space>

              <div className="times">
                {movie.time.map((ti) => (
                  <p key={ti.id} value={ti.id} onClick={() => handleTimeClick(ti)}>
                    {ti}
                    <br />
                    <span>4K DOLBY ATMOS</span>
                  </p>
                ))}
              </div>

            </div>

            <div id="reco" onClick={handleShow}>
              <label style={{ fontSize: "23px", cursor: "pointer" }}>&#128186;</label>
            </div>
          </div>
          <b style={{ paddingLeft: "44px", display: "flex", gap: "17px", marginTop: "23px" }}>
            <p>{language}</p>
            <p>.</p>
            <p>{screen}</p>
          </b>
          <p style={{ cursor: "pointer" }}>ℂ𝕒𝕟𝕔𝕖𝕝𝕒𝕥𝕚𝕠𝕟 𝔸𝕧𝕒𝕚𝕝𝕒𝕓𝕝𝕖</p>

          {time && (
            <div>
              {time === '08:00 AM' &&
                <Seat1
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  language={language}
                  screen={screen}
                  time={time}
                  movie={movie}
                />}
              {time === '10:35 PM' &&
                <Seat2
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  language={language}
                  screen={screen}
                  time={time}
                  movie={movie}
                />}
              {time === '06:30 PM' &&
                <Seat3
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  language={language}
                  screen={screen}
                  time={time}
                  movie={movie}
                />}

              {time === '11:15 AM' &&
                <Seat1
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  screen={screen}
                  time={time}
                  language={language}
                  movie={movie}
                />}
              {time === '02:40 PM' &&
                <Seat2
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  language={language}
                  screen={screen}
                  time={time}
                  movie={movie}
                />}
              {time === '10:20 PM' &&
                <Seat3
                  ticketsToBook={ticketsToBook}
                  date={date}
                  theater={theater}
                  lan={language}
                  screen={screen}
                  time={time}
                  movie={movie}
                />}
            </div>
          )}

        </>
      )}
      <div className="foot3">
        <li>
          <p style={{ backgroundColor: "white", color: "white" }}>1</p>
          Available
        </li>
        <li>
          <p style={{ backgroundColor: "#1EA83c", color: "#1EA83c", borderColor: "#1EA83c" }}>2</p>
          Selected
        </li>
        <li>
          <p style={{ backgroundColor: "#eee", color: "#eee", borderColor: "#eee" }}>3</p>
          Sold
        </li>
      </div>
      <Modal show={show} onHide={handleClose} id="mo6">
        <Modal.Header>
          <Modal.Title>How many seats?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="left">
            {getImageBasedOnSeats()}
            <div style={{ paddingTop: "2px" }}>
              <label>Your &#128186;:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={ticketsToBook}
                onChange={(e) => setTicketsToBook(Math.min(10, Math.max(1, parseInt(e.target.value))))}
              />
            </div>

            <br />
            <div style={{ paddingTop: "18px", textAlign: "center" }}>
              <p>ELITE</p>
              {movie && (
                <>
                  <b>₹{movie.payment}</b>
                </>
              )}
              <p style={{ color: "orange" }}>AVAILABLE</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} style={{ width: "100%" }}>
            Select Seats
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Receive;