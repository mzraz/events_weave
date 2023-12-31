import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link as Link2 } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Facebook from "../../assets/Facebook.svg"
import Google from "../../assets/Google.svg"
import Apple from "../../assets/Apple.svg"
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import { registerUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Register = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(true)
  const [severity, setSeverity]= useState("success")

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("name"),
      email: data.get("email"),
      role_id: data.get("type"),
      password: data.get("password"),
    }

    dispatch(registerUser(body)).unwrap()
      .then((data) => {
        setMessage("Email send Verify it!")
        setSeverity("success")
        setOpen(true)
      }).catch((errMsg) => {
        setMessage(errMsg)
        setSeverity("error")
        setOpen(true)
      })
  };

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = window.innerWidth;

      if (newWidth >= 600) {
        setShow(true)
      }
      else {
        setShow(false)
      }

    };
    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    };

  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 0,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              sm={6}
              md={6}
              lg={6}
              sx={{
                backgroundColor: "#8B26C9",
                display: { xs: 'none', sm: 'flex' },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"

              }}>
                <Typography mb={3} color={"white"} component="h1" variant="h4" fontWeight={500}>
                  Come join us!
                </Typography>
                <Typography
                  width={"70%"}
                  textAlign={"center"}
                  color={"white"}
                  mb={3}
                >

                  We are so excited to have you here.If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.
                </Typography>
                <Link2 to="/login">
                  <Typography color={"white"} px={4} py={1} borderRadius={10} backgroundColor={"#AF75D2"}>
                    Already have an account? Signin
                  </Typography>
                </Link2>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              component={show ? Paper : 'div'}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                mx={{ xs: 4, lg: 12 }}
              // mb={4}
              >
                <Typography component="h1" variant="h4" fontWeight={500}>
                  SignUp
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1, width: "100%", sm: { width: "70%" } }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    // autoComplete="email"
                    autoFocus
                    color="secondary"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="secondary"
                    sx={{ marginBottom: 3 }}

                  />
                  <TextField
                    id="type"
                    select
                    label="Select Type"
                    defaultValue={1}
                    // helperText="Please select your currency"
                    fullWidth
                    color="secondary"
                    name="type"

                  >
                    <MenuItem selected key={1} value={1}>
                      User
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      Service Provider
                    </MenuItem>
                  </TextField>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    // autoComplete="current-password"
                    color="secondary"
                  />
                  {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    // autoComplete="current-password"
                    color="secondary"
                  /> */}
                  {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#8B26C9" }}
                  >
                    SignUp
                  </Button>
                  <Grid container sx={{ display: { md: 'none' } }}>
                    <Grid item xs>

                    </Grid>
                    <Grid item>
                      <Link2 to="/login">
                        <Link variant="body2">
                          Already have an account? Signin
                        </Link>
                      </Link2>
                    </Grid>
                  </Grid>

                </Box>
                <Typography component="p" sx={{ mt: 3, mb: 2 }}>
                  or SignUp with
                </Typography>
                <Stack direction="row" spacing={2}>
                  <img src={Facebook} style={{ cursor: "pointer" }} />
                  <img src={Google} style={{ cursor: "pointer" }} />
                  <img src={Apple} style={{ cursor: "pointer" }} />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;