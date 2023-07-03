import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchApiWithAuthAndBody,
  fetchApiWithAuthNoBody,
} from "../../Utils/fetchApi";
import SnackbarComponent from "../../SubComponents/Snackbar";
import UnitsAddForm from "./UnitsAddForm";
import { _token, getUnits } from "../../Utils/Utils";
import styles from "./units.module.css";
import { InputsObj, UnitObj } from "../../Utils/Types";
import TableOfUnits from "./TableOfUnits";


export default function Units() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [units, setUnits] = useState<UnitObj[]>([]);
  const [unitToUpdate, setUnitToUpdate] = useState<UnitObj>();
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");

  useEffect(() => {
    try{
      getUnits(_token, setUnits);
    } catch(error){
      console.error(error)
    }
  }, []);
  const addUnitRow = async (valuesFromInputs: InputsObj) => {
    handleCloseForm();
    const results = await fetchApiWithAuthAndBody(
      "POST",
      valuesFromInputs,
      `https://posapp.onrender.com/unit/addUnit`,
      `black__${_token}`
    );
    if (results.message == "successs") {
      getUnits(_token, setUnits);
      setSnackBarMsg("Unit Added Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };
  const handleCloseForm = () => {
    setIsAddModalOpen(false);
    setIdToUpdate("");
    setUnitToUpdate({
      unitOfMeasure: "",
      baseUnit: "",
      conversionFactor: 0,
      _id: "",
    });
  };
  const updateUnit = async (idx: string, updatedUnit: InputsObj) => {
    handleCloseForm();
    const results = await fetchApiWithAuthAndBody(
      "PATCH",
      updatedUnit,
      `https://posapp.onrender.com/unit/updateUnit/${idx}`,
      `black__${_token}`
    );
    if (results.message == "successs updated") {
      getUnits(_token, setUnits);
      setSnackBarMsg("Unit updated Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };
  
  const deleteUnitRow = async (idx: string) => {
    const results = await fetchApiWithAuthNoBody(
      "DELETE",
      `https://posapp.onrender.com/unit/deleteUnit/${idx}`,
      `black__${_token}`
    );
    if (results.message == "successs") {
      getUnits(_token, setUnits);
      setSnackBarMsg("Unit deleted Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };

  return (
    <>
      <Button
        className={styles.openModalBtn}
        sx={{ my: "10px" }}
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add New Unit
      </Button>
      <Box sx={{ position: "relative" }}>
        {isAddModalOpen && (
          <UnitsAddForm
            handleAddUnit={addUnitRow}
            handleCloseForm={handleCloseForm}
            handleUpdateUnit={updateUnit}
            idToUpdate={idToUpdate}
            unitToUpdate={unitToUpdate}
          />
        )}
      </Box>
      <TableOfUnits
        handleDeleteUnit={deleteUnitRow}
        units={units}
        handleChangeUnitToUpdate={setUnitToUpdate}
        handleChangeIdToUpdate={setIdToUpdate}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
}
