import React, { useContext, useEffect, useState } from "react";
import { context, server } from "../index";
import { Navigate } from "react-router-dom";
import "./Profile.css"

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [user, setUser] = useState({
    name: "",
    email: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${server}/me`, {
          method: "GET",
          credentials: "include", 
        });

        const data = await response.json();

        if (response.ok) {
          setUser({
            name: data.user?.name,
            email: data.user?.email,
            createdAt: new Date(data.user?.createdAt).toLocaleDateString(),
          });
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchProfile();
  }, [setIsAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile">
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Account Created On: {user.createdAt}</h2>
    </div>
  );
};

export default Profile;
