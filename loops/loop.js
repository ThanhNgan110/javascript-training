// switch...case
const day = "monday";

switch (day) {
	case "monday":
		console.log("Go to school");
		break;
	case "tuesday":
		console.log("Prepare theory videos");
		break;
	case "wednesday":
	case "thursday":
		console.log("write code examples");
		break;
	case "friday":
		console.log("Record videos");
		break;
	case "saturday":
	case "sunday":
		console.log("Enjoy the weekend :D");
		break;
	default:
		console.log("Not a valid day!");
}

// for loop
for (let i = 1; i <= 10; i++) {
	console.log(i);
}

// for..in
const object = { a: 1, b: 2, c: 3 };
for (const property in object) {
	console.log(`${property}:${object[property]}`);
}
