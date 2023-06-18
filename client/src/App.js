import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Home from './components/pages/home/Home';
import { Container } from '@mui/material';
import { StatusProvider } from './components/context/StatusContext.jsx';

function App() {
  return (
    <StatusProvider>
      <BrowserRouter>
        <Container>
          <Container className="content-container">
            <Home />
          </Container>
        </Container>
      </BrowserRouter>
    </StatusProvider>
  );
}

export default App;
