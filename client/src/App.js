import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="jumbotron">
        <h1>Personal Finance Tracker</h1>
        <Switch>
          <Route exact path = "/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
