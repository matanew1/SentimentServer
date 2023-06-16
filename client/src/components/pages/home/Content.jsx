import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


const Content = ({ results, removeResult }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:8080";

  const handleTextChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  const processText = () => {
    setLoading(true);
    axios.post(`${baseUrl}/sense`,{ text }, { headers: { "Content-Type": "application/json" }})
    .then((response) => {console.log(response.data); setError("");})
    .catch((error) => { setError("An error occurred. Please try again."); console.log(error) })
    .finally(() => { setLoading(false) });
  };

  return (
    <Container>
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
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          {results && results.length > 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sentence</TableCell>
                    <TableCell>Sentiment</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results && results.map((result) => (
                    <TableRow key={result.sentence}>
                      <TableCell>{result.sentence}</TableCell>
                      <TableCell>{result.sentiment}</TableCell>
                      <TableCell><IconButton aria-label="delete" onClick={() => removeResult(result._id)}>
                        <DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
