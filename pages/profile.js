import React, { Component, Fragment } from 'react';
import UserProfile from '../src/components/UserProfile';
import Menu from '../src/components/menu'
import Footer from '../src/components/footer'
import Login from '../src/components/login'
class ProfilePage extends Component {
  static getInitialProps = async ({ req, query }) => {

    
    return {};
  };

  componentDidMount() {
    window.initial();
  }
  render() {
    const { data } = this.props;
    return (
      <div className="header-bg-white page-dashboard">
        <div className="body-inner">
          <Menu />
          <UserProfile />
          <Footer />
          <Login/>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
