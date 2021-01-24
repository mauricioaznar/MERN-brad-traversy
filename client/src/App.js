import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import Alert from './components/layout/Alert'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  console.log(localStorage.token)
  setAuthToken(localStorage.token)
}

const App = () => {

  React.useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Route exact path="/" component={Landing}/>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
