
const fs = require('fs');
const conf = { encoding: 'UTF-8' };

module.exports = (path, callback) => {
  try {
    const stats = fs.statSync(path);

    let type, content, childs;

    if (stats.isDirectory()) {
      type = 'directory';
      childs = fs.readdirSync(path, conf);
    }

    if (stats.isFile()) {
      type = 'file';
      content = fs.readFileSync(path).toString();
    }

    callback(null, {
      path,
      type,
      content,
      childs
    });
  } catch (e) {
    callback(e, null)
  }

};
