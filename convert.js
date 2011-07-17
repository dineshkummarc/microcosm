var path = require('path')
  , fs = require('fs')  
  , sys = require('util');
  
  var people = [];
fs.readFile(__dirname + '/data/csv/5000_users.csv', 'ascii', function (read_error, content) {
    
   var lines = content.split('\n'); //by line
    lines.forEach(function(line, index) {
      line = line.split(",");

      var fullName = line[0];
      var email = line[1];


      var data = { "fullName": fullName, "email": email };

      
      people.push(data);

    });    
    
  var o = sys.inspect(people);
  fs.writeFileSync(__dirname + '/data/json/5000_users.json', o);
  
});

