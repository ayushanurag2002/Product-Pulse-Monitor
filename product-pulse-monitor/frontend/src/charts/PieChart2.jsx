import React from "react";
import { Chart } from "react-google-charts";

export const data = [
    ["Metrices", "%"],
  ["NPS (%)", 5],
  ["User Engagement (%)", 2],
  ["Product Usability (%)", 2],
  ["User Feedback Incorporation (%)", 2],
];

export const options = {
  title: "Improvement Index",
  colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310","#2d2853"]
};

export function PieChart2() {
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
