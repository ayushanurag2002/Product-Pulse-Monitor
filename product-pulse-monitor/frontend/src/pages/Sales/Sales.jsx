import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css"; // Adjust the CSS file path as needed

const Sales = ({ currUserData, login }) => {
  // State for the first form
  const [revenueData, setRevenueData] = useState({
    currentRevenue: 0,
    previousRevenue: 0,
  });

  // State for the second form
  const [conversionData, setConversionData] = useState({
    payingCustomers: 0,
    totalLeads: 0,
  });

  // State for the third form
  const [pipelineData, setPipelineData] = useState({
    dealsInProgress: 0,
    totalDeals: 0,
  });

  // State for the fourth form
  const [churnData, setChurnData] = useState({
    customersStartOfPeriod: 0,
    customersEndOfPeriod: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Sales`
        );
        data = data.data;
        console.log(data);

        setRevenueData((curr) => {
          return {
            ...curr,
            currentRevenue: data.currentRevenue || 0,
            previousRevenue: data.prevRevenue || 0,
          };
        });

        // State for the second form
        setConversionData((curr) => {
          return {
            ...curr,
            payingCustomers: data.numPaying || 0,

            totalLeads: data.numLeads || 0,
          };
        });

        // State for the third form
        setPipelineData((curr) => {
          return {
            ...curr,
            dealsInProgress: data.numDealsinProgress || 0,
            totalDeals: data.totalDeals || 0,
          };
        });

        // State for the fourth form
        setChurnData((curr) => {
          return {
            ...curr,
            customersStartOfPeriod: data.numCustStart || 0,
            customersEndOfPeriod: data.numCustEnd || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  // Handle changes for the first form
  const handleRevenueChange = (e) => {
    const { name, value } = e.target;
    setRevenueData({ ...revenueData, [name]: value });
  };

  // Handle changes for the second form
  const handleConversionChange = (e) => {
    const { name, value } = e.target;
    setConversionData({ ...conversionData, [name]: value });
  };

  // Handle changes for the third form
  const handlePipelineChange = (e) => {
    const { name, value } = e.target;
    setPipelineData({ ...pipelineData, [name]: value });
  };

  // Handle changes for the fourth form
  const handleChurnChange = (e) => {
    const { name, value } = e.target;
    setChurnData({ ...churnData, [name]: value });
  };

  // Handle submissions for the first form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      e.preventDefault();

      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.salesId,
          field: "Sales",
          fieldParams: {
            //revenue growth
            currentRevenue: revenueData.currentRevenue,
            prevRevenue: revenueData.previousRevenue,

            //conversion
            numPaying: conversionData.payingCustomers,
            numLeads: conversionData.totalLeads,

            //Sales Pipeline Health
            numDealsinProgress: pipelineData.dealsInProgress,
            totalDeals: pipelineData.totalDeals,

            // churn rate
            numCustStart: churnData.customersStartOfPeriod,
            numCustEnd: churnData.customersEndOfPeriod,
          },
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <center>
        <h1>Sales Metrics</h1>
      </center>

      {/* First Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Revenue Growth (%)</h2>
        <label htmlFor="">Enter Current Revenue</label>
        <input
          type="number"
          name="currentRevenue"
          onChange={handleRevenueChange}
          value={revenueData.currentRevenue}
          placeholder="Enter Current Revenue"
        ></input>

        <label htmlFor="">Enter Previous Revenue</label>
        <input
          type="number"
          name="previousRevenue"
          onChange={handleRevenueChange}
          value={revenueData.previousRevenue}
          placeholder="Enter Previous Revenue"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Second Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Sales Conversion Rate (%)</h2>
        <label htmlFor="">Enter Number of Paying Customers</label>
        <input
          type="number"
          name="payingCustomers"
          onChange={handleConversionChange}
          value={conversionData.payingCustomers}
          placeholder="Enter Number of Paying Customers"
        ></input>

        <label htmlFor="">Enter Total Number of Leads</label>
        <input
          type="number"
          name="totalLeads"
          onChange={handleConversionChange}
          value={conversionData.totalLeads}
          placeholder="Enter Total Number of Leads"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Third Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Sales Pipeline Health (%)</h2>

        <label htmlFor="">Enter Number of Deals in Progress</label>
        <input
          type="number"
          name="dealsInProgress"
          onChange={handlePipelineChange}
          value={pipelineData.dealsInProgress}
          placeholder="Enter Number of Deals in Progress"
        ></input>

        <label htmlFor="">Enter Total Number of Deals</label>
        <input
          type="number"
          name="totalDeals"
          onChange={handlePipelineChange}
          value={pipelineData.totalDeals}
          placeholder="Enter Total Number of Deals"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Fourth Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Customer Churn Rate (%)</h2>

        <label htmlFor="">
          Enter Number of Customers at the Start of the Period
        </label>
        <input
          type="number"
          name="customersStartOfPeriod"
          onChange={handleChurnChange}
          value={churnData.customersStartOfPeriod}
          placeholder="Enter Number of Customers at the Start of the Period"
        ></input>

        <label htmlFor="">
          Enter Number of Customers at the End of the Period
        </label>
        <input
          type="number"
          name="customersEndOfPeriod"
          onChange={handleChurnChange}
          value={churnData.customersEndOfPeriod}
          placeholder="Enter Number of Customers at the End of the Period"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sales;
