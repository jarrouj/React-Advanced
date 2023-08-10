import * as yup from "yup"

export const signInSchema=yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').max(32,'Password must not exceed 32 characters').required('Password is required'),
})