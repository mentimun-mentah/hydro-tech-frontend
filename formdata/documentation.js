export const formDocs = {
  title: { value: "", isValid: true, message: null },
  category_doc_id: { value: "", isValid: true, message: null },
}

export const formDescription = {
  description: { value: "", isValid: true, message: null }
};

export const formDocsIsValid = (state, setState, state2, setState2) => {
  const title = { ...state.title }
  const category_doc_id = { ...state.category_doc_id }
  const description = { ...state2.description }
  let isGood = true

  if(isEmpty(title.value)) {
    isGood = false
    title.isValid = false
    title.message = "Value can't be empty"
  }

  if(isEmpty(category_doc_id.value && category_doc_id.value.toString())) {
    isGood = false
    category_doc_id.isValid = false
    category_doc_id.message = "Value can't be empty"
  }

  let plainText = description.value.replace(/<[^>]+>/g, '');
  let finalText = plainText.replace(/&nbsp;/g, " ");
  if(isEmpty(finalText)){
    isGood = false
    description.isValid = false
    description.message = "Value can't be empty";
  }

  if(!isGood){
    setState({ ...state, title, category_doc_id })
    setState2({ ...state2, description })
  }

  return isGood
  
}
