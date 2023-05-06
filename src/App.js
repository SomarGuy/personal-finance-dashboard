import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Update this import
import { auth } from './firebase';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './components/Transactions/Transactions';
import Investments from './components/Investments/Investments';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // You can change this value to your desired primary color
    },
  },
  typography: {
    fontWeightBold: 700,
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/transactions" component={Transactions} />
          <PrivateRoute path="/investments" component={Investments} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
