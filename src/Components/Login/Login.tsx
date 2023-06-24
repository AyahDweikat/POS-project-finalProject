/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { fetchApi } from "./../fetchApi.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { GlobalContext } from "../../Context/context.tsx";
import { LoginObj } from './../Types';

function Login() {
  const navigate = useNavigate();
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
    }
  };

  return (
    <>
      <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
        Login Forum 
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
          // isSubmitting,
          /* and other goodies */
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
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              label="Email"
              variant="outlined"
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
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              label="Password"
              variant="outlined"
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
              sx={{ width: "80%", maxWidth: "140px" }}
              variant="outlined"
              disabled={!values.email.length || !values.password.length}
            >
              Add
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Login;
