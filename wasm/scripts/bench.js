if (process.argv.length < 3) {
    return;
}

var ITERATION_COUNT = process.argv[2];
console.log(`Количество итераций ${ITERATION_COUNT}`)

let cwd = process.cwd()
let factory_cpp = require(`${cwd}/out/lib_cpp.out.js`);

factory_cpp().then((instance) => {
    let total = 0.0
    for (let i = 0; i < ITERATION_COUNT; i++) {
        let start = performance.now();
        instance._x2Integrate(0.0, 100.0, 10000);
        let end = performance.now();
        total = total + (end - start);
    }

    everage_time = total / ITERATION_COUNT;
    console.log(`Perfomans cpp:\t ${everage_time.toFixed(4)} ms`)
});

let factory_rs = require(`${cwd}/pkg/terrax.js`);
let total = 0.0
for (let i = 0; i < ITERATION_COUNT; i++) {
    let start = performance.now();
    factory_rs.x2Integrate(0.0, 100.0, 10000);
    let end = performance.now();
    total = total + (end - start);
}

everage_time = total / ITERATION_COUNT;
console.log(`Perfomans rs:\t ${everage_time.toFixed(4)} ms`)

const fs = require('fs')
require('./wasm_exec')
let filename = `${cwd}/out/lib_go.out.wasm`;
const source = fs.readFileSync(filename);

var typedArray = new Uint8Array(source)

async function runWasm() {
    const go = new globalThis.Go()
    const result = await WebAssembly.instantiate(typedArray, go.importObject);
    go.run(result.instance);

    let total = 0.0
    for (let i = 0; i < ITERATION_COUNT; i++) {
        let start = performance.now();
        globalThis.x2Integrate(0.0, 100.0, 10000);
        let end = performance.now();
        total = total + (end - start);
    }

    everage_time = total / ITERATION_COUNT;
    console.log(`Perfomans go:\t ${everage_time.toFixed(4)} ms`)

}

runWasm();

function f(x) {
    return x * x;
}

function x2Integrate(xmin, xmax, intervals_count) {
    let dx = (xmax - xmin) / intervals_count;
    let total = 0.0;
    let x = xmin;
    for (let i = 1; i < intervals_count; i++) {
        total = total + dx * (f(x) + f(x + dx)) / 2.0;
        x = x + dx;
    }
    return total;
}


function printPerfomanceJs() {
    let everage_time = 0.0;
    let total = 0.0;
    for (let i = 0; i < ITERATION_COUNT; i++) {
        let start = performance.now();
        x2Integrate(0.0, 100.0, 10000);
        let end = performance.now();
        total = total + (end - start);
    }

    everage_time = total / ITERATION_COUNT;
    console.log(`Perfomans js:\t ${everage_time.toFixed(4)} ms`)
}

printPerfomanceJs();
