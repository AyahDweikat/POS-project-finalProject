/**
 * Areas for improvement:
 *  - Add pagination
 *  - Change to a data grid, include more functionalities: sorting, filtering, searching, etc.
 *  - Move actions columns outside the table
 *  - Add mass actions
 *  - Add a loading state (show skeleton)
 *  - Change the image column to show a thumbnail and to be passed from outside the table
 */

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmptyTable from "./EmptyTable";
import { TableProps } from "./types";

const Table = <T extends { _id: string; [key: string]: unknown }>({
  data,
  columns,
  onEdit,
  onDelete,
}: TableProps<T>): JSX.Element => {
  if (!data.length) return <EmptyTable />;

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "90vw",
        mx: "auto",
        marginTop: 3,
      }}
    >
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#424242" }}>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id} sx={{ color: "white" }} align="center">
                {column.label}
              </TableCell>
            ))}
            <TableCell sx={{ color: "white" }} align="right">
              Delete
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row._id} sx={{ borderBottom: 1 }}>
              {columns.map(column => {
                return column.type === "image" ? (
                  <TableCell align="center" key={column.id}>
                    <img
                      /**
                       * @todo Don't make an assumption about the image src
                       * src={row[column.id]}
                       */
                      src={`${row._id}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${row._id}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={row[column.id]?.toString()}
                      loading="lazy"
                    />
                  </TableCell>
                ) : (
                  <TableCell key={column.id} align="center" component="th" scope="row">
                    {row[column.id]?.toString()}
                  </TableCell>
                );
              })}
              <TableCell align="right">
                <IconButton aria-label="delete" sx={{ p: "2px" }} onClick={() => onDelete(row)}>
                  <DeleteForeverRoundedIcon sx={{ color: "error.light" }} />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" sx={{ p: "2px" }} onClick={() => onEdit(row)}>
                  <EditLocationAltOutlinedIcon sx={{ color: "success.light" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
