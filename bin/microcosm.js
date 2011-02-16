var engine = require('../')();

engine
  .configure('dataType', 'csv')
  .configure('dataSource', __dirname + '/../data/csv/100_users.csv')
  
  
  .start();