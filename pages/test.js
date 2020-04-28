import React, { Component } from 'react';
import Home from '../src/home/Home';

class Test extends Component {
  static getInitialProps = async ({req, query}) => {
    return query;
  };

  render () {
    const {data} = this.props;
    // console.log(this.props)
    return (
      <div>test</div>
    );
  }
}

export default Test;
