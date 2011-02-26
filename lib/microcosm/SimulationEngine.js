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
    var lines = content.split('\n'); //by line
    lines.forEach(function(line, index) {
      line = line.split(",");

      var fullName = line[0];
      var email = line[1];


      var data = { 
        "facebookId": self.getRandomInt(1000, 1000000).toString()
        , "fullName": fullName
        , "email": self.getRandomInt(1000, 1000000).toString() + email
      };
      
      ServiceLocator.getService('addUser').invoke(data, function(err, data) {
        console.log("Successful Request!");
      }, self);
  
    });
  });

};




SimulationEngine.prototype.stimpack = function() {
  var self = this;
  var timer = setInterval(function() {
    ServiceLocator.getService('addGenerateNetwork').invoke(null, function(err, data) {
      //!-------------
      
      
      console.log(data);
      
      
  
  
  
    
      //!---------------
    }, self);
    if(!self.active) clearInterval(timer);
  }, 1000);
  
  
};



SimulationEngine.prototype.stimpack_beta = function() {
  var self = this;
  console.log("[executing] fetching all users ... ");
  var features = [];
      features.push(ServiceLocator.getService('addFollow'));
      //features.push(ServiceLocator.getService('addUnfollow'));

  var users = [];
  
  ServiceLocator.getService('getUsers').invoke(null, function(err, user_data) {
    users = user_data;
    var timer = setInterval(function() {
      console.log("[randomizing] follow / unfollow");      
      
      var userId = users[self.getRandomInt(0, users.length - 1)];
      var targetUser = users[self.getRandomInt(0, users.length - 1)];
      var randomService = features[0]; //self.getRandomInt(0)]; //, 1)];

      //----------------
      
      console.log("User: ", targetUser, " --> Action: ", randomService.name);
      
      var params = { followerUserId: targetUser, followedUserId: userId };
      ServiceLocator.getService("addFollow").invoke(params, function(err, follow_data) {
        console.log('Follow Complete:');
      }, self);
      
      //-----------------
      
      if(!self.active) clearInterval(timer);
    }, 500);
  
  
    


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
    self.stimpack_beta();
  }

  
};
SimulationEngine.prototype.kill = function() {
  console.log("[kill] Terminating Mission ... ");
  this.active = false;
};






SimulationEngine = exports;



