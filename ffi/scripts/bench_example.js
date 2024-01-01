const time_start = performance.now()

let data = []

for (let i = 0; i < 1000; i++) {
    data.push(i);
}

const time_end = performance.now()

console.log(`Время выполнения ${time_end - time_start}`)

