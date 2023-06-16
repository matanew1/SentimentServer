import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import axios from "axios";
import styles from "../styles/styles.jsx";
import { UserContext } from "../context/UserContext.jsx";

const Signup = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    const createUser = () => {
      const body = {
        name,
        password,
        email,
      };

      axios
        .post("http://localhost:8080/users", JSON.stringify(body), {
          withCredentials: true, // Include cookies in the request
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status === 201) {
            console.log("User signup");
            updateUser(res.data);
            createTodo(res.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.response.status === 409) {
            setError("User already exists");
          } else {
            setError("Something went wrong");
          }
        });
    };

    const createTodo = (user) => {
      console.log("data", user);
      const todoBody = {
        name: user.name,
        owner: user._id,
        tasks: [],
      };

      console.log(todoBody);
      axios
        .post("http://localhost:8080/todo", JSON.stringify(todoBody), {
          //withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status === 201) {
            console.log("Created user");
            navigate("/profile", { state: { user: user, todo: res.data } });
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err.response.status === 409) {
            setError("User already exists");
          } else {
            setError("Something went wrong");
          }
        });
    };

    createUser();
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Typography variant="h2" color="primary" style={styles.heading}>
        Sign Up
      </Typography>
      <form onSubmit={handleSignup}>
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

export default Signup;
