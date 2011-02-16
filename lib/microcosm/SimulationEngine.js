
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

  fs.readFile(options.dataSource, 'ascii', function (read_error, content) {
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
      console.log("Executing Request");
/*
      client.perform(baseUrl, "POST", function(result) {
        console.log(data.email + " inserted.");
      }, JSON.stringify(data), { 'Content-Type': 'application/json', accept: 'application/json' });
*/

    });
  });

};

SimulationEngine.prototype.start = function() {
  console.log("[initialize] Initializing Mission ... ");  
  var self = this
    , options = self.options;
    
  self.active = true;
    
  if ( options.dataType == 'csv' ) {
    self.executeThroughCSV( options.dataSource );
  } else if ( options.dataType == 'facebook' ) {
    self.executeThroughFacebook( options.dataSourc );
  }

  
  
  
};
SimulationEngine.prototype.kill = function() {
  console.log("[sigkill] Terminating Mission ... ");
  this.active = false;
};


SimulationEngine = exports;

/*


var baseUrl = "http://glaucous.bluehq.bluemodus.com/Bacardi/WebServices/UserService.asmx/CreateUser";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DataMap = {
    '100': path.join(__dirname, '..', 'data', 'csv', '100_users.csv')
  , '10k': path.join(__dirname, '..', 'data', 'csv', '10000_users.csv')
  , '20k': path.join(__dirname, '..', 'data', 'csv', '20000_users.csv')
  , '500k': path.join(__dirname, '..', 'data', 'csv', '500000_users.csv')
  , '1m': path.join(__dirname, '..', 'data', 'csv', '1000000_users.csv')
};


var client = new httpClient.httpclient();

  fs.readFile(DataMap['20k'], 'ascii', function (read_error, content) {
    if (read_error) console.log("ERROR: Can't read " + read_error);
    
    var lines = content.split('\n'); //by line
    
    lines.forEach(function(line, index) {
      
      line = line.split(",");
      
      var fullName = line[0];
      var email = line[1];
      
      var data = { 
        "facebookId": getRandomInt(1000, 1000000).toString(),
        "fullName": fullName,
        "email": email 
      };
      
      client.perform(baseUrl, "POST", function(result) {
        console.log(data.email + " inserted.");
      }, JSON.stringify(data), { 'Content-Type': 'application/json', accept: 'application/json' });

    });
  });
*/

