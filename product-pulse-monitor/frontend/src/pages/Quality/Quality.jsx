import React, { useState, useEffect } from "react";
import "./Quality.css"; // Adjust the CSS file path as needed
import axios from "axios";
const Quality = ({ currUserData, login }) => {
  // State for the first form
  const [defectDensityData, setDefectDensityData] = useState({
    numberOfDefects: 0,
    productSize: 0,
  });

  // State for the second form
  const [testingCoverageData, setTestingCoverageData] = useState({
    linesOfCodeTested: 0,
    totalLinesOfCode: 0,
  });

  // State for the third form
  const [mtbfData, setMtbfData] = useState({
    totalOperatingTime: 0,
    numberOfFailures: 0,
  });

  // State for the fourth form
  const [regressionRateData, setRegressionRateData] = useState({
    reopenedIssuesInNewReleases: 0,
    totalIssuesInNewReleases: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/QualityAssurance`
        );
        data = data.data;
        console.log(data);

        setDefectDensityData((curr) => {
          return {
            ...curr,
            numberOfDefects: data.numDefects || 0,
            productSize: data.sizeOfProduct || 0,
          };
        });

        setTestingCoverageData((curr) => {
          return {
            ...curr,
            linesOfCodeTested: data.numTestedLines || 0,
            totalLinesOfCode: data.sizeOfProduct || 0,
          };
        });

        setMtbfData((curr) => {
          return {
            ...curr,
            totalOperatingTime: data.failureTime || 0,
            numberOfFailures: data.operatingTime || 0,
          };
        });

        // State for the fourth form
        setRegressionRateData((curr) => {
          return {
            ...curr,
            reopenedIssuesInNewReleases: data.numreopenedIssue || 0,
            totalIssuesInNewReleases: data.numTotalIssue || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  // Handle changes for the first form
  const handleDefectDensityChange = (e) => {
    const { name, value } = e.target;
    setDefectDensityData({ ...defectDensityData, [name]: value });
  };

  // Handle changes for the second form
  const handleTestingCoverageChange = (e) => {
    const { name, value } = e.target;
    setTestingCoverageData({ ...testingCoverageData, [name]: value });
  };

  // Handle changes for the third form
  const handleMtbfChange = (e) => {
    const { name, value } = e.target;
    setMtbfData({ ...mtbfData, [name]: value });
  };

  // Handle changes for the fourth form
  const handleRegressionRateChange = (e) => {
    const { name, value } = e.target;
    setRegressionRateData({ ...regressionRateData, [name]: value });
  };

  // Handle submissions for the first form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      e.preventDefault();

      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.qualityId,
          field: "QualityAssurance",
          fieldParams: {
            numDefects: defectDensityData.numberOfDefects,
            sizeOfProduct: defectDensityData.productSize,

            // Testing coverage
            numTestedLines: testingCoverageData.linesOfCodeTested,

            //MTBF
            failureTime: mtbfData.numberOfFailures,
            operatingTime: mtbfData.totalOperatingTime,

            // bug fix turnaround time
            numreopenedIssue: regressionRateData.reopenedIssuesInNewReleases,
            numTotalIssue: regressionRateData.totalIssuesInNewReleases,
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
        <h1>Product Achievements in Quality Assurance</h1>
      </center>

      {/* First Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Defect Density (%)</h2>

        <label htmlFor="">Enter Number of Defects</label>
        <input
          type="number"
          name="numberOfDefects"
          onChange={handleDefectDensityChange}
          value={defectDensityData.numberOfDefects}
          placeholder="Enter Number of Defects"
        ></input>

        <label htmlFor="">nter Size of the Product or Code</label>
        <input
          type="number"
          name="productSize"
          onChange={handleDefectDensityChange}
          value={defectDensityData.productSize}
          placeholder="Enter Size of the Product or Code"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Second Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Testing Coverage</h2>

        <label htmlFor="">Enter Number of Lines of Code Tested</label>
        <input
          type="number"
          name="linesOfCodeTested"
          onChange={handleTestingCoverageChange}
          value={testingCoverageData.linesOfCodeTested}
          placeholder="Enter Number of Lines of Code Tested"
        ></input>

        <label htmlFor="">Enter Total Number of Lines of Code</label>
        <input
          type="number"
          name="totalLinesOfCode"
          onChange={handleTestingCoverageChange}
          value={testingCoverageData.totalLinesOfCode}
          placeholder="Enter Total Number of Lines of Code"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Third Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>MTBF (%)</h2>

        <label htmlFor="">Enter Total Operating Time</label>
        <input
          type="number"
          name="totalOperatingTime"
          onChange={handleMtbfChange}
          value={mtbfData.totalOperatingTime}
          placeholder="Enter Total Operating Time"
        ></input>

        <label htmlFor="">Enter Number of Failures</label>
        <input
          type="number"
          name="numberOfFailures"
          onChange={handleMtbfChange}
          value={mtbfData.numberOfFailures}
          placeholder="Enter Number of Failures"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Fourth Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Regression Rate (%)</h2>

        <label htmlFor="">
          Enter Number of Reopened Issues in New Releases
        </label>
        <input
          type="number"
          name="reopenedIssuesInNewReleases"
          onChange={handleRegressionRateChange}
          value={regressionRateData.reopenedIssuesInNewReleases}
          placeholder="Enter Number of Reopened Issues in New Releases"
        ></input>

        <label htmlFor="">Enter Total Number of Issues in New Releases</label>
        <input
          type="number"
          name="totalIssuesInNewReleases"
          onChange={handleRegressionRateChange}
          value={regressionRateData.totalIssuesInNewReleases}
          placeholder="Enter Total Number of Issues in New Releases"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Quality;
