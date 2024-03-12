const img = document.querySelector("img");
img.hasAttribute("src"); // return true
img.getAttribute("src"); // return "...shark.png"
img.removeAttribute("src"); // return the src attribute and value
img.setAttribute(
	"src",
	"https://js-tutorials.nyc3.digitaloceanspaces.com/octopus.png"
);

// select the first div
const div = document.querySelector("div");

// assign the warning class to the first div
div.className = "warning";

// select the second div by class name
const activeDiv = document.querySelector(".active");

activeDiv.classList.add("hidden"); // Add the hidden class
activeDiv.classList.remove("hidden"); // Remove the hidden class
activeDiv.classList.toggle("hidden"); // Switch between hidden true and false
activeDiv.classList.replace("active", "warning"); // Replace active class with wraning class
// select div
const div = document.querySelector("div");
// Apply style to div
div.setAttribute("style", "text-align:center");
