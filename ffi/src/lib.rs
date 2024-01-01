#[no_mangle]
pub extern "C" fn factorial(n: i32) -> i32 {
    let mut result = 1;

    if n <= 1 {
        return result;
    }

    for i in 2..(n + 1) {
        result = result * i;
    }

    result
}

fn f(x: f64) -> f64 {
    x * x
}

#[no_mangle]
pub extern "C" fn x2Integrate(xmin: f64, xmax: f64, intervals_count: i32) -> f64 {
    let dx = (xmax - xmin) / (intervals_count as f64);
    let mut total = 0.0;
    let mut x = xmin;

    for i in 1..intervals_count {
        total = total + dx * (f(x) + f(x + dx)) / 2.0;
        x = x + dx;
    }

    total
}
