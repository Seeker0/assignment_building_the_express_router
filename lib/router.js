'use strict';
const url = require('url');
const express = require('./express');

const Router = {};

Router.routes = {};

Router.parser = (req, res) => {
  let string = url.parse(req.url).pathname.split(`:`, 3);
  return string[1];
};

Router.handle = (req, res) => {
  let method = req.method.toLowerCase();
  let path = url.parse(req.url).pathname;
  if (Router.routes[method][path]) {
    Router.routes[method][path](req, res);
  } else {
    Router.parser(req, res);
  }
};

Router.initializeApp = app => {
  Router.methods = ['get', 'post', 'put'];
  Router.methods.forEach(method => {
    Router.routes[method] = Router.routes[method] || {};
    app[method] = (path, callback) => {
      Router.routes[method][path] = callback;
    };
    Router[method] = (path, callback) => {
      let valArr = path.split(':', 2);
      if (valArr.length < 2) {
        throw error;
      } else {
        Router.routes.params = {};
        Router.routes.params[valArr[1]] = '';
        console.log(Router.routes.params);
      }
    };
  });
};

// Router.initializeApp = app => {
//   Router.methods.forEach(method => {
//     // Initialize the key in routes if
//     // if doesn't exist yet
//     Router.routes[method] = Router.routes[method] || {};
//
//     // Add the callback to the method using
//     // the path as the key to the callback
//     app[method] = (path, callback) => {
//       Router.routes[method][path] = callback;
//     };
//   });
// };
// let body = "";
// req.on("data", data => {
//   console.log("DATA : " + data);
//   body += data;
// });
// req.body = body;

module.exports = Router;
