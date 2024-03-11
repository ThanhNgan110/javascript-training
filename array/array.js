const friends = ["Michale", "Steven", "Peter"];
console.log(friends);

// access elemnt
console.log(friends[0]);
console.log(friends[1]);

console.log(friends.length);
// Add element
friends.push("Ann");
console.log(friends.length);

friends.unshift("John"); // first
console.log(friends);

// Remove element
const popped = friends.pop(); // last
console.log(popped);

// forEach
friends.forEach((element) => console.log(element));

// method include

if (friends.includes("Steven")) {
	console.log("You have a friend called Steven");
}

// method find
const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
console.log(found);

// method findIndex
const array2 = [5, 12, 8, 130, 44];
const isLargeNumber = array2.findIndex((element) => element > 13);
console.log(isLargeNumber);

// method map
const array3 = [1, 4, 9, 16];

const map1 = array3.map((x) => x * 2);
console.log(map1);

// method toString
const array4 = [1, 2, "a", "1b"];
console.log(array4.toString());

// method concat
const arr1 = ["a", "b", "c"];
const arr2 = ["d", "e", "f"];
const arr3 = arr1.concat(arr2);

console.log(arr3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

// method filter
const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
