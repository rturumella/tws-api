//Node Module
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
//Server Modules
var bunyan = require('bunyan');
var restify = require('restify');
var Sequelize = require('sequelize');
var tws = require('./lib');

// Globals

var ENV = process.env;
var APP_NAME = (ENV.APP_NAME || 'tws-api')
var PORT = (ENV.PORT || '8080')

var LOGGER = bunyan.createLogger({
  name: APP_NAME,
  streams: [
    {
      level: (ENV.LOG_LEVEL || 'info'),
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

DB_CONF = function() {
  var conf = require('./config/db_config.json')[ENV.NODE_ENV];
  ['username', 'database', 'password', 'host', 'port'].forEach(function(itm) {
    if(itm in conf) {
      conf[itm] = (ENV["PG_"+itm.toUpperCase()] || conf[itm] || null)
    }
  });
  return conf;
}();

LOGGER.debug(DB_CONF)
var DB = new Sequelize(DB_CONF.database, DB_CONF.username, DB_CONF.password, {
  logging: function(msg) { LOGGER.debug(msg) },
  dialect: DB_CONF.dialect || 'postgres',
  port: DB_CONF.port || 3306
})

(function main() {
  var server = tws.createServer({
    log: LOGGER,
    name: APP_NAME,
    db: DB
  });
  server.listen(PORT, function onListening() {
    LOGGER.debug('Listening at %s', server.url);
  });
})();
