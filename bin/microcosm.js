var engine = require('../')()
  , dataMap = require('../conf/DataMap.js').DataMap
  , serviceMap = require('../conf/ServiceMap.js').ServiceMap;
  
engine
  .configure('dataType', 'csv') //not really used yet! should be able to specify "Facebook" as well
  .configure('data', dataMap)
  .configure('dataSet', '20k')
  .configure('services', serviceMap)
  
  .start();