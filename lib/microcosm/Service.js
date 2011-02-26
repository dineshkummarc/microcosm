var httpClient = require("../../support/httpclient/HttpClient");
 
function Service(name, uri, options) {
 this.name = name;
 this.uri = uri;
 this.options = options;
};

Service.prototype.invoke = function(params, callback, scope) {
  var self = this;
  var options = this.getOptions() || {}
   , method = options.method || function() {
     var type = "GET";
     if (self.getName().match(/^get/i)) {
       type = "GET";
     } else if (self.getName().match(/^add|del|update/i)) {
       type = "POST";
     }
     return type;
   }()
  , uri = this.uri || '/api'
  , responseType = options.responseType || 'application/json';
  
  var client = new httpClient.httpclient();
  client.perform(self.getURI(), method, function(data) {
    if ( typeof callback == 'function' ) {
      callback.apply(scope, [null, data.response.body]);
    } else {
      scope[callback](null, data.response.body);
    }

  }, JSON.stringify(params), { 'Content-Type': responseType, 'accept': responseType });
};
Service.prototype.getName = function() {
 return this.name;
};
Service.prototype.getURI = function() {
 return this.uri;
};
Service.prototype.getOptions = function() {
 return this.options;
};

module.exports = Service;