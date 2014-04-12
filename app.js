//Node Module
var fs = require('fs');
var util = require('util');
//Server Modules
var bunyan = require('bunyan');
var restify = require('restify');
var tws = require('./lib');

// Globals

var APP_NAME = (process.env.APP_NAME || 'tws-api')
var PORT = (process.env.PORT || '8080')

var LOGGER = bunyan.createLogger({
  name: APP_NAME,
  streams: [
    {
      level: (process.env.LOG_LEVEL || 'info'),
      stream: process.stderr
    },
    {
      level: 'debug',
      type: 'raw',
      stream: new restify.bunyan.RequestCaptureStream({
        level: bunyan.WARN,
        maxRecords: 100,
        maxRequestIds: 1000,
        stream: process.stderr
      })
    }
  ],
  serializers: restify.bunyan.serializers
});


(function main() {
  var server = tws.createServer({
    log: LOGGER,
    name: APP_NAME
  });
  server.listen(PORT, function onListening() {
    LOGGER.debug('Listening at %s', server.url);
  });
})();
