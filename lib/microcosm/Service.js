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
     var type = "get";

     if (self.getName().match(/^get/i)) {
       type = "get";
     } else if (self.getName().match(/^add|del|update/i)) {
       type = "post";
     }
     return type;
   }()
   , uri = this.uri || '/api'
   , responseType = options.responseType || 'application/json';
   
   
   client.perform(baseUrl, "POST", function(result) {
    
   }, JSON.stringify(data), { 'Content-Type': responseType, 'accept': responseType });
};

/* 
 * get
 */
Service.prototype.getName = function() {
 return this.name;
};
Service.prototype.getURI = function() {
 return this.uri;
};
Service.prototype.getOptions = function() {
 return this.options;
};