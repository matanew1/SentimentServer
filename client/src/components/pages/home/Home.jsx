import React from 'react';
import Footer from '../../footer/Footer'
import Header from '../../header/Header';
import Content from './Content';
import { Container, Grid } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Grid container direction="column" spacing={12}>
        <Grid item><Header /></Grid>
        <Grid item><Content /></Grid>
        <Grid item><Footer /></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
