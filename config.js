var convict = require('convict');
var path = require('path');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev'],
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
   contentApiUrl: {
    doc: 'The Content API Base Url',
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
console.error(env);

config.loadFile(path.join(__dirname,`./config.${env}.json`));

if(process.env.CONFIG_TRIPAPIURL) {
  config.set('tripApiUrl', process.env.CONFIG_TRIPAPIURL)
}

if(process.env.CONFIG_LOCATIONAPIURL) {
  config.set('locationApiUrl', process.env.CONFIG_LOCATIONAPIURL)
}

if(process.env.CONFIG_IDENTITYURL) {
  config.set('identityUrl', process.env.CONFIG_IDENTITYURL)
}

if(process.env.CONFIG_CONTENTAPIURL) {
  config.set('contentApiUrl', process.env.CONFIG_CONTENTAPIURL)
}

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config.getProperties();