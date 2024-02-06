import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp";
import Navbar from "./components/global/Navbar";
import Sidebar from "./components/global/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Health from "./pages/MarketHealth/MarketHealth";
import Quality from "./pages/Quality/Quality";
import Innovation from "./pages/Innovation/Innovation";
import Sales from "./pages/Sales/Sales";
import SpeedUpgradation from "./pages/SpeedUpgradation/SpeedUpgradation";
import Improvement from "./pages/Improvement/Improvement";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingSquare, Triangle, MutatingDots } from "react-loader-spinner";
import "./App.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [login, setLogin] = useState(false);
  const [currUserData, setCurrUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(currUserData);

  useEffect(() => {
    const username = localStorage.getItem("curruser");
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/user/${username}`
        );

        const result = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${data.data.productIdArray[0]}/none`
        );

        setCurrUserData({
          userData: data.data,
          currProduct: result.data.data,
        });
        navigate("/dashboard");
        setLogin(true);
      } catch (err) {}
      setLoading(false);
    };

    if (username) run();
  }, []);
  console.log(login);

  if (loading)
    return (
      <div className="loader">
        <Triangle
          height="80"
          width="80"
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
        <RotatingSquare
          height="100"
          width="100"
          color="#9116ce"
          ariaLabel="rotating-square-loading"
          strokeWidth="4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <Triangle
          height="80"
          width="80"
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {login === true ? <Sidebar isSidebar={isSidebar} /> : <></>}
          <main className="content">
            {login === true ? (
              <Navbar setLogin={setLogin} setIsSidebar={setIsSidebar} />
            ) : (
              <></>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <LoginSignup
                    setLogin={setLogin}
                    setCurrUserData={setCurrUserData}
                  />
                }
              />
              {login ? (
                <>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard currUserData={currUserData} login={login} />
                    }
                  />
                  <Route
                    path="/health"
                    element={
                      <Health currUserData={currUserData} login={login} />
                    }
                  />
                  <Route
                    path="/quality"
                    element={
                      <Quality currUserData={currUserData} login={login} />
                    }
                  />
                  <Route
                    path="/innovation"
                    element={
                      <Innovation currUserData={currUserData} login={login} />
                    }
                  />
                  <Route
                    path="/sales"
                    element={
                      <Sales currUserData={currUserData} login={login} />
                    }
                  />
                  <Route
                    path="/upgradation"
                    element={
                      <SpeedUpgradation
                        currUserData={currUserData}
                        login={login}
                      />
                    }
                  />
                  <Route
                    path="/improvement"
                    element={
                      <Improvement currUserData={currUserData} login={login} />
                    }
                  />
                </>
              ) : (
                <></>
              )}

              <Route path="/*" element={<LoginSignup />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
