import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Chart } from "react-google-charts";

import axios from "axios";
import "./Dashboard.css";

const finalProductResults = {
  def: {
    init: "",
  },
  bad: {
    init: "Taking into consideration the comprehensive assessment of your product's performance, it is apparent that its current health status is below the industry standard.",
  },
  warn: {
    init: "Considering the comprehensive evaluation of your product's performance, it is evident that your product is currently in an average state compared to industry standards. While it may not be at the top of its class, it's also not lagging significantly behind.",
  },
  ok: {
    init: "Taking into account the comprehensive assessment of your product's performance, it's clear that your product is currently in a commendable state and performing well compared to industry standards.",
  },
};

const Dashboard = ({ currUserData }) => {
  // Market Health
  const [health, setHealth] = useState({
    marketShare: 0,
    csat: 0,
    customerRetention: 0,
    growthRate: 0,
    marketHealth: 0,
  });

  // Quality Assurance
  const [quality, setQuality] = useState({
    defectDensity: 0,
    testingCoverage: 0,
    mtbf: 0,
    regression: 0,
    qualityAssurance: 0,
  });

  // innovation
  const [innovation, setInnovation] = useState({
    adoptionRate: 0,
    pipeline: 0,
    timeToMarket: 0,
    property: 0,
    innovation: 0,
  });

  // sales

  const [sales, setSales] = useState({
    revenue: 0,
    conversion: 0,
    pipelineHealth: 0,
    churn: 0,
    salesVal: 0,
  });

  // upgradation
  const [upgradation, setUpgardation] = useState({
    release: 0,
    automation: 0,
    codeReview: 0,
    upDown: 0,
    upgradationVal: 0,
  });

  //improvement
  const [improvement, setImprovement] = useState({
    nps: 0,
    useEngagement: 0,
    usability: 0,
    feedback: 0,
    improvement: 0,
  });

  const [overall, setOverall] = useState({ overall: 0, status: "def" });

  useEffect(() => {
    console.log(currUserData);

    const run = async () => {
      try {
        // --------------------
        // ---MarketHealth---

        const res1 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/MarketHealth`
        );

        // console.log("---MARKET HEALTH---", res1.data.data);
        let marketHealth = 0;
        setHealth((curr) => {
          // market share
          const db = res1.data.data;
          let marketShare = 0;
          if (
            db?.campanySales &&
            db?.marketSales &&
            db?.marketSales >= db?.campanySales
          ) {
            marketShare = (db.campanySales * 100) / db.marketSales;

            marketShare = Math.round(marketShare * 100) / 100;
          }

          let csat = 0;
          if (
            db?.numSatisfactionRating &&
            db?.totalResponse &&
            db?.totalResponse > db?.numSatisfactionRating
          ) {
            csat = (db?.numSatisfactionRating * 100) / db?.totalResponse;

            csat = Math.round(csat * 100) / 100;
          }

          let customerRetention = 0;
          if (
            db?.numCustomerEnd &&
            db?.numCutomerBegin &&
            db?.numCustomerAcquired &&
            db?.numCustomerEnd > db?.numCutomerBegin
          ) {
            customerRetention =
              ((db?.numCustomerEnd - db?.numCutomerBegin) * 100) /
              db?.numCustomerAcquired;

            customerRetention = Math.round(customerRetention * 100) / 100;
          }

          let growthRate = 0;
          if (db?.currentMarketShare && db?.previousMarketShare) {
            growthRate =
              ((db?.currentMarketShare - db?.previousMarketShare) * 100) /
              db?.previousMarketShare;

            growthRate = Math.round(growthRate * 100) / 100;
          }

          marketHealth =
            0.4 * marketShare +
            0.25 * csat +
            0.2 * customerRetention +
            0.15 * growthRate;

          marketHealth = Math.round(marketHealth * 100) / 100;

          if (marketHealth < 0) marketHealth = 0;

          return {
            ...curr,
            marketShare,
            csat,
            customerRetention,
            growthRate,
            marketHealth,
          };
        });

        // --------------------
        // ---QualityAssurance---

        const res2 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/QualityAssurance`
        );

        // console.log("---QualityAssurance---", res2.data.data);
        let qualityAssurance = 0;
        setQuality((curr) => {
          const db = res2.data.data;

          let defectDensity = 0;
          if (
            db?.numDefects &&
            db?.sizeOfProduct &&
            db?.sizeOfProduct >= db?.numDefects
          ) {
            defectDensity = (db.numDefects * 100) / db?.sizeOfProduct;

            defectDensity = Math.round(defectDensity * 100) / 100;
          }

          let testingCoverage = 0;
          if (
            db?.numTestedLines &&
            db?.sizeOfProduct &&
            db?.sizeOfProduct >= db?.numTestedLines
          ) {
            testingCoverage = (db?.numTestedLines * 100) / db?.sizeOfProduct;

            testingCoverage = Math.round(testingCoverage * 100) / 100;
          }

          let mtbf = 0;
          if (
            db?.failureTime &&
            db?.operatingTime &&
            db?.operatingTime > db?.failureTime
          ) {
            mtbf = (db?.failureTime * 100) / db?.operatingTime;
            console.log("sadasdd", db?.failureTime);
            mtbf = Math.round(mtbf * 100) / 100;
          }
          let regression = 0;
          if (
            db?.numreopenedIssue &&
            db?.numTotalIssue &&
            db?.numTotalIssue > db?.numreopenedIssue
          ) {
            regression = (db?.numreopenedIssue * 100) / db?.numTotalIssue;
            regression = Math.round(regression * 100) / 100;
          }

          qualityAssurance =
            0.25 * defectDensity +
            0.25 * testingCoverage +
            0.25 * mtbf +
            0.25 * regression;

          qualityAssurance = Math.round(qualityAssurance * 100) / 100;

          if (qualityAssurance < 0) qualityAssurance = 0;

          return {
            ...curr,
            defectDensity,
            testingCoverage,
            mtbf,
            regression,
            qualityAssurance,
          };
        });

        // --------------------
        // ---Innovation---
        const res3 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Innovation`
        );

        // console.log("---Innovation---", res3.data.data);
        let innovation = 0;
        setInnovation((curr) => {
          const db = res3.data.data;

          let adoptionRate = 0;
          if (
            db?.numNewFeatureAdopted &&
            db?.totalUsers &&
            db?.totalUsers > db?.numNewFeatureAdopted
          ) {
            adoptionRate = (db?.numNewFeatureAdopted * 100) / db?.totalUsers;

            adoptionRate = Math.round(adoptionRate * 100) / 100;
          }

          let pipeline = 0;
          if (
            db?.numNewIdeas &&
            db?.numIdeaPipeline &&
            db?.numIdeaPipeline > db?.numNewIdeas
          ) {
            pipeline = (db?.numNewIdeas * 100) / db?.numIdeaPipeline;

            pipeline = Math.round(pipeline * 100) / 100;
          }

          let timeToMarket = 0;
          if (db?.avgTimeToLaunch && db?.plannedTime) {
            timeToMarket =
              ((db?.plannedTime - db?.avgTimeToLaunch) * 100) / db?.plannedTime;

            if (timeToMarket < 0) timeToMarket = 0;

            timeToMarket = Math.round(timeToMarket * 100) / 100;
          }

          let property = 0;
          if (
            db?.numPatent &&
            db?.totalInnovation &&
            db?.totalInnovation > db?.numPatent
          ) {
            property = (db?.numPatent * 100) / db?.totalInnovation;

            property = Math.round(property * 100) / 100;
          }

          innovation =
            0.2 * adoptionRate +
            0.2 * pipeline +
            0.3 * timeToMarket +
            0.3 * property;

          innovation = Math.round(innovation * 100) / 100;

          if (innovation < 0) innovation = 0;

          return {
            ...curr,
            adoptionRate,
            pipeline,
            timeToMarket,
            property,
            innovation,
          };
        });

        // --------------------
        // ---Sales---
        let salesVal = 0;
        const res4 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Sales`
        );

        setSales((curr) => {
          const db = res4.data.data;

          let revenue = 0;
          if (db?.currentRevenue && db?.prevRevenue) {
            revenue =
              ((db?.currentRevenue - db?.prevRevenue) * 100) / db?.prevRevenue;

            revenue = Math.round(revenue * 100) / 100;

            if (revenue < 0) revenue = 0;
          }

          let conversion = 0;
          if (db?.numPaying && db?.numLeads && db?.numLeads >= db?.numPaying) {
            conversion = (db?.numPaying * 100) / db?.numLeads;

            conversion = Math.round(conversion * 100) / 100;
          }

          let pipelineHealth = 0;
          if (
            db?.numDealsinProgress &&
            db?.totalDeals &&
            db?.totalDeals > db?.numDealsinProgress
          ) {
            pipelineHealth = (db.numDealsinProgress * 100) / db?.totalDeals;

            pipelineHealth = Math.round(pipelineHealth * 100) / 100;
          }

          let churn = 0;
          if (
            db?.numCustStart &&
            db?.numCustEnd &&
            db?.numCustEnd > db?.numCustStart
          ) {
            churn =
              ((db?.numCustEnd - db?.numCustStart) * 100) / db?.numCustStart;

            churn = Math.round(churn * 100) / 100;
          }

          salesVal =
            0.3 * revenue +
            0.3 * conversion +
            0.25 * pipelineHealth +
            0.15 * churn;

          salesVal = Math.round(salesVal * 100) / 100;

          if (salesVal < 0) salesVal = 0;

          return {
            ...curr,
            revenue,
            conversion,
            pipelineHealth,
            churn,
            salesVal,
          };
        });

        // console.log("---Sales---", res4.data.data);

        // --------------------
        // ---Upgradation---
        const res5 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Upgradation`
        );

        let upgradationVal = 0;
        setUpgardation((curr) => {
          const db = res5.data.data;

          let release = 0;
          if (db?.timeTorelease && db?.plannedTime) {
            release = (db?.timeTorelease * 100) / db?.plannedTime;

            release = Math.round(release * 100) / 100;
          }

          let automation = 0;
          if (
            db?.numTest &&
            db?.numTotalTest &&
            db?.numTotalTest > db?.numTest
          ) {
            automation = (db?.numTest * 100) / db?.numTotalTest;

            automation = Math.round(automation * 100) / 100;
          }
          let codeReview = 0;
          if (
            db?.timeReview &&
            db?.totalTimeDevelopment &&
            db?.totalTimeDevelopment >= db?.timeReview
          ) {
            codeReview = (db?.timeReview * 100) / db?.totalTimeDevelopment;

            codeReview = Math.round(codeReview * 100) / 100;
          }

          let upDown = 0;
          if (db?.uptime && db?.downtime) {
            upDown = (db.uptime * 100) / (db.uptime + db.downtime);

            upDown = Math.round(upDown * 100) / 100;
          }
          upgradationVal =
            0.25 * release +
            0.2 * automation +
            0.3 * codeReview +
            0.25 * upDown;

          upgradationVal = Math.round(upgradationVal * 100) / 100;

          if (upgradationVal < 0) upgradationVal = 0;

          return {
            ...curr,
            release,
            automation,
            codeReview,
            upDown,
            upgradationVal,
          };
        });

        // console.log("---Upgradation---", res5.data.data);

        // --------------------
        // ---Improvement---
        const res6 = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${currUserData.currProduct._id}/Improvement`
        );
        let improvement = 0;
        setImprovement((curr) => {
          const db = res6.data.data;

          let nps = 0;
          if (db?.promoters && db?.detractors) {
            nps =
              ((db?.promoters - db.detractors) * 100) /
              (db?.promoters + db.detractors);

            nps = Math.round(nps * 100) / 100;

            if (nps < 0) nps = 0;
          }

          let useEngagement = 0;
          if (
            db?.engagedUser &&
            db?.totalUser &&
            db?.totalUser >= db?.engagedUser
          ) {
            useEngagement = (db?.engagedUser * 100) / db?.totalUser;

            useEngagement = Math.round(useEngagement * 100) / 100;
          }

          let usability = 0;
          if (
            db?.usabilityScore &&
            db?.maxUsabilityScore &&
            db?.maxUsabilityScore >= db?.usabilityScore
          ) {
            usability = (db?.usabilityScore * 100) / db?.maxUsabilityScore;
            usability = Math.round(usability * 100) / 100;
          }
          let feedback = 0;
          if (
            db?.feedBackImplemented &&
            db?.totalFeedback &&
            db?.totalFeedback > db?.feedBackImplemented
          ) {
            feedback = (db?.feedBackImplemented * 100) / db?.totalFeedback;

            feedback = Math.round(feedback * 100) / 100;
          }
          improvement =
            0.3 * nps +
            0.15 * useEngagement +
            0.25 * usability +
            0.3 * feedback;

          improvement = Math.round(improvement * 100) / 100;

          if (improvement < 0) improvement = 0;

          return {
            ...curr,
            nps,
            useEngagement,
            usability,
            feedback,
            improvement,
          };
        });

        // console.log("---Improvement---", res6.data.data);

        setOverall((curr) => {
          let x =
            0.16 * improvement +
            0.16 * upgradationVal +
            0.16 * salesVal +
            0.16 * innovation +
            0.16 * qualityAssurance +
            0.16 * marketHealth;

          x = Math.round(x * 100) / 100;

          if (x < 0) x = 0;

          return {
            ...curr,
            overall: x,
            status: x <= 50 ? `bad` : x <= 60 ? `warn` : `ok`,
          };
        });
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);
  console.log(overall);
  return (
    <div className="bgcolor">
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4} className="disp">
              <Card sx={{ minWidth: "33%", height: 150 }} className="gradient">
                <CardContent>
                  <div className="iconstyle">
                    <CreditCardIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {health.marketHealth}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Product Market Health
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} className="disp">
              <Card
                sx={{ minWidth: "33%", height: 150 }}
                className="gradientlight"
              >
                <CardContent>
                  <div className="iconstyle">
                    <ShoppingBagIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {quality.qualityAssurance}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Product Achievements in Quality Assurance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} className="disp">
              <Card
                sx={{ minWidth: "33%", height: 150 }}
                className="gradientdark"
              >
                <CardContent>
                  <div className="iconstyle">
                    <CreditCardIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {innovation.innovation}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Product Achievements in Innovation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} className="disp">
              <Card
                sx={{ minWidth: "33%", height: 150 }}
                className="gradientlight"
              >
                <CardContent>
                  <div className="iconstyle">
                    <CreditCardIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {sales.salesVal}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Product Achievements in Sales
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} className="disp">
              <Card
                sx={{ minWidth: "33%", height: 150 }}
                className="gradientdark"
              >
                <CardContent>
                  <div className="iconstyle">
                    <ShoppingBagIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {upgradation.upgradationVal}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Speed of Product Upgradation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4} className="disp">
              <Card sx={{ minWidth: "33%", height: 150 }} className="gradient">
                <CardContent>
                  <div className="iconstyle">
                    <CreditCardIcon />
                  </div>
                  <Typography
                    gutterBottom
                    variant="h5"
                    color="white"
                    component="div"
                  >
                    {improvement.improvement}%
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    sx={{ color: "#ccd1d1" }}
                  >
                    Product Improvement Index
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box height={70} />

          <div className="charts">
            <div>
              <Chart
                style={{ backgroundColor: "black" }}
                chartType="PieChart"
                data={[
                  ["Product health", "%"],
                  ["Market Health", health.marketHealth],
                  ["Quality Assurance", quality.qualityAssurance],
                  ["Innovation", innovation.innovation],
                  ["Sales", sales.salesVal],
                  ["Upgradation", upgradation.upgradationVal],
                  ["Improvement", improvement.improvement],
                ]}
                options={{
                  title: "Overall Product Performance Graph",
                  colors: [
                    "rgb(53,138,148)",
                    "rgb(37,11,165)",
                    "#188310",
                    "#2d2853",
                    "#B68003",
                    "#94024F",
                  ],
                  is3D: true,
                }}
                width="800px"
                height="250px"
              />
            </div>
            <div>
              <Chart
                chartType="Bar"
                height="350px"
                width="800px"
                data={[
                  ["Area Of Measure", "% Growth"],
                  ["Market Health", health.marketHealth],
                  ["Quality Assurance", quality.qualityAssurance],
                  ["Innovation", innovation.innovation],
                  ["Sales", sales.salesVal],
                  ["Upgradation", upgradation.upgradationVal],
                  ["Improvement", improvement.improvement],
                ]}
                options={{
                  chart: {
                    title: "Product Performance",
                    subtitle: "",
                  },
                  colors: [
                    "rgb(53,138,148)",
                    "rgb(37,11,165)",
                    "#188310",
                    "#2d2853",
                    "#B68003",
                    "#94024F",
                  ],
                }}
              />
            </div>
          </div>

          <div className={`final final-${overall?.status}`}>
            <h1>Final Report</h1>
            <hr />
            <h2>
              Overall Product Performance Percentage :{" "}
              <span className={`col-${overall?.status}`}>
                {overall.overall}%
              </span>
            </h2>

            <p className="">{finalProductResults[overall.status].init}</p>

            <div className="params final-bad-hov">
              <h2> The following areas need special attention </h2>
              {[
                { name: "Market Health", tot: health.marketHealth },
                {
                  name: "Product Quality Assurance",
                  tot: quality.qualityAssurance,
                },
                { name: "Product Innovation", tot: innovation.innovation },
                { name: "Product Sales", tot: sales.salesVal },
                {
                  name: "Speed of Upgradation",
                  tot: upgradation.upgradationVal,
                },
                { name: "Improvement Index", tot: improvement.improvement },
              ].map((curr, i) => {
                if (curr.tot > 10) return;
                return (
                  <p className="final-bad-hov" key={i}>
                    {curr.name} : <span className="col-bad">{curr.tot}%</span>
                  </p>
                );
              })}
            </div>

            <div className="params final-warn-hov">
              <h2> The following areas require attention </h2>
              {[
                { name: "Market Health", tot: health.marketHealth },
                {
                  name: "Product Quality Assurance",
                  tot: quality.qualityAssurance,
                },
                { name: "Product Innovation", tot: innovation.innovation },
                { name: "Product Sales", tot: sales.salesVal },
                {
                  name: "Speed of Upgradation",
                  tot: upgradation.upgradationVal,
                },
                { name: "Improvement Index", tot: improvement.improvement },
              ].map((curr, i) => {
                if (curr.tot < 10 || curr.tot > 45) return;
                return (
                  <p className="final-warn-hov" key={i}>
                    {curr.name} : <span className="col-warn">{curr.tot}%</span>
                  </p>
                );
              })}
            </div>

            <div className="params final-ok-hov">
              <h2>
                {" "}
                The following areas are performing fine and have potential of
                growth{" "}
              </h2>
              {[
                { name: "Market Health", tot: health.marketHealth },
                {
                  name: "Product Quality Assurance",
                  tot: quality.qualityAssurance,
                },
                { name: "Product Innovation", tot: innovation.innovation },
                { name: "Product Sales", tot: sales.salesVal },
                {
                  name: "Speed of Upgradation",
                  tot: upgradation.upgradationVal,
                },
                { name: "Improvement Index", tot: improvement.improvement },
              ].map((curr, i) => {
                if (curr.tot < 45) return;
                return (
                  <p className="final-ok-hov" key={i}>
                    {curr.name} : <span className="col-ok">{curr.tot}%</span>
                  </p>
                );
              })}
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
