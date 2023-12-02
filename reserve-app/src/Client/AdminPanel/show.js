import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Show() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json.movies);
        setFilteredData(json.movies); 
      });
  }, []);

  const filterByType = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);

 if (genre === '') {
      setFilteredData(data);
    } else {
      const tempMovies = data.filter((item) => item.Genre.toLowerCase() === genre.toLowerCase());
      setFilteredData(tempMovies);
    }
  };
 
return (
    <>
      <div className='col-md-3'>
        <select value={selectedGenre} onChange={filterByType}>
          <option value="">Select Genre</option>
          {Array.from(new Set(data.map((item) => item.Genre))).map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <table className='table table-dark table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <NavLink to={`/admin/Update/${item._id}`}>Edit</NavLink>
                <Link to={`/cart/Delete/${item._id}`} className='btn btn-danger'>
                  Remove
                </Link>
                <Link to='' className='btn btn-primary'>
                  Details
                </Link>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </>
  );
}

export default Show;
