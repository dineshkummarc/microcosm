var fs = require("fs")
  , http = require("http")
  , sys = require("sys");

User = function(name, email) {
  this.name = name;
  this.email = email;
};

User.prototype.save = function(callback) {    
  var self = this;
  
  
  
  return function() {
    callback.apply(this);
  };
};