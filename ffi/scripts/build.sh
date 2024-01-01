#!/usr/bin/env sh

# Clean
rm -rf $PWD/out

mkdir -p $PWD/out

# Build C++ Library
clang -c $PWD/src/lib.cpp -O2 -o $PWD/out/lib_cpp.o
clang -shared -o $PWD/out/lib_cpp.so $PWD/out/lib_cpp.o

# Build Rust Library
rustc --crate-type cdylib -O $PWD/src/lib.rs -o $PWD/out/lib_rs.so


# Build Go
go build -o $PWD/out/lib_go.so -buildmode=c-shared $PWD/src/lib.go
