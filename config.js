var convict = require('convict');
var path = require('path');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV'
  },
  tripApiUrl: {
    doc: 'The Trip API Base Url',
    format: String,
    default: ''
   },
   locationApiUrl: {
    doc: 'The Location API Base Url',
    format: String,
    default: ''
   },
   identityUrl: {
    doc: 'The Identity Server Base Url',
    format: String,
    default: ''
   }
});

// Load environment dependent configuration
var env = config.get('env');

config.loadFile(path.join(__dirname,`./config.${env}.json`));

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config.getProperties();