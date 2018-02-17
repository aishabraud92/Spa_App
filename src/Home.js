import React, { Component } from 'react';
import './App.css';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shakeSpeare: ""
    }
  }

componentDidMount() {

var base = this

let poemApi = 'http://ShakeItSpeare.com/api/poem'
fetch(poemApi)
  .then((response) => {
    return response.json()
  }).then((json) => {
    base.setState({shakeSpeare: json.poem});
  }).catch((ex) => {
    console.log('an error occured while parsing', ex);
  })
}

  render() {
    let poetry = this.state.shakeSpeare;
    if (!this.state.shakeSpeare){
      return (
        <div>
        <h3>The lady doth protest too much, while methinks.</h3>
        </div>
      )
    }
    return (
      <div className="Home">
        <h1>Welcome!</h1>
          <p>My Favorite Shakespeare poem:</p>
          {poetry}
      </div>
    );
  }
}
export default Home;
