import React from 'react'
import './App.css';
import SingleBarChart from './SingleBarChart';
import SingleBarChartTable from './SingleBarChartTable';

const createData = (name, conversion, pages) => {
  return { name, conversion, pages };
}

const colors = [
  "red",
  "orange",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
  "brown",
  "grey",
  "black",
]

const getColor = (index) => {
  return colors[index]
}

const sortRows = (rows) => {
  let sortedRows = rows.sort((a, b) => b.conversion - a.conversion)
  const other = {name: "Other", conversion: 0, pages: 0, color: "brown"}
  sortedRows.forEach((row, i) => {
    if (row.conversion < 0.1) {
      other.conversion += row.conversion
      other.pages += row.pages
    }
    else row.color = getColor(i, sortedRows.length)
  })
  sortedRows = sortedRows.filter(row => row.conversion >= 0.1)
  sortedRows.push(other)
  const na = {
    name: "N/A", 
    conversion: (1 - sortedRows.reduce((total, row) => total + row.conversion, 0)).toFixed(2), 
    color: "grey"}
  sortedRows.push(na)
  return sortedRows
}

const App = () => {
  const rows = sortRows([
    createData('/admissions', .10, 6),
    createData('/scholarships', .39, 9),
    createData('/studentlife', .32, 16),
    createData('/coolstuff', .005, 3),
    createData('/otherpath', .003, 16),
    createData('/more', .010, 9),
    createData('/evenmore', .032, 16),
    createData('/secondtolast', .05, 3),
    createData('/last', .03, 16),
  ])

  return (
    <div className="App" style={{margin: "180px 25%"}}>
      <SingleBarChart data={rows} formatFn={v => v * 1000} />
      <SingleBarChartTable rows={rows}/>
    </div>
  );
}

export default App;
