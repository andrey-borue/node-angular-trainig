const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const querystring = require('querystring');
const apiHost = 'https://translate.yandex.net';
const apiPath = '/api/v1.5/tr.json/translate';
const apiKey = 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';

const getHandler = (request, response) => {
  response.writeHead(200, 'OK', {'Content-Type': 'text/html'});
  fs.createReadStream('./form.html').pipe(response);
};

const postHandler = (request, response) => {


  let data = '';
  request
    .on('data', chunk => data += chunk)
    .on('end', () => {
      data = querystring.parse(data);
      response.writeHead(200, 'OK', {'Content-Type': 'text/html'});

      const apiRequest = https.request({
        'host': apiHost,
        'path': apiPath
      });

      apiRequest.on('data', () => {
        console.log('dddd');
      });

      apiRequest.on('error', (err) => {
        console.log(err);
      });

      apiRequest.write(querystring.stringify({
          'key': apiKey,
          'text': data.text,
          'lang': 'ru-en'
      }));

      apiRequest.end();

      response.end();
    });


  // let data = querystring.stringify({
  //   'key': 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df',
  //   'text': 1,
  //   'lang': 'ru-en'
  // });

  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df&
  // text=%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0&lang=ru-en

};

const handler = (request, response) => {

  switch (request.method) {
    case 'GET':
      getHandler(request, response);
      break;
    case 'POST':
      postHandler(request, response);
      break;
    default:
      response.writeHead(404, 'Not Found');
      response.end();
  }
};


http
  .createServer()
  .listen(PORT)
  .on('listening', () => {console.log('Start HTTP on port %d', PORT)})
  .on('error', err => console.error(err))
  .on('request', handler)
;


