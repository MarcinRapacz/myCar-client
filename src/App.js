import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

// Components
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";

// Layouts
import Login from "./layouts/Login/Login";
import Register from "./layouts/Register/Register";
import Page404 from "./layouts/Page404/Page404";

// Utils
import { getToken, decodeToken } from "./utils/jwt";

// Actions
import { setUser } from "./actions/authenticationActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);

  // Check if client is log in
  const token = getToken();
  if (token && !auth.id) {
    const decoded = decodeToken(token);
    dispatch(setUser(decoded));
  }

  return (
    <div className="App">
      <Modal />
      <Router>
        <Navbar />
        <Switch>
          {/* User is not log in */}
          {!auth.id && <Route exact path="/login" component={Login} />}
          {!auth.id && <Route exact path="/register" component={Register} />}

          <Route component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
