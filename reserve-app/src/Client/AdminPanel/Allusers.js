import React, { useState, useEffect } from 'react';
import './Style.css'

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/getallUsers')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      setUsers(json);
    });
  }, []);

  return (
    <>
   <div className='row'> 
     <div className="col-md-12">
      <table className='table table-dark table-bordered'>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody style={{color:"black"}}>
        {
        users && Array.isArray(users) && users.map(item => (
       <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{users.isAdmin ? 'Yes':'No'}</td>
  </tr>
))
       }
        </tbody>
      </table>
    </div>
     </div> 
  </>

  );
}

export default AllUsers;
