
var path = require('path')
  , fs = require('fs')  
  , sys = require('util')
  , service = require('./Service')
  , ServiceLocator = require('./ServiceLocator').ServiceLocator
  , httpClient = require("../../support/httpclient/HttpClient");
  
  

var DataMap = {
    "100": path.join(__dirname, '100_users.csv')
  , "20k": path.join(__dirname, '20000_users.csv')
  , "500k": path.join(__dirname, '500000_users.csv')
  , "1m": path.join(__dirname, '1000000_users.csv')
};

var SimulationEngine = module.exports = function SimulationEngine() {};

SimulationEngine.prototype.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
SimulationEngine.prototype.options = {};

SimulationEngine.prototype.active = false;


SimulationEngine.prototype['in'] = function(environment) {
  this.environment = environment;
  return this;
};

SimulationEngine.prototype.configure = function(key, value) {
  if(arguments.length > 1) {
    this.options[key] = value;
    return this;
  } else {
    return this.options[key];
  }
};

SimulationEngine.prototype.executeThroughCSV = function(csv) {

  var self = this
    , client = new httpClient.httpclient()
    , options = self.options;

  fs.readFile(csv, 'ascii', function (read_error, content) {
    if (read_error) console.log("ERROR: Can't read " + read_error);

    var lines = content.split('\n'); //by line

    lines.forEach(function(line, index) {

      line = line.split(",");

      var fullName = line[0];
      var email = line[1];

      var data = { 
        "facebookId": self.getRandomInt(1000, 1000000).toString(),
        "fullName": fullName,
        "email": email 
      };
         /*   
      ServiceLocator.getService('CreateUser').invoke({}, function() {
        console.log("Successful Request!");
      }, self);*/
    });
  });

};

SimulationEngine.prototype.start = function() {
  console.log("[initialize] Initializing Mission ... ");  
  var self = this
    , options = self.options;    
  self.active = true;
  
  ServiceLocator.addServices(options.services);
 
  if ( options.dataType == 'csv' ) {
    self.executeThroughCSV(options.data[options.dataSet]);
  } else if ( options.dataType == 'facebook' ) {
    self.executeThroughFacebook( options.dataSource );
  }

  
};
SimulationEngine.prototype.kill = function() {
  console.log("[kill] Terminating Mission ... ");
  this.active = false;
};

SimulationEngine = exports;
