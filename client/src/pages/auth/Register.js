import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/cursorStyles.css";
import "../../styles/errorStyles.css";
import "../../styles/successStyles.css";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import toast from "react-hot-toast";
import { register } from "../../Api/serverAPI";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const [UserName, setUsername] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    const inputUserName = e.target.value;
    setUsername(inputUserName);
  };
  const handleFirstNameChange = (e) => {
    const inputFirstName = e.target.value;
    setFirstName(inputFirstName);
  };
  const handleLastNameChange = (e) => {
    const inputLastName = e.target.value;
    setLastName(inputLastName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserName || !Password) {
      toast.error("Invalid Entry");
    }

    try {
      const response = await register(FirstName, LastName, UserName, Password);

      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/");
      }

      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err?.response?.status === 409) {
        toast.error("Username Already exists");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={UserName}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
            value={FirstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            autoFocus
            value={LastName}
            onChange={handleLastNameChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={Password}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!UserName || !Password || !FirstName || !LastName}
            endIcon={<PersonAddIcon />}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => navigate("/")}
                className="link-cursor"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
