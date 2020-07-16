"use strict";

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello koa2');
});
server.listen(9002, () => {
  console.log('server is start on port 9002');
});