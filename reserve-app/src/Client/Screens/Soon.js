import React, { useState } from 'react';
import soo from '../../Json/Coming.json';
import page from '../../Images/page.jpg'
import './Style.css';

function Soon() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    const filteredData = soo.filter(item => item.Language.includes(language));
    setFilteredItems(filteredData);
  };


  return (
    <>
      <div>
        {soo.reduce((acc, curr) => {
          curr.Language.forEach(lang => {
            if (!acc.includes(lang)) {
              acc.push(lang);
            }
          });
          return acc;
        }, []).map((language, index) => (
          <button key={index} onClick={() => handleLanguageClick(language)} id="fi2">{language}</button>
     
      ))}
      </div>

      <div className="s1" style={{marginTop:"14px"}}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt="" />
              <p style={{ wordSpacing: "5px", paddingLeft: "35px", marginTop: "10px", backgroundColor: "#e5e5e5", color: "Black", borderRadius: "11px" }}>
                &#x1F44D;{item.like}<i style={{ paddingLeft: "28px" }}>{item.Release}</i>
              </p>
              <p style={{ fontSize: "18px", marginTop: "-6px" }}>{item.name}</p>
              <p style={{ fontSize: "15px", marginTop: "-13px" }}>{item.Genre}</p>
            </div>
          ))
        ) : (
          <>
          <img src={page} alt=''  id="fi3"/>
           </>
        )}
      </div>
    </>
  );
}

export default Soon;
