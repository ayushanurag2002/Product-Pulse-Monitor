import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarketHealth.css"; // Adjust the CSS file path as needed

const MarketHealth = ({ currUserData, login }) => {
  // State for the first form
  const [salesData, setSalesData] = useState({
    companySales: 0,
    totalMarketSales: 0,
  });

  // State for the second form
  const [satisfactionData, setSatisfactionData] = useState({
    satisfactionRatings: 0,
    responses: 0,
  });

  // State for the third form
  const [retentionData, setRetentionData] = useState({
    customersEndOfPeriod: 0,
    newCustomersAcquired: 0,
    customersStartOfPeriod: 0,
  });

  // State for the fourth form
  const [growthData, setGrowthData] = useState({
    currentMarketShare: 0,
    previousMarketShare: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/MarketHealth`
        );
        data = data.data;
        console.log(data);

        setSalesData((dat) => {
          return {
            ...dat,
            companySales: data.campanySales || 0,
            totalMarketSales: data.marketSales || 0,
          };
        });

        setGrowthData((curr) => {
          return {
            ...curr,
            currentMarketShare: data.currentMarketShare || 0,
            previousMarketShare: data.previousMarketShare || 0,
          };
        });

        setRetentionData((curr) => {
          return {
            ...curr,
            customersEndOfPeriod: data.numCustomerEnd || 0,
            newCustomersAcquired: data.numCutomerBegin || 0,
            customersStartOfPeriod: data.numCustomerAcquired || 0,
          };
        });

        setSatisfactionData((curr) => {
          return {
            ...curr,
            satisfactionRatings: data.numSatisfactionRating || 0,
            responses: data.totalResponse || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  // Handle changes for the first form
  const handleSalesChange = (e) => {
    const { name, value } = e.target;
    setSalesData({ ...salesData, [name]: value });
  };

  // Handle changes for the second form
  const handleSatisfactionChange = (e) => {
    const { name, value } = e.target;
    setSatisfactionData({ ...satisfactionData, [name]: value });
  };

  // Handle changes for the third form
  const handleRetentionChange = (e) => {
    const { name, value } = e.target;
    setRetentionData({ ...retentionData, [name]: value });
  };

  // Handle changes for the fourth form
  const handleGrowthChange = (e) => {
    const { name, value } = e.target;
    setGrowthData({ ...growthData, [name]: value });
  };

  // Handle submissions for the first form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.healthId,
          field: "MarketHealth",
          fieldParams: {
            campanySales: salesData.companySales,
            marketSales: salesData.totalMarketSales,

            //customer satisfaction
            numSatisfactionRating: satisfactionData.satisfactionRatings,
            totalResponse: satisfactionData.responses,

            //customer rentenction
            numCustomerEnd: retentionData.customersEndOfPeriod,
            numCutomerBegin: retentionData.customersStartOfPeriod,
            numCustomerAcquired: retentionData.newCustomersAcquired,

            //growth rate
            currentMarketShare: growthData.currentMarketShare,
            previousMarketShare: growthData.previousMarketShare,
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
        <h1>Market Health Metrics</h1>
      </center>

      {/* First Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Market Share (%)</h2>

        <label htmlFor="">Enter Your Company's Sales</label>
        <input
          type="number"
          name="companySales"
          onChange={handleSalesChange}
          value={salesData.companySales}
          placeholder="Enter Your Company's Sales"
        ></input>

        <label htmlFor="">Enter Total Market Sales</label>
        <input
          type="number"
          name="totalMarketSales"
          onChange={handleSalesChange}
          value={salesData.totalMarketSales}
          placeholder="Enter Total Market Sales"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Second Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Customer Satisfaction Score</h2>

        <label htmlFor="">Enter Number of Satisfaction Ratings</label>
        <input
          type="number"
          name="satisfactionRatings"
          onChange={handleSatisfactionChange}
          value={satisfactionData.satisfactionRatings}
          placeholder="Enter Number of Satisfaction Ratings"
        ></input>

        <label htmlFor="">Enter Number of Responses</label>
        <input
          type="number"
          name="responses"
          onChange={handleSatisfactionChange}
          value={satisfactionData.responses}
          placeholder="Enter Number of Responses"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Third Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Customer Retention Rate</h2>

        <label htmlFor="">
          Enter Number of Customers at the End of a Period
        </label>
        <input
          type="number"
          name="customersEndOfPeriod"
          onChange={handleRetentionChange}
          value={retentionData.customersEndOfPeriod}
          placeholder="Enter Number of Customers at the End of a Period"
        ></input>

        <label htmlFor="">Enter Number of New Customers Acquired</label>
        <input
          type="number"
          name="newCustomersAcquired"
          onChange={handleRetentionChange}
          value={retentionData.newCustomersAcquired}
          placeholder="Enter Number of New Customers Acquired"
        ></input>

        <label htmlFor="">
          Enter Number of Customers at the Start of the Period
        </label>
        <input
          type="number"
          name="customersStartOfPeriod"
          onChange={handleRetentionChange}
          value={retentionData.customersStartOfPeriod}
          placeholder="Enter Number of Customers at the Start of the Period"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Fourth Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Growth Rate</h2>

        <label htmlFor="">Enter Current Market Share</label>
        <input
          type="number"
          name="currentMarketShare"
          onChange={handleGrowthChange}
          value={growthData.currentMarketShare}
          placeholder="Enter Current Market Share"
        ></input>

        <label htmlFor="">Enter Previous Market Share</label>
        <input
          type="number"
          name="previousMarketShare"
          onChange={handleGrowthChange}
          value={growthData.previousMarketShare}
          placeholder="Enter Previous Market Share"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MarketHealth;
