// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, IconButton, TextField } from "@mui/material";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthAndBody, fetchApiWithAuthNoBody } from "../fetchApi";

type UnitObj = {
  _id: string;
  unitOfMeasure: string;
  baseUnit: string;
  conversionFactor: number;
}
interface InputsObj {
  unitOfMeasure: string;
  baseUnit: string;
  conversionFactor: number;
}


export default function Units() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [units, setUnits] = useState<UnitObj[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const _token: string = localStorage.getItem("token")||"";

  async function fetchData(_token:string){
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/unit/getUnits`,
      `black__${_token}`
    );
    console.log(results)
    if (results.UnitList) {
      setUnits(results.UnitList);
    }
    return results;
  }
  useEffect(() => {
    fetchData(_token);
  }, [_token]);



  
  const addUnitRow = async(valuesFromInputs: InputsObj) => {
    const results = await fetchApiWithAuthAndBody(
      "POST",
      valuesFromInputs,
      `https://posapp.onrender.com/unit/addUnit`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      alert("Category Added Successfully");
    } else {
      alert(results.message);
    }
  };
  const updateUnitCells = async(idx: string, newText: (string|number), key: string) => {
    const updatedUnit:(UnitObj|undefined)=units.find(item=> item._id === idx)
    if(!updatedUnit){
      throw new Error("Unit is not found")
    }
    if (updatedUnit[key as keyof InputsObj] == newText) {
      throw new Error("Changes are the same")
    }
    else {
      const{_id, ...obj} = updatedUnit;
      const newUnit: InputsObj = {...obj, [key]:newText}
      const results = await fetchApiWithAuthAndBody(
        "PATCH",
        newUnit,
        `https://posapp.onrender.com/unit/updateUnit/${idx}`,
        `black__${_token}`
      );
      navigate(location.pathname);
      if (results.message == "successs updated") {
        fetchData(_token);
        alert("Unit updated Successfully");
      } else {
        alert(results.message);
      }
    }
  };
  const deleteUnitRow = async(idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/unit/deleteUnit/${idx}`,
      `black__${_token}`
    );
    navigate(location.pathname);
    console.log(results.message);
    if (results.message == "successs") {
      fetchData(_token);
      alert("Unit deleted Successfully");
    } else {
      alert(results.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          mt: 10,
          border: "1px solid grey",
          borderRadius: "8px",
          width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          maxWidth: "665px",
          mx: "auto",
          py: "20px",
        }}
      >
        <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
          Add Units of Measure Form
        </Typography>
        <Formik
          initialValues={{ unitOfMeasure: "", baseUnit: "", conversionFactor: 0 }}
          validate={(values) => {
            const errors = {
              unitOfMeasure: "",
              baseUnit: "",
              conversionFactor: "",
            };
            if (!values.unitOfMeasure) {
              errors.unitOfMeasure = "Required";
            }
            if (!values.baseUnit) {
              errors.baseUnit = "Required";
            }
            if (!values.conversionFactor) {
              errors.conversionFactor = "Required";
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
                addUnitRow(values);
                values.unitOfMeasure = "";
                values.baseUnit = "";
                values.conversionFactor = 0;
              }}
            >
              <TextField
                id="unitMeasureInput"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Measure of Unit"
                variant="outlined"
                type="unitOfMeasure"
                name="unitOfMeasure"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.unitOfMeasure}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.unitOfMeasure &&
                  touched.unitOfMeasure &&
                  errors.unitOfMeasure}
              </Typography>
              <TextField
                id="baseUnitInput"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Base Unit"
                variant="outlined"
                type="baseUnit"
                name="baseUnit"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.baseUnit}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.baseUnit && touched.baseUnit && errors.baseUnit}
              </Typography>
              <TextField
                id="conversionFactorInput"
                sx={{
                  width: { xs: "85%", sm: "70%", md: "50%" },
                  maxWidth: "400px",
                }}
                label="Conversion Factor"
                variant="outlined"
                type="number"
                value={values.conversionFactor}
                name="conversionFactor"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ pb: "10px", fontSize: "12px", color: "red" }}
              >
                {errors.conversionFactor &&
                  touched.conversionFactor &&
                  errors.conversionFactor}
              </Typography>
              <Button
                type="submit"
                sx={{width:"80%", maxWidth:"140px"}}
                variant="outlined"
                disabled={
                  !values.unitOfMeasure.length ||
                  !values.baseUnit.length ||
                  !values.conversionFactor
                }
              >
                Add
              </Button>
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
                  id="unitOfMeasure"
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
                  {row.unitOfMeasure}
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
