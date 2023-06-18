import React, { useState, useContext } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StatusContext } from "../../context/StatusContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const TextSense = ({ results, removeResult, setFavorite }) => {
  const [text, setText] = useState("");
  const { isRecents } = useContext(StatusContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = "http://localhost:8080";

  const handleTextChange = (event) => {
    setText(event.target.value);
    setError("");
  };

  const processText = () => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/sense`,
        { text },
        { headers: { "TextSense-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
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

  const theme = createTheme({
    typography: {
      fontFamily: 'Calibri-Light',
      fontSize: 28,
      fontWeight: 600,
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Text To Mood
        </Typography>
        </Grid>
      </ThemeProvider><br/>
      <Container
        sx={{
          padding: "50px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          backdropFilter: "blur(5px)",
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h6">Enter sentence:</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField sx={{minWidth: "100%"}} label="Enter text here..." value={text} onChange={handleTextChange} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={processText}
              disabled={loading || text === ""}
            >
              {loading ? <CircularProgress size={24} /> : "Process"}
            </Button>&nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => setText("")}
              disabled={text === ""}
            >
              Clear
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>

        <Grid
          sx={{
            padding: "30px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            backdropFilter: "blur(5px)",
          }}
          container
          justifyContent="center"
          spacing={2}
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12}>
            {results && results.length > 0 && (
              <>
                <Grid item xs={12}>
                  {isRecents ? (
                    <Typography variant="h6">Recents:</Typography>
                  ) : (
                    <Typography variant="h6">Favorites:</Typography>
                  )}
                </Grid>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sentence</TableCell>
                        <TableCell>Sentiment</TableCell>
                        <TableCell>Favorite</TableCell>
                        <TableCell>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results &&
                        results.map((result) => (
                          <TableRow key={result.sentence}>
                            <TableCell>{result.sentence}</TableCell>
                            <TableCell>{result.sentiment}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => setFavorite(result._id)}
                              >
                                <FavoriteIcon
                                  sx={{
                                    color: result.favorite ? "red" : "",
                                  }}
                                />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => removeResult(result._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TextSense;
