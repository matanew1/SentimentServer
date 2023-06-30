import React from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Button, Grid } from "@mui/material";

const Menu = () => {
  const navigate = useNavigate();

  const redirectToSensePage = (event) => {
    event.preventDefault();
    navigate('/sense');
  };

  const redirectToSummaryPage = (event) => {
    event.preventDefault();
    navigate('/summary');
  };

  const containerStyles = {
    padding: "50px",
    background: "transparent",
    borderRadius: "10px",
    backdropFilter: "blur(5px)",
  };

  const buttonStyles = {
    padding: "20px",
    width: "400px",
    height: "200px",
    color: "black",
    fontWeight: "bold",
    background: "transparent",
    "&:hover": {
      backgroundColor: "pink",
    },
  };

  return (
    <Container sx={containerStyles}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button sx={buttonStyles} variant="contained" color="primary" onClick={redirectToSensePage}>
            Text 2 Sense
          </Button>
        </Grid>
        <Grid item>
          <Button sx={buttonStyles} variant="contained" color="primary" onClick={redirectToSummaryPage}>
            Text 2 Summary
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Menu;
