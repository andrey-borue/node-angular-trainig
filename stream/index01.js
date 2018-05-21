const fs = require("fs");
const crypto = require("crypto");

const inputStream = fs.createReadStream("input.txt");
const outputStream = fs.createWriteStream("output.txt");

const hash = crypto.createHash('sha1');
hash.setEncoding('hex');

ctyptPipe = inputStream.pipe(hash);
ctyptPipe.pipe(outputStream);
ctyptPipe.pipe(process.stdout);




// inputStream.on("readable", function() {
//   let data = inputStream.read();
//   if (data) {
//     let encrypt = hash.update(data).digest("hex");
//     console.log(encrypt);
//     outputStream.write(encrypt);
//   }
// });
