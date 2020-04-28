import React, { Component } from 'react';
import Home from '../src/components/Home';
import { NextSeo } from 'next-seo';
class IndexPage extends Component {
  static getInitialProps = async ({req, query}) => {
    return {};
  };

  componentDidMount(){

  }
  render () {
    const {data} = this.props;
    return (
      <>
        <NextSeo
          title="Simple Usage Example"
          description="A short description goes here."
        />
        <Home data={data}/>
      </>
      
    );
  }
}

export default IndexPage;
