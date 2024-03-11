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

class Student extends Person {
	constructor(firstName, fullName, birthYear, course) {
		super(firstName, fullName, birthYear);
		this.course = course;
	}

	introduce() {
		console.log(`My name is ${this.fullName} and I study ${this.course}`);
	}
}

const martha = new StudentCl("Jones", "Martha", "Computer Science");
martha.introduce();
