const devices = require('./devices.js');

module.exports.run = (com) => {
  switch (com._) {
    case 'add':
      return devices.addDevice(com.id, com.ip, com.protocol, com.room);
      break;
    case 'remove':
      return devices.removeDevice(com.id);
      break;
    case 'list':
      return devices.getAll();
      break;
    case 'read':
      return devices.getDevice(com.id);
      break;
    default:
      return`Command "${com}" not found`;
  }
}
