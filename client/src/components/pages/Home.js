import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navebar from '../partials/Navebar';
class Home extends Component {
  render() {
    return (
      <>
        <Navebar />
        <div className="container main-box">
          <div className="row">
            <h1> Welcome To Home Page...!</h1>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
