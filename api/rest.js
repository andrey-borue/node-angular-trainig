const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const userApi = express.Router();

const users = [
  {
    'name': 'Name 1',
    'score': 1
  },
  {
    'name': 'Name 2',
    'score': 2
  }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

userApi.get('/', (request, response) => {
  response.json(users);
});

userApi.get('/:id', (request, response) => {
  const user = users[request.params.id];
  if (user) {
    response.json(user);
  } else {
    response.status(404);
    response.send();
  }
});

userApi.post('/', (request, response) => {
  const id = users.length;
  users.push(request.body);
  response.json(users[id]);
});

userApi.put('/:id', (request, response) => {
  let user = users[request.params.id];
  if (user) {
    user = Object.assign(user, request.body);
    users[request.params.id] = user;
    request.json(user);
  } else {
    response.status(404);
    response.send();
  }
});

userApi.delete('/:id', (request, response) => {
  users[request.params.id] = null;
  response.send();
});

app.use("/api/user", userApi);
app.listen(1337, () => {console.log('Listen 1337')});

