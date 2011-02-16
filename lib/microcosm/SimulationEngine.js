function SimulationEngine(options, callback) {
  this.options = options;
  if(callback) callback.apply(this, arguments);
};

SimulationEngine.prototype.active = false;
SimulationEngine.prototype.ServiceLocator = null;


SimulationEngine.prototype.configure = function() {

  if(arguments.length > 1) {
    this.options[key] = value;
    return this;
  } else {
    return this.options[key];
  }
};




SimulationEngine.prototype.start = function() {
  console.log("[initialize] Initializing Mission ... ");
  
  this.active = true;
};
SimulationEngine.prototype.kill = function() {
  console.log("[sigkill] Terminating Mission ... ");
  this.active = false;
};



module.exports = SimulationEngine;