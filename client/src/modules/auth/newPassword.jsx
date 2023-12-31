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
import { Link as Link2, useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { verifyToken, newPassword } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function NewPassword() {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)
    const [severity, setSeverity] = useState("success")

    const [isVerified, setVerified] = useState(false)
    

    const { token } = useParams();

    useEffect(() => {
        dispatch(verifyToken({ token })).unwrap()
            .then((data) => {
                setVerified(true)
                setMessage("Verified!")
                setSeverity("success")
                setOpen(true)

            }).catch((errMsg) => {
                setMessage("Verification failed")
                setSeverity("error")
                setOpen(true)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            password: data.get("password"),
            confirmPassword: data.get("confirmPassword"),
            token
        }
        console.log("body-----", body)

        if (body.password != body.confirmPassword) {
            setMessage("Confirm Password not matched")
            setSeverity("error")
            setOpen(true)
            return;
        }

        dispatch(newPassword(body)).unwrap()
            .then((data) => {
                setMessage("Password reset successfully!")
                setSeverity("success")
                setOpen(true)
                setTimeout(() => {
                    navigate("/login")
                }, 500);

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
            {isVerified ?
                <Container component="main" maxWidth="lg">
                    <Box
                        sx={{
                            marginTop: 0,
                        }}
                    >
                        <Grid container>
                            <CssBaseline />
                            <Grid item xs={1} lg={3} md={3} sm={2} />
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
                                        New Password
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
                                            id="password"
                                            label="New Password"
                                            name="password"
                                            // autoComplete="email"
                                            type="password"
                                            autoFocus
                                            color="success"
                                            sx={{ marginBottom: 3 }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            // autoComplete="email"
                                            type="password"
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
                                            Submit
                                        </Button>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container> :
                <Container component="main" maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography fontWeight={500}>
                        You are not verified.
                    </Typography>
                    <Link2 to="/forgetPassword" >
                        <Link variant="body2" sx={{ ml: 2 }}>
                            Send Email again?
                        </Link>
                    </Link2>
                </Container>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}