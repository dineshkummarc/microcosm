var httpClient = require("../../support/httpclient/HttpClient");
 
function KenticoService(name, uri, options) {
 this.name = name;
 this.uri = uri;
 this.options = options;
};

KenticoService.prototype.invoke = function(params, callback, scope) {
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
  
  function addslashes(str) {
    str = str.replace(/\\/g,'\\\\');
    str = str.replace(/\'/g,'\\\'');
    str = str.replace(/\"/g,'\\"');
    str = str.replace(/\0/g,'\\0');
    return str;
  }
  
  function stripslashes(str) {
    str = str.replace(/\\'/g,'\'');
    str = str.replace(/\\"/g,'"');
    str = str.replace(/\\0/g,'\0');
    str = str.replace(/\\\\/g,'\\');
    return str;
  }
  
  
  client.perform(self.getURI(), method, function(data) {
    data = data.response.body
    if ( typeof data == 'object' ) { 
      data = data.d;
    } else if (typeof data == 'string') {
      if (data.charAt(2) == 'd') {
        data = data.slice(6, -2); //.NET HACKERY!!!!
        data = stripslashes(data);
      }
    }
        
    if(typeof data == 'undefined' || !data) data = {};
    
    try { data = JSON.parse(data); } catch(err) {}
    if ( typeof callback == 'function' ) {
      callback.apply(scope, [null, data]);
    } else {
      //string
      scope[callback](null, data);
    }

  }, JSON.stringify(params), { 'Content-Type': responseType, 'accept': responseType });
};
KenticoService.prototype.getName = function() {
 return this.name;
};
KenticoService.prototype.getURI = function() {
 return this.uri;
};
KenticoService.prototype.getOptions = function() {
 return this.options;
};

module.exports = KenticoService;