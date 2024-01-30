/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'

import './Style.css'
import StripeCheckout from 'react-stripe-checkout';
import six from '../../Images/seat.png'
import Swal from 'sweetalert2';

function Seat2({ movie, date, time, theater, language, screen, ticketsToBook }) {
  const { movieId } = useParams();

  const rows = 6;
  const columnsSet1 = 7;

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
        const updatedSeats = prevSelectedSeats.filter((seat) => seat !== seatNumber);
        updatePayment(updatedSeats);
        return updatedSeats;
      }

      if (prevSelectedSeats.length < ticketsToBook) {
        const updatedSeats = [...prevSelectedSeats, seatNumber];
        updatePayment(updatedSeats);
        return updatedSeats;
      }

      if (prevSelectedSeats.length >= ticketsToBook) {
        alert(`You can only book up to ${ticketsToBook} tickets.`);
        return prevSelectedSeats;
      }

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

      seatRows.push(
        <div key={i} className="seat-row">
          {seatRow}
        </div>
      );
    }


    return seatRows;
  };
  const bookTickets = () => {
    alert(`Booked seats: ${selectedSeats.join(', ')}`);
  };
  const showPaymentButton = selectedSeats.length > 0;

  const user = JSON.parse(localStorage.getItem('currentUser'));

  /*Push data */
  async function onToken(token) {
    console.log(token)
    if (!user || !movie || !date || !time || !language || !theater || !screen || !paymentAmount || !seatRate || !convenienceFee || !selectedSeats) {
      console.error('Error: Some user details are missing.');
      return;
    }
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
      token
    };

    console.log("Client-Side Data:", bookingDetails);

    try {
      const result = await axios.post('http://localhost:5000/api/bookings/bookTickets', bookingDetails);
      console.log(result)
      Swal.fire('Congratulations','Your Movie Booked Sucessfully','success').then(result=>(
        window.location.href='/Profile'
      ))
    } catch (error) {
      console.log(error);
      Swal.fire('OOps','Something went wrong','error')
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

            <StripeCheckout
              amount={paymentAmount}
              token={onToken}
              currency='INR'
              stripeKey="pk_test_51OQt3kSIXBEadNhyghBQLv2XBKgBJ5CYyIVyibsJlfRz9uQiOIgQZasS9Wa3LObke2JcuAR6BhmJv5EwBwQOUCph004QAASCSG"
            >
              <button id="ve">
                Pay ₹{paymentAmount}
              </button>

            </StripeCheckout>


          </div>
        )}
      </div>

    </>
  )
}

export default Seat2;