import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import { Container } from '@mui/material';
import Video from './components/video/Video';
import { StatusProvider } from './components/context/StatusContext.jsx';

function App() {
  return (
    <Container>  
      <StatusProvider>   
        <Video />
        <Container className="content-container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
        </Container>
      </StatusProvider>
    </Container>
  );
}

export default App;
