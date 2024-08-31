import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home'
import LoginUser from './pages/LoginUser';
import Unauthorized from './pages/Unauthorized';
import UserDashboard from './pages/UserDashboard';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/user-login" element={<LoginUser />}/>
        <Route path="/user-profile" element={<UserDashboard />}/>
        <Route path="/unauthorized" element={<Unauthorized />}/>
      </Routes>
    </Router>

  );
}

export default App
