import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import { getLoggedInUser } from "./modules/userProfileManager.js";
import { Spinner } from "reactstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getLoggedInUser().then((user) => {
        setUser(user);
      });
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null || (user === null && isLoggedIn === true)) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <ApplicationViews isLoggedIn={isLoggedIn} user={user} />
    </Router>
  );
}

export default App;
