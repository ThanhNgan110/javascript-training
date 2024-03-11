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

const Course =  function (name, price) {
	this.name = name;
	this.price = price;
}

const jsCourse = new Course ('Javascript', 1000);
console.log(jsCourse);

let user = { 
    name: "GFG", 
    gfg1:() => { 
        console.log(this.name)
        console.log("hello " + this.name); // no 'this' binding here 
    }, 
    gfg2(){        
        console.log("Welcome to " + this.name); // 'this' binding works here 
    }   
 }; 
user.gfg1(); 
user.gfg2(); 