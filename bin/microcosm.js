var path   = require('path')
  , fs = require('fs')
  , sys = require('util')
  , user = require('./lib/User')
  , scopedClient = require('./lib/ScopedClient');
  


var DataMap = {
    '100': path.join(__dirname, '100_users.csv')
  , '20k': path.join(__dirname, '20000_users.csv')
  , '500k': path.join(__dirname, '500000_users.csv')
  , '1million': path.join(__dirname, '1000000_users.csv')
};

(function() {
  fs.readFile(DataMap['100'], 'ascii', function (read_error, content) {
    if (read_error) console.log("ERROR: Can't read " + read_error);
    var lines = content.split('\n'); //by line
    lines.forEach(function(line, index) {
      line = line.split(",");
      
      var fullName = line[0];
      var email = line[1];
      
      var data = { 
        "plc$lt$zoneContent$pageplaceholder$pageplaceholder$lt$zoneMain$MyBacardiProfile$myProfile$editProfileForm$ctl00$FullName$profile_fullname": fullName,
        "plc$lt$zoneContent$pageplaceholder$pageplaceholder$lt$zoneMain$MyBacardiProfile$myProfile$editProfileForm$ctl00$Email$profile_email": email }
      var request = scopedClient.create('http://glaucous.bluehq.bluemodus.com')
          .header('accept', 'text/html')
          .path('/My-profile/Edit.aspx') 
  
          .post(data)(function(err, resp, body) {
            sys.puts(body);
          });
    });
  });
})(); 