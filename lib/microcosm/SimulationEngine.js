
var path = require('path')
  , fs = require('fs')  
  , sys = require('util')
  , Service = require('./Service')
  , ServiceLocator = require('./ServiceLocator').ServiceLocator;  
  

var SimulationEngine = module.exports = function SimulationEngine() {};

SimulationEngine.prototype.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
SimulationEngine.prototype.options = {};

SimulationEngine.prototype.active = false;
SimulationEngine.prototype.heart = {};

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

/* 
 * Quick and dirty
 */
SimulationEngine.prototype.executeThroughCSV = function(csv) {

  var self = this
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
      
      ServiceLocator.getService('addUser').invoke(data, function(err, data) {
        console.log("Successful Request!");
      }, self);      
    });
  });

};


SimulationEngine.prototype.stimpack = function() {
  var self = this;
  console.log("[executing] get users");
  ServiceLocator.getService('getUsers').invoke(null, function(err, data) {
    console.log(data);
  }, self);
  
  
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
  
  } else if ( options.dataType == 'linkedin') {
    
  } else if (options.dataType == 'bta') {
    self.stimpack();
  }

  
};
SimulationEngine.prototype.kill = function() {
  console.log("[kill] Terminating Mission ... ");
  this.active = false;
};






SimulationEngine = exports;



