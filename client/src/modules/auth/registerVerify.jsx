import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link as Link2, useNavigate } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { verifyEmail } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function VerifyEmail() {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("success")

    const [isVerified, setVerified] = useState(false)
    

    const { token } = useParams();

    useEffect(() => {
        dispatch(verifyEmail({ token })).unwrap()
            .then((data) => {
                setVerified(true)
                setMessage("Verified!")
                setSeverity("success")
                setOpen(true)
                navigate("/login")

            }).catch((errMsg) => {
                setMessage("Verification failed")
                setSeverity("error")
                setOpen(true)
            })
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            { !isVerified &&
                <Container component="main" maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography fontWeight={500}>
                        Verification Failed.
                    </Typography>
                    {/* <Link2 to="/forgetPassword" >
                        <Link variant="body2" sx={{ ml: 2 }}>
                            Send Email again?
                        </Link>
                    </Link2> */}
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