import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context, server } from "../index";
import { toast } from "react-hot-toast";
import "./Header.css"

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsAuthenticated(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navbar">
      <div className="heading">
        <h1>Todo App</h1>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>

        {isAuthenticated ? (
          <button
            disabled={loading}
            className="btn"
            onClick={logoutHandler}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
