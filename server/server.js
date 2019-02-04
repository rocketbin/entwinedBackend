console.clear();
const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const controller = require('./utils/controller.js');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIo(server);
var { isRealString } = require('./utils/validation');

var DeviceRoom = 'targetDevices';
// var { getDevices } = require('./utils/deviceRepo.js');

app.post('/LoadLayout', function (req, res){
  io.to(DeviceRoom).emit('setLayout', {
    layout: req.query.layoutID,
    color: req.query.color,
    loadImageGroup: req.query.loadImageGroup
  });
  res.send('done');
});

app.post('/showDemo', function (req, res){
  io.to(DeviceRoom).emit('showDemo', {
    demo: req.query.demo
  });
  res.send('done');
});

app.post('/prompt', function (req, res){
  console.log(req.query.text)
  io.to(DeviceRoom).emit('prompt', {
    text: req.query.text
  });
  res.send('done');
});

io.on('connection', (socket) => {
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  if(socketId) {
    controller.run({_:'add', id:socketId, ip:clientIp, protocol: 'websocket', room: DeviceRoom});
  }
  socket.join(DeviceRoom);
  // on connect
  socket.on('join', (param, callback) => {
    callback('this device is under control by the server');
  })

  // on connect
  socket.on('disconnect', () => {

  })
})

server.listen(port, () => console.log(`Server is up on :${port}`));

