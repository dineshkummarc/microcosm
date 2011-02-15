var path = require('path')
  , fs = require('fs')  
  , sys = require('util');

var src = path.join(__dirname, "..", "lib/microcosm")
  , conf = path.join(__dirname, "..", "conf")
  , httpClient = require("./lib/HttpClient");


//var engine = new SimulationEngine();


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


//(function() {
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
      

      // a simple http request with default options (gzip off, keepalive off, https off)
      client.perform(baseUrl, "POST", function(result) {
        console.log(data.email + " inserted.");
      }, JSON.stringify(data), { 'Content-Type': 'application/json', accept: 'application/json' });

    });
  });
//})();

  

/*


  , user = require('./lib/User');  


var DataMap = {
    '100': path.join(__dirname, '100_users.csv')
  , '20k': path.join(__dirname, '20000_users.csv')
  , '500k': path.join(__dirname, '500000_users.csv')
  , '1million': path.join(__dirname, '1000000_users.csv')
};
 */
