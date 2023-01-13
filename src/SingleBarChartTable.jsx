import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SingleBarChart from './SingleBarChart';

const formatPercentage = (num) => {
  if (!num) return "0%"
  return `${(num * 100)}%`
}

const Circle = ({color}) => <div style={{height: 10, width: 10, borderRadius: "50%", 
backgroundColor: color}}/>

const SingleBarChartTable = ({rows, defaultNumRows = 3}) => {
  const [isShowingAllRows, setIsShowingAllRows] = useState(false)

  return (
    <TableContainer component={Paper}>
      <SingleBarChart data={rows} formatFn={formatPercentage} />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>FORMS</TableCell>
            <TableCell align="center">CONVERSION</TableCell>
            <TableCell align="right">PAGES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            if (isShowingAllRows || index < defaultNumRows) return (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <Circle color={row.color} />
                  <a href="https://google.com">{row.name}</a>
                </div>
              </TableCell>
              <TableCell align="center">{formatPercentage(row.conversion)}</TableCell>
              <TableCell align="right">{row.pages}</TableCell>
            </TableRow>
          )
          return <></>
          })}
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <button onClick={() => setIsShowingAllRows(showing => !showing)} 
                      style={{border: "none", background: "inherit", cursor: "pointer", color:"blue"}}>
                {isShowingAllRows ? "View Less" : "View All"}
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SingleBarChartTable