const next = require('next');
const routes = require('./routes');
const _ = require('lodash');
const {createServer} = require('http'); // open http or https
const {parse} = require('url');
const fs = require('fs');

const app = next({dev: process.env.NODE_ENV === 'development'});
const handler = routes.getRequestHandler(app);
app.prepare().then(() => {
  let port = process.env.PORT || process.env.WEB_PORT;
  port = !_.isNil(port) ? port : 4000;
  console.log('port:', port);
  if (process.env.NODE_ENV === 'development') {
    const options = { // redem option with http
      // key: fs.readFileSync('config/ssl/self-signed.key'),
      // cert: fs.readFileSync('config/ssl/self-signed.crt'),
    };
    createServer(options,(req, res) => {
      const parsedUrl = parse(req.url, true);
      handler(req, res, parsedUrl);
    }).listen(port, error => {
      if (error) {
        console.log('error:', error);
        throw error;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  } else {
    const express = require('express');
    express().use(handler).listen(port);
  }
});
