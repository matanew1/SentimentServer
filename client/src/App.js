import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import { Container } from '@mui/material';
import Video from './components/video/Video';

function App() {
  return (
    <Container>
      <Video />
      <Container className="content-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </Container>
  );
}

export default App;
