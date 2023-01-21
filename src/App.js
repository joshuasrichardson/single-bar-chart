import React from 'react'
import Circle from './components/Circle';
import Column from './models/Column';
import Row from './models/Row';
import SingleBarChart from './components/SingleBarChart';
import SingleBarChartTable from './components/SingleBarChartTable';
import { formatPercentage } from './utils/Formatter';

const coverageColors = [
  "#1e8df3",
  "#d7e8f8"
]

const opportunityColors = [
  "#f1c232",
  "#e69138",
  "#e67f38",
  "#cc0000",
  "#cc0069",
  "#cc00ba",
  "#cc00ba",
  "#cc00ba",
  "#560484",
  "#e0e0e0",
]

const sortBy = (rows, columnName, reverse = false) => {
  return rows.sort((a, b) => reverse ? a[columnName] - b[columnName] : b[columnName] - a[columnName])
}

const mergeSmallCategoriesAndAddColor  = (rows, key, colors) => {
  const other = new Row("Other", 0, 0, "#560484")
  rows.forEach((row, i) => {
    if (row[key] < 0.06) other.merge(row)
    else row.color = colors[i]
  })
  rows = rows.filter(row => row[key] >= 0.1)
  if (other[key] > 0) rows.push(other)
  return rows;
}

const addNa = (rows, key) => {
  const total = rows.reduce((total, row) => total + row[key], 0)
  const na = new Row("N/A", 0, 0, "#e0e0e0")
  na[key] = (1 - total).toFixed(2)
  if (total < 1) rows.push(na)
  return rows
}

const prepareRows = (rows, sortKey, colors, reverse) => {
  let sortedRows = sortBy(rows, sortKey, reverse)
  sortedRows = mergeSmallCategoriesAndAddColor(sortedRows, sortKey, colors)
  sortedRows = addNa(sortedRows, sortKey)
  sortedRows.forEach(row => {
    row.first = <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <Circle color={row.color} />
                  <a href="https://foodstorage.joshuasrichardson.com" style={{color: "blue"}}>{row.name}</a>
                </div>;
    row.percentage = row[sortKey]
    row[sortKey] = formatPercentage(row[sortKey])
  });
  return sortedRows
}



const App = () => {
  const coverageRows = prepareRows([
    new Row('covered', .249, 0),
    new Row('uncovered', .761, 0),
  ], "conversion", coverageColors, true);

  const rows = prepareRows([
    new Row('admissions/', .20, 6),
    new Row('scholarships/', .18, 9),
    new Row('studentlife/', .11, 16),
    new Row('coolstuff/', .10, 3),
    new Row('otherpath/', .08, 16),
    new Row('more/', .01, 9),
    new Row('evenmore/', .10, 16),
    new Row('secondtolast/', .10, 3),
    new Row('last/', .06, 16),
    new Row('stuff/', .03, 9),
    new Row('things/', .05, 9),
    new Row('moo/', .04, 9),
    new Row('oink/', .04, 9),
  ], "conversion", opportunityColors)

  const columns = [
    new Column("FORMS", "first", "left"),
    new Column("CONVERSION", "conversion", "center"),
    new Column("PAGES", "pages", "right"),
  ]

  return (
    <div className="App" style={{margin: 0, height: "100vh", padding: "180px 15%", background: "#EEEEEE"}}>
      <SingleBarChart data={coverageRows} style={{marginBottom: 10}}/>
      <SingleBarChartTable title="Uncovered Page Opportunities" 
          explanation="Maximize your opportunities by increasing your website coverage. Do this by adding your uncovered pages to an existing smart form or personalize those pages with a brand new offer from our template library." 
          rows={rows} 
          columns={columns}
      />
    </div>
  );
}

export default App;
