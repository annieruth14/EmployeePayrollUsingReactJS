import logo from './logo.svg';
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Demo from './components/demo'
import Home from './components/payroll-form/home-page'

function App() {
  return (
    <div className="App">
       <Router>
          <Switch>
            <Route exact path="/form" component={PayrollForm} />
            <Route path="/form/:id" component={PayrollForm} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
