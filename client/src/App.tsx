import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home'
import LoginUser from './pages/LoginUser';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/user-login" element={<LoginUser />}/>
      </Routes>
    </Router>

  );
}

export default App
