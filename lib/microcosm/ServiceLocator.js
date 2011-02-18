
var path = require('path')
  , fs = require('fs')  
  , sys = require('util')
  , service = require('./Service');
  
  
  
console.log(service);
  
  
var ServiceLocator = {
  services: {},
  addService: function(service) {
    this.services[service.name] = service;
    return this;
  },
  getService: function(name) {
    return this.services[name];
  },
  removeService: function(name) {
    delete this.services[name];
  },
  removeServices: function() { 
    this.services = {}; 
  },
  addServices: function(map) {
    var self = this;
    
    map.services.forEach(function(i, item) {
      //console.log(item)
      
//      self.addService(new service.Service(item.serviceName, item.serviceUri, {}));
      
    });
  }
};
//test
exports.ServiceLocator = ServiceLocator;