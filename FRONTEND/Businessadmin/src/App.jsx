import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage"
import Dashboard from './components/Dashboard/Dashboard';
const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
    
  )
}

export default App