const fs = require('fs');
const file = 'server/Devices.json';
module.exports.getDevices = () => {
  var devices = [];
  try {
    if(fs.existsSync(file)) {
      var deviceStr = fs.readFileSync(file);
      devices = JSON.parse(deviceStr);
    }
  } catch (e) {
  }
  return devices;
}

module.exports.writeDevices = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}
