const age = 15;
if (age >=18) {
    console.log('Sarah can start driving');
} else {
    const yearLest = 18 -age;
    console.log(`Sarah is too young. Wait another$ ${yearLest} year`);
}

const birthday = 2012;
let century;
if (birthday <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);

const agge = 26;
const beverage = age >= 21 ? 'Beer' : 'Juice';
console.log(beverage);

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
        console.log('Not a valid day!');
}


