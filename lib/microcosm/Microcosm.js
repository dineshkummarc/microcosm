var SimulationEngine = require("./SimulationEngine");
exports = module.exports = start;
exports.version = '0.0.1';

function start() {
  return new SimulationEngine();
}