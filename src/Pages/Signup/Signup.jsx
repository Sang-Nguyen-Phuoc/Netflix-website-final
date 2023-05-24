import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleStart = (data) => {
    setUser({ ...user, email: data.email });
  };

  const handleFinish = (data) => {
    setUser({ ...user, password: data.password });
  };

  console.log(user);
  return (
    <div className="register">
      <div className="top">
        <div className="sign-up-wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/login" className="loginButton">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="sign-up-container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        {!user.email ? (
          <form className="input" onSubmit={handleSubmit(handleStart)}>
            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
            {errors.email && <div className="text-danger">Email is required.</div>}
            <button type="submit" className="registerButton">
              Get Started
            </button>
          </form>
        ) : (
          <form className="input" onSubmit={handleSubmit(handleFinish)}>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="error">Password is required.</span>}
            <Link to='/login' className="registerButton"><button type="submit" className="registerButton">
              Start
            </button> </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
