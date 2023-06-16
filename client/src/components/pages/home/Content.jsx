import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Grid,
  Divider,
  ListItemText,
  ListItem,
  List,
  TextField,
  CircularProgress,
} from "@mui/material";

const Content = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const baseUrl = "http://localhost:8080";

  const handleTextChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  useEffect(() => {
    //TODO: get all results
  }, [])
  

  const processText = () => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/sense`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
        setResult(response);
        setError("");
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const primaryRes = result ? (
    <Typography variant="h5" color="inital">
      Sentence: {result.sentence}
    </Typography>) : ("")
  const secondaryRes = result ? (
      <Typography variant="h7" color="inherit">
        Sentiment: {result.sentiment}
        Compound: {result.compound}
      </Typography>) : ("")

  return (
    <Container >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField label="Text" value={text} onChange={handleTextChange} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={processText}
            disabled={loading || text === ""}
          >
            {loading ? <CircularProgress size={24} /> : "Process"}
          </Button>
        </Grid>{error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" color="initial">
            Last Results:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List sx={{ width: "100%", bgcolor: "transparent" }}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={primaryRes} secondary={secondaryRes}/>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
