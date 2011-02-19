var engine = require('../')()
  , dataMap = require('../conf/DataMap.js').DataMap
  , serviceMap = require('../conf/ServiceMap.js').ServiceMap;
  
engine
  .configure('dataType', 'bta') //not really used yet! should be able to specify "Facebook" as well
  .configure('data', dataMap)
  .configure('dataSet', '2')
  .configure('services', serviceMap)
  
  .start();