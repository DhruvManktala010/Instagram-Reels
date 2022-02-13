import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { firestore } from "./Firebase/firebase";

const App = () => {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/" exact><Home></Home></Route>
            <Route path="/login" exact><Login></Login></Route>
          </Switch>
        </Router>
        </AuthProvider>
    </React.Fragment>
  );
}

export default App;