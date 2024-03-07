// function
function logger() {
	console.log("My name is Jonas");
}

// calling function
logger();

function myFunction(a, b) {
	return a * b;
}

let x = myFunction(4, 3);
console.log(x);

// arrow function
// const multiply = (number1, number2) => {
// 	return number1 * number2
// };

const multiply = (number1, number2) => number1 * number2;
let y = multiply(10, 5);
console.log(y);
