import React, { useState, useEffect } from 'react';
import Load from '../Loader/load'
import './Style.css';

function Movie() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setLoading(false);
      })
      .catch((error) => {
       console.error('Error fetching data:', error);
        setLoading(false);
    });
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <div className="select">
        <p>Filter:</p>
        <select onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="All">All</option>
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
          <option value="telghu">Telghu</option>
          <option value="kannada">Kannada</option>
          <option value="malayalam">Malayalam</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load/></span>
        </div>
      ) : (
      <div className="select2">
        {data.map((item, index) => {
          if (selectedLanguage === 'All' || item.Language.includes(selectedLanguage)) {
            return (
              <ul key={index}>
                <li></li>
                <p>{item.name}({item.Certificate})😊{item.Rating}%</p>
              </ul>
            );
          }
          return null;
        })}
      </div>
       )}
    </>
  );
}

export default Movie;
