const stream = require('stream');


class ReadableClass extends stream.Readable {
  _read(size) {
    const max = 100;
    const min = 1;
    const rand = Math.floor(Math.random() * (max - min)) + min;
    this.push(Buffer.from(rand.toString()));
  }
}


class WritableClass extends stream.Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}

class TransformClass extends stream.Transform {
  _transform(chunk, encoding, callback) {
    let data = '-->' + chunk.toString() + '<--';
    this.push(Buffer.from(data));

    setTimeout(() => {
      callback();
    }, 1000);
  }
}

const readable = new ReadableClass();
const writable = new WritableClass();
const transform = new TransformClass();

readable.pipe(transform).pipe(writable);
