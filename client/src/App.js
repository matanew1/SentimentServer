import './App.css';
import Home from './components/pages/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/pages/Login';
import Profile from './components/pages/Profile'
import Signup from './components/pages/Signup';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
