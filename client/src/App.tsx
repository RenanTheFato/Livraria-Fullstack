import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginUser from './pages/LoginUser';
import LoginPublisher from './pages/LoginPublisher';
import Unauthorized from './pages/Unauthorized';
import UserDashboard from './pages/UserDashboard';
import UserHistory from './pages/UserHistory';
import UserNotify from './pages/UserNotify';
import UserOrders from './pages/UserOrders';
import UserVotes from './pages/UserVotes';
import PublisherDashboard from './pages/PublisherDashboard';
import PublisherNotify from './pages/PublisherNotify';
import PublisherCash from './pages/PublisherCash';
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
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/user-profile" element={<UserDashboard />}>
          <Route path="user-history" element={<UserHistory />} />
          <Route path="user-notify" element={<UserNotify />} />
          <Route path="user-orders" element={<UserOrders />} />
          <Route path="user-votes" element={<UserVotes />} />
        </Route>

        <Route path="/publisher-profile" element={<PublisherDashboard />}>
          <Route path="form-book" element={<CreateBookForm />} />
          <Route path="publisher-notify" element={<PublisherNotify />} />
          <Route path="publisher-cash" element={< PublisherCash/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
