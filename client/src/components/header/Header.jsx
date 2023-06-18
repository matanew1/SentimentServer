import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";

const Header = () => {
  // State for menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // Event handler for opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Event handler for closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoSrc = "logo.png";
  const logoAlt = "LOGO";
  const mailto = "mailto:matanew1@gmail.com";

  return (
    <AppBar
      sx={{
        padding: "5px",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
      color="transparent"
      elevation={0}
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <Toolbar>
        {/* Grid container to structure the header */}
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            spacing={1}
          >
            <Grid item>
              {/* Logo */}
              <Box display="flex" alignItems="center" gap="20px">
                <img className="logo" src={logoSrc} alt={logoAlt} />
              </Box>
            </Grid>
            {/* Menu items */}
            <Grid item sx={{ display: { xs: "none", md: "block" } }}>
              <Button
                component={Link}
                to="/"
                style={{ fontWeight: "bold", color: "inherit" }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to={mailto}
                style={{ fontWeight: "bold", color: "inherit" }}
              >
                Contact
              </Button>
            </Grid>
            {/* Hamburger menu */}
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                style={{ fontWeight: "bold", color: "inherit" }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              {/* Menu component */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* Menu items */}
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={mailto}
                  onClick={handleMenuClose}
                >
                  Contact
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
