/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css';
import six from '../../Images/seat.png'
import Swal from 'sweetalert2';
import StripeCheckout from 'react-stripe-checkout';

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
  async function onToken(token) {
    if (!user || !movie || !date || !time || !language || !theater || !screen || !paymentAmount || !seatRate || !convenienceFee || !selectedSeats) {
      alert('Error: Some details are missing.');
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
        <img src={six} alt="screen" style={{ width: '234px', height: '148px' }} />

        {showPaymentButton && (
          <div>
            <StripeCheckout
              amount={paymentAmount * 100}
              token={onToken}
              currency='INR'
              name='Almost there|'
              description={movie.name}
              locale='auto'
              stripeKey="pk_test_51OQt3kSIXBEadNhyghBQLv2XBKgBJ5CYyIVyibsJlfRz9uQiOIgQZasS9Wa3LObke2JcuAR6BhmJv5EwBwQOUCph004QAASCSG"
            >
              <button id="ve" >
                Pay ₹{paymentAmount}
              </button>

            </StripeCheckout>

          </div>
        )}
      </div>

    </>
  )
}

export default Seat1;
