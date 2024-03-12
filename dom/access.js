//Accessing elements by ID
const demoId = document.getElementById("demo");
console.log(demoId);
demoId.style.border = "1px solid purple";

// Accessing Elements by Class
// document.getElementsByClassName();
const demoClass = document.getElementsByClassName("demo");
console.log(demoClass);

for (i = 0; i < demoClass.length; i++) {
	demoClass[i].style.border = "1px solid orange";
}

// Accessing elements by tag
// document.getElementsByTagName();
const demoTag = document.getElementsByTagName("article");
for (i = 0; i < demoTag.length; i++) {
	demoTag[i].style.border = "1px solid blue";
}

// Query Selectors
const demoQuery = document.querySelector("#demo-query");
const demoQueryAll = document.querySelectorAll('.demo-query-all');
demoQueryAll.forEach(query => {
    query.style.border = '1px solid green';
})

