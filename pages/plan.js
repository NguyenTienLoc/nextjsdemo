import UserProfile from '../src/components/UserProfile';
import Menu from '../src/components/menu'
import Footer from '../src/components/footer'
import Login from '../src/components/login'
import Plan from '../src/components/plan'
import React, { Component, Fragment } from 'react';
class PlanPage extends Component {
  static getInitialProps = async ({ req, query }) => {
    return query;
  };

  componentDidMount() {
    window.initial();
  }
  render() {
    
    return (
      <div className="header-bg-white page-dashboard">
        <div className="body-inner">
          <Menu />
          <Plan {...this.props} />
          <Footer />
          <Login/>
        </div>
      </div>
    );
  }
}

export default PlanPage;