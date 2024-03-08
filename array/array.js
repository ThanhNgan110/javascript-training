
const friends = ['Michale', 'Steven', 'Peter'];
console.log(friends);

// access elemnt
console.log(friends[0]);
console.log(friends[1]);

console.log(friends.length);
// Add element
friends.push('Ann'); 
console.log(friends.length);

friends.unshift('John'); // first
console.log(friends);

// Remove element
const popped = friends.pop(); // last
console.log(popped);

// forEach
friends.forEach((element) => console.log(element));


console.log(friends.includes('Steven'));

if(friends.includes('Steven')) {
    console.log('You have a friend called Steven')
}






