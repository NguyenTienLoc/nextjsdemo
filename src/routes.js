const React = require('react');
const NextLink = require('next/link').default;
const NextRouter = require('next/router').default;
const createReactClass = require('create-react-class');
const routes = require('next-routes');

const MyLink = createReactClass({
  render: function () {
    const props = {
      ...this.props,
      prefetch: false,
    };
    return React.createElement(NextLink, props);
  },
});

const opts = {
  Link: MyLink,
  Router: NextRouter,
};
module.exports = routes(opts)
  .add('index', '/', 'index')
  // .add('profile', '/profile')
  // .add('test', '/', 'test')
  // .add('result','/place/:name/:id','result')
  // .add('plan','/plan/:name/:id','plan')
