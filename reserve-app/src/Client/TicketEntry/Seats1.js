/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css';
import six from '../../Images/seat.png'

function Seat1({ movie, date, time, theater, screen, language, ticketsToBook }) {
  const { movieId } = useParams();

  const rows = 6;
  const columnsSet1 = 4;
  const columnsSet2 = 5;
  const columnsSet3 = 4;
  const premiumColumns = 14;
  const gapWidth = 15;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState([]);
  const [seatRate, setSeatRate] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/movies/getMovieById', { movieId: movieId });
        const data = response.data;
        setConvenienceFee(data.convenience || 35.40);
        setSeatRate(data.payment);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchPaymentData();
  }, [movieId]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      const currentIndex = prevSelectedSeats.indexOf(seatNumber);

      if (currentIndex !== -1) {
        // Deselect the seat
        const updatedSeats = prevSelectedSeats.filter((seat) => seat !== seatNumber);
        updatePayment(updatedSeats);
        return updatedSeats;
      }

      if (prevSelectedSeats.length < ticketsToBook) {
        // Select the seat
        const updatedSeats = [...prevSelectedSeats, seatNumber];
        updatePayment(updatedSeats);
        return updatedSeats;
      }

      // Check if the user is trying to select more than the allowed number of tickets
      if (prevSelectedSeats.length >= ticketsToBook) {
        alert(`You can only book up to ${ticketsToBook} tickets.`);
        return prevSelectedSeats;
      }

      // Rearrange seats by removing all seats and adding the new one
      const updatedSeats = [seatNumber];
      updatePayment(updatedSeats);
      return updatedSeats;
    });
  };

  const updatePayment = (seats) => {
    const updatedPayment = seats.length * (seatRate + convenienceFee);
    const formattedPayment = updatedPayment.toFixed(1);
    const roundedPayment = parseFloat(formattedPayment);
    setPaymentAmount(roundedPayment);
  };

  const generateSeatLabel = (row, col) => {
    const rowLabel = row + 1;
    const colLabel = String.fromCharCode(65 + col);
    return `${colLabel}${rowLabel}`;
  };

  const createSeatRows = () => {
    const seatRows = [];

    for (let i = 0; i < rows; i++) {
      const seatRow = [];

      for (let j = 0; j < columnsSet1; j++) {
        const seatNumber = generateSeatLabel(i, j);
        seatRow.push(
          <div
            key={seatNumber}
            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }

      seatRow.push(<div key={`gap1-${i}`} className="seat-gap" style={{ width: gapWidth }} />);

      for (let j = columnsSet1; j < columnsSet1 + columnsSet2; j++) {
        const seatNumber = generateSeatLabel(i, j);
        seatRow.push(
          <div
            key={seatNumber}
            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }

      seatRow.push(<div key={`gap2-${i}`} className="seat-gap" style={{ width: gapWidth }} />);

      for (let j = columnsSet1 + columnsSet2; j < columnsSet1 + columnsSet2 + columnsSet3; j++) {
        const seatNumber = generateSeatLabel(i, j);
        seatRow.push(
          <div
            key={seatNumber}
            className={`seat ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      }

      seatRows.push(
        <div key={i} className="seat-row">
          {seatRow}
        </div>
      );
    }

    const premiumSeatRow = createPremiumSeatRow();
    seatRows.push(premiumSeatRow);

    return seatRows;
  };

  const createPremiumSeatRow = () => {
    const seatRow = [];

    for (let j = 0; j < premiumColumns; j++) {
      const seatNumber = generateSeatLabel(rows, j);
      seatRow.push(
        <div
          key={seatNumber}
          className={`seat premium ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
          onClick={() => handleSeatClick(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    }

    return (
      <div key={rows} className="seat-row premium">
        {seatRow}
      </div>
    );
  };

  const bookTicket = () => {
    alert(`Booked seats: ${selectedSeats.join(', ')}`);
  };
  const showPaymentButton = selectedSeats.length > 0;

  const user = JSON.parse(localStorage.getItem('currentUser'));

  /*Push data */
  async function bookTickets() {
    const bookingDetails = {
      user,
      movie,
      date,
      time,
      language,
      theater,
      screen,
      paymentAmount,
      seatRate,
      convenienceFee,
      selectedSeats,
    };

    console.log("Client-Side Data:", bookingDetails);

    try {
      const result = await axios.post('http://localhost:5000/api/bookings/bookTickets', bookingDetails);
      console.log(result)
      alert('Ticket Booked Successfully')
      window.location.href = '/Profile'
    } catch (error) {
      console.log(error);
      alert('Network issue...')
    }
  }

  return (
    <>
      <div className="seat-container">
        <h2 style={{ fontSize: "20px" }}>Elite</h2>
        <div className="seat-map-container">
          <div className="seat-map">{createSeatRows()}</div>
        </div>

        <div class="seating-arrangement">
          <div class="column">
            <div class="box">
              <p>BUDGET</p>
              <hr />
              <div class="row">
                <div class="seat">1</div>
                <div class="seat">2</div>
                <div class="seat">3</div>
                <div class="seat">4</div>
                <div class="seat">5</div>
                <div class="seat">6</div>
                <div class="seat">7</div>

                <div class="seat">8</div>
                <div class="seat">9</div>
                <div class="seat">10</div>
                <div class="seat">11</div>
                <div class="seat">12</div>
                <div class="seat">13</div>
                <div class="seat">14</div>
              </div>
            </div>
          </div>
        </div>
        <img src={six} alt="screen" style={{ width: '264px', height: '148px' }} />

        {showPaymentButton && (
          <div>
            <button id="ve" onClick={bookTickets}>
              Pay ₹{paymentAmount}
            </button>
          </div>
        )}
      </div>

    </>
  )
}

export default Seat1;
