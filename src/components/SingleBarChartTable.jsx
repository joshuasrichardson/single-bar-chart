import React, {useState} from 'react';
import { formatPercentage } from '../utils/Formatter';
import Paper from '@mui/material/Paper';
import SingleBarChart from './SingleBarChart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SingleBarChartTable = ({title, explanation, rows, columns, barChartFormatFn = formatPercentage, defaultNumRows = 3}) => {
  const [isShowingAllRows, setIsShowingAllRows] = useState(false)

  return (
    <TableContainer component={Paper}>
      <div style={{margin: "1rem"}}>
        <h3 style={{marginBottom: "0.5rem"}}>{title}</h3>
        <p style={{color: "gray", marginTop: "0.5rem"}}>{explanation}</p>
        <SingleBarChart data={rows} formatFn={barChartFormatFn} style={{marginBottom: 10}} />
        <Table size='small' aria-label={title}>
          <TableHead>
            <TableRow>
              {columns.map((column, columnIndex) => 
                <TableCell 
                  key={column.id} 
                  sx={{
                    paddingLeft: columnIndex === 0 ? 0 : undefined, 
                    paddingRight: columnIndex === columns.length - 1 ? 0 : undefined,
                    color: "gray",
                  }} 
                  align={column.align}
                >
                  {column.name}
                </TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              if (isShowingAllRows || index < defaultNumRows) return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column, columnIndex) => (
                  <TableCell 
                    key={`row-${row.id}col-${column.id}`} 
                    sx={{paddingLeft: columnIndex === 0 ? 0 : undefined, 
                         paddingRight: columnIndex === columns.length - 1 ? 0 : undefined,
                         color: "gray"}} 
                         align={column.align}
                  >
                    {row[column.attribute]}
                  </TableCell>
                ))}
              </TableRow>
            )
            return <></>
            })}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, display: "flex", alignItems: "center" }}
            >
              <TableCell component="th" scope="row" sx={{paddingLeft: 0}}>
                <button onClick={() => setIsShowingAllRows(showing => !showing)} 
                        style={{border: "none", background: "inherit", cursor: "pointer", color: "blue", padding: 0}}>
                  {isShowingAllRows ? "View Less" : "View All"}
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

export default SingleBarChartTable