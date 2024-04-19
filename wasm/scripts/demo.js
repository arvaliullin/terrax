let cwd = process.cwd()
const fs = require('fs')
require('./wasm_exec')
let filename = `${cwd}/out/lib_go.out.wasm`;
const source = fs.readFileSync(filename);

var typedArray = new Uint8Array(source)

async function runWasm() {
    const go = new globalThis.Go()
    const result = await WebAssembly.instantiate(typedArray, go.importObject);
    go.run(result.instance);
    let value = globalThis.x2Integrate(0.0, 100.0, 10000);
    console.log(`Value go:\t ${value.toFixed(10)}`)

}

runWasm();



function f(x) {
    return x * x;
}

function x2Integrate(xmin, xmax, intervals_count) {
    let dx = (xmax - xmin) / intervals_count;
    let total = 0.0;
    let x = xmin;
    for (let i = 0; i < intervals_count; i++) {
        total = total + dx * (f(x) + f(x + dx)) / 2.0;
        x = x + dx;
    }
    return total;
}


function printJsResult() {
    let value = x2Integrate(0.0, 100.0, 10000);
    console.log(`Value js:\t ${value.toFixed(10)}`)
}

printJsResult();
