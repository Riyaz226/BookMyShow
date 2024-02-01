import React, { useState } from 'react';
import axios from 'axios';
import './Style.css'

function Update() {
  const [movieId, setMovieId] = useState('');
  const [updatedMovieData, setUpdatedMovieData] = useState({
    name: '',
    Released: '',
    Runtime: '',
    Certificate: '',
    Description: '',
    Video: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/movies/updateMovieById', {
        movieId,
        updatedMovieData,
      });

      console.log(response.data); 
      window.location.href = '/admin';
} catch (error) {
      console.error('Error:', error.response.data);
      alert('Movie Not Found ❌')
    }
  };

  return (
    
    <div style={{display:'flex',justifyContent:"center",alignItems:"center",paddingTop:"39px"}}>
      <br/>
      <form onSubmit={handleUpdate}>
        <input
        required
        className="form-control" id="input6"
          type="text"
          placeholder="Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          type="text"
          name="name"
          placeholder="Enter name"
          value={updatedMovieData.name}
          onChange={handleInputChange}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          type="text"
          name="Released"
          placeholder="YYYY-MM-DD"
          value={updatedMovieData.Released}
          onChange={handleInputChange}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          type="text"
          name="Runtime"
          placeholder="Enter runtime"
          value={updatedMovieData.Runtime}
          onChange={handleInputChange}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          type="text"
          name="Certificate"
          placeholder="Enter certificate"
          value={updatedMovieData.Certificate}
          onChange={handleInputChange}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          type="text"
          name="Description"
          placeholder="Enter description"
          value={updatedMovieData.Description}
          onChange={handleInputChange}
        />
        <br/>
        <input
        required
       className="form-control" id="input6"
          name="Video"
          placeholder="Enter video"
          value={updatedMovieData.Video}
          onChange={handleInputChange}
        />
        <br/>
        <button className="btn btn-success" type="submit" id="bnh">
          Update Details
        </button>
      </form>
    </div>
  );
}

export default Update;

