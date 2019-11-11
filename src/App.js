import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import store from "./store";

// Components
import Login from "./layouts/Login/Login";
import Register from "./layouts/Register/Register";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Modal />
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
