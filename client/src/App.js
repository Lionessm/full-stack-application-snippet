import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';
import Courses from './Courses';
import createCourse from "./create-course";



export default () => (
    <Router>
        <header>
          <div>
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route path='/courses/create' component={createCourse}/>
            </Switch>
          </div>
        </header>
    </Router>
);


