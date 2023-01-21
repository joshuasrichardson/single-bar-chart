import React from 'react';
import { formatPercentage } from '../utils/Formatter';

const getBorderRadius = (data, index) => (
    index === 0 ? "4px 0 0 4px" 
    : index === data.length - 1 
    ? "0 4px 4px 0" 
    : 0)

const SingleBarChart = ({ data, formatFn = formatPercentage, ...props }) => {
    return (
    <div 
        {...props}    
        style={{ 
            display: 'flex', 
            border: "solid", 
            borderColor: "lightgrey",
            borderWidth: 1.5, 
            borderRadius: 4,
            gap: 1,
            backgroundColor: "lightgrey", 
            ...props.style,
        }
    }>
      {data.map((item, index) => (
        <div key={`bar-section-${item.id || item.name + index}`} style={{ 
            width: `${item.percentage * 100}%`, 
            color: index === data.length - 1 ? "black" : "white",
            backgroundColor: item.color, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: '40px',
            borderRadius: getBorderRadius(data, index),
        }}>
            {["Other", "N/A"].includes(item.name)
            ? item.name
            : formatFn(item.percentage)}
        </div>
      ))}
    </div>
)};

export default SingleBarChart;