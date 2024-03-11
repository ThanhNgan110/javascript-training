// constant
const PI = 3.141593
PI > 3.0

// arrow function
const x = (x, y) => x * y;

// The Spread (...) Operator
const numbers = [23,55,21,87,56];
let maxValue = Math.max(...numbers);

// Array Element Finding
[ 1, 3, 4, 2 ].find(x => x > 3) // 4
[ 1, 3, 4, 2 ].findIndex(x => x > 3) // 2


// String seaching
"hello".startsWith("ello", 1) // true
"hello".endsWith("hell", 4)   // true
"hello".includes("ell")       // true
"hello".includes("ell", 1)    // true
"hello".includes("ell", 2)    // false
