import React from "react";
import { Box } from "@mui/material";
import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import styles from "./units.module.css";
import { InputsObj, UnitObj } from "../../Utils/Types";

interface addUnitModalProps {
  handleAddUnit: (obj: InputsObj) => void;
  handleCloseForm: () => void;
  handleUpdateUnit:(idx:string, obj:InputsObj) => void;
  idToUpdate:string;
  unitToUpdate:UnitObj | undefined;
}

const UnitsAddForm: React.FC<addUnitModalProps> = ({
  handleAddUnit,
  handleUpdateUnit,
  handleCloseForm,
  idToUpdate,
  unitToUpdate
}) => {
  return (
    <Box
      className={styles.unitsPage}
      id="unitsPage"
      sx={{
        left:{ xs: "2.5%", sm: "10%", md: "30%" },
        backgroundColor:"primary.light",
        width: { xs: "95%", sm: "80%", md: "40%" },
      }}
    >
      <Typography variant="h6" component="h6" sx={{ pb: "10px" }}>
        Units of Measure Form
      </Typography>
      <Formik
        initialValues={{ unitOfMeasure: unitToUpdate?.unitOfMeasure ||"", baseUnit:unitToUpdate?.baseUnit ||"", conversionFactor: unitToUpdate?.conversionFactor || 0 }}
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
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              {idToUpdate ? handleUpdateUnit(idToUpdate, values) : handleAddUnit(values);}
              values.unitOfMeasure = "";
              values.baseUnit = "";
              values.conversionFactor = 0;
            }}
          >
            <TextField
              id="unitMeasureInput"
              sx={{
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
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
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
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
                width: { xs: "80%", sm: "70%", md: "60%", lg:"70%" },
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
              sx={{ width: "80%", maxWidth: "140px", my:"10px", color:"white", mr:"20px" }}
              variant="contained"
              disabled={
                !values.unitOfMeasure.length ||
                !values.baseUnit.length ||
                !values.conversionFactor
              }
            >
              { idToUpdate ? 'Update Unit': 'Add Unit'}
            </Button>
            <Button
              sx={{ width: "80%", maxWidth: "140px" }}
              variant="outlined"
              onClick={()=>handleCloseForm()}
            >
              Cancel
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UnitsAddForm;
