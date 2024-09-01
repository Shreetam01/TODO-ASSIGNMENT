import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context, server } from "../index";
import { toast } from "react-hot-toast";
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        toast.success(data.message);
        setIsAuthenticated(true);
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          placeholder="Enter Your Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter Your Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>

      <div>
        <p>Or</p>
        <Link to={"/register"} className="reg">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
