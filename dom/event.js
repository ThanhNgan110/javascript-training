let button = document.getElementById("changeBackground");
button.addEventListener("click", () => {
	document.body.style.background = "fuchsia";
});

const changeText = () => {
	const p = document.querySelector("p");
	p.textContent = "I changed because of an inline event handler";
};

// Add event when click btn element
const btn = document.querySelector(".click");
// console.log(btn);
const alerText = () => {
	alert("Will I alert?");
};

btn.addEventListener("click", changeText);
btn.addEventListener("click", alerText);
