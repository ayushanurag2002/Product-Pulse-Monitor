import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Improvement.css";

const Improvement = ({ currUserData, login }) => {
  const [npsData, setNpsData] = useState({
    promoters: "",
    detractors: "",
  });
  const [engagedData, setEngagedData] = useState({
    engagedUsers: "",
    totalUsers: "",
  });
  const [usabilityData, setUsabilityData] = useState({
    usabilityScore: "",
    maxUsabilityScore: "",
  });
  const [feedbackData, setFeedbackData] = useState({
    feedbackImplemented: "",
    totalFeedback: "",
  });

  useEffect(() => {
    const run = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Improvement`
        );
        data = data.data;
        console.log(data);

        setNpsData((curr) => {
          return {
            ...curr,
            promoters: data.promoters || 0,
            detractors: data.detractors || 0,
          };
        });

        setEngagedData((curr) => {
          return {
            ...curr,
            engagedUsers: data.engagedUser || 0,
            totalUsers: data.totalUser || 0,
          };
        });

        setUsabilityData((curr) => {
          return {
            ...curr,
            usabilityScore: data.usabilityScore || 0,
            maxUsabilityScore: data.maxUsabilityScore || 0,
          };
        });

        setFeedbackData((curr) => {
          return {
            ...curr,
            feedbackImplemented: data.feedBackImplemented || 0,
            totalFeedback: data.totalFeedback || 0,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  const handleNpsChange = (e) => {
    const { name, value } = e.target;
    setNpsData({ ...npsData, [name]: value });
  };

  const handleEngagedChange = (e) => {
    const { name, value } = e.target;
    setEngagedData({ ...engagedData, [name]: value });
  };

  const handleUsabilityChange = (e) => {
    const { name, value } = e.target;
    setUsabilityData({ ...usabilityData, [name]: value });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_production_url}/api/product/updateProductDetails`,
        {
          uid: currUserData.currProduct.improvementId,
          field: "Improvement",
          fieldParams: {
            promoters: npsData.promoters,
            detractors: npsData.detractors,

            // user engagement
            engagedUser: engagedData.engagedUsers,
            totalUser: engagedData.totalUsers,

            // produt usability
            usabilityScore: usabilityData.usabilityScore,
            maxUsabilityScore: usabilityData.maxUsabilityScore,

            // User Feedback Incorporation
            feedBackImplemented: feedbackData.feedbackImplemented,
            totalFeedback: feedbackData.totalFeedback,
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
        <h1>Product Improvement Index</h1>
      </center>
      <form method="post" onSubmit={handleSubmit}>
        <h2>NPS (%)</h2>
        <label htmlFor="">Enter No. of Promoters</label>
        <input
          type="number"
          name="promoters"
          onChange={handleNpsChange}
          value={npsData.promoters}
          placeholder="Enter No. of Promoters"
        ></input>
        <label htmlFor="">Enter No. of Detractors</label>
        <input
          type="number"
          name="detractors"
          onChange={handleNpsChange}
          value={npsData.detractors}
          placeholder="Enter No. of Detractors"
        ></input>

        <button type="submit">Submit</button>
      </form>

      <form method="post" onSubmit={handleSubmit}>
        <h2>Engaged Users</h2>
        <label htmlFor="">Enter Engaged Users</label>
        <input
          type="number"
          name="engagedUsers"
          onChange={handleEngagedChange}
          value={engagedData.engagedUsers}
          placeholder="Enter Engaged Users"
        ></input>
        <label htmlFor="">Enter Total Users</label>
        <input
          type="number"
          name="totalUsers"
          onChange={handleEngagedChange}
          value={engagedData.totalUsers}
          placeholder="Enter Total Users"
        ></input>
        <button type="submit">Submit</button>
      </form>

      <form method="post" onSubmit={handleSubmit}>
        <h2>Usability Score</h2>

        <label htmlFor="">Enter Usability Score</label>
        <input
          type="number"
          name="usabilityScore"
          onChange={handleUsabilityChange}
          value={usabilityData.usabilityScore}
          placeholder="Enter Usability Score"
        ></input>

        <label htmlFor="">Enter Max Usability Score</label>
        <input
          type="number"
          name="maxUsabilityScore"
          onChange={handleUsabilityChange}
          value={usabilityData.maxUsabilityScore}
          placeholder="Enter Max Usability Score"
        ></input>
        <button type="submit">Submit</button>
      </form>

      <form method="post" onSubmit={handleSubmit}>
        <h2>User Feedback Suggestions</h2>

        <label htmlFor="">Enter No. of Feedback Implemented</label>
        <input
          type="number"
          name="feedbackImplemented"
          onChange={handleFeedbackChange}
          value={feedbackData.feedbackImplemented}
          placeholder="Enter No. of Feedback Implemented"
        ></input>
        <label htmlFor="">Enter Total Feedback</label>
        <input
          type="number"
          name="totalFeedback"
          onChange={handleFeedbackChange}
          value={feedbackData.totalFeedback}
          placeholder="Enter Total Feedback"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Improvement;
