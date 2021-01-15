import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/login/Login';
import StudentDetails from './components/studentDetails/StudentDetails';
import AddStudent from './components/adminUser/addStudent/AddStudent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">  
      <Switch>
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/studentDetails" exact component={StudentDetails} />
        <Route path="/addStudent" exact component={AddStudent} />
        <Redirect from="/" to="/register" /> 
      </Switch> 
      </div>
    </BrowserRouter>
    
  );
}

export default App;
