import "./Login.css"
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailed, setIsEmailed] = useState(true);
  const [isPassworded, setIsPassworded] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const { isAuthenticated, onAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      onAuthenticated(true);
      navigate("/");
    }).catch((error) => {
      if (error.code === "auth/missing-email") {
        setIsEmailed(false);
        setIsPassworded(true);
        setIsSignedIn(true);
      }
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-password" || error.code === "auth/missing-password") {
        setIsPassworded(false);
        setIsEmailed(true);
        setIsSignedIn(true);
      }
      if (error.code === "auth/user-not-found") {
        setIsSignedIn(false);
        setIsEmailed(true);
        setIsPassworded(true);
        setEmail("");
        setPassword("");
      }
    });
  };

  setTimeout(() => {
    setisLoading(false);
  }, 1000);

  return (
    <>
      {isLoading ? (
        <>
          <div className="NetflixIntro"><Loading /></div>
        </>
      ) : (
        <div className="login">
          <div className="login-top">
            <div className="login-wrapper">
              <img
                className="login-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
              />
            </div>
          </div>
          <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
              <h1>Sign In</h1>
              {!isSignedIn && <div className="alert">User not found</div>}
              {!isEmailed && <div className="alert">Email is required</div>}
              <input type="email" placeholder="Email or phone number" value={email} onChange={(e) => setEmail(e.target.value
              )} />
              {!isPassworded ? <div className="alert">Invalid Password</div>
                : null}
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value
              )} />
              <button type="submit" className="loginButton">Sign In</button>
              <span>
                New to Netflix? <Link to='/signup' className="b"><b className="b">Sign up now.</b></Link>
              </span>
              <small>
                This page is protected by Google reCAPTCHA to ensure you're not a
                bot. <b>Learn more</b>.
              </small>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login; 