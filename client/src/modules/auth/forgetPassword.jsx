import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link as Link2 } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forgotPassword } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ForgetPassword() {
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
        }

        dispatch(forgotPassword(body)).unwrap()
            .then((data) => {
                setMessage("Email Sent Successfully!")
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
                        <Grid item xs={1} lg={3} md={3} sm={2}/>
                        <Grid
                            item
                            xs={10}
                            sm={8}
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
                                    Forgot Password
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
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        sx={{ mt: 3, mb: 1, backgroundColor: "#1BB20F" }}
                                    >
                                        Send Email
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link2 to="/login">
                                                <Link variant="body2">
                                                    Login?
                                                </Link>
                                            </Link2>
                                        </Grid>
                                        <Grid item>
                                            {/* <Link2 to="/register" >
                                                <Link variant="body2" sx={{ display: { sm: 'none' }, fontSize: 12 }}>
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Link2> */}

                                        </Grid>
                                    </Grid>

                                </Box>
                                
                            </Box>
                        </Grid>
                        {/* <Grid
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
                        </Grid> */}

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