import React, { Component } from 'react';
import './App.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openWeather: ""
    }
  }

componentDidMount() {

var base = this

let weatherApi = 'http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}'
fetch(weatherApi)
  .then((response) => {
    return response.json()
  }).then((json) => {
    base.setState({openWeather: json.weather});
  }).catch((ex) => {
    console.log('an error occured while parsing', ex);
  })
}

  render() {
    let forcast = this.state.openWeather;
    if (!this.state.openWeather){
      return (
        <form onSubmit={this.handleSubmit}>
        <label>
        zipcode:
        <input type="text" zipcode="zipcode" />
        </ label>
        <input type="submit" value="Submit" />
        </form>
      )
    }
    return (
      <div className="Home">
        <h1>Welcome!</h1>
          <p>Your Weather:</p>
          {forcast}
          </div>
    );
  }
}

export default About;
