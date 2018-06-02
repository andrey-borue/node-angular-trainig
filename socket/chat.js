const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

class UserObject {
  constructor(id) {
    this._id = id
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get room() {
    return this._room;
  }

  set room(room) {
    this._room = room;
  }
}

app.use(bodyParser.urlencoded({"extended": true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});


// io.use((socket, next) => {
//   // console.log('middle');
//   next();
// });

io.on('connection', (socket) => {
  const user = new UserObject(socket.id);

  socket.on('chat message', (msg) => {
    io.to(user.room).emit('chat message', user.name + ': ' + msg);
  });

  socket.on('login', (msg) => {
    user.name = msg.login;
    user.room = msg.room;

    socket.join(user.room);
    socket.emit('login success', 'Your ID is ' + socket.id);

    console.log(user.name + ' has been signed in');

    io.to(user.room).emit('chat message', 'Hi, ' + user.name);
  });

  socket.on('disconnect', () => {
    console.log(user.name + ' has been disconnected');

    io.to(user.room).emit('chat message', 'Bye, ' + user.name);
  });

});


http.listen(3123, () =>{
  console.log('listening on *:3123');
});
