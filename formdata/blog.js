import isEmpty from 'validator/lib/isEmpty'

export const formBlog = {
  title: { value: "", isValid: true, message: null },
}
export const formDescription = {
  description: { value: "", isValid: true, message: null }
};

export const formBlogIsValid = (state, setState, state2, setState2) => {
  const title = { ...state.title }
  const description = { ...state2.description }
  let isGood = true

  if(isEmpty(title.value)){
    isGood = false
    title.isValid = false
    title.message = "Value can't be empty";
  }

  let plainText = description.value.replace(/<[^>]+>/g, '');
  let finalText = plainText.replace(/&nbsp;/g, " ");
  if(isEmpty(finalText)){
    isGood = false
    description.isValid = false
    description.message = "Value can't be empty";
  }

  if(!isGood){
    setState({ ...state, title })
    setState2({ ...state2, description })
  }

  return isGood
  
}
