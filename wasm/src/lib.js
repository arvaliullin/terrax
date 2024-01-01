export function factorial(n) {

    let result = 1;
    if (n <= 1) {
        return result;
    }

    for (let i = 2; i <= n; i++) {
        result = result * i;
    }

    return result;
}

function f(x) {
    return x * x;
}

export function x2Integrate(xmin, xmax, intervals_count) {
    let dx = (xmax - xmin) / intervals_count;
    let total = 0.0;
    let x = xmin;
    for (let i = 1; i < intervals_count; i++) {
        total = total + dx * (f(x) + f(x + dx)) / 2.0;
        x = x + dx;
    }
    return total;
}
