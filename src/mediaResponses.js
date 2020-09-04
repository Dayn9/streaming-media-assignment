const fs = require('fs'); // pull in the file system module
const path = require('path');

const loadFile = (request, response, fileLocation, type) => {
  const file = path.resolve(__dirname, fileLocation);

  fs.stat(file, (err, stats) => {
    // error check
    if (err) {
      // check for error no entry
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    // get the range header if it exists
    let { range } = request.headers;

    // assume range starts at 0 if not included
    if (!range) {
      range = 'bytes=0-';
    }

    // get the 2 positions
    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = stats.size; // file size
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1; // default to file size
    if (start > end) {
      start = end - 1;
    }

    const chunkSize = (end - start) + 1;

    // create response header
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': type,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');
};

const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};

const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
};

module.exports = {
  getParty,
  getBling,
  getBird,
};
