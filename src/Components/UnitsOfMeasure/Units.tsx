import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchApiWithAuthAndBody, fetchApiWithAuthNoBody } from "../fetchApi";
import { InputsObj, UnitObj } from "../Types";
import styles from "./units.module.css";
import SnackbarComponent from "../../SubComponents/Snackbar";
import UnitsAddForm from "./UnitsAddForm";

export default function Units() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [units, setUnits] = useState<UnitObj[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [unitToUpdate, setUnitToUpdate] = useState<UnitObj>();
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");
  const [idToUpdate, setIdToUpdate] = useState<string>("");

  const _token: string = localStorage.getItem("token") || "";

  async function fetchData(_token: string) {
    const results = await fetchApiWithAuthNoBody(
      "GET",
      `https://posapp.onrender.com/unit/getUnits`,
      `black__${_token}`
    );
    if (results.UnitList) {
      setUnits(results.UnitList);
    }
    return results;
  }
  useEffect(() => {
    fetchData(_token);
  }, [_token]);
  const addUnitRow = async (valuesFromInputs: InputsObj) => {
    handleCloseForm();
    const results = await fetchApiWithAuthAndBody(
      "POST",
      valuesFromInputs,
      `https://posapp.onrender.com/unit/addUnit`,
      `black__${_token}`
    );
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
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
    navigate(location.pathname);
    if (results.message == "successs updated") {
      fetchData(_token);
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
    navigate(location.pathname);
    if (results.message == "successs") {
      fetchData(_token);
      setSnackBarMsg("Unit deleted Successfully");
    } else {
      setSnackBarMsg(results.message);
    }
  };

  return (
    <>
      <Button
        className={styles.openModalBtn}
        sx={{my:"10px"}}
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
      {units.length ? 
      <TableContainer
        component={Paper}
        className={styles.unitsTable}
        sx={{
          width: { xs: "90%", lg: "60%" },
          mx: "auto",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#424242" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Unit of Measure</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Base Unit of Measure
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Conversion factor
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Delete
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((row) => (
              <TableRow key={row._id} sx={{ borderBottom: 1 }}>
                <TableCell
                  component="th"
                  scope="row"
                  id="unitOfMeasure"
                  className={styles.edittingUnits}
                >
                  {row.unitOfMeasure}
                </TableCell>
                <TableCell
                  align="center"
                  id="baseUnit"
                  className={styles.edittingUnits}
                >
                  {row.baseUnit}
                </TableCell>
                <TableCell
                  align="center"
                  id="conversionFactor"
                  className={styles.edittingUnits}
                >
                  {row.conversionFactor}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    sx={{ p: "2px" }}
                    onClick={() => deleteUnitRow(row._id)}
                  >
                    <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    sx={{ p: "2px" }}
                    onClick={() => {
                      setIdToUpdate(row._id);
                      setUnitToUpdate(row);
                      setIsAddModalOpen(true);
                    }}
                  >
                    <EditLocationAltOutlinedIcon
                      sx={{ color: "success.light" }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      : 
      <Typography>No Units Data</Typography>
      }
      <SnackbarComponent snackBarMsg={snackBarMsg} />
    </>
  );
}
