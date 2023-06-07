import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";



const Signup = () => {
  const { isAuthenticated, onAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailed, setIsEmailed] = useState(true);
  const [isPassworded, setIsPassworded] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const navigate = useNavigate();



  const onHandleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      setIsSignedUp(true);
      navigate("/login");
    }).catch((error) => {
      if (error.code === "auth/missing-email" || error.code === "auth/invalid-email") {
        setIsEmailed(false);
        setIsPassworded(true);
        setIsSignedUp(true);
      }
      if (error.code === "auth/missing-password" || error.code === "auth/weak-password") {
        setIsPassworded(false);
        setIsEmailed(true);
        setIsSignedUp(true);
      }
      if (error.code === "auth/email-already-in-use") {
        setIsSignedUp(false);
        setIsEmailed(true);
        setIsPassworded(true);
        setEmail("");
        setPassword("");
      }
    });
  };


  return (
    <div className="register">
      <div className="sign-up-top">
        <div className="sign-up-wrapper">
          <img
            className="sign-up-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={onHandleSignUp}>
          <h1>Sign up</h1>
          {!isSignedUp && <div className="alert">The email address is already in use</div>}
          {!isEmailed && <div className="alert">Email is required</div>}
          < input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isPassworded ? <div className="alert">Required password at least 6 characters</div>
            : null}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
          <button type="submit" className="registerButton" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Create an account
          </button>
          <span>
            Already signed in to Netflix? <Link to='/login' className="b"><b className="b">Sign in now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div >
  );
};

export default Signup;
