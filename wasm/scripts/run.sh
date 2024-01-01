#!/usr/bin/env sh
for count in 1 10 100 1000 10000
do
bun $PWD/scripts/bench.js $count
done
