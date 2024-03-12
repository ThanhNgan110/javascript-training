// use method to access entire element
console.log(document.getElementById("nav"));
let navLink = document.getElementById("nav");
navLink.href = "https://www.wikipedia.org";
navLink.textContent = "Navigate to Wikipedia";
console.log(navLink);
