import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import { IconButton, Typography } from "@mui/material";
import {
  CategoryObj,
  ProductObj,
  UnitObj,
} from "../../Utils/Types.tsx";
import styles from "./product.module.css";

interface TableComponentProps {
  obj: (ProductObj | CategoryObj | UnitObj);
  handleDelete: (idx: string) => void;
  handleChangeIdToUpdate: (idx: string) => void;
  handleChangeObjToUpdate: (obj: any) => void;
  setIsOpenModal: (stata: boolean) => void;
  displayedArray: ProductObj[] | CategoryObj[] | UnitObj[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  obj,
  displayedArray,
  handleDelete,
  handleChangeIdToUpdate,
  handleChangeObjToUpdate,
  setIsOpenModal,
}) => {
  const ArrayForKeys = Object.keys(obj) || [];
  ArrayForKeys.shift();
  console.log(ArrayForKeys);
  return (
    <>
      {displayedArray.length ? (
        <TableContainer
          component={Paper}
          className={styles.unitsTable}
          sx={{
            width: { xs: "90%", lg: "70%" },
            mx: "auto",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#424242" }}>
              <TableRow>
                {ArrayForKeys.length &&
                  ArrayForKeys.map((key: string, idx) => {
                    return (
                      <TableCell
                        key={idx}
                        sx={{ color: "white" }}
                        align="center"
                      >
                        {key}
                      </TableCell>
                    );
                  })}
                <TableCell
                  id={"deleteHeadCell"}
                  sx={{ color: "white" }}
                  align="right"
                >
                  Delete
                </TableCell>
                <TableCell
                  id={"editHeadCell"}
                  sx={{ color: "white" }}
                  align="right"
                >
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedArray.map((obj: (ProductObj | CategoryObj | UnitObj)) => (
                <TableRow key={obj._id} sx={{ borderBottom: 1 }}>
                  {ArrayForKeys.length &&
                    ArrayForKeys.map((cell: string, idx) => {
                      if (cell == "productImg" && cell in obj ) {
                        return (
                          <TableCell align="center">
                            <img
                              src={`${obj[cell]}?w=164&h=164&fit=crop&auto=format`}
                              width={"100px"}
                              height={"70px"}
                              srcSet={`${obj[cell]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={obj['productName']}
                              loading="lazy"
                            />
                          </TableCell>
                        );
                      } else if(cell in obj){
                          return (
                            <TableCell key={idx} align="center" component="th" scope="row">
                              {obj[cell]}
                            </TableCell>
                          );
                      }
                    })}
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      sx={{ p: "2px" }}
                      onClick={() => handleDelete(obj._id)}
                    >
                      <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      sx={{ p: "2px" }}
                      onClick={() => {
                        handleChangeIdToUpdate(obj._id);
                        handleChangeObjToUpdate(obj);
                        setIsOpenModal(true);
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
      ) : (
        <Typography
          sx={{
            width: "20%",
            mb: "10px",
            textAlign: "center",
            m: "auto",
            color: "green",
          }}
        >
          No Data!
        </Typography>
      )}
    </>
  );
};

export default TableComponent;
