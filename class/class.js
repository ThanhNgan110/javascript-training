class Person {
	constructor(firstName, fullName, birthYear) {
		this.firstName = firstName;
		this.fullName = fullName;
		this.birthYear = birthYear;
	}

	get getFirstName() {
		return this.firstName;
	}

	set setFirstName(firstName) {
		this.firstName = firstName;
	}

	get getFullName() {
		return this.fullName;
	}

	set setFullName(fullName) {
		this.fullName = fullName;
	}

	get getBirthYear() {
		return this.birthYear;
	}

	set setBirthYear(birthYear) {
		this.birthYear = birthYear;
	}

	calcAge() {
		console.log(2017 - this.getBirthYear);
	}
}

const jessica = new Person("John", "Jessica", 1996);
jessica.calcAge();
console.log(jessica.calcAge());
