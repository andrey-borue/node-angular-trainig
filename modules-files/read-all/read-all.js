const fs = require('fs');
const conf = { encoding: 'UTF-8' };

const getAllFileNames = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      err ? reject(err) : resolve(files);
    });
  });
};


const readFile = (path, name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path + name, conf, (err, content) => {
      err ? reject(err) : resolve({name, content});
    });
  })
};

const readAll = (path) => {
  return getAllFileNames(path)
    .then(names => Promise.all(
      names.map(name => readFile(path, name))
    ));
};


module.exports = readAll;
