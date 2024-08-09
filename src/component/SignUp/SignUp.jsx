import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import "./SignUp.css";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import logo from "../../images/AIENGAGE 2.svg";
import video from "../../images/Group.svg";
import leftArrow from "../../images/Arrow 1.svg";
import rightArrow from "../../images/Arrow 2.svg";
import logic from "../../images/Group (1).svg";
import insight from "../../images/Vector (1).svg";
import mail from "../../images/mail.svg";
import pass from "../../images/lock.svg";
import visibilityOff from "../../images/visibility_off (1).svg";
import visibilityOn from "../../images/visibility (1).svg";
import wave from "../../images/Microsoft-Fluentui-Emoji-3d-Waving-Hand-3d-Default 1.svg";
import VerifyEmail from "../dailogs/VerifyEmail";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [phoneErr, setPhoneErr] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [PasswordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();
  const [isVerifyEmailVisible, setIsVerifyEmailVisible] = useState(false);

  const handlePhoneChange = (value) => {
    try {
      setPhone(value);
      if (!isValidPhoneNumber(value)) {
        setPhoneErr("Invalid phone number");
      } else {
        setPhoneErr("");
      }
    } catch (error) {
      console.error("Error in handlePhoneChange:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) {
      alert("Please accept the terms and conditions to continue");
      return;
    }

    setPhoneErr("");
    setEmailerr("");
    setPasswordErr("");

    if (!phone && !email && !password) {
      setEmailerr("This field is required");
      setPhoneErr("This field is required");
      setPasswordErr("This field is required");
      return;
    }
    if (!phone) {
      setPhoneErr("Field cannot be empty");
      return;
    }
    if (!email) {
      setEmailerr("Field cannot be empty");
      return;
    }
    if (!password) {
      setPasswordErr("Field cannot be empty");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      setPhoneErr("Invalid phone number");
      return;
    }

    if (!validateEmail(email)) {
      setEmailerr("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordErr(
        "Password should be strong with one number, one letter, one special character and between 8 to 15 characters"
      );
      return;
    }

    const item = { phone, email, password };
    const headerObject = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const SignUpApi = "https://stream.xircular.io/api/v1/customer/signup";

    axios
      .post(SignUpApi, item, { headers: headerObject })
      .then((res) => {
        console.log("signupai res", res);
        console.log("successmsg", res.data.message);
        alert("Please verify your email to continue");
        verifyEmail();
        setIsVerifyEmailVisible(true);
        // navigate("/SignIn");
      })
      .catch((err) => {
        console.log("errors", err);
        if (err.response && err.response.data) {
          if (err.response.data?.message?.includes("phone")) {
            setPhoneErr(err.response.data.message);
          } else if (err.response.data?.message?.includes("Email")) {
            setEmailerr(err.response.data.message);
          } else if (err.response.data?.message?.includes("Password")) {
            setPasswordErr(err.response.data.message);
          } else if (
            err.response?.data?.errors[0]?.path === "phone" ||
            err.response.data?.errors[0]?.msg.includes("number")
          ) {
            setPhoneErr(err.response.data?.errors[0]?.msg);
          } else if (
            err.response.data?.errors[0]?.path === "email" ||
            err.response.data?.errors[0]?.msg.includes("email")
          ) {
            setEmailerr(err.response.data?.errors[0]?.msg);
          } else {
            // setError(" ");
            setPhoneErr(" ");
            setEmailerr(" ");
            setPasswordErr("");
          }
        }
      });
  };
  function verifyEmail() {
    localStorage.setItem("email", email);
    const headerObject = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    axios
      .post(
        "https://stream.xircular.io/api/v1/customer/sendOtp",
        { email: email },
        { headers: headerObject }
      )
      .then((response) => {
        console.log(response.data);
        setIsVerifyEmailVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogin = () => {
    navigate("/SignIn");
  };

  return (
    <div className="signInContainer">
      {isVerifyEmailVisible && (
        <VerifyEmail onClose={() => setIsVerifyEmailVisible(false)} />
      )}
      <div className="leftSection">
        <img className="logoIcon" src={logo} alt="" />
        <div className="mapSection">
          <div className="mapSectionCard">
            <img src={video} alt="Interactive Video" />
            <label>Interactive Video</label>
            <img className="leftArrow" src={leftArrow} alt="" />
          </div>
          <div className="mapSectionCard">
            <img src={logic} alt="Branching Logic" />
            <label>Branching Logic</label>
            <img className="rightArrow" src={rightArrow} alt="" />
          </div>
          <div className="mapSectionCard">
            <img src={insight} alt="AI-Powered Insights" />
            <label>AI-Powered Insights</label>
            <div className="arrow left-arrow"></div>
          </div>
        </div>
      </div>
      <div className="rightSection">
        <div className="loginBox">
          <img className="loginBoxLogo" src={logo} alt="" />
          <div className="heading">
            <label className="welcomeText">Hi, Welcome</label>
            <img src={wave} alt="" />
          </div>
          <label className="boxHeaderText">Sign up</label>
          <form onSubmit={handleSubmit}>
            <div className="inputSection">
              <div>
                <PhoneInput
                  value={phone}
                  onChange={handlePhoneChange}
                  defaultCountry="IN"
                  placeholder="Phone"
                />
                {phoneErr && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "15px",
                      fontFamily: "Inter",
                      marginBottom: "0px",
                    }}
                  >
                    {phoneErr}
                  </p>
                )}
              </div>
              <div className="inputWrapper">
                <img src={mail} alt="" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <span className="errorText">{emailerr}</span>
              <div className="inputWrapper">
                <img src={pass} alt="" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <img
                  onClick={() => setShowPassword(!showPassword)}
                  src={showPassword ? visibilityOff : visibilityOn}
                  alt=""
                />
              </div>
              <span className="errorText">{PasswordErr}</span>

              <div className="bottomSection">
                <button onClick={handleSubmit}>Sign up</button>
                <div className="termsSection">
                  <input
                    type="checkbox"
                    value={accepted}
                    onChange={() => setAccepted(!accepted)}
                  />
                  <span>
                    By creating an account you agree with our{" "}
                    <span
                      onClick={() => navigate("/termsAndConditions")}
                      className="termsSpan"
                    >
                      Terms of service & Privacy policy
                    </span>
                  </span>
                </div>
                <div className="signUpSection">
                  <span>Already have an account?</span>
                  <span onClick={handleLogin} className="linkSpan">
                    Log in
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
