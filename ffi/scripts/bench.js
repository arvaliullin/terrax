import { dlopen, FFIType } from "bun:ffi";
import { x2Integrate } from "../src/lib.js"

class BenchmarkFfi {
    constructor(lang) {
        this.lang = lang
        this.path = `${process.env.PWD}/out/lib_${lang}.so`
        this.count = process.argv[2]
    }

    open(path) {
        return dlopen(path, {
            x2Integrate: {
                args: [FFIType.f64, FFIType.f64, FFIType.i32],
                returns: FFIType.f64,
            },
        });
    }

    printPerfomanceFfi() {
        const lib = this.open(this.path);

        let everage_time = 0.0;
        let total = 0.0;
        for (let i = 0; i < this.count; i++) {
            let start = performance.now();
            lib.symbols.x2Integrate(0.0, 100.0, 10000);
            let end = performance.now();
            total = total + (end - start);
        }

        everage_time = total / this.count;
        console.log(`Perfomans ${this.lang}:\t ${everage_time.toFixed(4)} ms`)
    }

    printPerfomanceJs() {
        let everage_time = 0.0;
        let total = 0.0;
        for (let i = 0; i < this.count; i++) {
            let start = performance.now();
            x2Integrate(0.0, 100.0, 10000);
            let end = performance.now();
            total = total + (end - start);
        }

        everage_time = total / this.count;
        console.log(`Perfomans js:\t ${everage_time.toFixed(4)} ms`)
    }
}

console.log(`Количество итераций ${process.argv[2]}`)

let rust = new BenchmarkFfi("rs")
rust.printPerfomanceJs()
rust.printPerfomanceFfi()


let cpp = new BenchmarkFfi("cpp")
cpp.printPerfomanceFfi()

let go = new BenchmarkFfi("go")
go.printPerfomanceFfi()

