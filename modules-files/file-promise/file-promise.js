
const fs = require('fs');
const conf = { encoding: 'UTF-8' };


const read = (path) => {
  return new Promise((done, fail) => {
    fs.readFile(path, conf, (err, data) => {
      if (err) {
        fail(err);
      } else {
        done(data);
      }
    });
  });
};

const write = (path, data) => {
  return new Promise((done, fail) => {
    fs.writeFile(path, data, conf, err => {
      err ? fail(err) : done(path);
    })
  })
};


module.exports = {
  read,
  write
};
