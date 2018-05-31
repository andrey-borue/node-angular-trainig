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


userApi.post("/", function(request, response) {
  const method = RPC[request.body.method];
  method(request.body.params, function(error, result) {
    if (result) {
      response.json({
        'id': request.body.id,
        'result': result,
        'jsonrpc': '2.0'
      });
    } else {
      response.json({
        'id': request.body.id,
        'error': error,
        'jsonrpc': '2.0'
      });
    }
  });
});


const RPC = {
  'add_user': (params, callback) => {
    const id = users.length;
    users.push(params);
    callback(null, users[id]);
  },

  'get_users': (params, callback) => {
    callback(null, users);
  },

  'get_user': (params, callback) => {
    const user = users[params];
    if (user) {
      callback(null, user);
    } else {
      callback({code: 404, message: 'User not found'}, null);
    }
  },

  'update_user': (params, callback) => {
    let user = users[params.id];
    if (user) {
      user = Object.assign(user, params.data);
      users[params.id] = user;
      callback(null, user);
    } else {
      callback({code: 404, message: 'User not found'}, null);
    }
  }
};


app.use("/rpc", userApi);
app.listen(1337, () => {console.log('Listen 1337')});
