/* 
 * Provides a human readable Web Service map that dictates name and url of each service
 * that the Simulation Engine will use to throw requests at.
 *
 * Additionally, based on the service name (get, add, update, delete), it will assume
 * get, post, put, delete.
 *
 * Also, the 'action' is an optional parameter that you can pass in to make it more DRY
 */
var ServiceMap = [
    { serviceName: "getUsers",    serviceUri: "/api/user",      action: "UserCommand" }
  , { serviceName: "getUser",     serviceUri: "/api/user/123",  action: "UserCommand" }
  , { serviceName: "addUser",     serviceUri: "/api/user",      action: "UserCommand" }
  , { serviceName: "updateUser",  serviceUri: "/api/user/123",  action: "UserCommand" }
  , { serviceName: "deleteUser",  serviceUri: "/api/user/123",  action: "UserCommand" }
];

exports.ServiceMap = ServiceMap;