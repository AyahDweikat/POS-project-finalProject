/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { fetchApi } from "./../fetchApi.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from "../../Context/context.tsx";
import { LoginObj } from './../Types';
import styles from './login.module.css';
import { Box } from '@mui/material';
import { useState } from 'react';
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";



function Login() {
  const navigate = useNavigate();
  const [snackBarMsg, setSnackBarMsg] = useState<string>("")
  const {auth} = useContext(GlobalContext);
  const handleLogin = async (values: LoginObj) => {
    const results = await fetchApi(
      "POST",
      values,
      `https://posapp.onrender.com/auth/signin`
    );
    if (results.message == "user is found") {
      localStorage.setItem("token", results.token);
      auth.setToken(results.token)
      navigate('/Carts');
    } else {
      setSnackBarMsg(results.message)
    }
  };
  return (
    <Box className={styles.loginPage}>
      <Box className={styles.loginCard} sx={{width: { xs: "95%", sm: "80%", md: "60%" }, maxWidth:"500px"}}>
      <Typography className={styles.loginTitle} variant="h6" component="h6" sx={{ pb: "10px" }}>
        Login  
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {
            email: "",
            password: "",
          };
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              handleLogin(values);
              values.email = "";
              values.password = "";
            }}
          >
            <TextField
              id="email"
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
                maxWidth: "400px",
              }}
              className={styles.inputField}
              variant="filled"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ pb: "10px", fontSize: "12px", color: "red" }}
            >
              {errors.email && touched.email && errors.email}
            </Typography>
            <TextField
              id="password"
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
                maxWidth: "400px",
              }}
              className={styles.inputField}
              variant="filled"
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ pb: "10px", fontSize: "12px", color: "red" }}
            >
              {errors.password && touched.password && errors.password}
            </Typography>
            <Button
              type="submit"
              sx={{ width: "80%", maxWidth: "140px", my:"10px", color:"white" }}
              variant="contained"
              disabled={!values.email.length || !values.password.length}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
      </Box>
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </Box>
  );
}

export default Login;
