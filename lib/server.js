var http = require('http');
var querystring = require('querystring');

exports.parseCommand = function(command) {
  var commandArray = command.split(' ');
  var command = commandArray.shift();
  var params = commandArray.join('+');
  return command + '?args=' + params;
}

this.server = http.createServer(function(req, res) {
  req.url.replace(/\/explain\/(.*)/, function(match, param) {
    var command = exports.parseCommand(querystring.unescape(param));
    var esUrl = 'http://explainshell.com/explain/' + command;
    res.writeHead(302, {
      'Location': esUrl
    });
    res.end();
  });

  res.writeHead(200, {
    'Content-Type': 'text'
  });
  res.end('hi');

});

exports.listen = function() {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function(callback) {
  this.server.close(callback);
};
