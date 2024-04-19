
let cwd = process.cwd()
let factory_rs = require(`${cwd}/pkg/terrax.js`);
let value = factory_rs.x2Integrate(0.0, 100.0, 10000);
// console.log(`Value rs:\t ${value}`);