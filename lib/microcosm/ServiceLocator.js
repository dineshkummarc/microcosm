var Service = require('./Service');  
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
    
    map.services.forEach(function(item, index) {
      self.addService(new Service(item.serviceName, map.target + item.serviceUri, {}));      
    });
    
  }
};
exports.ServiceLocator = ServiceLocator;