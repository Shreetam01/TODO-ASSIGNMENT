import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const context = createContext({ isAuthenticated: false }); // The benifit is, we can use this variable anywhere in the application.

const AppWrapper = () => {
  // Now we can make a setter function for isAuthenticated. Now we will pass both of these to the provider as values.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <context.Provider value={
      {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser
      }
    }> {/* We can pass the value isAuthenticated in the provider by writing value={isAuthenticated} but the problem is, we cannot change it's value. So we will make another react component so that we can make a seter function to change the value of isAuthenticated. All those things that are passed in the provider can be accessed in the whole app*/}
      <App />
    </context.Provider>
  )
}

export const server = "http://localhost:4000";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper />
);
