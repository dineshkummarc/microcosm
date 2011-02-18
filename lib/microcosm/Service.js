/**
 * Copyright 2011 Jaime Bueza
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *    http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 
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