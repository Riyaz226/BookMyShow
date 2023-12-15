/* eslint-disable array-callback-return */
import React from 'react';
import data from '../../Json/States.json';
import './Style.css'

function Cinema() {
  return (
    <div className="select2">
      {data && data.map((item) => (
        <ul key={item.id}>
          <li>{item.Threater[0]}</li>
        </ul>
      ))}
    </div>
  );
}

export default Cinema;
