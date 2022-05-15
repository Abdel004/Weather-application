import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, IndexLink, Link} from "react-router";

import App from './src/App.jsx';
import Home from './src/Details.jsx';
import Info from './src/Info.jsx';
import Map from './src/Map.jsx';
import Comment from './src/Comments.jsx';
import Favourite from './src/Fav.jsx';


ReactDOM.render(
      <Router>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="about" component={Info}/>
          <Route path="mi1" component={Map}/>
          <Route path="mi2" component={Comment}/>	
          <Route path="fav" component={Favourite}/>
        </Route>
      </Router>,
      document.getElementById('app')
    );