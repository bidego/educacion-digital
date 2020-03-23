import React, { useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigator } from './components';
import { Home, Rooms, Courses, Projects, Login, Signup } from './screens';

import authReducer from './store/reducers/auth';
import coursesReducer from './store/reducers/courses';
import projectsReducer from './store/reducers/projects';

const rootReducer = combineReducers({
  projects: projectsReducer,
  courses: coursesReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  useEffect(()=> {
    document.title = "Educacion Digital";
  });
  return (
    <Provider store={store}>
      <Router>
        <Navigator />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/courses" component={Courses} />
          <Route path="/projects" component={Projects} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
