function SimulationEngine(options, callback) {
  this.options = options;
  if(callback) callback.apply(this, arguments);
};

SimulationEngine.prototype.active = false;


SimulationEngine.prototype.start = function() {
  this.active = true;
};
SimulationEngine.prototype.kill = function() {
  this.active = false;
};


