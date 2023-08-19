export const isInputEmpty = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  if (input.trim() === '') {
    return 'Required Field';
  }
  return '';
};

export const isInputEmailValid = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
  }
  if (isValidEmail(input) === false) {
    return 'Please enter a valid Email.';
  }
  return '';
};

export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return re.test(String(email).toLowerCase());
};

export const isInputPasswordValid = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field';
  }
  input = input.toString().trim();
  if (input.trim() === '') {
    return 'Required Field';
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
    return '';
  } else {
    return 'Please enter a valid Password.';
  }
};
