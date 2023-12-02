import React, { useState } from 'react';
import data from '../../Json/movie2.json';
import './Style.css'

function Movie() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
      <div className="select">
      <p>Filter:</p>
      <select onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="All">All</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Telghu">Telghu</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>

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
    </>
  );
}

export default Movie;
