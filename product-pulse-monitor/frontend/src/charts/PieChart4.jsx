import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Metrices", "%"],
  ["New Feature Adoption Rate (%)", 5],
  ["Innovation Pipeline (%) ", 4],
  ["Time to Market (%) ", 3],
  ["Patents and Intellectual Property (%)", 2],
];

export const options = {
  title: "Product Innovation",
  colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310","#2d2853"]
};

export function PieChart4() {
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
