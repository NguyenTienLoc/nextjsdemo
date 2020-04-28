import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../src/redux/store';

let store, persistor;
const makeStore = (initialState, {isServer}) => {
  const type = isServer ? 'server' : 'client';
  const options = {
    type: type,
  };
  const result = configureStore(initialState, options, () => {
    updateStore(isServer);
  });
  store = isServer ? result : result.store;
  persistor = isServer ? null : result.persistor;
  updateStore(isServer);

  return store;
};

/**
 * update redux store in singleton
 * @param isServer is it running on server
 */
const updateStore = (isServer) => {
};

class MyApp extends App {
  static getInitialProps = async ({Component, ctx}) => {
    let pageProps
      = typeof Component.getInitialProps === 'function'
      ? await Component.getInitialProps(ctx)
      : {};
    return {
      pageProps,
    };
  };

  constructor (props) {
    super(props);

    const {pageProps} = props;
    this.state = {
      pageProps: pageProps || {},
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pageProps!==this.props.pageProps){
      this.setState({
        pageProps: nextProps.pageProps || {},
      });
    }
  }

  render () {
    const {pageProps} = this.state;
    const {Component, store} = this.props;
    const options = store.options;
    const {type} = options;
    return (
      <Fragment>
        <Provider store={store}>
          {
            type === 'server'
              ? (
                <Fragment>
                  <Component {...pageProps}/>
                </Fragment>
              )
              : (
                <PersistGate
                  loading={null}
                  persistor={persistor}>
                  <Fragment>
                    <Component {...pageProps}/>
                  </Fragment>
                </PersistGate>
              )
          }
        </Provider>
      </Fragment>
    );
  }
}

export default withRedux(makeStore)(MyApp);
