import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../../SubComponents/Snackbar.tsx";
import styles from './signup.module.css';
import { fetchApi } from "../../Utils/fetchApi.ts";
import { SignUpObj } from "../../Utils/Types.tsx";

function Signup() {
  const navigate = useNavigate();
  const [snackBarMsg, setSnackBarMsg] = useState<string>("")
  const handleSignup = async (values: SignUpObj) => {
    const results = await fetchApi(
      "POST",
      values,
      `https://posapp.onrender.com/auth/signup`
    );
    if (results.message == "user is already exist") {
      setSnackBarMsg("user is already exist");
    } else if (results.message == "user created") {
      setSnackBarMsg("user created, see your email");
      navigate("/login");
    } else {
      setSnackBarMsg(results.message)
    }
  };

  return (
    <Box className={styles.signupPage} >
      <Box className={styles.signupCard} sx={{width: { xs: "95%", sm: "80%", md: "60%" }, maxWidth:"500px"}}>
      <Typography className={styles.signUpTitle} variant="h6" component="h6" sx={{ pb: "10px" }}>
        Register
      </Typography>
      <Formik
        initialValues={{ userName: "", email: "", password: "", cPassword: "" }}
        validate={(values) => {
          const errors = {
            userName: "",
            email: "",
            password: "",
            cPassword: "",
          };
          if (!values.userName) {
            errors.userName = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.cPassword) {
            errors.cPassword = "Required";
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
              handleSignup(values);
              values.userName = "";
              values.email = "";
              values.password = "";
              values.cPassword = "";
            }}
          >
            <TextField 
              id="userName"
              sx={{
                maxWidth: "400px",
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
              }}
              className={styles.inputField}
              variant="filled"
              label="User Name"
              type="userName"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ pb: "10px", fontSize: "12px", color: "red" }}
            >
              {errors.userName && touched.userName && errors.userName}
            </Typography>
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
            <TextField
              id="cPassword"
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
                maxWidth: "400px",
              }}
              className={styles.inputField}
              variant="filled"
              label="Confirm Password"
              type="password"
              name="cPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cPassword}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ pb: "10px", fontSize: "12px", color: "red" }}
            >
              {errors.cPassword && touched.cPassword && errors.cPassword}
            </Typography>
            <Button
              type="submit"
              sx={{ width: "80%", maxWidth: "140px", my:"10px", color:"white" }}
              variant="contained"
              disabled={
                !values.userName.length ||
                !values.email.length ||
                !values.password.length ||
                !values.cPassword.length
              }
            >
              Signup
            </Button>
          </form>
        )}
      </Formik>
      </Box>
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </Box>
  );
}

export default Signup;
