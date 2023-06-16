import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import styles from '../styles/styles.jsx'

const Home = () => {
  return (
    <Container maxWidth="sm" style={styles.container}>
      <Typography variant="h2" color="primary" style={styles.heading}>
        Home
      </Typography>
      <Button variant="contained" color="primary" style={styles.button}>
        <Link to={'/login'}>
          <h1>Login</h1>
        </Link>
      </Button>
      <Button variant="contained" color="secondary" style={styles.button}>
        <Link to={'/signup'}>
          <h1>Signup</h1>
        </Link>
      </Button>
    </Container>
  );
};

export default Home;
