const fs = require("fs");
const crypto = require("crypto");
const Transform = require('stream').Transform;


const inputStream = fs.createReadStream("input.txt");
const outputStream = fs.createWriteStream("output.txt");


class HexTransform extends Transform {
  _transform(chunk, encoding, callback) {
    callback(null, crypto.createHash('sha1').update(Buffer.from(chunk, 'hex')).digest("hex"));
  }
}

const hash = new HexTransform();

ctyptPipe = inputStream.pipe(hash);
ctyptPipe.pipe(outputStream);
ctyptPipe.pipe(process.stdout);


