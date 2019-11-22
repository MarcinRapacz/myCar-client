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
import CarsList from "./layouts/CarsList/CarsList";
import Car from "./layouts/Car/Car";
import CreateCar from "./layouts/CreateCar/CreateCar";

// Utils
import { getToken, decodeToken, expiredToken } from "./utils/jwt";

// Actions
import { setUser, setAuthHeader } from "./actions/authenticationActions";
import { showModal } from "./actions/modalActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);

  // Check if client is log in
  const token = getToken();
  if (token && !auth.id) {
    const decoded = decodeToken(token);
    if (Date.now() < decoded.exp * 1000) {
      // Set User
      setAuthHeader(token);
      dispatch(setUser(decoded));
    } else {
      // Remove token
      dispatch(showModal({ text: "Twój token wygasł, zaloguj się ponownie" }));
      expiredToken();
    }
  }

  return (
    <div className="App">
      <Modal />
      <Router>
        <Navbar />
        <Switch>
          {/* User is log in */}
          {auth.id && <Route exact path="/car" component={CarsList} />}
          {auth.id && <Route exact path="/car/new" component={CreateCar} />}
          {auth.id && <Route exact path="/car/:id" component={Car} />}

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
