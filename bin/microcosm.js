var log = console.log, arg, args = [], argv = process.argv.slice(2);

function usage() {
  log([ ''
      , 'Blast Radius: PROJECT MICROCOSM by @jbueza'
      , 'Usage: microcosm <command>'
      , 'where <command> is one of:'
      , '\t user:create, user:delete'
      , '\t simulator:follow, simulator:unfollow, simulator:random'
      , '\t smulator:like, simulator:vote, simulator:view, simulator:share'
      , '\t simulator:gherkin'
      ].join("\n"));  
}

if (!argv.length) {
  usage();
  process.exit(1);
} 

var engine = require('../')()
  , dataMap = require('../conf/DataMap.js').DataMap
  , serviceMap = require('../conf/ServiceMap.js').ServiceMap;

var cmd = argv[0].split(':');

switch (cmd[0]) {
  case 'user': 
      (function() {
        console.log("---> Loading [ User ]");
        engine
          .configure('dataType', 'csv') //not really used yet! should be able to specify "Facebook" as well
          .configure('data', dataMap)
          .configure('dataSet', '10k')
          .configure('services', serviceMap);
      })();
      break;
      
  case 'simulator':
      (function()  {
        console.log("---> Loading [ Simulator ]");
        engine
          .configure('dataType', 'bta') //not really used yet! should be able to specify "Facebook" as well
          .configure('data', dataMap)
          .configure('services', serviceMap);          
      })();
  
      
      break;
  
  default:
    console.log("Invalid Command");
    usage();
    process.exit(1);
    
}

  engine.start();