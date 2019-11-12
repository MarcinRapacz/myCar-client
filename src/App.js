import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

// Components
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";

// Layouts
import Login from "./layouts/Login/Login";
import Register from "./layouts/Register/Register";

// Utils
import { getToken, decodeToken } from "./utils/jwt";

// Actions
import { setUser } from "./actions/authenticationActions";

function App() {
  const dispatch = useDispatch();

  // Check if client is log in
  const token = getToken();
  if (token) {
    const decoded = decodeToken(token);
    dispatch(setUser(decoded));
  }

  return (
    <div className="App">
      <Modal />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
