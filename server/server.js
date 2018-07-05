'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();
// START OF USER ADDED CODE
var https = require('https');
var http = require('http');
var fs = require("fs");
var privateKey = fs.readFileSync(path.join(__dirname, './fancave-server-privkey.pem')).toString();
var certificate = fs.readFileSync(path.join(__dirname, './fancave-server-sscert.pem')).toString();

var options = {
  key: privateKey,
  cert: certificate
};

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/'));
app.set('options', options);
// END OF USER ADDED CODE

app.start = function() {

  if (appEnv.isLocal) {
    if (app.get('securePort') > 0) {
      
      return https.createServer(options, app).listen(app.get('securePort'), '0.0.0.0', function() {
        var baseUrl = 'https://' + app.get('host') + ':' + app.get('securePort');
        app.emit('started', baseUrl);
        console.log('Web server listening at %s%s', baseUrl, '/');
      });

    }
    else {
      
      return http.createServer(app).listen(app.get('port'), function() {
        var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
        app.emit('started', baseUrl);
        console.log('Web server listening at %s%s', baseUrl, '/');
      });

    }
    
  }
  else  {
    // start the web server
    return app.listen(appEnv.port, '0.0.0.0', function() {
      var baseUrl = app.get('url').replace(/\/$/, '');
      app.emit('started');
      console.log('Web server listening at: %s', baseUrl);
    });
  }
  
  
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
