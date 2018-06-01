const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));


app.get('/', (request, response) => {
  response.send('Hello, Express.js');
});


app.get('/hello', (request, response) => {
  response.send('Hello stranger!');
});

app.get('/hello/:name', (request, response) => {
  response.send(`Hello, ${request.params.name}!`);
});

app.all('/sub/*', (request, response) => {
  response.send(`You requested URI ${request.url}`);
});

const middleware = (request, response, next) => {
  if (request.headers.key === undefined) {
    response.status(401);
    response.send();
  } else {
    next();
  }
};

app.post('/post', middleware, (request, response) => {
  if (JSON.stringify(request.body) !== '{}') {
    response.json({body: request.body});
  } else {
    response.status(404);
    response.send();
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
