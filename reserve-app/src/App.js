import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Client/Navbar'
import Ho1 from './Client/Screens/HomeScroll'
import Admin from './Client/Screens/Admin'
import Bo1 from './Client/TicketEntry/BookTab'
import Ty from './Client/Screens/TypeScreen'
import Ad from './Client/Screens/Ads'
import His from './Client/Screens/History'
import Up from './Client/AdminPanel/Update'
import Del from './Client/AdminPanel/Delete'
import No from './Client/NoMatch'


function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Ho1 />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/movie/:id' element={<Bo1 />} />
          <Route path='/explore/home/:city' element={<Ty />} />
          <Route path='/explore/Ads' element={<Ad />} />
          <Route path='/profile' element={<His />} />
          <Route path='/cart/Update/:id' element={<Up />} />
          <Route path='/cart/Delete/:id' element={<Del />} />
          <Route path='*' element={<No/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
