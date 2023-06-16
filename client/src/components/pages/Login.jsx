import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "axios";
import styles from "../styles/styles.jsx";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const loginUser = () => {
      const body = {
        name,
        password,
        email,
      };

      axios
        .post("http://localhost:8080/login", JSON.stringify(body), {
          withCredentials: true, // Include cookies in the request
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("User logged in");
            updateUser(res.data);
            getTodoByUserId(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("User not found");
          } else if (err.response.status === 400) {
            setError("User input is incorrect");
          } else {
            setError("Server error");
          }
        });
    };

    const getTodoByUserId = (user) => {
      axios
        .get(`http://localhost:8080/todo/${user._id}`)
        .then((res) => {
          if (res.status === 200) {
            navigate("/profile", { state: { user: user, todo: res.data } });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loginUser();
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Typography variant="h2" color="primary" style={styles.heading}>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          margin="normal"
          style={styles.textField}
          InputLabelProps={{
            style: styles.inputLabel,
          }}
          InputProps={{
            style: styles.input,
          }}
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
          style={styles.textField}
          InputLabelProps={{
            style: styles.inputLabel,
          }}
          InputProps={{
            style: styles.input,
          }}
        />
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          margin="normal"
          style={styles.textField}
          InputLabelProps={{
            style: styles.inputLabel,
          }}
          InputProps={{
            style: styles.input,
          }}
        />
        <Button variant="contained" color="secondary" style={styles.button}>
          <Link to={"/"}>Go Back</Link>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.button}
        >
          Submit
        </Button>
        {error ? (
          <Typography variant="h6" color="error" style={styles.heading}>
            Error: {error}
          </Typography>
        ) : null}
      </form>
    </Container>
  );
};

export default Login;
