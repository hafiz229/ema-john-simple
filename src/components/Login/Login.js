import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const { singInUsingGoogle, setUser } = useAuth();

  // redirect to the initial page after login
  const history = useHistory();
  const location = useLocation();
  // if no history found will go to home
  const redirect_url = location.state?.from || "/shop";

  const handleGoogleLogin = () => {
    singInUsingGoogle()
      .then((result) => {
        setUser(result.user);
        history.push(redirect_url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-form">
      <div>
        <h2>
          Login
          <form>
            <input type="email" placeholder="Your Email" />
            <br />
            <input type="password" placeholder="Your Password" />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </h2>
        <p>
          New to ema-john? <Link to="/register">Create Account</Link>
        </p>
        <div>---------or---------</div>
        <button onClick={handleGoogleLogin} className="btn-regular">
          Google Sign-In
        </button>
      </div>
    </div>
  );
};

export default Login;
