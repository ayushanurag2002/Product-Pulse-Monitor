import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Overall Product Performance Graph",
  colors: [
    "rgb(53,138,148)",
    "rgb(37,11,165)",
    "#188310",
    "#2d2853",
    "#B68003",
    "#94024F",
  ],
};

export function PieChart() {
  useEffect(() => {}, []);
  return (
    <Chart
      chartType="PieChart"
      data={[
        ["Market Health", "%"],
        ["Quality Assurance", 11],
        ["Innovation", 2],
        ["Sales", 2],
        ["Upgradation", 2],
        ["Improvement", 34],
      ]}
      options={options}
      width="100%"
      height="250px"
    />
  );
}
