/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Footer from '../../footer/Footer'
import Header from '../../header/Header';
import TextSense from './TextSense';
import { Grid } from '@mui/material';
import axios from 'axios';
import { StatusContext } from '../../context/StatusContext';
import { Routes, Route} from 'react-router-dom';
import Menu from '../menu/Menu'
import Video from '../../video/Video';



const Home = () => {
  const { isRecents } = useContext(StatusContext);
  const [results, setResults] = useState(null);
  const baseURL = "http://localhost:8080";

  useEffect(() => {
    getResults();
  },[isRecents]);

  const setFavorite = (id) => {
    axios.put(`${baseURL}/results/update/${id}`)
    .then((response) => getResults())
    .catch((error) => console.error(error));
  };

  const getResults = () => {
    axios.get(`${baseURL}/results`)
    .then((response) => {
      if(Array.isArray(response.data)) {
        if(isRecents === false) { // favorites results
          const favorites = response.data.filter(res => res.favorite === true);
          setResults([...favorites]);
        } else {
          setResults(response.data)
        }
      }
    })
    .catch((error) => console.error(error));
  }

  const removeResult = (id) => {
    axios.delete(`${baseURL}/results/delete/${id}`)
    .then((response) => getResults())
    .catch((error) => console.error(error));
  };

  return (
      <Grid container direction="column" spacing={12}>
        <Video />
        <Grid item><Header /></Grid>
          <Routes>
            <Route path="/" element={<Grid item><Menu /></Grid>} />
            <Route path="/sense" element={<Grid item><TextSense getResults={getResults} results={results} removeResult={removeResult} setFavorite={setFavorite}/></Grid>} />
            {/* <Route path="/Summary" element={<TextSummary />} /> */}
          </Routes>
        <Grid item><Footer /></Grid>
      </Grid>
  );
};

export default Home;
