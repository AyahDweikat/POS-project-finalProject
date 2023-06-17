// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import { useState } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, IconButton, TextField } from "@mui/material";
import { Formik, useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";

interface unitObj {
  _id: string;
  unitMeasure: string;
  baseUnit: string;
  conversionFactor: number;
}
interface InputsObj {
  unitMeasure: string;
  baseUnit: string;
  conversionFactor: number;
}
function createData(
  _id: string,
  unitMeasure: string,
  baseUnit: string,
  conversionFactor: number
) {
  return { _id, unitMeasure, baseUnit, conversionFactor };
}

// const validationSchema = yup.object({
//   email: yup
//     .string('Enter your email')
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });
export default function Units() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const navigate= useNavigate()
  const location = useLocation()
  const [units, setUnits] = useState<unitObj[]>([
    createData(nanoid(), "Kilogram", "Kilogram", 1),
    createData(nanoid(), "Gram", "Kilogram", 1000),
    createData(nanoid(), "Pound", "Kilogram", 2.20462),
    createData(nanoid(), "Ounce", "Kilogram", 35.2739199982575),
  ]);
  const addUnitRow = (valuesFromInputs:InputsObj) =>{
    const newUnitArr: unitObj[] = [{_id:nanoid(), ...valuesFromInputs},...units];
    setUnits(newUnitArr);
    navigate(location.pathname);
  }
  const updateUnitCells = (idx: string, newText: string, key: string) => {
    // const updatedUnit:(unitObj|undefined) =units.find(item=> item._id === idx)
    // if (updatedUnit && updatedUnit?[key] == newText) {
    //   return;
    // }
    // if(categories.find(item=> item[key] === newText)){
    //   return;
    // }
    const newUnitArr: unitObj[] = units.map((item) => {
      if (item._id !== idx) {
        return item;
      } else {
        return { ...item, [key]: newText };
      }
    });
    setUnits(newUnitArr);
  };
  const deleteUnitRow = (idx: string) => {
    const newUnitsArray: unitObj[] = units.filter((item) => {
      if (item._id !== idx) {
        return item;
      }
    });
    setUnits(newUnitsArray);
  };

  return (
    <>
      <Box
        sx={{
          mt: 10,
          border: "1px solid grey",
          borderRadius: "8px",
          width: "70%",
          mx: "auto",
          py: "20px",
        }}
      >
        <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
          Add Units of Measure Form
        </Typography>
        <Formik
          initialValues={{ unitMeasure:"", baseUnit:"", conversionFactor:0 }}
          validate={(values) => {
            const errors = { unitMeasure:"", baseUnit:"", conversionFactor:""  };
            if (!values.unitMeasure) {
              errors.unitMeasure = "Required";
            }
            if (!values.baseUnit) {
              errors.baseUnit ="Required";
            }
            if (!values.conversionFactor) {
              errors.conversionFactor ="Required";
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
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={(e) =>{
              e.preventDefault()
              handleSubmit()
              addUnitRow(values)
              values.unitMeasure="";
              values.baseUnit="";
              values.conversionFactor=0;
            }}
            >
              <TextField
                id="unitMeasureInput"
                label="Measure of Unit"
                variant="outlined"
                type="unitMeasure"
                name="unitMeasure"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitMeasure}
              />
              <Typography variant="body1" component="p" sx={{pb:"10px", fontSize:"12px", color:"red"}}>
                {errors.unitMeasure && touched.unitMeasure && errors.unitMeasure}
              </Typography>
              <TextField
                id="baseUnitInput"
                label="Base Unit"
                variant="outlined"
                type="baseUnit"
                name="baseUnit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.baseUnit}
              />
              <Typography variant="body1" component="p" sx={{pb:"10px", fontSize:"12px", color:"red"}}>
                {errors.baseUnit && touched.baseUnit && errors.baseUnit }
              </Typography>
              <TextField
                id="conversionFactorInput"
                label="Conversion Factor"
                variant="outlined"
                type="number"
                value={values.conversionFactor}
                name="conversionFactor"
                onChange={handleChange}
                onBlur={handleBlur}
                />
              <Typography variant="body1" component="p" sx={{pb:"10px", fontSize:"12px", color:"red"}}>
                {errors.conversionFactor && touched.conversionFactor && errors.conversionFactor}
              </Typography>
              <Button type="submit" variant="outlined" disabled={!values.unitMeasure.length || !values.baseUnit.length || !values.conversionFactor}>Add</Button>
            </form>
          )}
        </Formik>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          width: { xs: "90%", lg: "60%" },
          mx: "auto",
          border: "1px solid grey",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Unit of Measure</TableCell>
              <TableCell align="center">Base Unit of Measure</TableCell>
              <TableCell align="center">Conversion factor</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((row) => (
              <TableRow
                key={row._id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                sx={{ borderBottom: 1 }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  id="unitMeasure"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onClick={() => setIsEditting(true)}
                  onBlur={(e) => {
                    updateUnitCells(row._id, e.target.innerText, e.target.id);
                    setIsEditting(false);
                  }}
                  sx={{
                    textTransform: "capitalize",
                    outline: "none",
                    borderBottom: isEditting ? "1px solid grey" : "0px",
                  }}
                >
                  {row.unitMeasure}
                </TableCell>
                <TableCell
                  align="center"
                  id="baseUnit"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onClick={() => setIsEditting(true)}
                  onBlur={(e) => {
                    updateUnitCells(row._id, e.target.innerText, e.target.id);
                    setIsEditting(false);
                  }}
                  sx={{
                    textTransform: "capitalize",
                    outline: "none",
                    borderBottom: isEditting ? "1px solid grey" : "0px",
                  }}
                >
                  {row.baseUnit}
                </TableCell>
                <TableCell
                  align="center"
                  id="conversionFactor"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onClick={() => setIsEditting(true)}
                  onBlur={(e) => {
                    updateUnitCells(row._id, e.target.innerText, e.target.id);
                    setIsEditting(false);
                  }}
                  sx={{
                    textTransform: "capitalize",
                    outline: "none",
                    borderBottom: isEditting ? "1px solid grey" : "0px",
                  }}
                >
                  {row.conversionFactor}
                </TableCell>
                <TableCell align="right" sx={{ borderBottom: 1 }}>
                  <IconButton
                    aria-label="delete"
                    sx={{ p: "2px" }}
                    onClick={() => deleteUnitRow(row._id)}
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
