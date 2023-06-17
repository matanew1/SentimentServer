import React, { useEffect, useState, useContext } from "react";
import Footer from '../../footer/Footer'
import Header from '../../header/Header';
import Content from './Content';
import { Grid } from '@mui/material';
import axios from 'axios';
import { StatusContext } from '../../context/StatusContext';

const Home = () => {
  const { isRecents } = useContext(StatusContext);
  const [results, setResults] = useState(null);
  const baseURL = "http://localhost:8080";

  useEffect(() => {
    getResults();
  });

  const setFavorite = (id) => {
    axios.put(`${baseURL}/results/update/${id}`)
    .then((response) => console.log('Updated Successfully'))
    .catch((error) => console.error(error));
  };

  const getResults = () => {
    axios.get(`${baseURL}/results`)
    .then((response) => {
      if(Array.isArray(response.data))
        if(isRecents === false) { // favorites results
          const favorites = response.data.filter(res => res.favorite === true);
          setResults([...favorites]);
        } else {
          setResults(response.data)
        }
    })
    .catch((error) => console.error(error));
  }

  const removeResult = (id) => {
    axios.delete(`${baseURL}/results/delete/${id}`)
    .then((response) => console.log('Delete Successfully'))
    .catch((error) => console.error(error));
  };

  return (
    // <Container>
      <Grid container direction="column" spacing={12}>
        <Grid item><Header /></Grid>
        <Grid item><Content results={results} removeResult={removeResult} setFavorite={setFavorite} /></Grid>
        <Grid item><Footer /></Grid>
      </Grid>
    // </Container>
  );
};

export default Home;
