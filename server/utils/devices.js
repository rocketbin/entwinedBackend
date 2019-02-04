const fs = require('fs');
const _ = require('lodash');
const repo = require('./deviceRepo');
var devices = repo.getDevices();
var defaultName = 'TargetDevice';

const addDevice = (id, ip, protocol, room) => {
  // console.log(devices);
  var duplicateDevices = devices.length > 0 ? devices.filter(n => n.ip === ip) : [] 
  if ( duplicateDevices.length === 0) {
    var name = generateName();
    devices.push({ id, name, ip, protocol, room });
    repo.writeDevices(devices);
    console.log(devices)
  } 
}

const removeDevice = (id) => {
  repo.writeDevices(devices.filter(n => n.id !== id));
}

const getDevice = (id) => {
  return devices.filter(n => n.id === id)
}

const getAll = () => {
  return devices;
}

const generateName = () => {
  let ind =  devices.length + 1;
  return defaultName + ind;
}

module.exports = {
  addDevice,
  removeDevice,
  getDevice,
  getAll
};