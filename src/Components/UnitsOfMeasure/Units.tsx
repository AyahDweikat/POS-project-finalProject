// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { nanoid } from 'nanoid';

function createData(
  _id:string,
  unitMeasure: string,
  baseUnit: string,
  conversionFactor: number,

) {
  return {_id, unitMeasure, baseUnit, conversionFactor};
}

const rows = [
  createData(nanoid(),'Kilogram', "Kilogram", 1),
  createData(nanoid(),'Gram', "Kilogram", 0.001),
  createData(nanoid(),'Pound', "Kilogram", 0.453592),
  createData(nanoid(),'Ounce', "Kilogram", 0.02834950000001049),
];

export default function Units() {
  return (
    <TableContainer component={Paper} sx={{mt:3, width:"90%",mx:"auto", border:"1px solid grey"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Unit of Measure</TableCell>
            <TableCell align="center">Base Unit of Measure</TableCell>
            <TableCell align="center">Conversion factor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.unitMeasure}
              </TableCell>
              <TableCell align="center">{row.baseUnit}</TableCell>
              <TableCell align="center">{row.conversionFactor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}