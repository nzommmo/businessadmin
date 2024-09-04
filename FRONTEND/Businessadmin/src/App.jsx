import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage"
import Dashboard from './components/Dashboard/Dashboard';
import Admin from './components/SuperUser/admin';
import Waitlist from './components/Waitlist/Waitlist';
const App = () => { 
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Waitlist' element={<Waitlist/>}/>
    </Routes>
  </Router>
    
  )
}

export default App