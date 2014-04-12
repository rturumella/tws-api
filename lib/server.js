var restify = require('restify');

function createServer(options) {
  var server = restify.createServer({
    log: options.log,
    name: options.name
  })

  // Ensure we don't drop data on uploads
  server.pre(restify.pre.pause());

  // Clean up sloppy paths like //todo//////1//
  server.pre(restify.pre.sanitizePath());

  // Handles annoying user agents (curl)
  server.pre(restify.pre.userAgentConnection());

  // Set a per request bunyan logger (with requestid filled in)
  server.use(restify.requestLogger());
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.dateParser());
  server.use(restify.authorizationParser());
  server.use(restify.queryParser());
  server.use(restify.gzipResponse());
  server.use(restify.bodyParser());

  return (server);
}

module.exports.createServer = createServer;
