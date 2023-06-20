import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { fetchApi } from "./../fetchApi.ts";
import { useNavigate } from "react-router-dom";

interface SignUpObj {
  userName: string;
  email: string;
  password: string;
  cPassword: string;
}

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (values: SignUpObj) => {
    const results = await fetchApi(
      "POST",
      values,
      `https://posapp.onrender.com/auth/signup`
    );
    if (results.message == "user is already exist") {
      console.log("user is already exist");
    } else if (results.message == "user created") {
      navigate("/login");
    }
  };

  return (
    <>
      <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
        Add Units of Measure Form
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
          // isSubmitting,
          /* and other goodies */
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
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              label="User Name"
              variant="outlined"
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
            <TextField
              id="cPassword"
              sx={{
                width: { xs: "85%", sm: "70%", md: "50%" },
                maxWidth: "400px",
              }}
              label="Confirm Password"
              variant="outlined"
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
              sx={{ width: "80%", maxWidth: "140px" }}
              variant="outlined"
              disabled={
                !values.userName.length ||
                !values.email.length ||
                !values.password.length ||
                !values.cPassword.length
              }
            >
              Add
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default Signup;
