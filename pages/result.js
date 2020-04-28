import UserProfile from '../src/components/UserProfile';
import Menu from '../src/components/menu'
import Footer from '../src/components/footer'
import Login from '../src/components/login'
import Result from '../src/components/result'
import React, { Component, Fragment } from 'react';
class ResultPage extends Component {
  static getInitialProps = async ({ req, query }) => {
    const {page} = query
    return {
      ...query
    };
  };

  componentDidMount() {
    window.initial();
  }
  render() {
    
    return (
      <div className="header-bg-white page-dashboard">
        <div className="body-inner">
          <Menu />
          <Result {...this.props} />
          <Footer />
          <Login/>
        </div>
      </div>
    );
  }
}

export default ResultPage;