
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


function printJsResult() {
    let value = x2Integrate(0.0, 100.0, 10000);
    console.log(`Value js:\t ${value}`)
}

printJsResult();
