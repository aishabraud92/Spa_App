import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import Home from './Home.js';
import FavoriteFood from './FavoriteFood.js';
import FavoriteMovie from './FavoriteMovie.js';
import Main from './MainBlog';
import About from './About';



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Link to="/">  Home  </Link>
        <Link to="/MainBlog">  Blog  </Link>
        <Link to="/about">  About  </Link>
        <Link to="/favoritefood">  Fooood  </Link>
        <Link to="/favoritemovie">  Best Films  </Link>


        <Route exact path="/" component={Home} />
        <Route path="/mainblog" component={Main} />
        <Route path="/about" component={About} />
        <Route path="/favoritefood" component={FavoriteFood} />
        <Route path="/favoritemovie" component={FavoriteMovie} />
          </div>
      </Router>
    );
  }
}
export default App;
