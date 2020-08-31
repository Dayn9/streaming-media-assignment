const fs = require('fs');  // pull in the file system module

const path = require('path');

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getParty = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getParty,
};
