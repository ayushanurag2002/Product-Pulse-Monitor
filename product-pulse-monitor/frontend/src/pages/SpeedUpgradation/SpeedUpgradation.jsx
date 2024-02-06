import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SpeedUpgradation.css"; // Adjust the CSS file path as needed

function formatDateFromSeconds(seconds) {
  const date = new Date(seconds); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const SpeedUpgradation = ({ currUserData, login }) => {
  // State for the first form
  const [releaseCycleTimeData, setReleaseCycleTimeData] = useState({
    timeTaken: 0,
    timeTakenval: 0,
    plannedTime: 0,
    plannedTimeval: 0,
  });

  // State for the second form
  const [testAutomationData, setTestAutomationData] = useState({
    automatedTests: 0,
    totalTests: 0,
  });

  // State for the third form
  const [codeReviewTimeData, setCodeReviewTimeData] = useState({
    codeReviewMergingTime: 0,
    totalDevelopmentTime: 0,
  });

  // State for the fourth form
  const [uptimeDowntimeData, setUptimeDowntimeData] = useState({
    uptime: 0,
    downtime: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Upgradation`
        );
        data = data.data;
        console.log(data);

        setReleaseCycleTimeData((curr) => {
          return {
            ...curr,
            timeTaken: data.timeTorelease || 0,
            timeTakenval: formatDateFromSeconds(data.timeTorelease),
            plannedTime: data.plannedTime || 0,
            plannedTimeval: formatDateFromSeconds(data.plannedTime),
          };
        });

        // State for the second form
        setTestAutomationData((curr) => {
          return {
            ...curr,
            automatedTests: data.numTest || 0,
            totalTests: data.numTotalTest || 0,
          };
        });

        // State for the third form
        setCodeReviewTimeData((curr) => {
          return {
            ...curr,
            codeReviewMergingTime: data.timeReview || 0,
            totalDevelopmentTime: data.totalTimeDevelopment || 0,
          };
        });

        // State for the fourth form
        setUptimeDowntimeData((curr) => {
          return {
            ...curr,
            uptime: data.uptime || 0,
            downtime: data.downtime || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  // Handle changes for the first form
  const handleReleaseCycleTimeChange = (e) => {
    const { name, value } = e.target;

    const val = new Date(value).valueOf();

    if (name === "plannedTime")
      setReleaseCycleTimeData({
        ...releaseCycleTimeData,
        [name]: val,
        plannedTimeval: value,
      });
    else
      setReleaseCycleTimeData({
        ...releaseCycleTimeData,
        [name]: val,
        timeTakenval: value,
      });
  };

  // Handle changes for the second form
  const handleTestAutomationChange = (e) => {
    const { name, value } = e.target;
    setTestAutomationData({ ...testAutomationData, [name]: value });
  };

  // Handle changes for the third form
  const handleCodeReviewTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "")
      setCodeReviewTimeData({ ...codeReviewTimeData, [name]: value });
  };

  // Handle changes for the fourth form
  const handleUptimeDowntimeChange = (e) => {
    const { name, value } = e.target;
    setUptimeDowntimeData({ ...uptimeDowntimeData, [name]: value });
  };

  // Handle submissions for the first form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.upgradationId,
          field: "Upgradation",
          fieldParams: {
            timeTorelease: releaseCycleTimeData.timeTaken,
            plannedTime: releaseCycleTimeData.plannedTime,

            // automation coverage
            numTest: testAutomationData.automatedTests,
            numTotalTest: testAutomationData.totalTests,

            //code review
            timeReview: codeReviewTimeData.codeReviewMergingTime,
            totalTimeDevelopment: codeReviewTimeData.totalDevelopmentTime,

            // uptime
            uptime: uptimeDowntimeData.uptime,
            downtime: uptimeDowntimeData.downtime,
          },
        }
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(releaseCycleTimeData);
  return (
    <div>
      <center>
        <h1>Speed Upgradation Metrics</h1>
      </center>

      {/* First Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Release Cycle Time (%)</h2>

        <label htmlFor="">
          Enter Time Taken to Plan, Develop, and Release Updates
        </label>
        <input
          type="Date"
          name="timeTaken"
          onChange={handleReleaseCycleTimeChange}
          value={releaseCycleTimeData.timeTakenval}
          placeholder="Enter Time Taken to Plan, Develop, and Release Updates"
        ></input>

        <label htmlFor="">Enter Planned Time for Release</label>
        <input
          type="Date"
          name="plannedTime"
          onChange={handleReleaseCycleTimeChange}
          value={releaseCycleTimeData.plannedTimeval}
          placeholder="Enter Planned Time for Release"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Second Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Test Automation Coverage (%)</h2>

        <label htmlFor="">Enter Number of Automated Tests</label>
        <input
          type="number"
          name="automatedTests"
          onChange={handleTestAutomationChange}
          value={testAutomationData.automatedTests}
          placeholder="Enter Number of Automated Tests"
        ></input>

        <label htmlFor="">Enter Total Number of Tests</label>
        <input
          type="number"
          name="totalTests"
          onChange={handleTestAutomationChange}
          value={testAutomationData.totalTests}
          placeholder="Enter Total Number of Tests"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Third Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Code Review and Merge Time (%)</h2>

        <label htmlFor="">Enter Time Taken for Code Reviews and Merging</label>
        <input
          type="number"
          name="codeReviewMergingTime"
          onChange={handleCodeReviewTimeChange}
          value={codeReviewTimeData.codeReviewMergingTime}
          placeholder="Enter Time Taken for Code Reviews and Merging"
        ></input>

        <label htmlFor="">Enter Total Time for Development</label>
        <input
          type="number"
          name="totalDevelopmentTime"
          onChange={handleCodeReviewTimeChange}
          value={codeReviewTimeData.totalDevelopmentTime}
          placeholder="Enter Total Time for Development"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Fourth Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Uptime and Downtime (%)</h2>

        <label htmlFor="">Enter Uptime</label>
        <input
          type="number"
          name="uptime"
          onChange={handleUptimeDowntimeChange}
          value={uptimeDowntimeData.uptime}
          placeholder="Enter Uptime"
        ></input>

        <label htmlFor="">Enter Downtime</label>
        <input
          type="number"
          name="downtime"
          onChange={handleUptimeDowntimeChange}
          value={uptimeDowntimeData.downtime}
          placeholder="Enter Downtime"
        ></input>
        <button type="submit">Submit </button>
      </form>
    </div>
  );
};

export default SpeedUpgradation;
