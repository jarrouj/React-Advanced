import * as yup from 'yup'

export const createBookSchema = yup.object().shape({
    title: yup
    .string()
    .required('Title is required.'),
    author: yup
      .string()
      .required('Author is required.'),
    description: yup
      .string(),
      
    
})