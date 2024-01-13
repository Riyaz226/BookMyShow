import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Client/Navbar'
import Ho1 from './Client/Screens/HomeScroll'
import Admin from './Client/AdminPanel/Admin'
import Bo1 from './Client/TicketEntry/BookTab'
import Ty from './Client/Screens/TypeScreen'
import Ad from './Client/Screens/HomeAds'
import Us from './Client/Screens/Profile'
import Up from './Client/AdminPanel/Update'
import No from './Client/NoMatch'
import Com from './Client/TicketEntry/CommandSec'
import Tic from './Client/TicketEntry/Recieve'

import store from './store'
import { Provider } from 'react-redux';


function App() {
  return (
    <>
  <Provider store={store}>
    <Router>
        <Nav />
        <Routes>
          <Route path='*' element={<No/>} />
          <Route path='/' element={<Ho1 />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/city/movies/:movieId' element={<Bo1 />} />
          <Route path='/explore/home/:district_name' element={<Ty />} />
          <Route path='/explore/Ads/:id' element={<Ad />} />
          <Route path='/profile' element={<Us />} />
          <Route path='/city/movie/:movieId/user-reviews' element={<Com />} />
          <Route path='/buytickets/:name/movie-tric-ET00337321-MT/20231231' element={<Tic />} />

              <Route path='/cart/Update/:id' element={<Up />} />
           
        </Routes>
      </Router>
</Provider>
    </>
  );
}

export default App;
