import React, { useEffect, useState } from "react";
import Footer from '../../footer/Footer'
import Header from '../../header/Header';
import Content from './Content';
import { Container, Grid } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [results, setResults] = useState(null);
  const baseURL = "http://localhost:8080";

  useEffect(() => {
    getResults();
  }, [results]);

  const getResults = () => {
    axios.get(`${baseURL}/results`)
    .then((response) => setResults(response.data))
    .catch((error) => console.error(error));
  }

  const removeResult = (id) => {
    axios.delete(`${baseURL}/results/delete/${id}`)
    .then((response) => console.log('Delete Successfully'))
    .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Grid container direction="column" spacing={12}>
        <Grid item><Header /></Grid>
        <Grid item><Content results={results} removeResult={removeResult} /></Grid>
        <Grid item><Footer /></Grid>
      </Grid>
    </Container>
  );
};

export default Home;
