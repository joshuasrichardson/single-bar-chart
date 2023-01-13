import React from 'react';

const getBorderRadius = (data, index) => (
    index === 0 ? "4px 0 0 4px" 
    : index === data.length - 1 
    ? "0 4px 4px 0" 
    : 0)

const SingleBarChart = ({ data, formatFn }) => {
    return (
    <div style={{ 
        display: 'flex', 
        borderColor: "lightgrey", 
        borderWidth: 1, 
        margin: 10, 
        borderRadius: 4,
        gap: 1,
        backgroundColor: "lightgrey", 
    }}>
      {data.map((item, index) => (
        <div key={index} style={{ 
            width: `${item.conversion * 100}%`, 
            color: "white",
            backgroundColor: item.color, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '40px',
            borderRadius: getBorderRadius(data, index),
        }}>
            {item.conversion > 0.05 
            && index < data.length - 2 
            ? formatFn(item.conversion)
            : item.name}
        </div>
      ))}
    </div>
)};

export default SingleBarChart;