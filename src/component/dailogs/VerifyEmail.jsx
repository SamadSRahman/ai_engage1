import React, { useEffect, useRef, useState } from "react";
import styles from "./forgetPassword.module.css";
import close from "../../images/cancel.svg";

import pass from "../../images/mark_email_read (2).svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OTPVerifier from "../otpVerifier/OTPVerifier";

export default function VerifyEmail({ onClose, name, phone, password, tokenFromProps}) {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(tokenFromProps)
  const containerRef = useRef(null);
  const email = localStorage.getItem("email");
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])

  useEffect(()=>{
    const string = otpValues.join("")
   setError("")
    setOtp(string)
  },[otpValues])
  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
      if (timer === 0) {
        setIsResendVisible(true);
      }
    }, 1000);
  }, [timer]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        // onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  async function handleResendOTP() {
    try {
      const response = await axios.post(
        "https://stream.xircular.io/api/v1/customer/sendOtp",
        { email: email }
      );
      console.log(response.data);
      if (response.data.message) {
        alert(response.data.message);
        setTimer(30);
        setToken(response.data.token)
        setIsResendVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://stream.xircular.io/api/v1/customer/emailVerification",
        {
          email: email,
          Otp: otp,
          name: name,
          password: password,
          phone: phone,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        alert("Email verification successful. Please log in to continue");
        // onClose();
        navigate("/SignIn");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.topSection}>
          <img src={close} alt="" onClick={onClose} />
        </div>
        <img
          width={"40px"}
          style={{ padding: "10px" }}
          src={pass}
          alt=""
          className={styles.logo}
        />
        <label className={styles.primaryText}>Verify your email</label>
        <label className={styles.secondaryText}>
          {" "}
          We’ve sent an OTP to {email}
        </label>
        <form onSubmit={handleVerifyCode}>
          {/* <div id={styles.inputWrapper} className="inputWrapper">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="OTP"
              maxLength={6}
            /> 
   
          </div> */}
          <OTPVerifier otpValues={otpValues} setOtpValues={setOtpValues}/>
      
          {error && <span className={styles.snackbarError}>{error}</span>}
          {!isResendVisible ? (
            <div className="signUpSection">
              <span>Resend OTP in</span>
              <span onClick={""} className="linkSpan">
                {formatTime(timer)}
              </span>
            </div>
          ) : (
            <div className="signUpSection">
              <span>Didn’t receive OTP?</span>
              <span onClick={handleResendOTP} className="linkSpan">
                Resend OTP
              </span>
            </div>
          )}
          <div className="signUpSection">
          <span>Incorrect email?</span>
              <span onClick={onClose} className="linkSpan">
                Edit 
              </span>
            </div>
          <button
            disabled={otp.length===6 ? false : true}
            className={styles.sendBtn}
            onClick={handleVerifyCode}
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
