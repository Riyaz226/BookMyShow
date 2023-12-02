import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Nav from './Client/Navbar'
import Ho1 from './Client/Screens/HomeScroll'
import Admin from './Client/Screens/Admin'
import Bo1 from './Client/Screens/BookTab'
import Ty from './Client/Screens/TypeScreen'

function App() {
  return (
    <>
     <Router>
      <Nav/>  
     <Routes>
           <Route path='/' element={<Ho1/>}/>
           <Route path='/admin' element={<Admin/>}/>
           <Route path='/movie/:id' element={<Bo1/>}/>
           <Route path='/explore/home/:city' element={<Ty/>}/>
        </Routes>    
    </Router> 
  
    </>
  );
}

export default App;
