import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Metrices", "%"],
  ["Defect Density (%) ", 5],
  ["Testing Coverage",6 ],
  ["MTBF(%) ", 11],
  ["Regression Rate (%)", 3],
];

export const options = {
  title: "Quality Assurance",
    
    colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310","#2d2853"]
};

export function PieChart3() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width="100%"
      height="250px"
    />
  );
}
