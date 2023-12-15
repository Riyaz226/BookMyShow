import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Load from '../Loader/load'
import './Style.css';

function Show() {
  const [data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies/getallMovies')
      .then((response) => response.json())
      .then((json) => {
        setData(json.movies);
        setFilteredData(json.movies);
        setLoading(false);
            });
  }, []);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredData(data);
    } else {
      const filteredMovies = data.filter((item) =>
        item.Genre.includes(selectedGenre)
      );
      setFilteredData(filteredMovies);
    }
  }, [selectedGenre, data]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <>
      <div className="select" id="fill">
        <select onChange={handleGenreChange} value={selectedGenre}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="crime">Crime</option>
          <option value="drama">Drama</option>
          <option value="horrer">Horrer</option>
          <option value="period">Period</option>
          <option value="romantic">Romantic</option> 
        </select>
      </div>

      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load/></span>
        </div>
      ) : (
<table className='table table-dark table-bordered'>
<thead>
  <tr>
    <th>Name</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {filteredData.map((item) => (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>
        <Link to={`/cart/Update/${item._id}`} className='btn btn-success'>
          Edit
        </Link>
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
     )}
    </>
  );
}

export default Show;
