import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginUser from './pages/LoginUser';
import LoginPublisher from './pages/LoginPublisher';
import Unauthorized from './pages/Unauthorized';
import UserDashboard from './pages/UserDashboard';
import UserHistory from './pages/UserHistory';
import BookPage from './pages/BookPage';
import CreateBookForm from './pages/CreateBookPage';
import SearchResultsPage from './pages/SearchPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/book/:id" element={<BookPage />}/>
        <Route path="/user-login" element={<LoginUser />} />
        <Route path="/publisher-login" element={<LoginPublisher />}/>
        <Route path="/form-book" element={<CreateBookForm />}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/user-profile" element={<UserDashboard />}>
          <Route path="user-history" element={<UserHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
