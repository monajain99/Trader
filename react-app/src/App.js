import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import Account from "./components/Account";
import Chart from "./components/Chart"
import LandingPage from "./components/staticPages/Landing";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setCurrentUser(user.username);
        setCurrentUserId(user.id);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar
        setAuthenticated={setAuthenticated}
        authenticated={authenticated}
      />
      <Switch>
        <Route path="/news/:symbol" exact={true}>
          <Chart
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>

        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path="/profile"
          exact={true}
          authenticated={authenticated}
          loaded={loaded}
        >
          <Account
            authenticate={authenticate}
            setAuthenticated={setAuthenticated}
            currentUser={currentUser}
            currentUserId={currentUserId}
          />
        </ProtectedRoute>
        <Route path="/" exact={true} authenticated={authenticated}>
          {authenticated ? <Redirect to="/profile" loaded={loaded}/> : " "}
          <Route path="/" exact={true}>
            <LandingPage
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </Route>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
