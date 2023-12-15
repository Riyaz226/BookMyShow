import React, { useEffect } from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/Lo';
    }
  }, [user]);
  if (!user) {
    return null; 
  }

  return (
    <>
      <div className=''>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</h2>
      </div>
    </>
  );
}

export default Profile;
