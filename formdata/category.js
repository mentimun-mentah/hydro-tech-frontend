import isEmpty from 'validator/lib/isEmpty'

export const formCategory = {
  id: "",
  name: { value: "", isValid: true, message: null },
}

export const formCategoryIsValid = (state, setState) => {
  const name = { ...state.name }
  let isGood = true

  if(isEmpty(name.value)){
    isGood = false;
    name.isValid = false;
    name.message = "Value can't be empty";
  }

  if(!isGood) setState({ ...state, name })

  return isGood
}
