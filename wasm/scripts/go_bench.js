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

    globalThis.x2Integrate(0.0, 100.0, 10000);
    let value = globalThis.x2Integrate(0.0, 100.0, 10000);
    // console.log(`Value go:\t ${value}`)
}

runWasm();

