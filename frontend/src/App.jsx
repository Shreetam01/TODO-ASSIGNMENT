import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
// import "../src/styles/app.scss";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { context, server } from "./index";
import "./app.css"
import Footer from "./components/Footer";

function App() {
  const { setUser, setIsAuthenticated } = useContext(context);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${server}/me`, {
          withCredentials: true,
        });

        if (data.message === "Please Log in first") {
          setIsAuthenticated(false);
          setUser({});
        } else {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfile();
  }, [setIsAuthenticated, setUser]);

  return (
    <Router>
      <Header />
      <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      </div>
      <Footer/>
      <Toaster />
    </Router>
  );
}

export default App;
