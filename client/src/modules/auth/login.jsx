import React, { useState, useEffect } from "react";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Facebook from "../../assets/Facebook.svg"
import Google from "../../assets/Google.svg"
import Apple from "../../assets/Apple.svg"
import { loginUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import MenuItem from '@mui/material/MenuItem';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SignIn() {
    const dispatch= useDispatch()
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)
    const [severity, setSeverity]= useState("success")

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get("email"),
            password: data.get("password"),
            // user_type: data.get("type"),
        }

        dispatch(loginUser(body)).unwrap()
            .then((data) => {
                setMessage("Login Successfully!")
                setSeverity("success")
                setOpen(true)

            }).catch((errMsg) => {
                setMessage(errMsg)
                setSeverity("error")
                setOpen(true)
                console.log(err)
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
                                    my: 8,
                                    // mx: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                                mx={{ xs: 4, lg: 12 }}
                            >
                                <Typography component="h1" variant="h4" fontWeight={500}>
                                    SignIn
                                </Typography>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={handleSubmit}
                                    sx={{ mt: 1, width: "95%", sm: { width: "70%" } }}
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        color="success"
                                        sx={{ marginBottom: 3 }}
                                    />
                                    {/* <TextField
                                        id="type"
                                        select
                                        label="Select Type"
                                        defaultValue={1}
                                        // helperText="Please select your currency"
                                        fullWidth
                                        color="success"
                                        name="type"

                                    >
                                        <MenuItem selected key={1} value={1}>
                                            User
                                        </MenuItem>
                                        <MenuItem key={2} value={2}>
                                            Service Provider
                                        </MenuItem>
                                    </TextField> */}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        color="success"
                                    />
                                    {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    /> */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        sx={{ mt: 3, mb: 2, backgroundColor: "#1BB20F" }}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link2 to="/forgetPassword">
                                                <Link variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Link2>
                                        </Grid>
                                        <Grid item>
                                            <Link2 to="/register" >
                                                <Link variant="body2" sx={{ display: { sm: 'none' }, fontSize: 12 }}>
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Link2>

                                        </Grid>
                                    </Grid>

                                </Box>
                                <Typography component="p" sx={{ mt: 3, mb: 2 }}>
                                    or SignIn with
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <img src={Facebook} style={{ cursor: "pointer" }} />
                                    <img src={Google} style={{ cursor: "pointer" }} />
                                    <img src={Apple} style={{ cursor: "pointer" }} />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            md={6}
                            lg={6}
                            sx={{
                                backgroundColor: "#1BB20F",
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
                                    Welcome Back!
                                </Typography>
                                <Typography
                                    width={"70%"}
                                    textAlign={"center"}
                                    color={"white"}
                                    mb={3}
                                >

                                    Welcome back!  We are so happy to have you
                                    here. It’s great to see you again. We hope you
                                    had a safe and enjoyable time away
                                </Typography>
                                <Link2 to="/register">
                                    <Typography color={"white"} px={4} py={1} borderRadius={10} backgroundColor={"#8CD786"}>
                                        No account yet? Signup
                                    </Typography>
                                </Link2>
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