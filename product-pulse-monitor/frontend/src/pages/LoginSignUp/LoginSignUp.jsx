import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import user_icon from "../LoginSignUp/Assets/person.png";
import email_icon from "../LoginSignUp/Assets/email.png";
import password_icon from "../LoginSignUp/Assets/password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = ({ setLogin, setCurrUserData }) => {
  const [action, setAction] = useState("Log In");
  const navigate = useNavigate(); // Initialize navigate from react-router-dom
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    username: "",
    productName: "",
  });
  console.log(userData);

  const handleSignInUp = async () => {
    try {
      if (action === "Sign Up") {
        const { data } = await axios.post(
          `${process.env.REACT_APP_production_url}/api/user/adduser`,
          {
            fname: userData.fname,
            lname: userData.lname,
            username: userData.username,
            productName: userData.productName,
          }
        );
        setCurrUserData({
          userData: data.user,
          currProduct: data.product,
        });

        localStorage.setItem("curruser", userData.username);
        setLogin(true);
      } else {
        const { data } = await axios.get(
          `${process.env.REACT_APP_production_url}/api/user/${userData.username}`
        );

        const result = await axios.get(
          `${process.env.REACT_APP_production_url}/api/product/${data.data.productIdArray[0]}/none`
        );

        setCurrUserData({
          userData: data.data,
          currProduct: result.data.data,
        });

        localStorage.setItem("curruser", userData.username);
        setLogin(() => true);
      }

      navigate("/dashboard");
    } catch (err) {
      // notification of error
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Log In" ? (
          <div></div>
        ) : (
          <>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                onChange={(e) =>
                  setUserData((data) => {
                    return { ...data, fname: e.target.value };
                  })
                }
                type="text"
                placeholder="First Name"
              />
            </div>

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                onChange={(e) =>
                  setUserData((data) => {
                    return { ...data, lname: e.target.value };
                  })
                }
                type="text"
                placeholder="Last Name"
              />
            </div>
          </>
        )}

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            onChange={(e) =>
              setUserData((data) => {
                return { ...data, username: e.target.value };
              })
            }
            type="text"
            placeholder="Enter a username"
          />
        </div>

        {action === "Sign Up" ? (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              onChange={(e) =>
                setUserData((data) => {
                  return { ...data, productName: e.target.value };
                })
              }
              type="text"
              placeholder="Product Name"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Log In" ? "submit gray" : "submit"}
          onClick={() => {
            setAction((curr) => {
              if (curr === "Sign Up") return "Log In";
              return "Sign Up";
            });
          }}
        >
          {action === "Sign Up" ? "Log In" : "Sign Up"}
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            handleSignInUp();
          }}
        >
          Enter
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
