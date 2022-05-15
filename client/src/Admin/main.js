import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexLink, Link} from "react-router";

import App from './src/App.jsx';
import Home from './src/Request.jsx';
import Location from './src/Loc.jsx';
import User from './src/User.jsx';


ReactDOM.render(
      <Router>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="user" component={User}/>
          <Route path="loc" component={Location}/>
        </Route>
      </Router>,
      document.getElementById('app')
    );