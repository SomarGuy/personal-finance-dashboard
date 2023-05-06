import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { auth } from './firebase';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.currentUser ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/transactions" component={Transactions} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  );
};

export default App;
