import React, { useState, useEffect } from 'react';
import Load from '../Loader/load'
import './Style.css'

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/users/getallUsers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setUsers(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden"><Load/></span>
        </div>
      ) : error ? (
        <h5>Error: {error.message}</h5>
      ) : (
        <div className='row'>
          <div className="col-md-12">
            <table className='table table-dark table-bordered' id="table">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                </tr>
              </thead>
              <tbody style={{ color: "black" }}>
                {users && Array.isArray(users) && users.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.isAdmin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default AllUsers;
