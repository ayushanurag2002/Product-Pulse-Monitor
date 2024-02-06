import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Product Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
  colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310"],
};

export default function BarChart() {
  return (
    <Chart
      chartType="Bar"
      height="350px"
      data={[
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
        ["2018", 1567, 600, 300],
        ["2019", 1789, 700, 100],
        ["2020", 2000, 600, 500],
      ]}
      options={{
        chart: {
          title: "Product Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        colors: ["rgb(53,138,148)", "rgb(37,11,165)", "#188310"],
      }}
    />
  );
}
