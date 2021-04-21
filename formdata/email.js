import isEmail from 'validator/lib/isEmail'

export const formEmail = {
  email: { value: "", isValid: true, message: "" },
}

export const formEmailIsValid = (state, setState) => {
  const email = { ...state.email }
  let isGood = true

  if(!isEmail(email.value)){
    isGood = false;
    email.isValid = false;
    email.message = "Value is not a valid email address";
  }

  if(!isGood) setState({ ...state, email })

  return isGood
}
