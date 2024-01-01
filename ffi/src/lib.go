package main

import "C"

//export factorial
func factorial(n C.int) C.int {
	return C.int(fact(int(n)))
}

//export x2Integrate
func x2Integrate(xmin C.double, xmax C.double, intervals_count C.int) C.double {
	return C.double(integrate(float64(xmin), float64(xmax), int(intervals_count)))
}

func fact(n int) int {
	result := 1
	if n <= 1 {
		return result
	}

	for i := 2; i <= n; i++ {
		result = result * i
	}

	return result
}

func f(x float64) float64 {
	return x * x
}

func integrate(xmin float64, xmax float64, intervals_count int) float64 {
	dx := (xmax - xmin) / float64(intervals_count)
	total := 0.0
	x := xmin

	for i := 0; i < intervals_count; i++ {
		total = total + dx*(f(x)+f(x+dx))/2.0
		x = x + dx
	}

	return total
}

func main() {
}
