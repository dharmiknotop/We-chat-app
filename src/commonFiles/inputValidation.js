export const isValidEmail = (email) => {
	const re =
		/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
	return re.test(String(email).toLowerCase());
};

export const isValidPhone = (phone) => {
	const exp = /^[0-9]{6,16}$/;
	return exp.test(String(phone));
};

export const isValidPassword = (pwd) => {
	const expression = /^(?=.*\d)(?=.*[!@#$%^&*;_~>])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
	return expression.test(String(pwd));
};

export const isValidContact = (phone) => {
	const exp = /^[0-9]{8,10}$/;
	return exp.test(String(phone));
};

export const isValidPincode = (pincode) => {
	const exp = /^[0-9]{1,6}$/;
	return exp.test(String(pincode));
};

export const isInputEmpty = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}
	return "";
};

export const isInputPasswordValid = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}

	let inputText = input;

	let contain_0_to_9 = false;
	let contain_A_to_Z = false;
	let contain_a_to_z = false;
	let contain_specialSymbol = false;
	let contain_passwordMinimumLength = false;

	if (inputText.length >= 8) {
		contain_passwordMinimumLength = true;
	}

	if (inputText.length > 64) {
		contain_passwordMinimumLength = true;
	}

	for (let index = 0; index < inputText.length; index++) {
		const element = inputText.charCodeAt(index);
		if (element >= 48 && element <= 57) {
			contain_0_to_9 = true;
		} else if (element >= 65 && element <= 90) {
			contain_A_to_Z = true;
		} else if (element >= 97 && element <= 122) {
			contain_a_to_z = true;
		} else if (
			element === 33 ||
			element === 64 ||
			element === 35 ||
			element === 36 ||
			element === 37 ||
			element === 94 ||
			element === 42 ||
			element === 45 ||
			element === 95 ||
			element === 43 ||
			element === 61
		) {
			contain_specialSymbol = true;
		}
	}

	if (
		contain_0_to_9 === true &&
		contain_A_to_Z === true &&
		contain_a_to_z === true &&
		contain_specialSymbol === true &&
		contain_passwordMinimumLength === true
	) {
		return "";
	} else {
		return "Please enter a valid Password.";
	}
};

export const isInputEmailValid = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isValidEmail(input) === false) {
		return "Please enter a valid Email.";
	}
	return "";
};

export const isInputEmailValidOrNotRequired = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "";
	}
	if (isValidEmail(input) === false) {
		return "Please enter a valid Email.";
	}
	return "";
};

export const isInputPhoneNumberValid = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}

	if (input.length !== 10) {
		return "Please enter a valid Phone Number.";
	}
	return "";
};

export const isInputPhoneNumberValidOrNotRequired = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "";
	}
	return isInputPhoneNumberValid(input);
};

export const isInputPastDate = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}

	const date = new Date(input);
	if (date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
		return "Date Cannot be Future Date.";
	}

	return "";
};

export const isInputFutureDate = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}

	const date = new Date(input);
	if (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
		return "Date Cannot be Past Date.";
	}

	return "";
};

export const isInputSelectSelected = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "" || input.trim() === "0") {
		return "Required Field";
	}
	return "";
};

export const isInputValidPincode = (input) => {
	console.log(new Date().getFullYear());
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (input.length !== 6) {
		return "Please enter a valid pincode.";
	}
	if (isNaN(input)) {
		return "Please enter a valid pincode.";
	}
	if (input >= 100001 && input <= 999999) {
		return "";
	} else {
		return `Please enter a valid pincode.`;
	}
};

export const isInputValidOtp4Digit = (input) => {
	console.log(new Date().getFullYear());
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (input.length !== 4) {
		return "Please enter a valid otp.";
	}
	if (isNaN(input)) {
		return "Please enter a valid otp.";
	}
	if (input >= 1000 && input <= 9999) {
		return "";
	} else {
		return `Please enter a valid otp.`;
	}
};

export const isInputValidYear = (input) => {
	console.log(new Date().getFullYear());
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (input.length !== 4) {
		return "Please enter a valid year.";
	}
	if (isNaN(input)) {
		return "Please enter a valid year.";
	}
	const year = new Date().getFullYear();
	if (input >= year - 100 && input <= year + 10) {
		return "";
	} else {
		return `Please enter a valid year between ${year - 100} and ${year + 5}.`;
	}
};

export const isInputValidGt0 = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input >= 1) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidLte = (input, max) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input <= max) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidGte = (input, min) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input >= min) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidLatitude = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid Longitude.";
	}
	if (input >= -90 && input <= 90) {
		return "";
	} else {
		return `Please enter a valid Latitude.`;
	}
};

export const isInputValidLongitude = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid Longitude.";
	}
	if (input >= -180 && input <= 180) {
		return "";
	} else {
		return `Please enter a valid Longitude.`;
	}
};

const isValidURL = (string) => {
	// eslint-disable-next-line no-useless-escape
	var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return (res !== null)
};

export const isInputValidUrlOrNotRequired = (input, urlPrefix) => {
	if (input === undefined || input === null) {
		return "";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "";
	}
	
	const tempUrl = `${urlPrefix}${input}`
	console.log({tempUrl})
	var valid = isValidURL(tempUrl)

	if(valid === true){
		return ""
	} else {
		return "Please add valid url"
	}
};

export const shouldVideoDisplay = (item) => {
	console.log("shouldVideoDisplay: ", item)

	if(item?.statusVideoApproveByAdmin !== "true" ) {
		return "Dont display"
	}

	if(item?.videoUploadStatus !== "Uploaded" ) {
		return "Dont display"
	}

	return ""
}

const exportDefault = {
	isInputEmpty,
	isInputPastDate,
	isInputFutureDate,
	isInputEmailValid,
	isInputPasswordValid,
	isInputPhoneNumberValid,
	isInputValidPincode,
	isInputValidOtp4Digit,
	isInputSelectSelected,
	isInputValidYear,
	isInputValidGt0,
	isInputValidLte,
	isInputValidGte,
	isInputValidLatitude,
	isInputValidLongitude,

	isInputPhoneNumberValidOrNotRequired,
	isInputEmailValidOrNotRequired,
	isInputValidUrlOrNotRequired,

	shouldVideoDisplay
};

export default exportDefault;
