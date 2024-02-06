import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Innovation.css"; // Adjust the CSS file path as needed

function formatDateFromSeconds(seconds) {
  const date = new Date(seconds); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const Innovation = ({ currUserData, login }) => {
  // State for the first form
  const [usersData, setUsersData] = useState({
    adoptingUsers: "",
    totalUsers: "",
  });

  // State for the second form
  const [ideasData, setIdeasData] = useState({
    newIdeas: 0,
    innovationsConsidered: 0,
  });

  // State for the third form
  const [timeData, setTimeData] = useState({
    timeToLaunch: 0,
    timeToLaunchval: 0,
    plannedTimeToLaunch: 0,
    plannedTimeToLaunchval: 0,
  });

  // State for the fourth form
  const [patentsData, setPatentsData] = useState({
    patentsGenerated: 0,
    totalInnovations: 0,
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Innovation`
        );
        data = data.data;
        console.log(data);

        setUsersData((curr) => {
          return {
            ...curr,
            adoptingUsers: data.numNewFeatureAdopted || 0,
            totalUsers: data.totalUsers || 0,
          };
        });

        // State for the second form
        setIdeasData((curr) => {
          return {
            ...curr,
            newIdeas: data.numNewIdeas || 0,
            innovationsConsidered: data.numIdeaPipeline || 0,
          };
        });

        setTimeData((curr) => {
          return {
            ...curr,
            timeToLaunch: data.avgTimeToLaunch || 0,
            timeToLaunchval: formatDateFromSeconds(data.avgTimeToLaunch),
            plannedTimeToLaunch: data.plannedTime || 0,
            plannedTimeToLaunchval: formatDateFromSeconds(data.plannedTime),
          };
        });

        // State for the fourth form
        setPatentsData((curr) => {
          return {
            ...curr,
            patentsGenerated: data.numPatent || 0,
            totalInnovations: data.totalInnovation || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  // Handle changes for the first form
  const handleUsersChange = (e) => {
    const { name, value } = e.target;
    setUsersData({ ...usersData, [name]: value });
  };

  // Handle changes for the second form
  const handleIdeasChange = (e) => {
    const { name, value } = e.target;
    setIdeasData({ ...ideasData, [name]: value });
  };

  // Handle changes for the third form
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const val = new Date(value).valueOf();

    if (name === "plannedTimeToLaunch")
      setTimeData({ ...timeData, [name]: val, plannedTimeToLaunchval: value });
    else setTimeData({ ...timeData, [name]: val, timeToLaunchval: value });
  };

  // Handle changes for the fourth form
  const handlePatentsChange = (e) => {
    const { name, value } = e.target;
    setPatentsData({ ...patentsData, [name]: value });
  };

  // Handle submissions for the first form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      e.preventDefault();

      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.innovationId,
          field: "Innovation",
          fieldParams: {
            numNewFeatureAdopted: usersData.adoptingUsers,
            totalUsers: usersData.totalUsers,

            // prodcut update freq
            numNewIdeas: ideasData.newIdeas,
            numIdeaPipeline: ideasData.innovationsConsidered,

            // time to mrket
            avgTimeToLaunch: timeData.timeToLaunch,
            plannedTime: timeData.plannedTimeToLaunch,

            // patents
            numPatent: patentsData.patentsGenerated,
            totalInnovation: patentsData.totalInnovations,
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
        <h1>Product Achievements in Innovation</h1>
      </center>

      {/* First Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>New Feature Adoption Rate</h2>

        <label htmlFor="">Enter No. of Users Adopting New Features</label>
        <input
          type="number"
          name="adoptingUsers"
          onChange={handleUsersChange}
          value={usersData.adoptingUsers}
          placeholder="Enter No. of Users Adopting New Features"
        ></input>

        <label htmlFor="">Enter Total Number of Users</label>
        <input
          type="number"
          name="totalUsers"
          onChange={handleUsersChange}
          value={usersData.totalUsers}
          placeholder="Enter Total Number of Users"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Second Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Innovation Pipeline (%)</h2>

        <label htmlFor="">Enter Number of New Ideas</label>
        <input
          type="number"
          name="newIdeas"
          onChange={handleIdeasChange}
          value={ideasData.newIdeas}
          placeholder="Enter Number of New Ideas"
        ></input>

        <label htmlFor="">Enter Number of Innovations Being Considered</label>
        <input
          type="number"
          name="innovationsConsidered"
          onChange={handleIdeasChange}
          value={ideasData.innovationsConsidered}
          placeholder="Enter Number of Innovations Being Considered"
        ></input>

        <button type="submit">Submit</button>
      </form>

      {/* Third Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Time to Market (%) </h2>

        <label htmlFor="">
          Enter Time Taken to Launch a New Feature or Product
        </label>
        <input
          type="Date"
          name="timeToLaunch"
          onChange={handleTimeChange}
          value={timeData.timeToLaunchval}
          placeholder="Enter Time Taken to Launch a New Feature or Product"
        ></input>

        <label htmlFor="">Enter Planned Time for Launch</label>
        <input
          type="Date"
          name="plannedTimeToLaunch"
          onChange={handleTimeChange}
          value={timeData.plannedTimeToLaunchval}
          placeholder="Enter Planned Time for Launch"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {/* Fourth Form */}
      <form method="post" onSubmit={handleSubmit}>
        <h2>Patents and Intellectual Property (%)</h2>

        <label htmlFor="">
          Enter Number of Patents or Intellectual Property Generated
        </label>
        <input
          type="number"
          name="patentsGenerated"
          onChange={handlePatentsChange}
          value={patentsData.patentsGenerated}
          placeholder="Enter Number of Patents or Intellectual Property Generated"
        ></input>

        <label htmlFor="">Enter Total Number of Innovations</label>
        <input
          type="number"
          name="totalInnovations"
          onChange={handlePatentsChange}
          value={patentsData.totalInnovations}
          placeholder="Enter Total Number of Innovations"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Innovation;
