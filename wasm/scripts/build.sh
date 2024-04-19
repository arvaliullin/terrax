#!/usr/bin/env sh

# Clean
rm -rf $PWD/out
rm -rf $PWD/pkg

mkdir -p $PWD/out

# Build C++ WebAssembly Library
em++ $PWD/src/lib.cpp -s WASM=1 -s EXPORTED_FUNCTIONS="['_x2Integrate']" -s EXPORTED_RUNTIME_METHODS=ccall -s MODULARIZE -o $PWD/out/lib_cpp.out.js


# Build Go WebAssembly 
export GOARCH=wasm
export GOOS=js
go build -o $PWD/out/lib_go.out.wasm $PWD/src/lib.go
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" $PWD/scripts

# Build Rust Webassembly library
wasm-pack build --target nodejs
