const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getPage2 = (request, response) => {
  respond(request, response, page2, 'text/html');
};

const getPage3 = (request, response) => {
  respond(request, response, page3, 'text/html');
};

module.exports = {
  getIndex,
  getPage2,
  getPage3,
};
